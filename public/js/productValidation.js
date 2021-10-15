window.addEventListener("load",e=>{

    let modifica = function (input, cajaError, error, flag) {
        cajaError.innerHTML=error;
        if(flag){
            input.classList.remove("caja-ok");
            input.classList.add("caja-error");
        }else{
            input.classList.remove("caja-error");
            input.classList.add("caja-ok");
        }
    }

    //Almacenado de elementos HTML en variables
    let name = document.querySelector("input#name");
    let nameError = document.querySelector("p#name");
    let description = document.querySelector("textarea#description");
    let descriptionError = document.querySelector("p#description");
    let category = document.querySelector("input#category");
    let categoryError = document.querySelector("p#category");
    let brand = document.querySelector("input#brand");
    let brandError = document.querySelector("p#brand");
    let price = document.querySelector("input#price");
    let priceError = document.querySelector("p#price");
    let avatar = document.querySelector("input#avatar");
    let avatarError = document.querySelector("p#avatar");


    //Funciones de validación para cada campo

        //Nombre del producto
    let nameFunction= function(){
        if(!name.value){
            modifica(name,nameError,"Debes colocar un nombre",true);
        }else if(name.value.length <5){
            modifica(name,nameError,"El nombre debe tener al menos 5 caracteres",true);
        }else{
            modifica(name,nameError,"",false);
        }
    }
        //Descripción del producto
    let descriptionFunction = function () {
        if(!description.value){
            modifica(description,descriptionError,"Debes colocar una descripción",true);
        }else if(description.value.length <20){
            modifica(description,descriptionError,"La descripción debe tener al menos 20 caracteres",true);
        }else{
            modifica(description,descriptionError,"",false);
        }
    }
        //Categoría del producto
    let categoryFunction = function () {
        if(!category.value){
            modifica(category,categoryError,"Debes agregar al menos una categoría",true);
        }else{
            modifica(category,categoryError,"",false);
        }
    }
        //Marca del producto
    let brandFunction = function () {
        if(!brand.value){
            modifica(brand,brandError,"Debes colocar la marca del producto (o 'genérico' si no tiene)",true);
        }else{
            modifica(brand,brandError,"",false);
        }
    }
        //Precio del producto
    let priceFunction = function () {
        if(!price.value){
            modifica(price,priceError,"Debes colocar un precio",true);
        }
        else if(price.value<0){
            modifica(price,priceError,"No nos podemos costear regalar dinero",true);
        }
        else{
            modifica(price,priceError,"",false);
        }
    }
        //Imagen del producto
    let avatarFunction = function () {
        let extensionesValidas = [".jpg",".png",".gif"];
        let extension = avatar.value.substring(avatar.value.length-4,avatar.value.length)

        if(!avatar.value){
            modifica(avatar,avatarError,"Debes colocar una imagen de producto",true);
        }else if(!extensionesValidas.includes(extension.toLowerCase())){
            modifica(avatar,avatarError,`La extensiones permitidas son ${extensionesValidas.join(", ")}`,true);
        }
        else{
            modifica(avatar,avatarError,"",false);
        }
        console.log(avatar.value);
    }

    //Creación de eventos que utilizan las funciones declaradas
    name.addEventListener("input",e=>nameFunction());
    description.addEventListener("input",e=>descriptionFunction());
    category.addEventListener("input",e=>categoryFunction());
    brand.addEventListener("input",e=>brandFunction());
    price.addEventListener("input",e=>priceFunction());
    avatar.addEventListener("change",e=>avatarFunction());

    //Evalúa de nuevo si detecta que hay valores viejos guardados en la variable old
    if(name.value){nameFunction();}
    if(description.value){descriptionFunction();}
    if(category.value){categoryFunction();}
    if(brand.value){brandFunction();}
    if(price.value){priceFunction();}
    if(avatar.value){avatarFunction();}
});