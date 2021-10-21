window.addEventListener("load", e => {

	const urlParams = new URLSearchParams(window.location.search);
	const pageParam = urlParams.get('page');
	
	let fetchString = "/api/products?page=1";
	if(pageParam){
		fetchString ="/api/products?page="+pageParam;
	}


	fetch(fetchString)
	.then(response=>{return response.json();})
	.then(data=>{

		let pages=Math.ceil(data.count/10);

		let changer=document.querySelector("div.page-changer");

		let prev = document.createElement("a");
		prev.innerHTML="<i class='fas fa-arrow-left'></i>";
		if(data.previous){
			prev.href="/?page="+(parseInt(data.page)-1);
		}
		if(data.page!=1){
			prev.classList.add("accesible");
		}
		changer.appendChild(prev);

		for (let i = 0; i < pages; i++) {
			let a=document.createElement("a");
			a.innerHTML = ` ${i+1} `;
			a.href="/?page="+(i+1);
			if(data.page==i+1){
				a.style.color="red";
				a.removeAttribute("href");
			}else{
				a.classList.add("accesible");
			}
			changer.appendChild(a);
		}

		let next = document.createElement("a");
		next.innerHTML='<i class="fas fa-arrow-right"></i>';
		if(data.next){
			next.href="/?page="+(parseInt(data.page)+1);
		}
		if(data.page!=pages){
			next.classList.add("accesible");
		}
		changer.appendChild(next);
	})
	.catch(error=>{
		console.log(error);
	})

	//Recomendaciones
	fetch("/api/products",{
		mode: "no-cors"
	})
	.then(response=>{return response.json();})
	.then(data=>{
		//genera un array vacío con números que representan 5 productos al azar sin repetición.
		ids=[];
		do{
			let random=Math.floor(Math.random()*data.count);
			let comparacion = ids.findIndex(el=>el==random);
			if(comparacion==-1){
				ids.push(random);
			}
		}while(ids.length!=5);

		let recImg = document.querySelectorAll("div.recommendation-bar img");
		let recA = document.querySelectorAll("div.recommendation-bar a");
		for (let i = 0; i < 5; i++) {
			recImg[i].src="/img/products/"+data.products[ids[i]].image;
			recA[i].href="/products/"+data.products[ids[i]].id;
		}
	})
	.catch(error=>{
		console.log(error);
	})


	//Carrusel
    var carrousel = {
		nbSlide : 0,
		nbCurrent : 1,
		elemCurrent : null,
		elem : null,
		timer : null,
		init : function(elem){
			this.nbSlide = elem.find(".slide").length;
			//crea paginación
			elem.append('<div class="carrousel-picto"></div>');
			for(var i=1;i<=this.nbSlide;i++){
				elem.find(".carrousel-picto").append("<li><span>"+i+"</span></li>");
			}
			//para ir al slide correspondiente
			elem.find(".carrousel-picto span").click(function(){
				carrousel.gotoSlide($(this).text());
			});
			//evento previo
			elem.find("#carrousel-nav .prev").click(function(){
				carrousel.prev();
			});
			//evento siguiente
			elem.find("#carrousel-nav .next").click(function(){
				carrousel.next();
			});
			//inicialización del carrusel
			this.elem = elem;
			elem.find(".slide").hide();
			elem.find(".slide:first").show();
			this.elemCurrent = elem.find(".slide:first");
			this.elem.find(".carrousel-picto li:first").addClass("active");
			//creación del timer
			carrousel.play();	
			//detiene el carrusel
			elem.mouseover(carrousel.stop);
			elem.mouseout(carrousel.play);
		},
		gotoSlide : function(num){
			if(num == this.nbCurrent){return false;}
			//Animación
			var sens = 1;
				if(num<this.nbCurrent){sens = -1;}
			var cssDepart = {"left":sens*this.elem.width()};
			var cssFin = {"left":sens*-this.elem.width()};
			this.elem.find("#slide"+num).show().css(cssDepart);
			
			this.elem.find("#slide"+num).animate({"top":0,"left":0},500);
			this.elemCurrent.animate(cssFin,500);

			this.elem.find(".carrousel-picto li").removeClass("active");
			this.elem.find(".carrousel-picto li:eq("+(num-1)+")").addClass("active");
			this.nbCurrent = num;
			this.elemCurrent = this.elem.find("#slide"+num);
		},
		next : function(){
			var num = this.nbCurrent+1;
			if(num > this.nbSlide){
				num = 1;
			}
			this.gotoSlide(num);
		},
		prev : function(){
			var num = this.nbCurrent-1;
			if(num <1){
				num = this.nbSlide;
			}
			this.gotoSlide(num);
		},
		stop :function(){
			window.clearInterval(carrousel.timer);
		},
		play : function(){
			window.clearInterval(carrousel.timer);
			carrousel.timer = window.setInterval("carrousel.next",5000);
		}
	}
    $(function(){
		carrousel.init($("#carrousel"));
	});
})