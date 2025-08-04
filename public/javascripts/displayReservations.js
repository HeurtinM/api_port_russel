//j'ai principalement utiliser le cours "Gérez du code asynchrone avec Fetch" pour crée cette fonction, en supplémentant avec des recherches sur W3C et co ainsie que un peu d'aide de "le chat Mistral" principalement pour retrouver "let tableBody = document.querySelector('#reservationsTable tbody');"
/**
 * recupère le tableau et le peuple avec toute les reservations
 * 
 * @async
 * @returns void, ne return rien dans le code
 */
async function getReservations() {
            try {
                let result = await fetch('https://api-port-russel-je588cze7-heurtinms-projects.vercel.app/catways/:id/reservations');
                let reservations = await result.json();
                let tableBody = document.querySelector('#reservationsTable tbody');

                for(let i=0; i< reservations.length; i++){
                    let reservation = reservations[i];
                    let row = document.createElement('tr');

                    let catwayNumberCell = document.createElement('td');
                    catwayNumberCell.textContent = reservation.catwayNumber;
                    row.appendChild(catwayNumberCell);

                    let clientNameCell = document.createElement('td');
                    clientNameCell.textContent = reservation.clientName;
                    row.appendChild(clientNameCell);

                    let boatNameCell = document.createElement('td');
                    boatNameCell.textContent = reservation.boatName;
                    row.appendChild(boatNameCell);

                    let startDateCell = document.createElement('td');
                    startDateCell.textContent = new Date(reservation.startDate).toLocaleString();
                    row.appendChild(startDateCell);

                    let endDateCell = document.createElement('td');
                    endDateCell.textContent = new Date(reservation.endDate).toLocaleString();
                    row.appendChild(endDateCell);

                    tableBody.appendChild(row);
                };
            } catch (error) {
                console.error(error);
            }
}

getReservations();