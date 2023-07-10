//construction du fetch pour récupérer les données de l'API

async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    let articles = await articlesCatch.json();
    

    return articles;

}

// construction du DOM pour acceuillir les informations relatives aux différents articles
function articleFactory(article) {


    let a = document.createElement('a');
    a.href = "./product.html?id=" + article._id;
    let articleBox = document.createElement('article');
    a.appendChild(articleBox);
    let image = document.createElement('img');
    image.src = article.imageUrl;
    image.alt= article.altTxt;
    articleBox.appendChild(image);
    let h3= document.createElement('h3');
    h3.textContent = article.name;
    h3.classList.add('productName');
    articleBox.appendChild(h3);
    let p = document.createElement('p');
    p.textContent = article.description;
    p.classList.add('productDescription');
    articleBox.appendChild(p);

   

    return a;

}


// fonction permettant la récupération des articles et leur dispatch dans le DOM

async function init() {

    let articles = await getArticles();
    console.log(articles);
    const items = document.getElementById('items');
    articles.forEach(function (article) {
        const e = articleFactory(article);
        items.appendChild(e);

    })
};



init();