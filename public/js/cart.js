const socket = io.connect();
let cart = []
let user = ''

if (document.getElementById('user')) {
    console.log(document.getElementById('user').innerHTML)
    const userName = document.getElementById('user').innerHTML
    user = userName
    socket.emit("user", user );
}

socket.on("cart", products => {
    loadCartProds(products)
});

async function loadCartProds(cartUser) {
    let htmlProd = ''
    if (cartUser.length === 0) {
        htmlProd = `<h4>No se encontraron productos.</h4>`
    }else{
        const cartOnly = cartUser.find(element => element.cart)
        const cartProducts = cartOnly.cart
        cart = cartProducts
        console.log(cartProducts)
        cartProducts.forEach(prod => {
                return  htmlProd += 
                    `<tr>
                        <td> ${prod.id_articulo}</td>
                        <td> ${prod.title}  </td>
                        <td>  ${prod.price}  </td>
                        <td> <img src=" ${prod.thumbnail}" alt=" ${prod.title} " width="25"/> </td>
                        <td> <button class="btn btn-outline-success" id="addProduct-${prod.id_articulo}">+</button> <button class="btn btn-outline-danger" id="delProduct-${prod.id_articulo}">-</button></td>
                        <td>  ${prod.quantity}  </td>
                    </tr>`
        })
    }

    if(document.getElementById('trCartTable')){
        document.getElementById('trCartTable').innerHTML = htmlProd;
    }

    if(cart) {
        console.log(cart)
        cart.forEach(element => {
            const addProduct = document.getElementById(`addProduct-${element.id_articulo}`)

            addProduct.addEventListener('click', (e) => {
                e.preventDefault
                console.log('add')
                addToCart(element)
                console.log('user', user)
                console.log('cart',cart)
                socket.emit("renderCart", user, cart)
                //POST o emit???
            })
            
            const deleteProduct = document.getElementById(`delProduct-${element.id_articulo}`)

            deleteProduct.addEventListener('click', (e) => {
                e.preventDefault
                console.log('del')
                deleteInCart(element)
                console.log('cart',cart)
                console.log('user',user)
                socket.emit("renderCart", user, cart)
                //POST???
            })
        })
    }
}

//funcion add y del repetida con main.js 
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

if (document.getElementById('buy')) {
    document.getElementById('buy').addEventListener('click', (e) => {
        e.preventDefault
        console.log('buy')
        console.log(cart)
        // fetch('http://localhost:8080/api/productos', {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify(cart)
        // })
    })
}

if (document.getElementById('deleteAll')) {
    document.getElementById('deleteAll').addEventListener('click', (e) => {
        e.preventDefault
        console.log('buy')
        console.log(cart)
        fetch('http://localhost:8080/api/cart', {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
    })
} 

































// let cart = [];

// async function getCart () {
//     fetch('http://localhost:8080/api/v1/cart')
//     .then(response => response.json())
//     .then((data) => {
//         cart.push(...data)
//         for( let i = 1;  i <= cart.length  ; i++) {
//             cart.forEach(element => {
//                 const addProduct = document.getElementById(`addProduct-${i}`)
//                 addProduct.addEventListener('click', (e) => {
//                     console.log('add')
//                     e.preventDefault
//                     const product = addToCart(element)
//                     console.log('cart',cart)
//                     console.log('producto',product)
//                     getCart()
//                 })
                
//                 const deleteProduct = document.getElementById(`delProduct-${i}`)
        
//                 deleteProduct.addEventListener('click', (e) => {
//                     e.preventDefault
//                     const prod = deleteInCart(element)
//                     console.log('cart',cart)
//                     console.log('producto',prod)
//                     getCart()
//                 })
//             })
//         }
//         function addToCart (prod) {
//         let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
//         if (cantidadServicio) {
//             cantidadServicio.quantity++
//             console.log('cantidadServicio',cantidadServicio)
//         } else {
//             prod.quantity = 1
//             console.log('prod.quantity',prod.quantity)
//             cart.push(prod)
//         }
//         fetch('http://localhost:8080/api/v1/cart', {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(cart)
//         })
//         return prod
//         }
//         function deleteInCart (prod) {
//         let cantidadServicio = cart.find(carrito => carrito.id_articulo === prod.id_articulo)
//         let indice = cart.indexOf(cantidadServicio)
//         if (cantidadServicio.quantity == 1){
//             cantidadServicio.quantity--
//             cart.splice(indice, 1)
//         }
//         if (cantidadServicio.quantity > 1) {
//             cantidadServicio.quantity--
//             console.log('cantidadServicio',cantidadServicio.quantity)
//         }
//         fetch('http://localhost:8080/api/v1/cart', {
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json"
//                 },
//                 body: JSON.stringify(cart)
//             })
//         return prod
//         }
//     })
//     // .catch(error => console.error(error))
// }

// getCart()




 //   })



    
// // }

