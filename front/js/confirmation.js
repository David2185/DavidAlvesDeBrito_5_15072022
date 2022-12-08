const orderId = new URL(window.location.href).searchParams.get("orderId");

const confirmation = document.getElementById("orderId")
confirmation.innerText = orderId


function orderId() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let orderId = document.getElementById("orderId");
    orderId.innerHTML = id;
    console.log(orderId);
}

orderId();