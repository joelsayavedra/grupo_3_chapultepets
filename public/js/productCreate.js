window.addEventListener("load",e=>{

    // let modifica()

    let name = document.querySelector("input#name");
    let nameError = document.querySelector("p#name");
    name.addEventListener("change",e=>{
        if(name.value==""){
            nameError.innerHTML="Debes colocar un nombre";
            name.classList.remove("caja-ok");
            name.classList.add("caja-error");
        }else if(name.value.length <=4){
            nameError.innerHTML="El nombre debe tener al menos 5 caracteres";
            name.classList.remove("caja-ok");
            name.classList.add("caja-error");
        }else{
            nameError.innerHTML="";
            name.classList.remove("caja-error");
            name.classList.add("caja-ok");
        }
    })
});