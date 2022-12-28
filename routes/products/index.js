import {Router} from 'express'
const routerProducts = new Router()

routerProducts.get('/productos-test', async (req, res, next) =>{
    const productos = req.productos
    res.render('pages/index',{productos})
})

export default routerProducts

//CRUD
// app.get('/', async (req, res, next) =>{
//     const productos = await ProductoController.getAll()
//     res.render('pages/index',{productos})
// })

// app.get('/:id', async (req,res,next) => {
//     const { id } = req.params
//     const productos = await ProductoController.getById(id)
//     res.render('pages/index',{productos})
// })

// app.post('/', async (req, res, next) => {
//     const { title, price, thumbnail } = req.body
//     const newArticulo = {
//         title: title,
//         price: price,
//         thumbnail: thumbnail
//     }
//     const newProducto = await ProductoController.save(newArticulo)
//     const productos = await ProductoController.getAll()
//     res.render('pages/index', {productos})
// })

// app.put('/:id',async (req, res, next) => {
//     const { title, price, thumbnail } = req.body
//     const { id } = req.params;
//     const upDateProducto = await ProductoController.update(title, price, thumbnail,id)
//     const productos = await ProductoController.getAll()
//     res.render('pages/index', {productos})
// })

// app.delete('/:id', async (req, res, next) => {
//     const { id } = req.params;
//     const deleteProducto = await ProductoController.deleteById(id)
//     console.log(deleteProducto)
//     const productos = await ProductoController.getAll()
//     res.render('pages/index', {productos})
// })