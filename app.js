import express from 'express';
import ManagerProductos from "./managers/ManagerUsuarios.js";
const manager = new ManagerProductos();

let products = await manager.consultarProductos();

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const result = limit ? products.slice(0, limit) : products;
  res.send(result);
});

app.get('/products/:pid', async (req, res) => {

  const pid = parseInt(req.params.pid);

  const products = await manager.consultarProductos();

  const product = products.find(prod => prod.id === pid);

  if (!product) return res.send('Este producto no existe');

  res.send(product);

});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
