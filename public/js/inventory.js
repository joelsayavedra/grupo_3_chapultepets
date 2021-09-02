window.addEventListener("load",evento=>{
    let deleteForms = document.querySelectorAll("#delete-form");

    for (let i = 0; i < deleteForms.length; i++) {
        deleteForms[i].addEventListener("submit",function(e){
            let flag = confirm("¿Seguro que desea borrar el artículo?");
            if(!flag){
                e.preventDefault();
            }
        });
    }
    console.log("Creados eventos de escuchación");
});