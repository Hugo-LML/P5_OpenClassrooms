main()

async function main()
{
    const kanapID = getKanapID();
    const kanap = await getKanap(kanapID);
    displayKanap(kanap);
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