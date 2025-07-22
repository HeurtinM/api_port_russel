document.getElementById('catwayForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // block le formulaire pour ne pas recharger la page

    let catwayID = document.getElementById('catwayID').value;

    await getCatway(catwayID);
});

async function getCatway(catwayID) {
    console.log("click");

    let result = await fetch("http://localhost:3000/catways/" + catwayID);
    let catwayJson = await result.json();
    let catwayDisplay = document.getElementById("catwayDisplay");

    catwayDisplay.innerHTML = ''; //vide le display avant d'afficher un nouveau catway

    let catway = document.createElement('p');
    catway.textContent = JSON.stringify(catwayJson);
    catwayDisplay.appendChild(catway);
}