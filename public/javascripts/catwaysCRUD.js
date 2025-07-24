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