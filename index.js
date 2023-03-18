import ManagerProductos from "./managers/ManagerUsuarios.js";

const manager = new ManagerProductos();
const env = async() =>{
    let product = {
        title: 'pantalon',
        description: 'Una remera blanca, talle xl',
        thumbnail: 'sin foto',
        price: 2500,
        code: 'aaa00001',
        stock: 150
    }
    let result = await manager.crearProdcuto(product);
    // console.log(result); 

    let array = await manager.consultarProductos();
    await manager.eliminarProductById(array, 5)

    await manager.modifyById('stock', 600, 0)
    
    console.log(array);
    let ProductoById = await manager.getProductById(2);
    console.log(ProductoById);
}
env();