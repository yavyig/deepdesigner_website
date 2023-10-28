const cartButton = document.getElementById("cart-button");
const cartDiv = document.getElementById("cart-div");
const cartDivBackground = document.getElementById("cart-div-background");
const cartCloseButton = document.getElementById("cart-closeButton");
const addCartButtons = document.querySelectorAll("#addCartButton");
const cartButtonLengthSpan = document.getElementById("cart-button-length-span");
const specialDiv = document.getElementById("specialDiv")
const cartMealQuantityFields = document.querySelectorAll(".cart-meal-quantity");
// const cartMealQuantityFields = document.querySelectorAll(".cart-meal-quantity")

let itemId, itemPhotoLink, itemTitle, itemTurkishTitle, itemPrice;

cartDivBackground.addEventListener("click", function (event) {
    console.log("Background div clicked");
    let newLength = 0;
    cartMealQuantityFields.forEach(function (cartMealQuantityField) {
        const quantity = cartMealQuantityField.value;
        console.log(quantity);
        newLength += parseInt(quantity);
    });
    cartButtonLengthSpan.textContent = newLength.toString();
    cartButton.value = newLength.toString();
    // location.reload();
});

cartCloseButton.addEventListener("click", function (event) {
    console.log("Close button clicked");
    let newLength = 0;
    cartMealQuantityFields.forEach(function (cartMealQuantityField) {
        const quantity = cartMealQuantityField.value;
        console.log(quantity);
        newLength += parseInt(quantity);
    });
    cartButtonLengthSpan.textContent = newLength.toString();
    cartButton.value = newLength.toString();
    // location.reload();
});

cartButton.addEventListener("click", function () {
    cartDiv.style.opacity = 1;
    cartDiv.style.zIndex = 1000;

    cartDivBackground.style.opacity = 1;
    cartDivBackground.style.zIndex = 999;
}); //catButton event Listener

cartCloseButton.addEventListener("click", function () {
    cartDiv.style.opacity = 0;
    cartDiv.style.zIndex = -1;

    cartDivBackground.style.opacity = 0;
    cartDivBackground.style.zIndex = -2;
});

document.addEventListener("click", function (event) {
    if (!cartDiv.contains(event.target) && !cartButton.contains(event.target)) {
        cartDiv.style.opacity = "0%";
        cartDiv.style.zIndex = "-1";

        cartDivBackground.style.opacity = 0;
        cartDivBackground.style.zIndex = -2;
    }
});

addCartButtons.forEach(function (addCartButton) {
    addCartButton.addEventListener("click", function () {
        // your code here
         itemId = addCartButton.value; // replace with the actual item ID
         itemPhotoLink = addCartButton.getAttribute('data-photoLink');
         itemTitle = addCartButton.getAttribute('data-title');
         itemTurkishTitle = addCartButton.getAttribute('data-turkishTitle');
         itemPrice = addCartButton.getAttribute('data-price');

        //header length number indicator

        const lengthAlready = parseInt(cartButton.value);
        let newLength = lengthAlready + 1;
        cartButtonLengthSpan.textContent = newLength;
        cartButton.value = newLength.toString();

        //.............

        // Check if the div already exists
        const existingDiv = document.getElementById(`div-${itemId}`);
        if (existingDiv) {
        // If the div already exists, update the quantity input value
            const quantityInput = existingDiv.querySelector('.quantity-input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
        // Create a new div element
        const newDiv = document.createElement('div');
        newDiv.className = 'd-flex flex-row bd-highlight mb-1 align-items-center';
        newDiv.id = `div-${itemId}`;

        // Create the quantity input element and append it to the new div
        const inputDiv = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'form-control quantity-input cart-meal-quantity';
        input.value = 1;
        input.setAttribute('value', '1');
        input.min = 0;
        input.size = 2;
        input.style.width = '65px';
        input.dataset.id = itemId;
        inputDiv.appendChild(input);
        newDiv.appendChild(inputDiv);

        // Create the image element and append it to the new div
        const imgDiv = document.createElement('div');
        imgDiv.className = 'p-2 bd-highlight';

        const img = document.createElement('img');
        img.src = itemPhotoLink;
        img.alt = 'Image of ' + itemTitle;
        img.style.width = '50px';
        img.style.height = '50px';
        imgDiv.appendChild(img);
        newDiv.appendChild(imgDiv);

        // Create the title element and append it to the new div
        const titleDiv = document.createElement('div');
        titleDiv.className = 'p-2 bd-highlight';
        titleDiv.textContent = itemTitle;
        newDiv.appendChild(titleDiv);

        // Create the price element and append it to the new div
        const priceDiv = document.createElement('div');
        priceDiv.className = 'p-2 bd-highlight';
        priceDiv.textContent = '$' + itemPrice;
        newDiv.appendChild(priceDiv);

        // Append the new div to the existing element with ID "specialDiv"
        specialDiv.appendChild(newDiv);

                input.addEventListener("change", function () {
                    // your code here
                    console.log("qty changed");
                    const itemId = this.getAttribute('data-id');
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `/menu/cart/update-quantity/${itemId}/${this.value}`);
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            console.log(`Item's quantity updated with id: ${itemId}`);
                        } else {
                            console.error('Error updating item qty', xhr.statusText);
                        }
                    };
                    xhr.onerror = function () {
                        console.error('Error updating items qty', xhr.statusText);
                    };
                    xhr.send();
                });//event listener

/////////////////////////////////////////

            cartDivBackground.addEventListener("click", function (event) {
                console.log("Background div clicked");
                 let newestLength = 0;
                const newInputQuantity = parseInt(input.value) //+ parseInt(cartButton.value);
                
                //old input quantity in total
                let oldInputQuantity = 0;
                cartMealQuantityFields.forEach(function (cartMealQuantityField) {
                    oldInputQuantity += parseInt(cartMealQuantityField.value);
                });
                newestLength = oldInputQuantity+newInputQuantity;

                console.log(`New Input Qty: ${newInputQuantity}`)
                console.log(`Old Input Qty: ${oldInputQuantity}`)

                cartButtonLengthSpan.textContent = newestLength.toString();
                cartButton.value = newestLength.toString();

            });

            cartCloseButton.addEventListener("click", function (event) {
                let newestLength = 0;

                //THERE IS A PROBLEM WITH THIS... 
                /*
                When there already are some items in the cart once you refresh the page and add more and once you close the cart div, number of items in the cart is doubled, I BELIEVE IT IS THE PART after '+' which is parseInt(cartbutton.value)
                I GUESS ITS FIXED NOW! 
                */
                const newInputQuantity = parseInt(input.value) //+ parseInt(cartButton.value);
                
                //old input quantity in total
                let oldInputQuantity = 0;
                cartMealQuantityFields.forEach(function (cartMealQuantityField) {
                    oldInputQuantity += parseInt(cartMealQuantityField.value);
                });
                newestLength = oldInputQuantity + newInputQuantity;

                console.log(`New Input Qty: ${newInputQuantity}`)
                console.log(`Old Input Qty: ${oldInputQuantity}`)

                cartButtonLengthSpan.textContent = newestLength.toString();
                cartButton.value = newestLength.toString();

            });
/////////////////////////////////////////
        }//else

        //.............

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/menu/appendCart/${itemId}`);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(`Item added to cart with id: ${itemId}`);
            } else {
                console.error('Error adding item to cart:', xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Error adding item to cart2:', xhr.statusText);
        };
        xhr.send();
        //your code ends here
    });
});

///////////////////////////////////////////////////////////////////////////

cartMealQuantityFields.forEach(function (cartMealQuantityField) {
    
    cartMealQuantityField.addEventListener("change", function () {
        // your code here
        console.log("qty changed");
        const itemId = this.getAttribute('data-id');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/menu/cart/update-quantity/${itemId}/${this.value}`);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(`Item's quantity updated with id: ${itemId}`);
            } else {
                console.error('Error updating item qty', xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Error updating items qty', xhr.statusText);
        };
        xhr.send();
    });//event listener

});