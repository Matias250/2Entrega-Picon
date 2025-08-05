import fs from 'fs/promises';
const path = './src/data/products.json';

export default class ProductManager {
async getAll() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
}

async getById(id) {
    const products = await this.getAll();
    return products.find(prod => prod.id === id);
}

async addProduct(product) {
    const products = await this.getAll();
    const id = Date.now().toString();
    const newProduct = { id, ...product };
    products.push(newProduct);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
}

async updateProduct(id, updatedFields) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedFields, id: products[index].id };
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
}

async deleteProduct(id) {
    let products = await this.getAll();
    const prevLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length === prevLength) return false;

    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return true;
}
}
