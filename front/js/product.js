async function getArticle(id) {
    let article = await fetch("http://localhost:3000/api/products/" + id)
    article = await article.json();

    return article;

}

// création des éléments du DOM et leur contenu pour la page produit
async function init() {

    //récupéaration de l'id produit 
    let params = new URLSearchParams(document.location.search); 

    // création des éléments du DOM nécessaires
    let id = params.get("id");
    // console.log(id);
    let article = await getArticle(id);
    console.log(article);
    let title = document.getElementById('title');
    title.textContent = article.name;
    let description = document.getElementById('description');
    description.textContent = article.description;
    let price = document.getElementById('price');
    price.textContent = article.price + ' ';
    article.colors.forEach(color => {

        let option1 = document.createElement('option');
        option1.value = color;
        option1.textContent = color;

        document.getElementById('colors').appendChild(option1)


    });

    let img = document.createElement('img');
    img.src = article.imageUrl;
    img.alt = article.altTxt;
    document.querySelector('.item__img').appendChild(img);

};


init();