window.addEventListener("load",e=>{
    // fetch
    let id = window.location.pathname;
    id=id.substring(10,id.length);
    let carrito = [];
    // sessionStorage.clear();

    if (sessionStorage.getItem("carrito",carrito)) {
        carrito = JSON.parse(sessionStorage.getItem("carrito",carrito));
    }
    console.log(carrito);

    let elBoton = document.querySelector("button#AgregarAlCarrito");
    let elInput = document.querySelector("input#AgregarAlCarrito");
    let warning = document.querySelector("p#AgregarAlCarrito");

    elBoton.addEventListener("click",e=>{
        e.preventDefault();
        console.log(elInput.value);
        if(Number.isInteger(parseFloat(elInput.value)) && parseFloat(elInput.value)>0){
            warning.innerHTML ="";
            let newItem = {
                id: id,
                amount: elInput.value
            }
            carrito.push(newItem);
            sessionStorage.setItem("carrito",JSON.stringify(carrito));
            window.location.href = "/products/cart";
        }else{
            warning.innerHTML ="¡Debes ingresar un entero positivo!";
        }
    });
});