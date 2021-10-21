window.addEventListener("load",e=>{
    // fetch
    let id = window.location.pathname;
    id=id.substring(10,id.length);

    let elBoton = document.querySelector("button#AgregarAlCarrito");
    let elInput = document.querySelector("input#AgregarAlCarrito");
    let warning = document.querySelector("p#AgregarAlCarrito");

    elBoton.addEventListener("click",e=>{
        e.preventDefault();
        console.log(elInput.value);
        if(Number.isInteger(parseFloat(elInput.value))){
            warning.innerHTML ="";
            console.log("es entero");
            sessionStorage.setItem("id",id);
            sessionStorage.setItem("amount",elInput.value);
            window.location.href = "http://localhost:3000/products/cart";

        }else{
            warning.innerHTML ="¡Debes ingresar un entero!";
        }
    });
});