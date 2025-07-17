//script crée en suivant ce tutoriel: https://www.youtube.com/watch?v=7LGpIQ6ceJs
const form = document.querySelector('form');

console.log("hello");

form.addEventListener('submit',(e)=>{
    //e.preventDefault();
    const data = new FormData(form);
    const object = Object.fromEntries(data);

   const json = JSON.stringify(object);
   localStorage.setItem('form',json);

       // Ajoutez ce log pour vérifier que les données sont bien stockées
    console.log('Données stockées dans localStorage :', json);
})