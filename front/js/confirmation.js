const orderId = new URL(window.location.href).searchParams.get("id");

const confirmation = document.getElementById("orderId")
confirmation.innerText = orderId
