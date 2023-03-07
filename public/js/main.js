const socket = io.connect();
let cart = [];
let quantityCart = '';
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

    //sumar y restar en index
    if(listProd) {
        listProd.forEach(element => {
            const addProduct = document.getElementById(`addProduct-${element.id_articulo}`)

            addProduct.addEventListener('click', (e) => {
                e.preventDefault
                const product = addToCart(element)
                console.log('cart',cart)
                console.log('producto',product)
                if (product.quantity > 0) {
                    document.getElementById(`product-${element.id_articulo}`).setAttribute("style","background-color:aquamarine")
                }
                totalQuantityItems(cart)
            })
            
            const deleteProduct = document.getElementById(`delProduct-${element.id_articulo}`)

            deleteProduct.addEventListener('click', (e) => {
                e.preventDefault
                const prod = deleteInCart(element)
                console.log('cart',cart)
                console.log('producto',prod)
                if (prod.quantity == 0) {
                    document.getElementById(`product-${element.id_articulo}`).removeAttribute("style")
                }
                totalQuantityItems(cart)
            })
        })
    }
};

if (document.getElementById('preBuy')) {
    document.getElementById('preBuy').addEventListener('click', (e) => {
        e.preventDefault
        console.log('preBuy')
        console.log(cart)
        fetch('http://localhost:8080/api/v1/cart', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cart)
        })
        window.location = 'http://localhost:8080/api/cart';
    })
}




function addToCart (prod) {
    let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
    if (cantidadServicio) {
        cantidadServicio.quantity++
        console.log('cantidadServicio',cantidadServicio)
    } else {
        prod.quantity = 1
        console.log('prod.quantity',prod.quantity)
        cart.push(prod)
    }
    return prod
}

function deleteInCart (prod) {
    let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
    let indice = cart.indexOf(cantidadServicio)
    if (cantidadServicio.quantity == 1){
        cantidadServicio.quantity--
        cart.splice(indice, 1)
    }
    if (cantidadServicio.quantity > 1) {
        cantidadServicio.quantity--
        console.log('cantidadServicio',cantidadServicio.quantity)
    }
    return prod
}

function totalQuantityItems (cart) {
    if(cart.length !== 0) {
        document.getElementById('quantity').innerHTML =  `Items Seleccionados: ${cart.length}`;
    }else {
        document.getElementById('quantity').innerHTML = ''
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
            <strong style="color:blue">${elem.author.email}</strong>:
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

//RECUPERA LOS DATOS
let carritoEnLS = JSON.parse(localStorage.getItem("cart"))
if (localStorage.getItem(`cart`)) {
   cart = carritoEnLS
}

