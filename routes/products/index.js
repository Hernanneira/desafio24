import {Router} from 'express'
const routerProducts = new Router()
import productosController from '../../controllers/ContenedorProductos.js'

// export let productosVariable

routerProducts.get('/api/productos-test', async (req, res, next) =>{
    const productos = await productosController.getAll()
    // productosVariable productos
    // console.log("get")
    res.render('pages/index',{productos})
})

routerProducts.get('/api/productos-test/:id', async (req,res,next) => {
    const { id } = req.params
    const productos = await productosController.getById(Number(id))
    productos = productosVariable
    res.render('pages/index',{productos})
})

routerProducts.post('/productos-test', async (req, res, next) => {
    const { title, price, thumbnail } = req.body
    const newArticulo = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    const newProducto = await productosController.save(newArticulo)
    const productos = await productosController.getAll()
    res.render('pages/index', {productos})
})

routerProducts.put('/productos-test/:id',async (req, res, next) => {
    const { title, price, thumbnail } = req.body
    const { id } = req.params;
    const upDateProducto = await productosController.update(title, price, thumbnail,id)
    const productos = await productosController.getAll()
    res.render('pages/index', {productos})
})

routerProducts.delete('/productos-test/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await productosController.deleteById(id)
    console.log(deleteProducto)
    const productos = await productosController.getAll()
    res.render('pages/index', {productos})
})

export default routerProducts