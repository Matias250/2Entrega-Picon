import fs from 'fs/promises';
const path = './src/data/carts.json';

export default class CartManager {
async getAll() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
}

async createCart() {
    const carts = await this.getAll();
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
}

async getCartById(cid) {
    const carts = await this.getAll();
    return carts.find(cart => cart.id === cid);
}

async addProductToCart(cid, pid) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return null;

    const prodInCart = cart.products.find(p => p.product === pid);
    if (prodInCart) {
    prodInCart.quantity++;
    } else {
    cart.products.push({ product: pid, quantity: 1 });
    }

    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
}
}
