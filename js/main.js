const Auto = function (marca, modelo, anio, estado) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.estado = estado;
}

let autoUno = new Auto ("Peugeot", "208", 2015, "Usado");
let autoDos = new Auto ("Honda", "Fit", 2010, "Usado");
let autoTres = new Auto ("Ford", "Fiesta", 2003, "Usado");
let autoCuatro = new Auto ("Citroen", "C3", 2017, "Usado");
let autoCinco = new Auto ("Ford", "Fiesta", 1995, "Usado");
let autoSeis = new Auto ("Volkswagen", "Polo", 2023, "Nuevo");

let listaAutos = [autoUno, autoDos, autoTres, autoCuatro, autoCinco];

if (localStorage.getItem("listaAutos")) {
    listaAutos = JSON.parse(localStorage.getItem("listaAutos"));

    mostrarAutosEnTabla();
}

function mostrarAutosEnTabla() {
    const tablaAutos = document.getElementById("tabla-autos");

    tablaAutos.innerHTML = "";

    listaAutos.forEach(function(auto) {
        const fila = tablaAutos.insertRow();
        fila.innerHTML = `
            <td>${auto.marca.toUpperCase()}</td>
            <td>${auto.modelo.toUpperCase()}</td>
            <td>${auto.anio}</td>
            <td>${auto.estado.toUpperCase()}</td>`;
    });
}

mostrarAutosEnTabla();

const filtroMarca = document.getElementById("filtro-marca");

filtroMarca.addEventListener("input", function() {
    const filtro = filtroMarca.value.toLowerCase();
    const tablaAutos = document.getElementById("tabla-autos");
    tablaAutos.innerHTML = "";

    listaAutos.forEach(function(auto) {
        if (auto.marca.toLowerCase().includes(filtro)) {
            const fila = tablaAutos.insertRow();
            fila.innerHTML = `
                <td>${auto.marca.toUpperCase()}</td>
                <td>${auto.modelo.toUpperCase()}</td>
                <td>${auto.anio}</td>
                <td>${auto.estado.toUpperCase()}</td>`;
        }
    });
});

const agregarAutoButton = document.getElementById("agregar-auto");

agregarAutoButton.addEventListener("click", function(event) {
    event.preventDefault();

    const marcaInput = document.getElementById("marca-input").value;
    const modeloInput = document.getElementById("modelo-input").value;
    const anioInput = document.getElementById("anio-input").value;
    const estadoInput = document.getElementById("estado-input").value;


    if (!marcaInput.match(/^[A-Za-z]+$/)) {
        Swal.fire(
            '¡Error en Marca!',
            'Recordá que el campo no puede estar vacio y solo se admiten letras...',
            'error',
          );
        return;
    }

    if (!modeloInput.match(/^[A-Za-z0-9]+$/)) {
        Swal.fire(
            '¡Error en Modelo!',
            'Recordá que el campo no puede estar vacio y solo se admiten letras / números...',
            'error',
          );
        return;
    }

    if (!anioInput.match(/^\d+$/)) {
        Swal.fire(
            '¡Error en Año!',
            'Recordá que el campo no puede estar vacio y solo se admiten números...',
            'error',
          );
        return;
    }

    if (!estadoInput.match(/^[A-Za-z]+$/)) {
        Swal.fire(
            '¡Error en Estado!',
            'Recordá que el campo no puede estar vacio y solo se admiten letras...',
            'error',
          );
        return;
    }

    const nuevoAuto = new Auto(marcaInput, modeloInput, anioInput, estadoInput);
    listaAutos.push(nuevoAuto);

    localStorage.setItem("listaAutos", JSON.stringify(listaAutos));

    document.getElementById("marca-input").value = "";
    document.getElementById("modelo-input").value = "";
    document.getElementById("anio-input").value = "";
    document.getElementById("estado-input").value = "";

    mostrarAutosEnTabla();
});