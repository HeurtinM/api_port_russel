//script crée en suivant ce tutoriel: https://www.youtube.com/watch?v=7LGpIQ6ceJs
const form = document.querySelector('form');



/**
 * récupère et store les infos de l'utilisateur lors de la connection
 * 
 * @listens submit du form
 * @returns void, ne return rien dans le code
 */
form.addEventListener('submit',()=>{
    const data = new FormData(form);
    const object = Object.fromEntries(data);

   const json = JSON.stringify(object);
   localStorage.setItem('form',json);

    console.log('Données stockées dans localStorage :', json);
})