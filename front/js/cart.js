main()

function main()
{
    const cart = getCart();
    displayCartProducts(cart);
    formVerification()
}

// Get cart by parsing the item 'myCart' stored in localStorage
function getCart()
{
    return JSON.parse(localStorage.getItem('myCart'));
}

// Get kanap thanks to its ID
function getKanap(kanapID)
{
    const url = "http://localhost:3000/api/products/" + kanapID;
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            alert("Whoops, something went wrong ! " + error);
        })
}

// Display all the kanap stored in the cart
async function displayCartProducts(cart)
{
    let section = document.getElementById('cart__items');
    let numTotalQuantity = 0;
    let numTotalPrice = 0;

    if (cart.length == 0) {
        let kanapsLink = document.createElement('a');
        kanapsLink.href = "index.html";
        kanapsLink.textContent = "Voir nos produits";
        kanapsLink.style.color = "white";
        
        let emptyCart = document.createElement('h3');
        emptyCart.textContent = "Votre panier est vide ! ";
        emptyCart.style.textAlign = "center";
        emptyCart.appendChild(kanapsLink);
        
        section.appendChild(emptyCart);

        let totalQuantity = document.getElementById('totalQuantity');
        numTotalQuantity = 0;
        totalQuantity.textContent = numTotalQuantity;
        let totalPrice = document.getElementById('totalPrice');
        numTotalPrice = 0;
        totalPrice.textContent = numTotalPrice;
    }
    
    // Creation of all HTML elements with a loop (looping into the cart)
    for (let i = 0; i < cart.length; i++) {
        
        // Kanap variable wait for the result of the function getKanap (using the id of the kanap as argument)
        let kanap = await getKanap(cart[i].id);
        
        let article = document.createElement('article');
        article.classList.add('cart__item');
        article.dataset.id = cart[i].id;
        article.dataset.color = cart[i].color;
        section.appendChild(article);

        let divCartItemImg = document.createElement('div');
        divCartItemImg.classList.add('cart__item__img');
        article.appendChild(divCartItemImg);

        let img = document.createElement('img');
        img.src = kanap.imageUrl;
        img.alt = "Photographie d'un canapé";
        divCartItemImg.appendChild(img);

        let divCartItemContent = document.createElement('div');
        divCartItemContent.classList.add('cart__item__content');
        article.appendChild(divCartItemContent);

        let divCartItemContentDescription = document.createElement('div');
        divCartItemContentDescription.classList.add('cart__item__content__description');
        divCartItemContent.appendChild(divCartItemContentDescription);

        let h2 = document.createElement('h2');
        let pColor = document.createElement('p');
        let pPrice = document.createElement('p');
        h2.textContent = kanap.name;
        pColor.textContent = cart[i].color;
        pPrice.textContent = kanap.price + " €";
        divCartItemContentDescription.appendChild(h2);
        divCartItemContentDescription.appendChild(pColor);
        divCartItemContentDescription.appendChild(pPrice);

        let divCartItemContentSettings = document.createElement('div');
        divCartItemContentSettings.classList.add('cart__item__content__settings');
        divCartItemContent.appendChild(divCartItemContentSettings);

        let divCartItemContentSettingsQuantity = document.createElement('div');
        divCartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
        divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

        let pQuantity = document.createElement('p');
        let input = document.createElement('input');
        input.type = "number";
        input.classList.add('itemQuantity');
        input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.value = cart[i].quantity;
        pQuantity.textContent = "Qté : " + input.value;
        // Modify the quantity of kanap in the cart and actualise in the localStorage as well
        input.addEventListener('change', function()
        {
            pQuantity.textContent = "Qté : " + this.value;
            cart[i].quantity = parseInt(this.value);
            if (cart[i].quantity == 0) {
                cart[i].quantity += 1;
            }
            localStorage.setItem('myCart', JSON.stringify(cart));
            location.reload();
        });
        divCartItemContentSettingsQuantity.appendChild(pQuantity);
        divCartItemContentSettingsQuantity.appendChild(input);

        let divCartItemContentSettingsDelete = document.createElement('div');
        divCartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
        divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

        let pDelete = document.createElement('p');
        pDelete.classList.add('deleteItem');
        pDelete.textContent = "Supprimer";
        // Delete the kanap in the cart and actualise the localStorage with the modifications in the cart
        pDelete.addEventListener('click', function()
        {
            let articleToRemove = this.closest('.cart__item');
            articleToRemove.remove();

            cart.forEach(element => {
                if (element.id == articleToRemove.dataset.id && element.color == articleToRemove.dataset.color) {
                    let index = cart.indexOf(element);
                    cart.splice(index, 1);
                    console.log(cart);
                }
            });

            localStorage.clear();
            localStorage.setItem('myCart', JSON.stringify(cart));
            location.reload();
        });
        divCartItemContentSettingsDelete.appendChild(pDelete);

        // Diplay the total quantity of kanaps in cart
        numTotalQuantity += cart[i].quantity;
        totalQuantity.textContent = numTotalQuantity;
        
        // Display the total price of the order 
        numTotalPrice += kanap.price * cart[i].quantity;
        totalPrice.textContent = numTotalPrice;
    }
}

function formVerification()
{
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    let addressErrorMsg = document.getElementById('addressErrorMsg');
    let cityErrorMsg = document.getElementById('cityErrorMsg');
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    
    let regExLetters = /[A-Za-zÀ-ÖØ-öø-ÿ-'\s]/;
    let regExLettersAndNumbers = /[A-Za-zÀ-ÖØ-öø-ÿ0-9-'\s]/;
    
    let order = document.getElementById('order');
    
    firstName.addEventListener('change', function() {
        spacesGestion(firstName);
        checkInput(firstName, firstNameErrorMsg, regExLetters, "Ce champ ne doit contenir que des lettres");
    });
    lastName.addEventListener('change', function() {
        spacesGestion(lastName);
        checkInput(lastName, lastNameErrorMsg, regExLetters, "Ce champ ne doit contenir que des lettres");
    });
    address.addEventListener('change', function() {
        spacesGestion(address);
        checkInput(address, addressErrorMsg, regExLettersAndNumbers, "Ce champ ne doit contenir que des lettres ou des chiffres");
    });
    city.addEventListener('change', function() {
        spacesGestion(city);
        checkInput(city, cityErrorMsg, regExLetters, "Ce champ ne doit contenir que des lettres");
    });
}

function spacesGestion(stringInput)
{
    let stringModicated = stringInput.value.trim().split(/[\s,\t,\n]+/).join(" ");
    stringInput.value = stringModicated;
}

function checkInput(input, inputErrorMsg, regEx, errorMsg)
{
    let verificationArray = [];
    for (let i = 0; i < input.value.length; i++) {
        let test = regEx.test(input.value[i]);
        if (test == false) {
            verificationArray.push(test);
        }
        else {
            verificationArray.push(test);
        }
    }
    if (verificationArray.includes(false)) {
        inputErrorMsg.textContent = errorMsg;
    }
    else {
        inputErrorMsg.textContent = "";
    }
}