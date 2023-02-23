const socket = io.connect();
let cart = []
//productos

socket.on("productos", listaProductos => {
    loadProds(listaProductos)
});

async function loadProds(listProd) {
    let htmlProd = ''
    const tableList = await fetch('../views/partials/table.ejs').then(res => res.text())
    if (listProd.length === 0) {
        htmlProd = `<h4>No se encontraron productos.</h4>`
    }else{
        htmlProd = ejs.render(tableList, {listProd})
    }   

    if(document.getElementById('tabla')){
        document.getElementById('tabla').innerHTML = htmlProd;
    }

    if(listProd){
        listProd.forEach(element => {
            document.getElementById(`addProduct-${element.id_articulo}`).addEventListener('click', (e) => {
                e.preventDefault
                console.log(`addProduct-${element.id_articulo}`)
                addToCart(element)
                console.log(cart)
            })
        })
    }
};

if (document.getElementById('preBuy')) {
    document.getElementById('preBuy').addEventListener('click', (e) => {
        e.preventDefault
        console.log('preBuy')
        console.log(cart)
        fetch('http://localhost:8080/api/productos', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cart)
        })
    })
}


function addToCart (prod) {
    let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
    if (cantidadServicio) {
        cantidadServicio.quantity++
        console.log(cantidadServicio)
        console.log(cart)
    }else{
        prod.quantity = 1
        cart.push(prod)
        console.log(cart)
    }
}

document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault
    const nuevoProducto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }

socket.emit("guardarNuevoProducto",nuevoProducto)
})

socket.on('messages', function(data) { render(data); });

function render(data) {
    const html = data.chatDenormalized.mensajes.map((elem) => {
        return(`<div>
            <strong style="color:blue">${elem.author.id}</strong>:
            <p>${elem.date}<p>
            <i style="color:green">${elem.text}</i> </div>
            `)
    }).join(" ");
    const porcentajeCompresion = `<h4 style="color:blue" >Centro de Mensajes(compresion %${data.compr}) </h4>`
    document.getElementById('messages').innerHTML = html;
    document.getElementById('compresion').innerHTML = porcentajeCompresion
}

document.getElementById('formChat').addEventListener('submit', (e) => {
    e.preventDefault()
    agregarMensaje()
})

function agregarMensaje() {
    const nuevoMensaje = {
        author:{
            email: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('textoMensaje').value,
    }
    socket.emit("messegesNew",nuevoMensaje)
}



