async function getArticle(id) {
    let article = await fetch("http://localhost:3000/api/products/" + id)
    article = await article.json();

    return article;

}

async function init() {

    let params = new URLSearchParams(document.location.search);

    let id = params.get("id");
    console.log(id);
    let article = await getArticle(id);
    console.log(article);
};



init();