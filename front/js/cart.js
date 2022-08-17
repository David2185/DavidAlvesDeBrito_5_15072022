
async function init() {
    const cart = new cart()
    const products = await getProducts();

    // création des éléments du DOM nécessaires
    let idProduct = params.get("id");
    //création d'une balise article 
    let cartItem = document.createElement('article');
    cartItem.classList.add('cart__item');
    cartItem.setAttribute('data-id', idProduct);
    cartItem.setAttribute('data-color', colorPicked.value);
    //création d'une balise div
    let cartItemImg = document.createElement('div');
    cartItemImg.classList.add('cart__item__img');
    //création d'une balise img
    let img = document.createElement('img');
    img.src = article.imageUrl;
    img.alt = article.altTxt;
    cartItemImg.appendChild(img);
    cartItem.appendChild(cartItemImg);
    //création d'une balise div
    let cartItemContent = document.createElement('div');
    cartItemContent.classList.add('cart__item__content');
    //création d'une balise div
    let cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.classList.add('cart__item__content__description');
    //création d'une balise h2
    let title = document.createElement('h2');
    title.textContent = article.name;
    cartItemContentDescription.appendChild(title);
    //création d'une balise p
    let color = document.createElement('p');
    color.textContent = colorPicked.value;
    cartItemContentDescription.appendChild(color);
    //création d'une balise p
    let price = document.createElement('p');
    price.textContent = article.price + ' €';
    cartItemContentDescription.appendChild(price);
    cartItemContent.appendChild(cartItemContentDescription);
    //création d'une balise div
    let cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.classList.add('cart__item__content__settings');
    //création d'une balise div
    let cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');   
    //création d'une balise p
    let quantity = document.createElement('p');
    quantity.textContent = 'Qté : ';
    cartItemContentSettingsQuantity.appendChild(quantity);
    //création d'une balise input
    let itemQuantity = document.createElement('input');
    itemQuantity.type = 'number';
    itemQuantity.classList.add('itemQuantity');
    itemQuantity.name = 'itemQuantity';
    itemQuantity.min = '1';
    itemQuantity.max = '100';
    itemQuantity.value = '42';
    cartItemContentSettingsQuantity.appendChild(itemQuantity);
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    //création d'une balise div
    let cartItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
    //création d'une balise p
    let deleteItem = document.createElement('p');
    deleteItem.classList.add('deleteItem');
    deleteItem.textContent = 'Supprimer';
    cartItemContentSettingsDelete.appendChild(deleteItem);
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    cartItemContent.appendChild(cartItemContentSettings);
    cartItem.appendChild(cartItemContent);
    cart.appendChild(cartItem);
    //création d'une balise div
    let cartTotal = document.createElement('div');
    cartTotal.classList.add('cart__total');
    //création d'une balise p
    let total = document.createElement('p');
    total.textContent = 'Total : ' + article.price + ' €';
    cartTotal.appendChild(total);
    cart.appendChild(cartTotal);
    //création d'une balise div
    let cartButton = document.createElement('div');
    cartButton.classList.add('cart__button');
    //création d'une balise button
    let button = document.createElement('button');
    button.textContent = 'Commander';
    cartButton.appendChild(button);
    cart.appendChild(cartButton);

}






init();