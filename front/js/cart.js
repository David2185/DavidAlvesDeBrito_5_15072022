async function init() {
    const cart = new Cart();

    // console.log(await cart.getAllItems());
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
        img.alt = cartItem.altTxt;

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



//gestion du formulaire

let form = document.querySelector(".cart__order__form");

//Création des Regex

let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//validation du prénom

const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';

    } else {
        firstNameErrorMsg.innerHTML = 'Vous devez renseigner un prénom valide';
    }
};

//validation du nom

const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Vous devez renseigner un nom valide';
    }
};

//validation de l'adresse

const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
};

//validation de la ville

const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
};

//validation de l'email 

const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
};


//Implémentation des règles de remplissage du formulaire

function fieldManager() {


    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });


    form.address.addEventListener('change', function () {
        validAddress(this);
    });


    form.city.addEventListener('change', function () {
        validCity(this);
    });


    form.email.addEventListener('change', function () {
        validEmail(this);
    });
}
fieldManager();

//si l'un des champ est vide afficher 'Veuillez remplir ce champ'

function checkForm() {
    let formValid = true;

    if (form.firstName.value == '') {
        formValid = false;
        let firstNameErrorMsg = form.firstName.nextElementSibling;
        firstNameErrorMsg.innerHTML = 'Veuillez remplir ce champ.';
    }

    if (form.lastName.value == '') {
        formValid = false;
        let lastNameErrorMsg = form.lastName.nextElementSibling;
        lastNameErrorMsg.innerHTML = 'Veuillez remplir ce champ.';
    }

    if (form.address.value == '') {
        formValid = false;
        let addressErrorMsg = form.address.nextElementSibling;
        addressErrorMsg.innerHTML = 'Veuillez remplir ce champ.';
    }

    if (form.city.value == '') {
        formValid = false;
        let cityErrorMsg = form.city.nextElementSibling;
        cityErrorMsg.innerHTML = 'Veuillez remplir ce champ.';
    }

    if (form.email.value == '') {
        formValid = false;
        let emailErrorMsg = form.email.nextElementSibling;
        emailErrorMsg.innerHTML = 'Veuillez remplir ce champ.';
    }

    return formValid;
}



checkForm();


//Envoi des informations client au localstorage et création d'un order id qui s'affichera dans la page confirmation de commande

function postForm() {
    const btn_command = document.getElementById("order");

    //Evenenements de type listener sur le panier
    btn_command.addEventListener("click", () => {

        produitLocalStorage = JSON.parse(localStorage.getItem('cart')) ?? [];

        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        // Construction d'un array depuis le local storage

        let idProducts = [];
        for (let i = 0; i < produitLocalStorage.length; i++) {
            for (let j = 0; j < produitLocalStorage[i].quantity; j++) {
                idProducts.push(produitLocalStorage[i].id);
            };
            console.log(idProducts);
        }

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                //une fois la commande validée : redirection vers la page confirmation de commande pour afficher l'id de commande
                window.location.href = "confirmation.html?id=" + data.orderId;
            })
            .catch((error) => {
                console.log(error);
            });
    });
}


// envoi du formulaire de contact au serveur et l'alert si panier vide sur le bouton commander.

function sendForm() {
    const btn_command = document.getElementById("order");
    produitLocalStorage = JSON.parse(localStorage.getItem('cart')) ?? [];


    btn_command.addEventListener("click", () => {
        if (produitLocalStorage.length == 0) {
            alert("Votre panier est vide");
        } else {
            postForm();
        }
    })


}


sendForm();



function submitForm(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Vous ne pouvez passer une commande avec un panier vide')
    } else {
        if (checkInput()) {
            postApi(requestBody())
        };
    }
};
//Lorsque l'utilisateur clique sur le bouton commander, on appelle la fonction submitForm et on affiche l'id de commande dans la page confirmation de commande

form.addEventListener('submit', submitForm);

//Affichage de l'id de commande dans la page confirmation de commande

function displayOrderId() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    document.getElementById("orderId").innerHTML = id;
}


//Affichage du prix total de la commande dans la page confirmation de commande

function displayTotalPrice() {
    let url = new URL(window.location.href);
    let price = url.searchParams.get("price");
    document.getElementById("totalPrice").innerHTML = price;
}

displayTotalPrice();



        
