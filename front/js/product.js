async function getArticle(id) {
    let article = await fetch("http://localhost:3000/api/products/" + id)
    article = await article.json();

    return article;

}


function uniteFactory(article) {

    let img = document.createElement('img');
    img.src = 'http://localhost:3000/images/logo.png';
    img.alt = article.altTxt;

    let itemImage = document.getElementsByClassName('item__img');
    img.textContent = product.imageUrl;
    itemImage.appendChild(img);

    return img;

}


async function init() {

    let params = new URLSearchParams(document.location.search);

    let id = params.get("id");
    console.log(id);
    let article = await getArticle(id);
    console.log(article);
    let title = document.getElementById('title');
    title.textContent = article.name;
    let description = document.getElementById('description');
    description.textContent = article.description;
    let price = document.getElementById('price');
    price.textContent = article.price;


    article.colors.forEach(color => {

        let option1 = document.createElement('option');
        option1.value = color;
        option1.textContent = color;

        document.getElementById('colors').appendChild(option1)


    });
  
};


init();