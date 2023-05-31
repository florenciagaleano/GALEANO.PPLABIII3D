import {heroes} from "../data/superheroes.js";
import { mostrarSpinnerCard } from "./spinner.js";
import { ocultarSpinnerCard } from "./spinner.js";


const cards = document.getElementById("cards");

heroes.forEach(heroe => {
  const div = document.createElement("div");
  for (const key in heroe) {
    if (key != "id") {
      const ul = document.createElement("ul");
      ul.textContent = key + ": " +heroe[key];
      ul.classList.add("ul-card");
      div.appendChild(ul);
    }
    div.classList.add("card-div");
    cards.appendChild(div);
    
}

mostrarSpinnerCard(div, cards);

setTimeout(() => {
  ocultarSpinnerCard(div, cards);
}, 2000);


  });