import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager();

// Vista estática (lista normal de productos)
router.get('/', async (req, res) => {
const products = await manager.getAll();
res.render('home', { products });
});

// Vista dinámica con websockets
router.get('/realtimeproducts', (req, res) => {
res.render('realTimeProducts');
});

export default router;
