export function mostrarSpinner(tabla) {
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "block";
    //spinner.visibility="visible";
    tabla.style.display = "none";
  }
  
  export function ocultarSpinner(tabla) {
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "none";
    tabla.style.display = "block";
    tabla.style.display = "table";
  
  }

  export function mostrarSpinnerCard(div, cards) {
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "block";
    cards.style.display = "none";
    div.hidden = true;
  }
  
  export function ocultarSpinnerCard(div, cards) {
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "none";
    cards.style.display = "block";
    div.hidden = false;
  }
    