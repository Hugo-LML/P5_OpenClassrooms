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

// Display the kanap thanks to the two previous functions
function displayKanap(kanap)
{
    let imgContainer = document.querySelector('.item__img');
    let img = document.createElement('img');
    imgContainer.appendChild(img);

    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let description = document.getElementById('description');

    img.src = kanap.imageUrl;
    title.textContent = kanap.name;
    price.textContent = kanap.price + " ";
    description.textContent = kanap.description;
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

    return function()
    {
        let color = getColor();
        let quantity = getQuantity();
        
        if (color == "") {
            alert("Vous devez choisir une couleur")
        }

        if (quantity == 0) {
            alert("Vous devez ajouter au moins un produit")
        }

        else {
            let product = {
                id: kanapID,
                color: color,
                quantity: quantity,
            };

            if (cart.length == 0) {
                cart.push(product);
            }

            else {

                function findProduct(productAlreadyInCart)
                {
                    return productAlreadyInCart.id == product.id && productAlreadyInCart.color == product.color;
                }

                let resultFound = cart.find(findProduct);

                if (resultFound == undefined) {
                    cart.push(product);
                }

                else {
                    resultFound.quantity += product.quantity;
                }                
            }

            localStorage.setItem('myCart', JSON.stringify(cart));
            let localStorageParsed = JSON.parse(localStorage.getItem('myCart'));
            console.log(localStorageParsed);
        }
    }
}