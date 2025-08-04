//
/**
 * affiche une reservation via l'ID. J'utilise l'ID au lieu d'un element plus simple comme le boatName pour rester fidele aux routes données par le brief
 * 
 * @param {Event} event submit du form
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('reservationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // block le formulaire pour ne pas recharger la page

    let catwayID = document.getElementById('reservationToConsultCatway').value;
    let ID = document.getElementById('reservationToConsult').value;

    let result = await fetch("catways/" + catwayID + "/reservations/" + ID);
    let reservation = await result.json();
    let reservationDisplay = document.getElementById("reservationDisplay");

    reservationDisplay.innerHTML = ''; //vide le display avant d'afficher un nouvelle utilisateur

    let reservationClientName = document.createElement('p');
    reservationClientName.textContent = reservation.clientName;
    reservationDisplay.appendChild(reservationClientName);

    let reservationBoatName = document.createElement('p');
    reservationBoatName.textContent = reservation.boatName;
    reservationDisplay.appendChild(reservationBoatName);

    let reservationStartDate = document.createElement('p');
    reservationStartDate.textContent = new Date(reservation.startDate).toLocaleString();
    reservationDisplay.appendChild(reservationStartDate);

    let reservationEndDate = document.createElement('p');
    reservationEndDate.textContent = new Date(reservation.endDate).toLocaleString();
    reservationDisplay.appendChild(reservationEndDate);
});

//
/**
 * liste tout les utilisateur,affiche leur nom d'utilisateur et email
 * 
 * @param {Event} event click du bouton "affiche liste"
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('listReservations').addEventListener('click', async () => { 
    try {
        let catwaysResult = await fetch('catways/');
        let catways = await catwaysResult.json();

        let result = await fetch(`catways/${catways[0].catwayNumber}/reservations/`); //utilise le numero du premier catway enregistrer pour accedder a la route.De cette manière tant qu'il reste au moins un catway, la fonction fonctionnera toujours
        let reservations = await result.json();
        let tableBody = document.querySelector('#reservationsTable tbody');

        tableBody.innerHTML = '';

        for(let i=0; i< reservations.length; i++){
            let reservation = reservations[i];
            let row = document.createElement('tr');

            let reservationIDCell = document.createElement('td');
            reservationIDCell.textContent = reservation._id;
            row.appendChild(reservationIDCell);

            let reservationCatwayNumCell = document.createElement('td');
            reservationCatwayNumCell.textContent = reservation.catwayNumber;
            row.appendChild(reservationCatwayNumCell);

            let reservationClientNameCell = document.createElement('td');
            reservationClientNameCell.textContent = reservation.clientName;
            row.appendChild(reservationClientNameCell);

            let reservationBoatNameCell = document.createElement('td');
            reservationBoatNameCell.textContent = reservation.boatName;
            row.appendChild(reservationBoatNameCell);

            let reservationStartDateCell = document.createElement('td');
            reservationStartDateCell.textContent = new Date(reservation.startDate).toLocaleString();
            row.appendChild(reservationStartDateCell);

            let reservationEndDateCell = document.createElement('td');
            reservationEndDateCell.textContent = new Date(reservation.endDate).toLocaleString();
            row.appendChild(reservationEndDateCell);

            tableBody.appendChild(row);
        };
    } catch (error) {
        console.error(error);
    }
});

//
/**
 * donne la route pour ajouter la reservation avec le numéro du catway choisis
 * 
 * @param {Event} event la selection du catway number dans le menu déroulant
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('catwayNumberForReservation').addEventListener('change', function() {
        let catwayID = this.value;
        document.getElementById('addReservationForm').action = `catways/${catwayID}/reservations/`;
});


//update une reservation avec les infos du form
/**
 * liste tout les utilisateur,affiche leur nom d'utilisateur et email
 * 
 * @param {Event} event click du bouton "affiche liste"
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('updateReservationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    let reservationToUpdateCatway = document.getElementById('reservationToUpdateCatway').value;
    let reservationToUpdate = document.getElementById('reservationToUpdate').value;

    const clientName = document.getElementById('clientNameToUpdate').value;
    const boatName = document.getElementById('boatNameToUpdate').value;
    const startDate = document.getElementById('startDateToUpdate').value;
    const endDate = document.getElementById('endDateToUpdate').value;

    try {
        const response = await fetch(`catways/${reservationToUpdateCatway}/reservations/${reservationToUpdate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({clientName, boatName, startDate, endDate}),
        });

        if (response.ok) {
            const data = await response.json();
            alert('reservation modifier avec succès !');
        } else {
            const error = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//supprime la reservation choisi
/**
 * supprime la reservation choisi
 * 
 * @param {Event} event submit du form
 * @listens l'event ci dessus
 * @async
 * @returns void, ne return rien dans le code
 */
document.getElementById('deleteReservationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    let reservationToDeleteCatway = document.getElementById('reservationToDeleteCatway').value;
    let reservationToDelete = document.getElementById('reservationToDelete').value;

    try {
        const response = await fetch(`catways/${reservationToDeleteCatway}/reservations/${reservationToDelete}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('la reservation a été supprimer');
        } else {
            const error = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    listreservationsForDropDown(); //actualise le dropdown
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

//fonction pour peupler les dropdowns des num catways
/** 
 * Remplit les menus déroulants avec la liste des catways existants.
 * Les catways sont triés par numéro dans l'ordre croissant.
 *
 * @async
 * @returns void, ne return rien dans le code
  */
async function listCatwaysForDropDown() {
    try {
        let result = await fetch('catways/');
        let catways = await result.json();
        let dropdownAdd = document.getElementById('catwayNumberForReservation');
        let dropdownConsult = document.getElementById('reservationToConsultCatway');
        let dropdownDelete = document.getElementById('reservationToDeleteCatway');
        let dropdownUpdate = document.getElementById('reservationToUpdateCatway');

        catways.sort(compare);

        dropdownAdd.innerHTML = '';
        dropdownConsult.innerHTML = '';
        dropdownDelete.innerHTML = '';
        dropdownUpdate.innerHTML = '';

        for(let i=0; i< catways.length; i++){
            let catway = catways[i];

            let dropdownOption = document.createElement('option');
            dropdownOption.value = catway.catwayNumber;
            dropdownOption.innerHTML = catway.catwayNumber;

            dropdownAdd.appendChild(dropdownOption.cloneNode(true)); //cloneNode ajouté pour que les deux menu puissent ètre peupler en utilisant qu'une seul boucle
            dropdownConsult.appendChild(dropdownOption.cloneNode(true)); 
            dropdownDelete.appendChild(dropdownOption.cloneNode(true)); 
            dropdownUpdate.appendChild(dropdownOption);
        };
    } catch (error) {
        console.error(error);
    }
}

listCatwaysForDropDown()

//event listeners des different select des numéro de catway, pour afficher le select des reservations en fonction de ce dernier
document.getElementById("reservationToConsultCatway").addEventListener('change', function() {
    let catwayId = this.value;
    let dropdownID = "reservationToConsult";
    listIDForDropDown(catwayId, dropdownID);
});

document.getElementById("reservationToDeleteCatway").addEventListener('change', function() {
    let catwayId = this.value;
    let dropdownID = "reservationToDelete";
    listIDForDropDown(catwayId, dropdownID);
});

document.getElementById("reservationToUpdateCatway").addEventListener('change', function() {
    let catwayId = this.value;
    let dropdownID = "reservationToUpdate";
    listIDForDropDown(catwayId, dropdownID);
});


//fonction pour remplir les dropdowns des reservations en fonction du catway selectionné
/** 
 * Remplit les menus déroulants avec la liste des reservations du catway selectionné.
 *
 * @async
 * @returns void, ne return rien dans le code
  */
async function listIDForDropDown(catwayID, dropdownID) {
    try {
        let result = await fetch(`catways/${catwayID}/reservations/`);
        let reservations = await result.json();
        let dropdown = document.getElementById(dropdownID);

        dropdown.innerHTML = '';

        let filteredReservations = reservations.filter(reservation => reservation.catwayNumber == catwayID); //filtre les reservations pour ne retenir que celle qui sont reserver sous le catway selectionné

        for(let i=0; i< filteredReservations.length; i++){
            let reservation = filteredReservations[i];

            let dropdownOption = document.createElement('option');
            dropdownOption.value = reservation._id;
            dropdownOption.innerHTML = reservation._id;

            dropdown.appendChild(dropdownOption);
        };

        dropdown.selectedIndex = 0; //selectionne automatiquement la première option

    } catch (error) {
        console.error(error);
    }
}