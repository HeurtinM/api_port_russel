document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Stocker le token dans localStorage
            localStorage.setItem('token', data.token);
            // Rediriger vers le tableau de bord
            window.location.href = data.redirect;
        } else {
            alert(data.message || 'Échec de la connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});

