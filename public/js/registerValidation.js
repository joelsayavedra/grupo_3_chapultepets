window.addEventListener('load', ()=>{
    /*declaración de inputs*/
    let nombreUsuario= document.querySelector("#nombreUsuario");
    let nombrePila= document.querySelector("#nombrePila");
    let apellido= document.querySelector("#apellido");
    let email= document.querySelector("#email");
    let password= document.querySelector("#password");
    let confirmacionPassword= document.querySelector("#confirmacionPassword");
    let telefono= document.querySelector("#telefono");
    let avatarPicture= document.querySelector("#btn_enviar");
    let avatarBorde= document.querySelector("div.div_file")
    let form = document.querySelector("#formulario");
    let avatarTexto= document.querySelector("p.texto");

    /* declaración de los mensajes de error */
    let usuarioError= document.querySelector("p#usuarioError");
    let pilaError= document.querySelector("p#pilaError");
    let apellidoError= document.querySelector("p#apellidoError");
    let passwordError= document.querySelector("p#passwordError");
    let confirmarError= document.querySelector("p#confirmarError");
    let emailError= document.querySelector("p#emailError");
    let telefonoError= document.querySelector("p#telefonoError");
    let avatarError= document.querySelector("p#avatarError");
    let errorSubmit=document.querySelector("p#errorSubmit");

    /* Variable que almacena el error */
    let error=[1,1,1,1,1,1,1,0];
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
    /* Clicks sobre el formulario */
    nombreUsuario.addEventListener("input",(e)=>{
        let link= "/api/users/usuario/"+nombreUsuario.value;
        fetch(link)
        .then(result=>{
            return result.json();
        })
        .then(result=>{
            console.log(result);
            if (nombreUsuario.value==""){
                error[0]=1;
                console.log(error);
                mensaje= "Escribe un nombre de usuario para este sitio."
                cambioMensaje(usuarioError, mensaje)
                cambioColor(nombreUsuario, true);
            }
            else if (nombreUsuario.value.length<4){
                error[0]=1;
                console.log(error);
                mensaje= "Debe ser de al menos 4 caracteres."
                cambioMensaje(usuarioError, mensaje)
                cambioColor(nombreUsuario, true);
            }
            else if ((nombreUsuario.value.toLowerCase()==result.nombreUsuario.toLowerCase())){
                error[0]=1;
                console.log(error);
                mensaje= "Lo sentimos, este nombre ya se encuentra en uso."
                cambioMensaje(usuarioError, mensaje)
                cambioColor(nombreUsuario, true);
            } 
            else{      
                error[0]=0;
                console.log(error);    
                mensaje= ""
                cambioMensaje(usuarioError, mensaje)
                cambioColor(nombreUsuario, false);
            }
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });        
    });
    nombrePila.addEventListener("input",()=>{
        if (nombrePila.value==""){       
            error[1]=1;
            console.log(error);     
            mensaje= "Escribe tu nombre."
            cambioMensaje(pilaError, mensaje)
            cambioColor(nombrePila, true);
        }
        else if (nombrePila.value.length<3){
            error[1]=1;
            console.log(error);
            mensaje= "Debe ser de al menos 3 caracteres."
            cambioMensaje(pilaError, mensaje)
            cambioColor(nombrePila, true);
        }   
        else{      
            error[1]=0;
            console.log(error);    
            mensaje= "";
            cambioMensaje(pilaError, mensaje)
            cambioColor(nombrePila, false);
        }
    });
    apellido.addEventListener("input",()=>{
        if (apellido.value==""){      
            error[2]=1;
            console.log(error);      
            mensaje= "Escribe tu apellido."
            cambioMensaje(apellidoError, mensaje)
            cambioColor(apellido, true);
        }
        else if (apellido.value.length<2){
            error[2]=1;
            console.log(error); 
            mensaje= "Debe ser de al menos 2 caracteres."
            cambioMensaje(apellidoError, mensaje)
            cambioColor(apellido, true);
        }   
        else{           
            error[2]=0;
            console.log(error);  
            mensaje= "";
            cambioMensaje(apellidoError, mensaje)
            cambioColor(apellido, false);
        }
    });
    email.addEventListener("input",()=>{
        let link= "/api/users/email/"+email.value;
        fetch(link)
        .then(result=>{
            return result.json();
        })
        .then(result=>{
            console.log(result)
            if (email.value==""){      
                error[3]=1;
                console.log(error);       
                mensaje= "Escribe una dirección de correo electrónico."
                cambioMensaje(emailError, mensaje)
                cambioColor(email, true);
            }
            else if (!email.value.includes("@")){
                error[3]=1;
                console.log(error);
                mensaje= "Debe ser una dirección de correo válida."
                cambioMensaje(emailError, mensaje)
                cambioColor(email, true);
            }
            else if (email.value==result.email){
                error[3]=1;
                console.log(error);
                mensaje= "Lo sentimos, este correo ya se encuentra en uso."
                cambioMensaje(emailError, mensaje)
                cambioColor(email, true);
            } 
            else{         
                error[3]=0;
                console.log(error); 
                mensaje= "";
                cambioMensaje(emailError, mensaje)
                cambioColor(email, false);
            }
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });   
    });
    password.addEventListener("input",()=>{
        let simbolo=["!", "#", "$" ,"%", "&", "*", "+","_"];
        let mayusculas=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        let minusculas=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
        let numeros= ["1","2","3","4","5","6","7","8","9","0"];
        let inputArray= password.value.split("");
        let condicionMinuscula= minusculas.filter(letra=>{
            for (let i=0; i<inputArray.length; i++){
                if(letra==inputArray[i]){
                    return letra;
                }
            }
        });
        let condicionMayuscula= mayusculas.filter(letra=>{
            for (let i=0; i<inputArray.length; i++){
                if(letra==inputArray[i]){
                    return letra;
                }
            }
        });
        let condicionSimbolo= simbolo.filter(letra=>{
            for (let i=0; i<inputArray.length; i++){
                if(letra==inputArray[i]){
                    return letra;
                }
            }
        });
        let condicionNumero= numeros.filter(numero=>{
            for (let i=0; i<inputArray.length; i++){
                if(numero==inputArray[i]){
                    return numero;
                }
            }
        });
        if (password.value==""){
            error[4]=1;
            console.log(error);            
            mensaje= "Escribe una constraseña."
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }
        else if (password.value.length<8){
            error[4]=1;
            console.log(error); 
            mensaje= "La contraseña debe contener al menos 8 caracteres."
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }   
        else if (condicionMinuscula.length==0){
            error[4]=1;
            console.log(error);             
            mensaje= "Debe contener al menos una minúscula.";
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }
        else if(condicionMayuscula.length==0){
            error[4]=1;
            console.log(error); 
            mensaje= "Debe contener al menos una mayúscula."
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }
        else if(condicionNumero.length==0){
            error[4]=1;
            console.log(error); 
            mensaje= "Debe contener al menos un número."
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }
        else if(condicionSimbolo.length==0){
            error[4]=1;
            console.log(error); 
            mensaje= `Debe contener al menos un símbolo. Los símbolos permitidos son ${simbolo.join(", ")}`
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, true);
        }        
        else{
            error[4]=0;
            console.log(error); 
            mensaje= ""
            cambioMensaje(passwordError, mensaje)
            cambioColor(password, false);
        }
    });
    confirmacionPassword.addEventListener("input",()=>{
        if (confirmacionPassword.value==""){
            error[5]=1;
            console.log(error);             
            mensaje= "Por favor confirma la contraseña."
            cambioMensaje(confirmarError, mensaje)
            cambioColor(confirmacionPassword, true);
        }
        else if (confirmacionPassword.value!=password.value){
            error[5]=1;
            console.log(error); 
            mensaje= "Las contraseñas no coinciden."
            cambioMensaje(confirmarError, mensaje)
            cambioColor(confirmacionPassword, true);
        }   
        else{          
            error[5]=0;
            console.log(error);   
            mensaje= "";
            cambioMensaje(confirmarError, mensaje)
            cambioColor(confirmacionPassword, false);
        }
    });
    telefono.addEventListener("input",()=>{
        if (telefono.value==0){
            error[6]=1;
            console.log(error);            
            mensaje= "Escriba su número teléfonico. Solo se aceptan caracteres númericos."
            cambioMensaje(telefonoError, mensaje)
            cambioColor(telefono, true);
        }  
        else if (telefono.value<999999999){
            error[6]=1;
            console.log(error);
            mensaje= "Debe contener al menos 10 caracteres numéricos"
            cambioMensaje(telefonoError, mensaje)
            cambioColor(telefono, true);
        }  
        else{
            error[6]=0;
            console.log(error);
            mensaje= "";
            cambioMensaje(telefonoError, mensaje)
            cambioColor(telefono, false);
        }
    });
    avatarPicture.addEventListener("input",()=>{        
        let extensionesValidas = [".jpg",".png",".gif", ".jpeg"];
        let extension = avatarPicture.value.substring(avatarPicture.value.length-4,avatarPicture.value.length); 
        if(!extensionesValidas.includes(extension.toLowerCase())){
            error[7]=1;
            console.log(error);
            avatarTexto.innerHTML=avatarPicture.value.slice(12,avatarPicture.value.length);
            mensaje= `Formato inválido. La extensiones permitidas son ${extensionesValidas.join(", ")}`;
            cambioMensaje(avatarError, mensaje)
            avatarBorde.style.border="red solid 2px"
        }
        else{
            error[7]=0;
            console.log(error);
            avatarTexto.innerHTML=avatarPicture.value.slice(12,avatarPicture.value.length);
            mensaje= "";
            cambioMensaje(avatarError, mensaje)
            avatarBorde.style.border="rgb(0, 172, 0) solid 2px"
        }
    });
    
    form.addEventListener("submit", e=>{
        console.log(error)
        for (let i=0; i<error.length; i++){
            if(error[i]==1){
                mensaje= "¡Faltan datos por llenar o corregir!";
                cambioMensaje(errorSubmit, mensaje)
                e.preventDefault();
                return
            }
            else{    
            }
        }    
    });
}); /*Fin del load*/