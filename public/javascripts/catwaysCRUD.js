document.getElementById('catwayForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // block le formulaire pour ne pas recharger la page

    let catwayID = document.getElementById('catwayID').value;

    await getCatway(catwayID);
});

async function getCatway(catwayID) {
    let result = await fetch("http://localhost:3000/catways/" + catwayID);
    let catwayJson = await result.json();
    let catwayDisplay = document.getElementById("catwayDisplay");

    catwayDisplay.innerHTML = ''; //vide le display avant d'afficher un nouveau catway

    let catwayNumber = document.createElement('p');
    catwayNumber.textContent = catwayJson.catwayNumber;
    catwayDisplay.appendChild(catwayNumber);

    let catwayType = document.createElement('p');
    catwayType.textContent = catwayJson.catwayType;
    catwayDisplay.appendChild(catwayType);

    let catwayState = document.createElement('p');
    catwayState.textContent = catwayJson.catwayState;
    catwayDisplay.appendChild(catwayState);
}

//la meme fonction mais pour remplir le dropdown select de l'option de suppréssion. 
//J'ai pensé que je pourrais faire une seul fonction pour les deux mais je veux conserver le fait que la liste ne s'affiche qu'après que l'utilisateur est cliquer sur le bouton, tandis que le dropdown doit ètre lancer au chargement de la page
async function listCatwaysForDropDown() {
    try {
        console.log('started');
        let result = await fetch('http://localhost:3000/catways/');
        let catways = await result.json();
        let dropdown = document.getElementById('catwayToDelete');

        catways.sort( compare );

        dropdown.innerHTML = '';

        for(let i=0; i< catways.length; i++){
            let catway = catways[i];

            let dropdownOption = document.createElement('option');
            dropdownOption.value = catway.catwayNumber;
            dropdownOption.innerHTML = catway.catwayNumber;

            dropdown.appendChild(dropdownOption);
        };
    } catch (error) {
        console.error(error);
    }
}

listCatwaysForDropDown();

document.getElementById('listCatways').addEventListener('click', async function() { 
    await listCatways();
});


 //simple fonction pour mettre les catways dans l'ordre
function compare( a, b ) {
    if ( a.catwayNumber < b.catwayNumber ){
        return -1;
    }
    if ( a.catwayNumber > b.catwayNumber ){
        return 1;
    }
        return 0;
}

async function listCatways() {
    try {
        let result = await fetch('http://localhost:3000/catways/');
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

                    let clientNameCell = document.createElement('td');
                    clientNameCell.textContent = catway.catwayType;
                    row.appendChild(clientNameCell);

                    let boatNameCell = document.createElement('td');
                    boatNameCell.textContent = catway.catwayState;
                    row.appendChild(boatNameCell);

                    tableBody.appendChild(row);
                };
    } catch (error) {
        console.error(error);
    }
}

//j'ai eu enormément de mal a trouver comment utilisez les methodes delete et put en passant par le HTML
// quasiment tout les forums ou autre dans lesquel j'ai fait mes recherches disait juste que PUT et DELETE ne sont pas integrer en HTML sans donner de ressources pour countourner ce problème
//au final j'ai utiliser ce post: https://stackoverflow.com/questions/75070365/using-fetch-to-change-form-method-to-delete comme base et j'ai du utiliser Le Chat Mistral pour complementer (seul fois ou l'IA a été nescessaire pour m'eclairer)

document.getElementById('updateCatwayForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const catwayId = document.getElementById('catwayToUpdateID').value;
    const catwayState = document.getElementById('catwayToUpdateState').value;
    const catwayType = document.querySelector('input[name="catwayUpdatedType"]:checked').value;

    try {
        const response = await fetch(`http://localhost:3000/catways/${catwayId}`, {
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

document.getElementById('deleteCatwayForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dropdown = document.getElementById('catwayToDelete');
    const catwayId = dropdown.value;

    try {
        const response = await fetch(`http://localhost:3000/catways/${catwayId}`, {
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

//TODO 
//remettre le catway 25
//mettre un menu dropdown pour modifier
//mettre une alerte pour ajout au lieu d'afficher nouvelle page