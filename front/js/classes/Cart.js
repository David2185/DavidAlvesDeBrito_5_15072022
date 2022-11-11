//création de la classe cart 
class Cart {
    constructor () {
        this.items = JSON.parse(localStorage.getItem('cart')) ?? []
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items))
}

    add(idProduct, color, quantity) {
        if(color === ""){
            alert ("Veuillez selectionner une couleur")
            return
        }
        
        const cartItem = this.items.find(item => item.id === idProduct && item.color === color)
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            this.items.push({
                id: idProduct,
                color: color,
                quantity: quantity
            })
        }

        this.save()
    }

    delete(idProduct, colorPicked) {
        this.items = this.items.filter(item => item.id !== idProduct && item.color !== colorPicked)

        this.save()
    }

    update(idProduct, colorPicked, quantity) {
         
        const cartItem = this.items.find(item => item.id === idProduct && item.color === colorPicked);
        if (cartItem) {
            cartItem.quantity = quantity;
        } 

        this.save()
    }

    totalQuantity() { 
        
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    } 

    async totalPrice() { 
        return (await this.getAllItems()).reduce((acc, item) => acc + item.quantity * item.price, 0);
    }

    //créer une fonction async getProduit, qui va récupérer les données d'un produit en fonction de son id
    async getProduit(idProduct) {
        const response = await fetch(`http://localhost:3000/api/products/${idProduct}`)
        return await response.json()
    }

    //créer une fonction async getAllItems qui va récupérer tous les produits du panier en utilisant la méthode reduce

    async getAllItems() {
        return await Promise.all(this.items.map(async (item) => {
            const produit = await this.getProduit(item.id)
            // console.log(produit);
            return {...item, ...produit}
        }));
    }
}

