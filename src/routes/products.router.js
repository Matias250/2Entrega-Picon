import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
res.json(await manager.getAll());
});

router.get('/:pid', async (req, res) => {
const product = await manager.getById(req.params.pid);
product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
const { title, description, code, price, status, stock, category, thumbnails } = req.body;
const newProduct = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
const updated = await manager.updateProduct(req.params.pid, req.body);
updated ? res.json(updated) : res.status(404).send('Producto no encontrado');
});

router.delete('/:pid', async (req, res) => {
const deleted = await manager.deleteProduct(req.params.pid);
deleted ? res.send('Producto eliminado') : res.status(404).send('Producto no encontrado');
});

export default router;
