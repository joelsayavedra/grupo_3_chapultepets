window.addEventListener("load",e=>{
    //banderas
    let banderaEliminar = 0;

        //Cambio de valores de total
    let subtotal = document.querySelector("div.subtotal p.valor");
    let impuestos = document.querySelector("div.impuestos p.valor");
    let total = document.querySelector("div.total p.valor");

        //obtención del objeto plantilla
    let articulo = document.querySelector("div.articulo");

        //obtención de los elementos que contienen los datos a cambiar
    let img = document.querySelector("div.logo_cart img");
    let nombreProducto = document.querySelector("p#nombreProducto");
    let etiquetaPrecio = document.querySelector("p.etiquetaPrecio");
    let etiquetaPrecioTotal = document.querySelector("p.etiquetaPrecioTotal");
    let cantidadProducto = document.querySelector("input#cantidadProducto");

        
    let productList = document.querySelector("div#productList"); //obtención del contenedor dónde hacer el appendchild de los artículos
    let botonComprar = document.querySelector("button#comprar"); //Botón de comprar ahora


        //obtención de la variable carrito de sessionStorage
    let carrito = [];
    if (sessionStorage.getItem("carrito",carrito)) {
        carrito = JSON.parse(sessionStorage.getItem("carrito",carrito));
    }
    // console.log(carrito);

        //Creación de una función asíncrona para que cada fetch se realice en orden.
    async function datos(){
            //variables para la suma de precios
        let suma = 0;
        let porcentajeDeImpuestos = 0.17;

            //ciclo para la creación de un artículo por cada elemento en el array carrito
        for (let i = 0; i < carrito.length; i++) {
            await fetch("https://chapultepets.herokuapp.com/api/products/"+carrito[i].id)
            .then(response=>response.json())
            .then(data=>{

                    //suma de precios
                suma+=data.data.price*carrito[i].amount;

                    //modificación de datos del div plantilla
                img.src="/img/products/"+data.data.image;
                nombreProducto.innerHTML=data.data.name;
                etiquetaPrecio.innerHTML="$"+data.data.price.toFixed(2);
                etiquetaPrecioTotal.innerHTML="$"+(data.data.price*carrito[i].amount).toFixed(2);
                cantidadProducto.value=carrito[i].amount;

                    //clonado  y adición del div plantilla al contenedor
                let newClone = articulo.cloneNode(true);
                productList.appendChild(newClone);

                    //Creación de eventos para el clon
                let boton = newClone.querySelector("div.botonEliminar button");
                let input = newClone.querySelector("form#form input#cantidadProducto");
                let warning = newClone.querySelector("p#errorMessage");
                boton.addEventListener("click",e=>{
                    e.preventDefault();
                    if(banderaEliminar==0){
                        boton.innerHTML="¿Seguro? Sí (presionar)";
                        banderaEliminar++;
                    }else{
                        carrito.splice(i, 1);
                        sessionStorage.setItem("carrito",JSON.stringify(carrito));
                        window.location.href = "/products/cart";

                    }
                    console.log("eliminar "+ carrito[i].amount+" "+data.data.name);
                });
                input.addEventListener("change",e=>{
                    if(Number.isInteger(parseFloat(input.value)) && parseFloat(input.value)>0){
                        console.log("cambiando "+ input.value+" "+data.data.name);
                        carrito[i].amount=input.value;
                        sessionStorage.setItem("carrito",JSON.stringify(carrito));
                        window.location.href = "/products/cart";
                    }else{
                        warning.innerHTML="¡Ingresa un número entero positivo!";
                    }
                })
            }).catch(error=>{
                console.log(error);
            })        
        }
            //cambio de valores del resumen en etiquetas html
        subtotal.innerHTML="$"+(suma*(1-porcentajeDeImpuestos)).toFixed(2);
        impuestos.innerHTML="$"+(suma*porcentajeDeImpuestos).toFixed(2);
        total.innerHTML="$"+suma.toFixed(2);

            //remoción del elemento div que sirvió de plantilla.
        articulo.remove();
    };
    datos();

    botonComprar.addEventListener("click", e=>{
        e.preventDefault();
        console.log("compra!!!!");
    })
});