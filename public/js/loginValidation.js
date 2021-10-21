window.addEventListener("load",()=>{
    /* declaración de los inputs*/
    let nombreUsuario= document.querySelector("#nombreUsuario");
    let password= document.querySelector("#password");
    let form = document.querySelector("#formulario");
    /* declaración de los mensajes de error */
    let usuarioError= document.querySelector("p#usuarioError");
    let passwordError= document.querySelector("p#passwordError");
    let errorSubmit=document.querySelector("p#errorSubmit");

    let error=[1,1];
    let mensaje="";
    let cambioMensaje = (caja, mensaje)=>{
        caja.innerHTML=mensaje;
    }

    let cambioColor = (input, condicion)=>{
        if (condicion){
            input.classList.add("caja-error");
            input.classList.remove("caja-ok");
        }
        else {
            input.classList.add("caja-ok");
            input.classList.remove("caja-error");
        }
    }
    nombreUsuario.addEventListener("input",(e)=>{
        if (nombreUsuario.value==""){
            error[0]=1;
            mensaje= "Escribe tu nombre de usuario";
            cambioMensaje(usuarioError, mensaje)
            cambioColor(nombreUsuario, true);
        }
        else{      
            error[0]=0;   
            mensaje= ""
            cambioMensaje(usuarioError, mensaje)
            cambioColor(nombreUsuario, false);
        }
    });
    password.addEventListener("input",(e)=>{
        if (password.value==""){
            error[1]=1;
            mensaje= "Escribe tu contraseña";
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }
        else{      
            error[1]=0;
            console.log(error)   
            mensaje= ""
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, false);
        }
    });

    form.addEventListener("submit", e=>{
        console.log(error)
        for (let i=0; i<error.length; i++){
            if(error[i]==1){
                mensaje= "¡Faltan datos por llenar!";
                cambioMensaje(errorSubmit, mensaje)
                e.preventDefault();
                return
            }
            else{    
            }
        }    
    });
}); //fin del load