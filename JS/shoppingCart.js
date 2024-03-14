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
    console.log("I've been pressed");
}

shoppingCartButton.addEventListener("click", openCart);

function updateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < arrayOfElements.length; i++) {
        const item = arrayOfElements[i];
        const totalUnitaryPrice = parseFloat(item.querySelector(".totalUnitaryPrice").innerText);
        totalPrice += totalUnitaryPrice;
    }
    totalPriceSpan.innerText = totalPrice + "€";
}


for (let i = 0; i < arrayOfElements.length; i++) {
    const item = arrayOfElements[i];
    const unitaryPrice = parseFloat(item.querySelector(".unitaryPrice").innerText);
    const quantityInput = item.querySelector(".numberOfItems");

    quantityInput.addEventListener("input", function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity < 0) {
            console.log(item)
            item.remove();
            quantity = 0;
            
        }
        quantityInput.value = quantity;
        const totalUnitaryPrice = unitaryPrice * quantity;
        item.querySelector(".totalUnitaryPrice").innerText = totalUnitaryPrice + "€";
        updateTotalPrice();
    });
}

const quantityInputs = document.querySelectorAll('.numberOfItems');

quantityInputs.forEach(input => {
    input.addEventListener('wheel', function (event) {
        event.preventDefault();
    });
});

for (let i = 0; i < botonCarrito.length; i++) {
    botonCarrito[i].addEventListener("click", añadirAcarrito);
}

function añadirAcarrito(event) {
    // Obtener el producto
    const product = event.target.closest('.product');
    const productName = product.querySelector('h2').innerText;
    const productPrice = parseFloat(product.querySelector('p').innerText.slice(1)); // Extraer el precio sin el símbolo de $

    // Verificar si el producto ya existe en el carrito
    let itemExists = false;
    for (let i = 0; i < arrayOfElements.length; i++) {
        const item = arrayOfElements[i];
        
        if (item.querySelector('.itemName').innerText === productName) {
            
            itemExists = true;
            const quantityInput = item.querySelector('.numberOfItems');
            let quantity = parseInt(quantityInput.value) + 1;
            quantityInput.value = quantity;
            const totalUnitaryPrice = productPrice * quantity;
            item.querySelector('.totalUnitaryPrice').innerText = totalUnitaryPrice + "€";
            break;
        }
    }

    // Si el producto no existe en el carrito, crear un nuevo elemento
    if (!itemExists) {
        const newItem = document.createElement('div');
        newItem.classList.add('shopping-cart-item');

        newItem.innerHTML = `
            <span class="itemName">${productName}</span>
            <span class="unitaryPrice">${productPrice}€</span>
            <input class="numberOfItems" type="number">
            <span class="totalUnitaryPrice">${productPrice}€</span>
        `;

        document.getElementById('shopping-cart-content').appendChild(newItem);
    }

    // Actualizar el precio total del carrito
    updateTotalPrice();
}