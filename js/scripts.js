import { Heroe } from "./heroe.js";
import {heroes} from "../data/superheroes.js";
import { actualizarTabla } from "./tabla.js";

const armas = ["Armadura" ,"Espada", "Martillo", "Escudo", "Arma de fuego", "Flechas"];


const $seccionTabla = document.getElementById("tabla-heroes");
let crearId = 0;

if (heroes.length) {
  actualizarTabla($seccionTabla, heroes);
  console.log(heroes);
  const ultimoHeroe = heroes[heroes.length - 1];
  const ultimoId = ultimoHeroe.id;
  crearId = ultimoId; //hago el mas 1 mas adelante
}

const $formAlta = document.forms[0];
const $seccionAltaHeroe = document.getElementById("alta-Heroe");
const $btnGuardar = document.getElementById("btnGuardar");

const $btnGuardarUpdate = document.getElementById("btnGuardarUpdate");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

//Cargo armas
const selectArma = document.getElementById("select-arma");
armas.forEach(arma => {
    const option = document.createElement("option");
    option.value = arma;
    option.textContent = arma;
    selectArma.appendChild(option);
    if (arma === "Armadura") {
      option.selected = true;
    }
  
  });
  

//NEW Heroe
function crearHeroe(esAlta) {
    const nombreInput = document.querySelector('input[name="txtNombre"]');
    const aliasInput = document.querySelector('input[name="txtAlias"]');
    const editorialInput = document.querySelector(
      'input[name="rdoEditorial"]:checked'
    );
    const armaduraInput = document.querySelector('select[name="selectArma"]');
    const fuerzaInput = document.querySelector('input[name="rngFuerza"]');
  
    const nombre = nombreInput ? nombreInput.value : "";
    const alias = aliasInput ? aliasInput.value : "";
    const editorial = editorialInput ? editorialInput.value : "";
    const armadura = armaduraInput ? armaduraInput.value : "";
    const fuerza = fuerzaInput ? fuerzaInput.value : "";
  
    if (esAlta) {
      crearId++;
    }
  
    const nuevoHeroe = new Heroe(crearId, nombre, alias, editorial, fuerza, armadura);
    heroes.push(nuevoHeroe);
    return nuevoHeroe;
    }
  

//ALTA Heroe
$formAlta.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoHeroe = crearHeroe(true);
  handlerCreate(nuevoHeroe);
});

function handlerCreate(nuevoHeroe) {
  //heroes.push(nuevoHeroe);
  localStorage.setItem("heroes", JSON.stringify(heroes));
  actualizarTabla($seccionTabla, heroes);
}

//UPDATE Heroe
$btnGuardarUpdate.addEventListener("click", () => {
    const heroeModificado = crearHeroe(false);
    handlerUpdate(heroeModificado);
  });

function handlerUpdate(HeroeModificado) {
    const idInput = document.querySelector('input[name="txtId"]');
    const id = parseInt(idInput.value);
  
    const heroeIndex = heroes.findIndex((heroe) => heroe.id === id);
  
    if (heroeIndex !== -1) {
      heroes[heroeIndex] = heroeModificado;
      localStorage.setItem("heroes", JSON.stringify(heroes));
      actualizarTabla($seccionTabla, heroes);
      limpiarFormulario();
    }
  }

//DELETE Heroe
$btnEliminar.addEventListener("click", () => {
  if (confirm("¿Esta seguro de que desea eliminar este Heroe?")) {
    const idInput = document.querySelector('input[name="txtId"]');
    handlerDelete(idInput);
  } else {
    limpiarFormulario();
  }
});

function handlerDelete(id) {
    id = parseInt(id.value);
  const heroeIndex = heroes.findIndex((heroe) => heroe.id === id);

  if (heroeIndex !== -1) {
    heroes.splice(heroeIndex, 1);
    localStorage.setItem("heroes", JSON.stringify(heroes));
    actualizarTabla($seccionTabla, heroes);
    limpiarFormulario();
  }

}

//CANCELAR
$btnCancelar.addEventListener("click", () => {
  limpiarFormulario();
});

//CARGAR DATOS DE Heroe EN LA TALBA DE ALTA
$seccionTabla.addEventListener("click", (e) => {
  const fila = e.target.closest("tr"); // obtengo la fila más cercana al elemento clickeado
  if (fila) {
    const id = fila.dataset.id; // obtener el valor del atributo data-id
    cargarDatosEnFormulario(id);
    console.log(id);
    habilitarBotones();
  }
});

function cargarDatosEnFormulario(id) {
    const heroe = heroes.find((heroe) => parseInt(heroe.id) === parseInt(id));
    console.log(heroe);
    if (heroe) {
      const idInput = document.querySelector('input[name="txtId"]');
      const nombreInput = document.querySelector('input[name="txtNombre"]');
      const aliasInput = document.querySelector('input[name="txtAlias"]');
      const editorialInputs = document.querySelectorAll('input[name="rdoEditorial"]');
      const fuerzaInput = document.querySelector('input[name="rngFuerza"]');
      const armaduraInput = document.querySelector('select[name="selectArma"]');
  
      idInput.value = heroe.id;
      nombreInput.value = heroe.nombre;
      aliasInput.value = heroe.alias; 
      editorialInputs.forEach((input) => {
        if (input.value === heroe.editorial) {
          input.checked = true;
        }
      });
  
      fuerzaInput.value = heroe.fuerza;
      armaduraInput.value = heroe.arma;
  
      bloquearBotonGuardarAlta();
    }
  }  
//HABILITAR Y DESHABILITAR BOTONES

function bloquearBotonGuardarAlta() {
  $btnGuardar.style.display="none";
}

function habilitarBotonGuardarAlta() {
  $btnGuardar.style.cursor = "pointer";
  $btnGuardar.style.display="inline-block";
}

function bloquearBotones() {
    $btnGuardarUpdate.style.display = "none";
    $btnEliminar.style.display = "none";
    $btnCancelar.style.display = "none";
  }

function habilitarBotones() {
$btnGuardarUpdate.style.display = "inline-block";
$btnEliminar.style.display = "inline-block";
$btnCancelar.style.display = "inline-block";

  $btnGuardarUpdate.style.cursor = "pointer";

  $btnEliminar.style.cursor = "pointer";

  $btnCancelar.style.cursor = "pointer";
}

//LIMPIAR FORM
function limpiarFormulario() {
  const formulario = document.getElementById("formAlta");
  formulario.reset();
  habilitarBotonGuardarAlta();
  bloquearBotones();
}




  
