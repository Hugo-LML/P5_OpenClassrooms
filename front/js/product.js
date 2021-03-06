main()

async function main()
{
    const kanapID = getKanapID();
    const kanap = await getKanap(kanapID);
    displayKanap(kanap);
    const quantityDefault = document.getElementById('quantity');
    quantityDefault.setAttribute('value', '1');
    const addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', addKanapToCart(kanapID));
}

// Get the id of the kanap to fetch
function getKanapID()
{
    let url = (new URL(document.location.href));
    let id = url.searchParams.get('id');
    return id;
}

// Get the kanap object to display
async function getKanap(kanapID)
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

// Display the kanap thanks to the two previous functions
function displayKanap(kanap)
{
    let imgContainer = document.querySelector('.item__img');
    let img = document.createElement('img');
    imgContainer.appendChild(img);

    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let description = document.getElementById('description');
    let colors = document.getElementById('colors');

    img.src = kanap.imageUrl;
    title.textContent = kanap.name;
    price.textContent = kanap.price + " ";
    description.textContent = kanap.description;
    for (let i = 0; i < kanap.colors.length; i++) {
        let option = document.createElement('option');
        option.value = kanap.colors[i];
        option.textContent = kanap.colors[i];
        colors.appendChild(option);
    }
}

// Get the color of the kanap added to the cart
function getColor()
{
    let color = document.getElementById('colors').value;
    return color;
}

// Get the quantity of the kanap added to the cart
function getQuantity()
{
    let quantity = document.getElementById('quantity').value;
    return parseInt(quantity);
}

// Add kanap to cart when user click on add to the cart button
function addKanapToCart(kanapID)
{
    let cart = [];
    let getCartInLS = JSON.parse(localStorage.getItem('myCart'));

    if (localStorage.getItem('myCart')) {
        cart = getCartInLS;
    }
    
    return function()
    {
        let kanapTitle = document.getElementById('title').textContent;
        let color = getColor();
        let quantity = getQuantity();
        
        if (color == "") {
            alert("Vous devez choisir une couleur")
        }

        else if (quantity <= 0) {
            alert("Vous devez ajouter au moins un produit")
        }

        else if (quantity > 100) {
            alert("Vous ne pouvez pas ajouter plus de 100 produits")
        }

        else {
            let product = {
                id: kanapID,
                color: color,
                quantity: quantity,
            };

            if (cart.length == 0) {
                cart.push(product);
                popUpProductAddedToCart(kanapTitle, product.color, product.quantity);
            }

            else {

                // Function returning product in cart with same id and same color as product added to cart
                function findProduct(productAlreadyInCart)
                {
                    return productAlreadyInCart.id == product.id && productAlreadyInCart.color == product.color;
                }

                let resultFound = cart.find(findProduct);

                // resultFound is undefined if there is no product already in cart with same id and color as product added to cart
                if (resultFound == undefined) {
                    cart.push(product);
                    popUpProductAddedToCart(kanapTitle, product.color, product.quantity);
                }

                // If findProduct() returned a product with same id and same color as product added to cart, its quantity is increased
                else {
                    resultFound.quantity += product.quantity;
                    popUpProductAddedToCart(kanapTitle, product.color, product.quantity);
                }                
            }

            // cart array is set in local storage to access it on any pages
            localStorage.setItem('myCart', JSON.stringify(cart));
        }
    }
}

// Create a pop up with the informations of the product added to the cart
function popUpProductAddedToCart(name, color, quantity)
{
    const itemContent = document.querySelector('.item__content');
    const popUpDiv = document.createElement('div');
    const popUpText = document.createElement('p');
    popUpDiv.appendChild(popUpText);
    itemContent.appendChild(popUpDiv);

    popUpDiv.style.padding = "10px";
    popUpDiv.style.backgroundColor = "white";
    popUpDiv.style.borderRadius = "10px";
    popUpDiv.style.textAlign = "center";
    popUpDiv.style.maxWidth = "100%";
    popUpDiv.style.marginTop = "32px";

    popUpText.textContent = "Vous venez d'ajouter " + quantity + " " + name + " " + color + " ?? votre panier !";
    popUpText.style.color = "black";
    popUpText.style.fontWeight = "700";
}