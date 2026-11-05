const espacioBlanco = "";

class Heroe {
    constructor(nombre, descripcion, nivel) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.nivel = nivel;
    }

    toString() {
        return "Nombre: " + this.nombre + ". Descripcion: " + this.descripcion + ". Nivel: " + this.nivel;
    }
}

let heroes = [];
heroes.push(new Heroe("Pancaken", "Cuando dice 'Pancake' lanza un pancake", 5));
heroes.push(new Heroe("Batamante", "Es capaz de desplegar su batamanta para defender a todo su equipo de un ataque", 8));
heroes.push(new Heroe("Calvini Destructor", "Su calva explota y hace daño en area", 15));
heroes.push(new Heroe("Paco Fiestas", "Lanza alcohol por los ojos", 10));
heroes.push(new Heroe("Yowi-Yowi", "Su única palabra es Yowi, cuando se enfada lanza chuches por la boca", 14));

function menu() {
    let opcion;
    do {
        opcion = prompt(
            ">>> MENU DE HEROES <<<\n" +
            "1 - Ver heroes\n" +
            "2 - Crear nuevo heroe\n" +
            "3 - Modificar heroe\n" +
            "4 - Buscar heroe\n" +
            "5 - Heroes de nivel superior a...\n" +
            "6 - Salir"
        );
//verifica que la opcion no sea un espacio en blanco o null o un no numero
        if (opcion === null || opcion.trim() === espacioBlanco) {
            opcion = 0; // Si le da para atras  o lo deja en blanco, se vuelve a mostrar el menú.
        } else if (Number.isNaN(Number(opcion))) {
            alert("Debes escribir un número");
            opcion = 0;
        } else {
            opcion = Number(opcion);
            switch (opcion) {
                case 1:
                    verHeroes();
                    break;
                case 2:
                    crearHeroes();
                    break;
                case 3:
                    modificarHeroes();
                    break;
                case 4:
                    buscarHeroe();
                    break;
                case 5:
                    superiorANivel();
                    break;
                case 6:
                    alert("Saliste...");
                    break;
                default:
                    alert("Opción no válida, elige del 1 al 6");
            }
        }
    } while (opcion !== 6);
}

//funcion que muestra todos los heroes 1 por 1
function verHeroes() {
    for (let heroe of heroes) {
        alert(heroe.toString());
    }
}

//funcion que crea un nuevo heroe
function crearHeroes() {
    let nombre = prompt("Dime el nombre de tu superheroe");
    if (nombre === null || nombre.trim() === espacioBlanco) {
        alert("El nombre no puede estar vacío");
        return;
    }

    let descripcion = prompt("Dime la descripcion de tu superheroe " + nombre);
    if (descripcion === null || descripcion.trim() === espacioBlanco) {
        alert("La descripción no puede estar vacía");
        return;
    }

    let textoNivel = prompt("Dime el nivel de tu superheroe " + nombre);
    if (textoNivel === null || textoNivel.trim() === espacioBlanco) {
        alert("El nivel no puede estar vacío");
        return;
    }
    let nivel = Number(textoNivel);
    if (Number.isNaN(nivel)) {
        alert("El nivel debe ser un número");
        return;
    }

    heroes.push(new Heroe(nombre.trim(), descripcion.trim(), nivel));
    alert("Heroe creado:\n" + heroes[heroes.length - 1].toString());
}

//funcion para modificar heroes
function modificarHeroes() {
    let lista = "";
    for (let i = 0; i < heroes.length; i++) {
        lista += (i + 1) + "-" + heroes[i].nombre + "\n";
    }

    let textoIndice = prompt("¿Que heroe quieres modificar?\n" + lista);
    if (textoIndice === null || textoIndice.trim() === espacioBlanco) {
        alert("Debes elegir un número de la lista");
        return;
    }
    const indice = Number(textoIndice) - 1;
    if (Number.isNaN(indice)) {
        alert("Debes escribir un número");
        return;
    }

    const heroe = heroes[indice];
    if (!heroe) {
        alert("Heroe no encontrado!");
        return;
    }

    let nombre = prompt("Nuevo nombre:", heroe.nombre);
    let descripcion = prompt("Nueva descripción:", heroe.descripcion);
    let textoNivel = prompt("Nuevo nivel:", heroe.nivel);

    // Solo se cambia el dato si no está en blanco
    if (nombre !== null && nombre.trim() !== espacioBlanco) {
        heroe.nombre = nombre.trim();
    }
    if (descripcion !== null && descripcion.trim() !== espacioBlanco) {
        heroe.descripcion = descripcion.trim();
    }
    if (textoNivel !== null && textoNivel.trim() !== espacioBlanco) {
        if (Number.isNaN(Number(textoNivel))) {
            alert("El nivel debe ser un número, se mantiene el anterior");
        } else {
            heroe.nivel = Number(textoNivel);
        }
    }

    alert("Heroe modificado:\n" + heroe.toString());
}

//funcion para buscar un heroe por nombre
function buscarHeroe() {
    let nombreBuscado = prompt("Dime el nombre del Heroe a encontrar:");
    if (nombreBuscado === null || nombreBuscado.trim() === espacioBlanco) {
        alert("Debes escribir un nombre");
        return;
    }

    nombreBuscado = nombreBuscado.trim().toLowerCase();

    let heroeEncontrado = false;
    let posicionHeroe = -1;

    for (let i = 0; !heroeEncontrado && (i < heroes.length); i++) {
        heroeEncontrado = (nombreBuscado === heroes[i].nombre.toLowerCase());
        if (heroeEncontrado) {
            posicionHeroe = i;
        }
    }

    if (heroeEncontrado) {
        alert(heroes[posicionHeroe].toString());
    } else {
        alert("El heroe " + nombreBuscado + " no se ha encontrado");
    }
}

//buscar heroes superiores a un nivel establecido por el usuario
function superiorANivel() {
    let textoNivel = prompt("¿Que nivel quieres filtrar?");
    if (textoNivel === null || textoNivel.trim() === espacioBlanco) {
        alert("Debes escribir un nivel");
        return;
    }
    let nivelFiltrado = Number(textoNivel);
    if (Number.isNaN(nivelFiltrado)) {
        alert("El nivel debe ser un número");
        return;
    }

    let nombres = [];
    for (let i = 0; i < heroes.length; i++) {
        if (heroes[i].nivel > nivelFiltrado) {
            nombres.push(heroes[i].nombre);
        }
    }

    alert("Hay " + nombres.length + " heroes con nivel superior a " + nivelFiltrado +
        ", los cuales son: " + nombres.join(", "));
}

menu();