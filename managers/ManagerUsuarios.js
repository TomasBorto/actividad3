import fs from 'fs';

const path = './files/Productos.json'
export default class ManagerProductos {
    
    consultarProductos = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            // console.log(data);
            const products = JSON.parse(data);
            return products;
        }
        else{
            return [] //No hay productos porque no hay archivo, pero eso no nos limita a enviar un arreglo vacío.
        }
    }
    crearProdcuto = async (producto) => {
        const products =  await this.consultarProductos();
        if(products.length===0){
            producto.id=0;
        }else{
            producto.id = products[products.length-1].id+1;
        }
        products.push(producto);
        await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
        return producto;
    }
    getProductById= async (id) => {

        const products =  await this.consultarProductos();

        let productId = products.find(prod => prod.id === id)

        if (!productId) {

            return 'Not found'

        }

        return productId;
    }
    modifyById= async (name, cambio, id) => {

        const products =  await this.consultarProductos();

        const objWithIdIndex = products.findIndex((obj) => obj.id === id);

        if (objWithIdIndex > -1) {
            if(name === "title"){
                products[objWithIdIndex].title = cambio;
            }else if(name === "description"){
                products[objWithIdIndex].description = cambio;
            }else if(name === "price"){
                products[objWithIdIndex].price = cambio;
            }else if(name === "thumbnail"){
                products[objWithIdIndex].thumbnail = cambio;
            }else if(name === "code"){
                products[objWithIdIndex].code = cambio;
            }else if(name === "stock"){
                products[objWithIdIndex].stock = cambio;
            }else{
                console.log("no existe el nombre dentro de los objetos")
            }
            
        }

        fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
    }
    eliminarProductById = async (products, id) => {

        // const products =  await this.consultarProductos();

        const objWithIdIndex = products.findIndex((obj) => obj.id === id);

        if (objWithIdIndex > -1) {
          products.splice(objWithIdIndex, 1);
        }

        fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));    
        
    }
}