main()

async function main()
{
    const kanaps = await getKanaps();
    displayKanaps(kanaps);
}

// Get all kanaps available
async function getKanaps()
{
    const url = "http://localhost:3000/api/products";
    const section = document.getElementById('items');

    return fetch(url)
        .then((response) => {
            return response.json(); // Result of the function which will be the argument of the function displayKanaps
        })
        .catch((error) => {
            let myError = document.createElement('h3');
            section.appendChild(myError);
            myError.textContent = "Whoops, something went wrong ! " + error;
        })
}

// Display all kanaps available
function displayKanaps(kanaps)
{
    const section = document.getElementById('items');

    for (let i = 0; i < kanaps.length; i++) {
                
        // HTML tags creation
        let a = document.createElement('a');
        let article = document.createElement('article');
        let img = document.createElement('img');
        let h3 = document.createElement('h3');
        let pDescription = document.createElement('p');
        let pPrice = document.createElement('p');

        // Parents & Children set up
        section.appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(pDescription);
        article.appendChild(pPrice);

        // Setting attributes
        a.classList.add('card');
        a.href = "./product.html?id=" + kanaps[i]._id;
        img.src = "/back/images/kanap0" + (i + 1) + ".jpeg";
        img.alt = kanaps[i].altTxt;
        h3.textContent = kanaps[i].name;
        pDescription.textContent = kanaps[i].description;
        pPrice.textContent = kanaps[i].price + ' €';
        
    }
}