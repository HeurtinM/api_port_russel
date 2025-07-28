document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // block le formulaire pour ne pas recharger la page

    let email = document.getElementById('userToConsult').value;

    await getUser(email);
});

async function getUser(email) {
    let result = await fetch("http://localhost:3000/users/" + email);
    let userJson = await result.json();
    let userDisplay = document.getElementById("userDisplay");

    userDisplay.innerHTML = ''; //vide le display avant d'afficher un nouvelle utilisateur

    let userName = document.createElement('p');
    userName.textContent = userJson.userName;
    userDisplay.appendChild(userName);
}

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

document.getElementById('listUsers').addEventListener('click', async function() { 
    await listUsers();
});

async function listUsers() {
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

                    tableBody.appendChild(row);
                };
    } catch (error) {
        console.error(error);
    }
}



async function listUsersForDropDown() {
    try {
        console.log('started');
        let result = await fetch('http://localhost:3000/users/');
        let users = await result.json();
        let dropdownConsult = document.getElementById('userToConsult');
        //let dropdownDelete = document.getElementById('userToDelete');
        //let dropdownUpdate = document.getElementById('userToUpdate');

        users.sort( compare );

        dropdownConsult.innerHTML = '';
        //dropdownDelete.innerHTML = '';
        //dropdownUpdate.innerHTML = '';

        for(let i=0; i< users.length; i++){
            let user = users[i];

            let dropdownOption = document.createElement('option');
            dropdownOption.value = user.email;
            dropdownOption.innerHTML = user.email;

            dropdownConsult.appendChild(dropdownOption.cloneNode(true)); //cloneNode ajouté pour que les deux menu puissent ètre peupler en utilisant qu'une seul boucle
            //dropdownDelete.appendChild(dropdownOption.cloneNode(true)); 
            //dropdownUpdate.appendChild(dropdownOption);
        };
    } catch (error) {
        console.error(error);
    }
}

listUsersForDropDown()