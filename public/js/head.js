window.addEventListener("load",e=>{
    let main = document.querySelector("main");
    let div = document.createElement("div");
    
    div.style.position = "absolute";
    div.style.width = "300vw";
    // div.style.height = "200vw";
    // div.style.right = "-13vw";
    div.style.left = "-100vw";
    div.style.top = "-15px";
    div.style.bottom = "0px";
    div.style.backgroundColor="var(--fondo-body)";
    div.style.zIndex="-5";
    main.appendChild(div);
})