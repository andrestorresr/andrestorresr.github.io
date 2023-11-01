const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
  containerCartProducts.classList.toggle('hidden-cart');
});

/* =================== */

const CartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productList = document.querySelector('.container-items');

// Variable de arreglos de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
      const product = e.target.parentElement;

      const infoProduct = {
        quantity: 1,
        title: product.querySelector('h2').textContent,
        price: product.querySelector('p').textContent,
      };

   // Comprobar si el producto ya existe en el carrito
   const exits = allProducts.some((product) => product.title === infoProduct.title);

   if (exits) {
     // Incrementar la cantidad del producto si ya existe en el carrito
     const products = allProducts.map((product) => {
       if (product.title === infoProduct.title) {
         product.quantity++;
         return product;
       } else {
         return product;
       }
     });

     allProducts = [...products];
   } else {
     // Agregar el producto al carrito si no existe
     allProducts = [...allProducts, infoProduct];
   }

   showHTML();
 }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
      const product = e.target.parentElement;
      const title = product.querySelector('p').textContent;
  
      // Filtrar el producto que se debe eliminar del arreglo de productos
      allProducts = allProducts.filter((product) => product.title !== title);
  
      // Llamar a la función para mostrar los productos después de la eliminación
      showHTML();
    }
  });

//Funcion para mostrar HTML
const showHTML = () => {
    // Limpiar HTML
    rowProduct.innerHTML = '';

    // Comprobar si el carrito está vacío
    if(!allProducts.length){
        containerCartProducts.innerHTML = `
        <p class="cart-empty">El carrito de compra está vacío</p>
        `;
        valorTotal.innerText = `$0`; // Si no hay productos, el total es $0
        return;
    } else {
        // Mostrar los productos
        let total = 0;
        let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                            
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;

        rowProduct.append(containerProduct);

        total += parseFloat(product.price.slice(1).replace(',', '')) * product.quantity;
        totalOfProducts += product.quantity;
    });

    // Formatear el valor total a formato monetario
    valorTotal.innerText = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
    countProducts.innerText = totalOfProducts;
}

};