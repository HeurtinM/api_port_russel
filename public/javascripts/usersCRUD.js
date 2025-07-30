//affiche un utilisateur via l'email, la seul information afficher est son nom 
// donc la fonction est peu utile tel quel, mais elle peut ètre facilement modifier pour afficher tout autres infos qui pourrait ètre rajoutées dans le model user
document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // block le formulaire pour ne pas recharger la page

    let email = document.getElementById('userToConsult').value;

    let result = await fetch("http://localhost:3000/users/" + email);
    let userJson = await result.json();
    let userDisplay = document.getElementById("userDisplay");

    userDisplay.innerHTML = ''; //vide le display avant d'afficher un nouvelle utilisateur

    let userName = document.createElement('p');
    userName.textContent = userJson.userName;
    userDisplay.appendChild(userName);
});

//simple fonction pour mettre les utilisateurs dans l'ordre alphabetique de leur email
function compare( a, b ) {
    if ( a.email < b.email ){
        return -1;
    }
    if ( a.email > b.email ){
        return 1;
    }
        return 0;
}

//liste tout les utilisateur,affiche leur nom d'utilisateur et email
document.getElementById('listUsers').addEventListener('click', async () => { 
    try {
        let result = await fetch('http://localhost:3000/users/');
        let users = await result.json();
        let tableBody = document.querySelector('#usersTable tbody');

                users.sort( compare );

                tableBody.innerHTML = '';

                for(let i=0; i< users.length; i++){
                    let user = users[i];
                    let row = document.createElement('tr');

                    let userNameCell = document.createElement('td');
                    userNameCell.textContent = user.userName;
                    row.appendChild(userNameCell);

                    let userEmailCell = document.createElement('td');
                    userEmailCell.textContent = user.email;
                    row.appendChild(userEmailCell);

                    tableBody.appendChild(row);
                };
    } catch (error) {
        console.error(error);
    }
});

//update un utilisteur avec les infos du form
document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    let userToUpdateEmail = document.getElementById('userToUpdate').value;

    const userName = document.getElementById('userNameToUpdate').value;
    const email = document.getElementById('userEmailToUpdate').value;
    const password = document.getElementById('passwordToUpdate').value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userToUpdateEmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password}),
        });

        if (response.ok) {
            const data = await response.json();
            alert('utilisateur modifier avec succès !');
        } else {
            const error = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    listUsersForDropDown()
});

//supprime l'utilisateur choisi
document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dropdown = document.getElementById('userToDelete');
    const userEmail = dropdown.value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userEmail}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('l\'utilisateur a été supprimer');
        } else {
            const error = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    listUsersForDropDown(); //actualise le dropdown
});

//fonction pour peupler les dropdowns
async function listUsersForDropDown() {
    try {
        console.log('started');
        let result = await fetch('http://localhost:3000/users/');
        let users = await result.json();
        let dropdownConsult = document.getElementById('userToConsult');
        let dropdownDelete = document.getElementById('userToDelete');
        let dropdownUpdate = document.getElementById('userToUpdate');

        users.sort( compare );

        dropdownConsult.innerHTML = '';
        dropdownDelete.innerHTML = '';
        dropdownUpdate.innerHTML = '';

        for(let i=0; i< users.length; i++){
            let user = users[i];

            let dropdownOption = document.createElement('option');
            dropdownOption.value = user.email;
            dropdownOption.innerHTML = user.email;

            dropdownConsult.appendChild(dropdownOption.cloneNode(true)); //cloneNode ajouté pour que les deux menu puissent ètre peupler en utilisant qu'une seul boucle
            dropdownDelete.appendChild(dropdownOption.cloneNode(true)); 
            dropdownUpdate.appendChild(dropdownOption);
        };
    } catch (error) {
        console.error(error);
    }
}

listUsersForDropDown()

//todo
//combiner les event listeners et fonctions
//crud reservations