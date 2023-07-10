async function getArticle(id) {
    let article = await fetch("http://localhost:3000/api/products/" + id)
    article = await article.json();

    return article;

}

addToCart();


// création des éléments du DOM et leur contenu pour la page produit
async function init() {

    //récupéaration de l'id produit 
    let params = new URLSearchParams(document.location.search);

    // création des éléments du DOM nécessaires
    let id = params.get("id");
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

// gestion du panier

let quantityPicked = document.querySelector("#quantity");

let colorPicked = document.querySelector("#colors");
let idProduct = (new URL(window.location).searchParams.get("id"));




function addToCart() {

    //fonction qui ajoute un article dans un panier via le localStorage en tenant compte de l'id, de la couleur et de la quantité choisie
    let btnSendToCart = document.getElementById('addToCart');
    btnSendToCart.addEventListener('click', function () {
            
            let cart = new Cart();
            cart.add(idProduct, colorPicked.value, + quantityPicked.value);
            if (quantityPicked.value == 0 || quantityPicked.value >100){
                alert("veillez séléctionner une quantité valide")
            }
        });
}



init();


