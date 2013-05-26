var contenidoInicial;

$(document).ready(function(){
contenidoInicial=$("#contenidoGeneral").html();
$("#contenedorCarga").hide();
/*$('select').selectmenu({ nativeMenu: "false" });*/
});


function nuevoContenido(id){
	switch(id){
		case 1:
	/*	 meses=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
			for(i=1;i<=31;i++){
				$("#dia").append('<option value="'+i+'">'+i+'</option>');
			}
			for(i=0;i<12;i++){
				$("#mes").append('<option value="'+(i-1)+'">'+meses[i]+'</option>');
			}
			for(i=2004;i<2020;i++){
				$("#anno").append('<option value="'+(i)+'">'+i+'</option>');
			}		*/
			$(".header").html("<img src='img/headerInfoSemanall.png' />");
			$("#pagInicio").hide();
			$("#TemasSemanales").hide();
			$("#Descuentos").hide();
			$("#juegos").hide();
			$("#TemasSemanales").hide();
			/*$("#dia").html();
			$("#mes").html();
			$("#anno").html();*/
			$("#pagInfoSemanal").show();
		break;
		case 2:
			$(".header").html("<img src='img/headerTemaSemanall.png' />");
			$("#pagInicio").hide();
			$("#pagInfoSemanal").hide();
			$("#TemasSemanales").hide();
			$("#Descuentos").hide();
			$("#juegos").hide();
			$("#TemasSemanales").show();
			uri="https://movilmultimediasa.com/abcMobil/post.php?info=1";
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				$("#contenidoTemaSemana p").html(json_data);
			});
			scrollActiv("wrapper2","scroller2","no-padding2");
		break;
		case 3:
			$(".header").html("<img src='img/headerTemasEmbarazo.png' />");
			$("#pagInicio").hide();
			$("#pagInfoSemanal").hide();
			$("#TemasSemanales").hide();
			$("#Descuentos").hide();
			$("#juegos").hide();
			$("#TemasEmbarazo").show();
			$("#listaAcTemasEmba").show();
			$("#eventoEmba1").hide();
		break;
		case 4:
			$(".header").html("<img src='img/headerDescuentos.png' />");
			$("#pagInicio").hide();
			$("#pagInfoSemanal").hide();
			$("#TemasSemanales").hide();
			$("#TemasEmbarazo").hide();
			$("#juegos").hide();
			$("#Descuentos").show();
			descuentos();
			scrollActiv("wrapper1","scroller1","no-padding1");
		break;
		case 5:
			$(".header").html("<img src='img/headerJuegos.png' />");
			$("#pagInicio").hide();
			$("#pagInfoSemanal").hide();
			$("#TemasSemanales").hide();
			$("#TemasEmbarazo").hide();
			$("#Descuentos").hide();
			$("#juegos").show();
			juegos();
		break;
	
	}
}
function irEvento(id){
switch(id){
	case 1: 
	$("#listaAcTemasEmba").hide();
	$("#textoNacido").hide();
	/*$("#dia").html();
	$("#mes").html();
	$("#anno").html();
/*	 meses=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		for(i=1;i<=31;i++){
			$("#eventoEmba1 #dia").append('<option value="'+i+'">'+i+'</option>');
		}			
		for(i=0;i<12;i++){
			$("#eventoEmba1 #mes").append('<option value="'+(i-1)+'">'+meses[i]+'</option>');
		}
		for(i=2004;i<2020;i++){
			$("#eventoEmba1 #anno").append('<option value="'+(i)+'">'+i+'</option>');
		}*/
	$("#eventoEmba1").show();
	break;
	case 3:
		$("#listaAcTemasEmba").hide();
		$("#textoNacido").hide();
		$("#eventoEmba1").hide();
		$(".listaDeNombreBB").hide();
		$("#eventoEmba3").show();
		$("#ninno, #ninna").show();
	break;
			
}

}
function calcular(){
$("#listaAcTemasEmba").hide();
$("#textoNacido").show();
$("#eventoEmba1").show();
 meses=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	Dia=$("#eventoEmba1 #dia").val();
	Mes=$("#eventoEmba1 #mes").val();
	anno=$("#eventoEmba1 #anno").val();
	annoParto=parseInt(anno);
	mesde_parto="";
	if(Mes>2){
	mesde_parto=meses[Mes-3];
	annoParto=(parseInt(anno)+1);
	}else{
	mesde_parto=meses[parseInt(Mes)+9];
	}
	fechaNacimiento=(parseInt(Dia)+7)+" de "+mesde_parto+" del "+annoParto;
	$("#eventoEmba1 #resultadoPar").html(fechaNacimiento);
	$("#eventoEmba1 #resultadoPar").show();
	
	
}
function generoN(id){
$("#eventoEmba2").hide();
$("#eventoEmba1").hide();
$("#ninno, #ninna").hide();
uri="https://movilmultimediasa.com/abcMobil/post.php?gen="+id;
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				$(".listaDeNombreBB ul").html("");
				if(id==2){
				$(".listaDeNombreBB").attr("id","ninoNombres");			
				}else{
				$(".listaDeNombreBB").removeAttr("id");			
				}
				for(index in json_data){
				$(".listaDeNombreBB ul").append("<li>"+json_data[index].nombre+"</li>");					
				}
				scrollActiv("wrapper","scroller","no-padding");
			});
$(".listaDeNombreBB").show();
}
function descuentos(){
			$("#eventoEmba2").hide();
			$("#eventoEmba1").hide();
			$("#ninno, #ninna").hide();
			uri="https://movilmultimediasa.com/abcMobil/post.php?des=1";
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				$(".listaDescuentos").html("");
				cont=1;
				for(index in json_data){
				color="colorNormal";
				if((cont%2)!=0){
				color="cambioColor";
				}
				$(".listaDescuentos").append("<li class='"+color+"'><div class='imgPromo'><img src='https://movilmultimediasa.com/abcMobil/imgDescuentos/"+json_data[index].img+"'/></div><div class='textoDesc'>"+
				"<h3>"+json_data[index].tituloPromo+"</h3>"+
				"<p>Aplica desde: "+json_data[index].desde+"</p>"+
				"<p>Hasta: "+json_data[index].hasta+"</p>"+
				"<p>Descripci&oacute;n: "+json_data[index].descripcion+"</p>"+
				"</div></li>");					
				cont++;
				}
			});
$(".listaDeNombreBB").show();
}
function juegos(){
uri="https://movilmultimediasa.com/abcMobil/post.php?des=1";
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				$(".listaJuegos").html("");
				cont=1;
				for(index in json_data){
				color="colorNormal";
				if((cont%2)!=0){
				color="cambioColor";
				}
				$(".listaJuegos").append("<li class='"+color+"'></li>");	
				/*$(".listaJuegos").append("<li class='"+color+"'><img src='https://movilmultimediasa.com/abcMobil/imgDescuentos/"+json_data[index].img+"'/>"+
				"<h3>"+json_data[index].tituloPromo+"</h3>"+
				"<p>Aplica desde: "+json_data[index].desde+"</p>"+
				"<p>Hasta: "+json_data[index].hasta+"</p>"+
				"<p>Descripci&oacute;n: "+json_data[index].descripcion+"</p>"+
				"</li>");*/					
				cont++;
				}
			});
$(".listaJuegos").show();
}
function inicio(){
	

}
function scrollActiv(div,clase,pad){
	myScroll = new iScroll( div, {
		scrollbarClass: clase,
		useTransform: false,
		fadeScrollbar:false,
		hideScrollbar:false,
		checkDOMChanges: true,
		onBeforeScrollStart: function (e) {
			var target = e.target;
			while (target.nodeType != 1) target = target.parentNode;
			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				e.preventDefault();
			}
		});
			
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		/*Etiqueta ALT del bot—n que se encuentra en el campo de busqueda*/
		$('#contenedorgeneral').find('.ui-input-search .ui-input-clear').attr('title','Eliminar entrada');
		
		/*	ID del contenido de la p‡gina mobile. 
			Forzar refresco en la altura del elemento contenedor para que el scroll se 
			muestre y se adapte sin problemas si redimensionamos el navegador
		*/
			
		$(window).resize(function(){
				$('#'+pad).width($(window).width());
				$('#'+pad).height($(window).height()-45);
		});

		$(window).resize();
		
		/*INI iScroll forzar refresco para que la barra se muestre correctamente*/
		
		$(window).load(function() {
  			myScroll.refresh();
		});

}
function volver(){
$(".header").html("<img src='img/hederPrincipal.png' />");
$("#pagInfoSemanal").hide();
$("#TemasSemanales").hide();
$("#TemasEmbarazo").hide();
$(".listaDeNombreBB ul").html("");
$("#Descuentos").hide();
$(".listaDeNombreBB").hide();
$("#juegos").hide();
$("#ninno, #ninna").hide();
$(".listaJuegos").hide();
$("#pagInicio").show();
}