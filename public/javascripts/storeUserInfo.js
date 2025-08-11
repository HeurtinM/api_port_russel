document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        console.log("try ok");
        const response = await fetch('users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("response ok");
            localStorage.setItem('token', data.token);
            localStorage.setItem('form', JSON.stringify({ userName, email }))
            window.location.href = data.redirect;
        } else {
            const errorMessage = `Échec de la connexion: ${response.status} ${response.statusText}\n${JSON.stringify(data)}`;
            alert(errorMessage);
            console.error('Détails de l\'erreur:', errorMessage);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});

