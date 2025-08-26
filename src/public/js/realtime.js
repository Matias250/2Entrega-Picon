const socket = io();


const productList = document.getElementById('productList');
socket.on('updateProducts', products => {
productList.innerHTML = "";
products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `${p.title} - $${p.price} 
    <button onclick="deleteProduct('${p.id}')">Eliminar</button>`;
    productList.appendChild(li);
});
});

const form = document.getElementById('productForm');
form.addEventListener('submit', e => {
e.preventDefault();
const formData = new FormData(form);
const product = Object.fromEntries(formData);
product.status = true;
product.thumbnails = [];
socket.emit('addProduct', product);
form.reset();
});

function deleteProduct(id) {
socket.emit('deleteProduct', id);
}
