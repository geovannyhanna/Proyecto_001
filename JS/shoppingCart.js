const shoppingCartButton = document.getElementById("cart-btn");
const shoppingCartItem = document.getElementById("shopping-cart");
const totalPriceSpan = document.getElementById("totalPrice");
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
