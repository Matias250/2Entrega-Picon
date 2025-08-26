import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
console.log(`Servidor escuchando en puerto ${PORT}`);
});

const io = new Server(httpServer);
const productManager = new ProductManager();

io.on('connection', async socket => {
console.log('Nuevo cliente conectado');


const products = await productManager.getAll();
socket.emit('updateProducts', products);

socket.on('addProduct', async product => {
    await productManager.addProduct(product);
    const updated = await productManager.getAll();
    io.emit('updateProducts', updated);
});

socket.on('deleteProduct', async pid => {
    await productManager.deleteProduct(pid);
    const updated = await productManager.getAll();
    io.emit('updateProducts', updated);
});
});
