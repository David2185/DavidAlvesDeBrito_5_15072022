async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    let articles= await articlesCatch.json(); 
    console.log(articles);
    let items= document.querySelector('#items');
}

getArticles ();

document.createElement('a');
items.appendChild('a');
a.setattribute('href="./product.html?id=42"');
console.log(getArticles());
//comment retourner le tableau avec les produits 
//comment utiliser GET/POST
//mes dossiers sont-ils bien organisés
