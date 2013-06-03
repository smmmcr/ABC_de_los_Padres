var contenidoInicial;
var idtema;
var myScroll;
var a = 0;
var db = openDatabase('seguimiento', '1.0', 'seguimiento del bebe', 100 * 1024);
$(document).on('pagecreate', function(){
	$("#contenedorCarga").hide();
	 $.mobile.pushStateEnabled = true;
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.defaultPageTransition = 'none';
	$.mobile.allowCrossDomainPages = true;
	 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
});

function loadedscroll(headerinter,footerinter,wrapper,scroller) {
	setHeight(headerinter,footerinter,wrapper);
	myScroll = new iScroll(scroller, {desktopCompatibility:true});
}
function setHeight(headerinter,footerinter,wrapper) {
	var headerH = document.getElementById(headerinter).offsetHeight,
		footerH = document.getElementById(footerinter).offsetHeight,
		wrapperH = window.innerHeight - headerH - footerH;
		document.getElementById(wrapper).style.height = wrapperH + 'px';
}
$("#infosolicitada").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
db.transaction(function(tx) {
//tx.executeSql('DROP TABLE BBEMBARAZO ');
tx.executeSql('SELECT * FROM BBEMBARAZO', [], function (tx, results) {
	 if(results.rows.length>0){
	 var semanaPubli='';
		if(results.rows.item(0).edad!="" ){
		infoASoli='ninnoSemanas';
			tiempo=results.rows.item(0).edad;
			semanaPubli=results.rows.item(0).semanasPubli;
		//hoy = new Date() sumar cada 30
		}else if(results.rows.item(0).semanas!=""){
			infoASoli='EmbarazoSemanal';
			tiempo=results.rows.item(0).semanasEmba;
		//hoy = new Date() sumar cada 7
		 } 
	 }  
	$("#infosolicitada ul").disableSelection();
	$("#infosolicitada ul").html("");
	$("#infosolicitada ul").append('<li id="wr10"></li><li id="headerinter10"></li>');
	 uri="https://movilmultimediasa.com/abcMobil/post.php?infoSolicitada="+infoASoli+"&tiempo="+tiempo+"&semanaPubli="+semanaPubli;
			$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
				for(index in json_data){
				$("#infosolicitada ul").append("<li>"+json_data[index].contenido+"</li>");		
				}
				$("#infosolicitada ul").append('<li></li><li></li><li id="footerinter10"></li>');
				//loadedscroll('headerinter10','footerinter10','wr10','scrolle10');
			});
 }, null);
   });
});
$("#pagInfoSemanal").on('pagecreate', function(){
$("#divCiclo .disable").css("display","none"); 
$("#nacido .disable").on( "vclick", function() { 
	$("#nacido .disable").css("display","none"); 
	$("#divCiclo input[type='text']").val(""); 
	$("#divCiclo .disable").css("display","block"); 
});
$("#divCiclo .disable").on( "vclick", function() { 
	$("#nacido .disable").css("display","block"); 
	$("#divCiclo .disable").css("display","none"); 
	$("#nacido input[type='text']").val(""); 
});
	db.transaction(function(tx) {
    tx.executeSql('create table if not exists BBEMBARAZO(id,edad,semanasEmba,semanasPubli,fechaIngreso)');
	//tx.executeSql('DROP TABLE BBEMBARAZO ');
	tx.executeSql('SELECT * FROM BBEMBARAZO', [], function (tx, results) {
		 if(results.rows.length>0){
			$.mobile.changePage($("#infosolicitada"), "none");
		 }  
	 }, null);
   });
});
function infonino(){
nacido=$("#nacido input[type='text']").val();
embarazo=$("#divCiclo input[type='text']").val();
var edadNacido1='';
var embarazoDtos='';
var semapu='';
if(nacido!=''){
Dia=$("#fechasDeNacimientoNinno #dia").val();

Mes=$("#fechasDeNacimientoNinno #mes").val();
anno=$("#fechasDeNacimientoNinno #anno").val();


fecha=String(anno+'-'+Mes+'-'+Dia);
alert(fecha);
fecha = new Date(fecha);
hoy = new Date()
//ed = parseInt((hoy -fecha)/60000/60000/240000/365.25/12);
//ed = parseInt((hoy -fecha)/12/30.5/24/60/60/1000)*12;
//Me falta ajustar los meses por dias de diferencia
ed = ((hoy -fecha)/12/30.5/24/60/60/1000)*12;
ed = String(ed).split('.');
edadNacido1=ed[0];
semapu='1';
alert(edadNacido1);
}else if(embarazo!=""){
embarazoDtos=embarazo;
 }
hoy = new Date()
 db.transaction(function(tx) {
//tx.executeSql('DROP TABLE BBEMBARAZO ');
tx.executeSql('insert into BBEMBARAZO(id, edad, semanasEmba,semanasPubli,fechaIngreso) values (1,"'+edadNacido1+'","'+embarazoDtos+'","'+semapu+'","'+hoy+'")');
// tx.executeSql('insert into BBEMBARAZO(id, edad, semanas) values (1,"12","8521")');
// resultado=tx.executeSql('select * from BBEMBARAZO where id="1"'); 
 //alert(resultado);
   });
}
$("#TemasSemanales").on('pageinit', function(){
	uri="https://movilmultimediasa.com/abcMobil/blog.php?blog=1";
			$.fn.disableSelection = function() {
			return this
			.attr('unselectable', 'on')
			.css('user-select', 'none')
			.on('selectstart', false);
			};
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				$("#contenidoTemaSemana ul").disableSelection();
				$("#contenidoTemaSemana ul").html("");
				$("#contenidoTemaSemana ul").append('<li id="wrtema"></li><li id="headerintertema"></li>');		
				$("#contenidoTemaSemana ul").append("<li><h2>"+json_data[0].titulo+"</h2>"+json_data[0].texto+"</li>");				
				$("#contenidoTemaSemana ul").append('<li></li><li></li><li id="footerintertema"></li>');
				loadedscroll('headerintertema','footerintertema','wrtema','scrollertema');
				/*	$(".listacomentarios").html("");
				/*cont=1;
				idtema=json_data[0].id;
	/*uri="https://movilmultimediasa.com/abcMobil/post.php";
		/*	$.getJSON(uri + '?function=' + 'check' + '&comentario='+idtema+'&callback=?', function (json_data) {
				for(index in json_data){
				color="colorNormal";
				if((cont%2)!=0){
				color="cambioColor";
				}
				$(".listacomentarios").append("<li class='"+color+"'><div class='textoDesc'>"+
				"<p>"+json_data[index].comentario+"</p>"+
				"</div></li>");					
				cont++;
				}
			});*/
			});
		
			//scrollActiv("wrapper2","scroller2","no-padding2");
});
$("#listaDeNombreBB1").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
$("#listaDeNombreBB1 ul").disableSelection();
$("#listaDeNombreBB1 ul").html("");
$("#listaDeNombreBB1 ul").append('<li id="wr"></li><li id="headerinter1"></li>');		
generoN(2,$("#listaDeNombreBB1 ul"),"footerinter1",'headerinter1','wr','scrolle1');

});
$("#listaDeNombreBB2").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
$("#listaDeNombreBB2 ul").disableSelection();
$("#listaDeNombreBB2 ul").html("");
$("#listaDeNombreBB2 ul").append('<li id="wr2"></li><li id="headerinter2"></li>');
generoN(1,$("#listaDeNombreBB2 ul"),"footerinter2",'headerinter2','wr2','scrolle2');
/*$("#listaDeNombreBB2").on('vclick',function(){loadedscroll('headerinter2','footerinter2','wr2','scrolle2');});*/
});
$("#Descuentos").on('pagecreate', function(){
descuentos();
});
$("#eventoEmba1").on('pagecreate', function(){
	$("#eventoEmba1 #imagenNacido").hide();
});
function calcular(){
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
	
	$("#eventoEmba1 #imagenNacido").show('slow',function(){
	
	$("#eventoEmba1 #resultadoPar").html(fechaNacimiento);
	$("#eventoEmba1 #resultadoPar").show();	
	
	});	
}
function generoN(id,objetos,footerinter,headerinter,wr,scrolle){		
uri="https://movilmultimediasa.com/abcMobil/post.php?gen="+id;
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				for(index in json_data){
				objetos.append("<li>"+json_data[index].nombre+"</li>");		
				}
				objetos.append('<li></li><li></li><li id="'+footerinter+'"></li>');
				loadedscroll(headerinter,footerinter,wr,scrolle);
			});
			return true;

}
function descuentos(){

			uri="https://movilmultimediasa.com/abcMobil/post.php?des=1";
			$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
				$(".listaDescuentos").html("");
				cont=1;
				$(".listaDescuentos").append('<li id="wrapper"></li><li id="headerinter"></li>');				
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
				$(".listaDescuentos").append("<li class='"+color+"'><div class='imgPromo'><img src='https://movilmultimediasa.com/abcMobil/imgDescuentos/"+json_data[index].img+"'/></div><div class='textoDesc'>"+
				"<h3>"+json_data[index].tituloPromo+"</h3>"+
				"<p>Aplica desde: "+json_data[index].desde+"</p>"+
				"<p>Hasta: "+json_data[index].hasta+"</p>"+
				"<p>Descripci&oacute;n: "+json_data[index].descripcion+"</p>"+
				"</div></li>");					
				cont++;
				}
				$(".listaDescuentos").append('<li></li><li></li><li id="footerinter"></li>');
		loadedscroll('headerinter','footerinter','wrapper','scroller');
		$('.listaDescuentos').disableSelection();
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
function comentar(){
var comentarios1=$("#comentario").val();
	$.ajax({
		type: "POST",
		 crossDomain: true,
		url:  "https://movilmultimediasa.com/abcMobil/post.php",  
		data: {comen: comentarios1,idtema:idtema},
		success: function(data) {
		alert("data")				
		datos1=data;				
		}
	});

}
/*
function scrollActiv(div,clase,pad){
	myScroll = new iScroll( div, {
		scrollbarClass: clase,
		useTransform: false,
		fadeScrollbar:false,
		hideScrollbar:false,
		checkDOMChanges: true,
		desktopCompatibility:true,
		onBeforeScrollStart: function (e) {
			var target = e.target;
			while (target.nodeType != 1) target = target.parentNode;
			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				e.preventDefault();
			}
		});			
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		/*Etiqueta ALT del bot—n que se encuentra en el campo de busqueda*/
	//	$('#contenedorgeneral').find('.ui-input-search .ui-input-clear').attr('title','Eliminar entrada');
		/*	ID del contenido de la p‡gina mobile. 
			Forzar refresco en la altura del elemento contenedor para que el scroll se 
			muestre y se adapte sin problemas si redimensionamos el navegador
		*/
	/*	$(window).resize(function(){
				$('#'+pad).width($(window).width());
				$('#'+pad).height($(window).height()-45);
		});
		$(window).resize();
		/*INI iScroll forzar refresco para que la barra se muestre correctamente*/
	/*	$(window).load(function() {
  			myScroll.refresh();
		});
}*/
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