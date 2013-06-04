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
$('.link').on('tap', function() {
    url = $(this).attr("rel");   
	alert(url);
    loadURL(url);
});

function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
} 
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
			localStorage.infoSolicitada=0;
$("#pagInfoSemanal").on('pagecreate', function(){
//alert(localStorage.infoSolicitada);
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
			localStorage.infoSolicitada=1;
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
fecha = new Date(fecha);
hoy = new Date()
ed = ((hoy -fecha)/12/30.5/24/60/60/1000)*12;
ed = String(ed).split('.');
edadNacido1=ed[0];
semapu='1';
}else if(embarazo!=""){
embarazoDtos=embarazo;
 }
hoy = new Date()
 db.transaction(function(tx) {
tx.executeSql('insert into BBEMBARAZO(id, edad, semanasEmba,semanasPubli,fechaIngreso) values (1,"'+edadNacido1+'","'+embarazoDtos+'","'+semapu+'","'+hoy+'")');
   });
   $.mobile.changePage($("#infosolicitada"), "none");
}
$("#TemasSemanales").on('pageinit', function(){
db.transaction(function(tx) {
	//tx.executeSql('DROP TABLE descuentos ');
	tx.executeSql('create table if not exists temaSeman(id,titulo,texto)');
	});
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
			});
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
	db.transaction(function(tx) {
	//tx.executeSql('DROP TABLE descuentos ');
	tx.executeSql('create table if not exists descuentos(id,tituloPromo,desde,hasta,descripcion,img,version)');
	});
	uri="https://movilmultimediasa.com/abcMobil/post.php?des=1";
	$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
		$(".listaDescuentos").html("");
		cont=1;
		$(".listaDescuentos").append('<li id="wrapper"></li><li id="headerinter"></li>');				
			version0=0 ;
		db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM descuentos', [], function (tx, results) {
			if(results.rows.length!=0 ){ version0=results.rows.item(0).version; }
		}, null);
		 });				
		for(index in json_data){
			db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM descuentos', [], function (tx, results) {
				if(json_data[index].version!=version0){
				tx.executeSql('insert into descuentos(id,tituloPromo,desde,hasta,descripcion,img,version) values ("'+json_data[index].id+'","'+json_data[index].tituloPromo+'","'+json_data[index].desde+'","'+json_data[index].hasta+'","'+json_data[index].descripcion+'","'+json_data[index].img+'","'+json_data[index].version+'")');
				 }		  
			}, null);
			 });				
		}
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM descuentos', [], function (tx, results) {
			if(results.rows.length>0){
			for(var i = 0; i < results.rows.length; i++) {
				color="colorNormal";
				if((cont%2)!=0){
				color="cambioColor";
				}
				$(".listaDescuentos").append("<li class='"+color+"'><div class='imgPromo'><img src='https://movilmultimediasa.com/abcMobil/imgDescuentos/"+results.rows.item(i).img+"'/></div><div class='textoDesc'>"+
				"<h3>"+results.rows.item(i).tituloPromo+"</h3>"+
				"<p>Aplica desde: "+results.rows.item(i).desde+"</p>"+
				"<p>Hasta: "+results.rows.item(i).hasta+"</p>"+
				"<p>Descripci&oacute;n: "+results.rows.item(i).descripcion+"</p>"+
				"</div></li>");	
				$(".listaDescuentos").append("<li class='"+color+"'><div class='imgPromo'><img src='https://movilmultimediasa.com/abcMobil/imgDescuentos/"+results.rows.item(i).img+"'/></div><div class='textoDesc'>"+
				"<h3>"+results.rows.item(i).tituloPromo+"</h3>"+
				"<p>Aplica desde: "+results.rows.item(i).desde+"</p>"+
				"<p>Hasta: "+results.rows.item(i).hasta+"</p>"+
				"<p>Descripci&oacute;n: "+results.rows.item(i).descripcion+"</p>"+
				"</div></li>");					
				cont++;
				}			
				}  
				}, null);
		});
		$(".listaDescuentos").append('<li></li><li></li><li id="footerinter"></li>');
		loadedscroll('headerinter','footerinter','wrapper','scroller');
		$('.listaDescuentos').disableSelection();
	});
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
//* db.transaction(function(tx) {
//tx.executeSql('DROP TABLE generoNinnos ');
/*tx.executeSql('create table if not exists generoNinnos(id,nombre,genero,version)');
});
	version1=0 ;
		db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM generoNinnos where genero="'+id+'"', [], function (tx, results) {
			if(results.rows.length!=0 ){ version1=results.rows.item(0).version; }
		}, null);
		});
uri="https://movilmultimediasa.com/abcMobil/post.php?gen="+id;
$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
	for(index in json_data){
				idIn=json_data[index].id;
				nombreIn=String(json_data[index].nombre);
				generoIn=json_data[index].genero;
				versionIN=json_data[index].version;
		db.transaction(function(tx1) {
				alert('1');
			tx1.executeSql('SELECT * FROM generoNinnos where genero="'+id+'"', [], function (tx, results) {
				alert(nombreIn);
				if(json_data[index].version!=version1){
				//tx.executeSql('insert into generoNinnos(id,nombre,genero,version) values ("'+idIn+'","'+nombreIn+'","'+generoIn+'","'+versionIN+'")');
				 }		  
			}, null);
			 });
	}
		/*db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM generoNinnos where genero="'+id+'"', [], function (tx, results) {
				if(results.rows.length>0){
					for(var i = 0; i < results.rows.length; i++) {
						objetos.append("<li>"+=results.rows.item(i).nombre+"</li>");		
					}
				}  
			}, null);
		});*/
	/*objetos.append('<li></li><li></li><li id="'+footerinter+'"></li>');
	loadedscroll(headerinter,footerinter,wr,scrolle);
});
return true;*/