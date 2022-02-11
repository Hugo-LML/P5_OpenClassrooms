main()

function main()
{
    const cart = getCart();
    displayCartProducts(cart);
}

function getCart()
{
    return JSON.parse(localStorage.getItem('myCart'));
}

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

async function displayCartProducts(cart)
{
    let section = document.getElementById('cart__items');
    let numTotalQuantity = 0;
    let numTotalPrice = 0;
    
    for (let i = 0; i < cart.length; i++) {
        
        let kanap = await getKanap(cart[i].id);
        
        let article = document.createElement('article');
        article.classList.add('cart__item');
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
        input.addEventListener('change', function()
        {
            pQuantity.textContent = "Qté : " + this.value;
            cart[i].quantity = parseInt(this.value);
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
        divCartItemContentSettingsDelete.appendChild(pDelete);


        let totalQuantity = document.getElementById('totalQuantity');
        numTotalQuantity += cart[i].quantity;
        totalQuantity.textContent = numTotalQuantity;
        
        let totalPrice = document.getElementById('totalPrice');
        numTotalPrice += kanap.price * cart[i].quantity;
        totalPrice.textContent = numTotalPrice;

    }
}

// SUPPRIMER MGL MAIS GG T'AS ETE BON HIER