var datos =  data.eventos
function tenerdatos(){
    var idcarta = 1
    datos.map(evento => evento.id = idcarta++)
    var id = location.search.split("?id=").filter(Number)
    var idseleccionado = Number(id[0])
    var Evento = datos.find((evento) => {
        return evento.id == idseleccionado
    })
    // console.log(evento);
    var templatehtml = `<div class="card d-flex flex-row align-items-center justify-content-center" style="width: 70rem; height: 25rem;">
    <img src="${Evento.image}" class="card-img-top" alt="Maraton" style="height: 80%; width: 50%;">
    <div class="card-body">
        <h5 class="card-title">${Evento.name}</h5>
        <p class="card-text">${Evento.description}</p>
        <p>${Evento.date}</p>
    </div>
</div>`
    document.querySelector("#contenedor-details").innerHTML= templatehtml
}
tenerdatos()