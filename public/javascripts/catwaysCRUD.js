/**
 * récupère un catway via son ID et affiche son type et son état
 * 
 * @param {Event} event submit du form
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('catwayForm').addEventListener('submit', async (event)=> {
    event.preventDefault(); // block le formulaire pour ne pas recharger la page

    let catwayID = document.getElementById('catwayToConsult').value;

    let result = await fetch("https://api-port-russel-mu.vercel.appcatways/" + catwayID);
    let catwayJson = await result.json();
    let catwayDisplay = document.getElementById("catwayDisplay");

    catwayDisplay.innerHTML = ''; //vide le display avant d'afficher un nouveau catway

    let catwayType = document.createElement('p');
    catwayType.textContent = catwayJson.catwayType;
    catwayDisplay.appendChild(catwayType);

    let catwayState = document.createElement('p');
    catwayState.textContent = catwayJson.catwayState;
    catwayDisplay.appendChild(catwayState);
});


/**
 * simple fonction pour trier les catways dans l'ordre croissant de leur numéro
 * 
 * @param {catway} a premier catway dont on recupère le num
 * @param {catway} b deuxieme catway dont on recupère le num
 * @returns le plus petit en premier. fonction faite pour ètre utiliser avec sort()
 */
function compare( a, b ) {
    if ( a.catwayNumber < b.catwayNumber ){
        return -1;
    }
    if ( a.catwayNumber > b.catwayNumber ){
        return 1;
    }
        return 0;
}

//
/**
 * affiche la liste de tout les catway dans un tableau avec leur ID,type et état
 * 
 * @param {Event} event click sur le bouton "afficher la liste"
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('listCatways').addEventListener('click', async ()=> { 
     try {
        let result = await fetch('https://api-port-russel-mu.vercel.app/catways/');
            let catways = await result.json();
                let tableBody = document.querySelector('#catwaysTable tbody');

                catways.sort( compare );

                tableBody.innerHTML = '';

                for(let i=0; i< catways.length; i++){
                    let catway = catways[i];
                    let row = document.createElement('tr');

                    let catwayNumberCell = document.createElement('td');
                    catwayNumberCell.textContent = catway.catwayNumber;
                    row.appendChild(catwayNumberCell);

                    let typeNameCell = document.createElement('td');
                    typeNameCell.textContent = catway.catwayType;
                    row.appendChild(typeNameCell);

                    let stateNameCell = document.createElement('td');
                    stateNameCell.textContent = catway.catwayState;
                    row.appendChild(stateNameCell);

                    tableBody.appendChild(row);
                };
    } catch (error) {
        console.error(error);
    }
});

//j'ai eu enormément de mal a trouver comment utilisez les methodes delete et put en passant par le HTML
// quasiment tout les forums ou autre dans lesquel j'ai fait mes recherches disait juste que PUT et DELETE ne sont pas integrer en HTML sans donner de ressources pour countourner ce problème
//au final j'ai utiliser ce post: https://stackoverflow.com/questions/75070365/using-fetch-to-change-form-method-to-delete comme base et j'ai du utiliser Le Chat Mistral pour complementer (seul fois ou l'IA a été nescessaire pour m'eclairer)

//
/**
 * update le catway choisi avec les nouvelles infos donner dans le form
 * 
 * @param {Event} event submit du form
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('updateCatwayForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const catwayId = document.getElementById('catwayToUpdate').value;
    const catwayState = document.getElementById('catwayToUpdateState').value;
    const catwayType = document.querySelector('input[name="catwayUpdatedType"]:checked').value;

    try {
        const response = await fetch(`https://api-port-russel-mu.vercel.app/catways/${catwayId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ catwayState, catwayType }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Catway modifier avec succès !');
        } else {
            const error = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//
/**
 * supprime le catway choisi 
 * 
 * @param {Event} event submit du form
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('deleteCatwayForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dropdown = document.getElementById('catwayToDelete');
    const catwayId = dropdown.value;

    try {
        const response = await fetch(`https://api-port-russel-mu.vercel.app/catways/${catwayId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Catway a été supprimer');
        } else {
            const error = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    listCatwaysForDropDown(); //actualise le dropdown
});

//la meme fonction que pour l'option list mais pour remplir le dropdown select de l'option de suppréssion. 
//J'ai pensé que je pourrais faire une seul fonction pour les deux mais je veux conserver le fait que la liste ne s'affiche qu'après que l'utilisateur est cliquer sur le bouton, tandis que le dropdown doit ètre lancer au chargement de la page
/** 
 * Remplit les menus déroulants avec la liste des catways existants.
 * Les catways sont triés par numéro dans l'ordre croissant.
 *
 * @async
 * @returns void, ne return rien dans le code
  */
async function listCatwaysForDropDown() {
    try {
        let result = await fetch('https://api-port-russel-mu.vercel.app/catways/');
        let catways = await result.json();
        let dropdownConsult = document.getElementById('catwayToConsult');
        let dropdownDelete = document.getElementById('catwayToDelete');
        let dropdownUpdate = document.getElementById('catwayToUpdate');

        catways.sort( compare );

        dropdownConsult.innerHTML = '';
        dropdownDelete.innerHTML = '';
        dropdownUpdate.innerHTML = '';

        for(let i=0; i< catways.length; i++){
            let catway = catways[i];

            let dropdownOption = document.createElement('option');
            dropdownOption.value = catway.catwayNumber;
            dropdownOption.innerHTML = catway.catwayNumber;

            dropdownConsult.appendChild(dropdownOption.cloneNode(true)); //cloneNode ajouté pour que les deux menu puissent ètre peupler en utilisant qu'une seul boucle
            dropdownDelete.appendChild(dropdownOption.cloneNode(true)); 
            dropdownUpdate.appendChild(dropdownOption);
        };
    } catch (error) {
        console.error(error);
    }
}

//appelle de la fonction
listCatwaysForDropDown();
