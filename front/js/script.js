let section = document.getElementById('items');

const url = "http://localhost:3000/api/products";

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            
            let a = document.createElement('a');
            let article = document.createElement('article');
            let img = document.createElement('img');
            let h3 = document.createElement('h3');
            let pDescription = document.createElement('p');
            let pPrice = document.createElement('p');

            section.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(pDescription);
            article.appendChild(pPrice);

            a.href = "";
            img.src = "/back/images/kanap0" + (i + 1) + ".jpeg";
            img.alt = data[i].altTxt;

            h3.textContent = data[i].name;
            pDescription.textContent = data[i].description;
            pPrice.textContent = data[i].price + ' €';
            
        }
    })
    .catch((error) => {
        let myError = document.createElement('h3');
        section.appendChild(myError);
        myError.textContent = "Whoops, something went wrong ! " + error; 
    })