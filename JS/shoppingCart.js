const shoppingCartButton = document.getElementById("cart-btn");
const shoppingCartItem = document.getElementById("shopping-cart");
const totalPriceSpan = document.getElementById("totalPrice");
const botonCarrito = document.getElementsByClassName("shopping-cart-button");
let cartVisible = false;
const arrayOfElements = document.getElementsByClassName("shopping-cart-item");

function openCart() {
    if (cartVisible) {
        shoppingCartItem.style.display = "none";
        cartVisible = false;
    } else {
        shoppingCartItem.style.display = "block";
        cartVisible = true;
    }
}

shoppingCartButton.addEventListener("click", openCart);

function updateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < arrayOfElements.length; i++) {
        const item = arrayOfElements[i];
        const totalUnitaryPrice = parseFloat(item.querySelector(".totalUnitaryPrice").innerText);
        totalPrice += totalUnitaryPrice;
    }
    totalPriceSpan.innerText = `${totalPrice}€`;
}

function updateItemTotal(item) {
    const unitaryPrice = parseFloat(item.querySelector(".unitaryPrice").innerText);
    const quantityInput = item.querySelector(".numberOfItems");
    let quantity = parseInt(quantityInput.value);

    if (quantity < 0) {
        item.remove();
        updateTotalPrice();
        return;
    }

    const totalUnitaryPrice = unitaryPrice * quantity;
    item.querySelector(".totalUnitaryPrice").innerText = `${totalUnitaryPrice}€`;
    updateTotalPrice();
}

// Aplicar la función de actualización a todos los elementos existentes.
for (let i = 0; i < arrayOfElements.length; i++) {
    const item = arrayOfElements[i];
    const quantityInput = item.querySelector(".numberOfItems");

    quantityInput.addEventListener("input", function () {
        updateItemTotal(item);
    });
}

const quantityInputs = document.querySelectorAll('.numberOfItems');

quantityInputs.forEach(input => {
    input.addEventListener('wheel', function (event) {
        event.preventDefault();
    });
});

// Función para añadir productos al carrito.
function añadirAcarrito(event) {
    const product = event.target.closest('.product');
    const productName = product.querySelector('h2').innerText;
    const productPrice = parseFloat(product.querySelector('p').innerText.slice(1));
    let itemExists = false;

    for (let i = 0; i < arrayOfElements.length; i++) {
        const item = arrayOfElements[i];
        if (item.querySelector('.itemName').innerText === productName) {
            itemExists = true;
            const quantityInput = item.querySelector('.numberOfItems');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateItemTotal(item);
            break;
        }
    }

    if (!itemExists) {
        const newItem = document.createElement('div');
        newItem.classList.add('shopping-cart-item');
        newItem.innerHTML = `
            <span class="itemName">${productName}</span>
            <span class="unitaryPrice">${productPrice}€</span>
            <input class="numberOfItems" type="number" value="1">
            <span class="totalUnitaryPrice">${productPrice}€</span>
        `;

        document.getElementById('shopping-cart-content').appendChild(newItem);
        const newQuantityInput = newItem.querySelector(".numberOfItems");
        newQuantityInput.addEventListener("input", function () {
            updateItemTotal(newItem);
        });

        updateTotalPrice();
    }
}

// Event listener para añadir productos al carrito.
for (let i = 0; i < botonCarrito.length; i++) {
    botonCarrito[i].addEventListener("click", añadirAcarrito);
}
