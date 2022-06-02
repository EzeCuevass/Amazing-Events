getdata()
var checkboxselected = []
var busqueda = ""
var datajson = ""
async function getdata(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(data => datajson = data);

var datos = datajson.events
console.log(datos)

function crearcarta(datafunction){
    var templatehtml = ""
    for(var i=0;i<datafunction.length;i++){
        templatehtml+=  `<div class="card m-2 carta" style="width: 16rem;">
        <img src="${datafunction[i].image}" class="card-img-top" alt="Amazing Events" style = "height: 24vh;">
        <div class="card-body">
            <h5 class="card-title">${datafunction[i].name}</h5>
            <p class="card-text">${datafunction[i].description}</p>
            <div class="d-flex flex-row justify-content-around align-content-center">
                <p class="fw-bold">Price: $${datafunction[i].price}</p>
                <a href="details.html?id=${datafunction[i].id}" class="btn btn-danger">Go somewhere</a>
            </div>
        </div>
    </div>`
        
    }
    document.querySelector("#seccion-cartas").innerHTML= templatehtml
}



function crearcheckbox(){
    var contcheck = document.getElementById("contenedor-checkbox")
    var todaslascategorias = datos.map(eventos => eventos.category)
    let dataarray = new Set(todaslascategorias)
    var categorias = [...dataarray]
    console.log(categorias);
    var inputcheckbox=""
    categorias.forEach(categorias => {
        inputcheckbox+=`   <div class="d-flex form-check m-3 align-items-center m-2 checkbox" style="height:100%">
                                        <input class=" align-self-center" type="checkbox" value="${categorias}" id="${categorias}">
                                        <label class="form-check-label" for="${categorias}">
                                            ${categorias}
                                        </label>
                                        </div>`
    });
    contcheck.innerHTML=inputcheckbox
    var id = 1
    datos.map(evento => evento.id = id++)
}
crearcheckbox()

var checkbox = document.querySelectorAll("input[type=checkbox]")
checkbox.forEach(check => check.addEventListener("click", function(event){
    var checked = event.target.checked
    if (checked){
        checkboxselected.push(event.target.value)
        cartaseleccionada();
    } else{
        checkboxselected = checkboxselected.filter(unchecked => unchecked != event.target.value)
        cartaseleccionada();
    }
}
))
var inputsearch = document.querySelector("input[type=search]")
inputsearch.addEventListener("keyup", (event) => {
    busqueda = event.target.value;
    cartaseleccionada();
})

function cartaseleccionada(){
    let filtros = []
    if (checkboxselected.length > 0 && busqueda !== ""){
        checkboxselected.map(categoria => {
            filtros.push(...datos.filter(dato => dato.name.toLowerCase().includes(busqueda.trim().toLowerCase()) && dato.category == categoria))
        })
    }
    else if (checkboxselected.length > 0 && busqueda === ""){
        checkboxselected.map(categoria => filtros.push(...datos.filter(dato => dato.category == categoria)))
    }
    else if (checkboxselected.length == 0 && busqueda !== ""){
        filtros.push(...datos.filter(dato => dato.name.toLowerCase().includes(busqueda.trim().toLowerCase())))
    } else {
        filtros.push(...datos)
        console.log("god")
    }
    crearcarta(filtros)
}
cartaseleccionada()
console.log(checkboxselected);
}