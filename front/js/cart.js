async function init() {
    const cart = new Cart();

    console.log(await cart.getAllItems());
    // console.log(await cart.totalPrice());

    async function updateTotals() {
        document.getElementById('totalQuantity').textContent = cart.totalQuantity();
        document.getElementById('totalPrice').textContent = await cart.totalPrice();
    }
    await updateTotals();
    let articles = await cart.getAllItems();
    // console.log(articles);
    const items = document.getElementById('cart__items');
    articles.forEach(function (article) {
        const e = cartItemFactory(article);
        items.appendChild(e);

    })

    function cartItemFactory(cartItem) {

        //création des éléments du DOM et attribution du contenu pour chaque balise.

        let articleItem = document.createElement('article');
        articleItem.textContent = cartItem.name;
        articleItem.classList.add('cart_item');
        articleItem.dataset.id = cartItem.id;
        articleItem.dataset.color = cartItem.color;

        let cartImg = document.createElement('div');
        cartImg.classList.add('cart__item__img');

        let img = document.createElement('img');
        img.src = cartItem.imageUrl;

        let itemContent = document.createElement('div');
        itemContent.classList.add('cart_item_content');

        let itemContentDescription = document.createElement('div');
        itemContentDescription.classList.add('cart_item_content_description');

        let h2 = document.createElement('h2');

        let paraColor = document.createElement('p');
        paraColor.textContent = cartItem.color;

        let secondpara = document.createElement('p');
        secondpara.textContent = cartItem.price + ' €';

        let contentSettings = document.createElement('div');
        contentSettings.classList.add('cart__item__content__settings');

        let itemSettingsQuantity = document.createElement('div');
        itemSettingsQuantity.classList.add('cart__item__content__settings__quantity');

        let paraQuantity = document.createElement('p');
        paraQuantity.textContent = "Qté : ";

        let input = document.createElement('input');
        input.classList.add('itemQuantity');
        input.setAttribute('type', 'number');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', cartItem.quantity);
        input.addEventListener('change', () => {
            cart.update(cartItem.id, cartItem.color, parseInt(input.value))
            updateTotals();
        })



        let itemDelete = document.createElement('div');
        itemDelete.classList.add('cart__item__content__settings__delete');

        let deletePara = document.createElement('p');
        deletePara.classList.add('deleteItem');
        deletePara.textContent = "Supprimer";
        deletePara.addEventListener('click', () => {
            cart.delete(cartItem.id, cartItem.color)
            updateTotals();
            articleItem.remove();
        })

        // mise en place des balises crées dans le DOM.

        itemDelete.appendChild(deletePara);
        itemSettingsQuantity.appendChild(paraQuantity);
        itemSettingsQuantity.appendChild(input);
        contentSettings.appendChild(itemSettingsQuantity);
        contentSettings.appendChild(itemDelete);
        itemContentDescription.appendChild(h2);
        itemContentDescription.appendChild(paraColor);
        itemContentDescription.appendChild(secondpara);
        itemContent.appendChild(itemContentDescription);
        itemContent.appendChild(contentSettings);
        cartImg.appendChild(img);
        articleItem.appendChild(cartImg);
        articleItem.appendChild(itemContent);



        return articleItem;

    }
}

init();


