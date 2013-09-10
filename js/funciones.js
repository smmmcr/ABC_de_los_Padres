var contenidoInicial;
var idtema;
var myScroll;
var a = 0;
var db = openDatabase('seguimiento', '1.0', 'seguimiento del bebe', 100 * 1024);
document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
//Inicializamos las BD
checkConnection();

    }
 function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 0;
            states[Connection.ETHERNET] = 1;
            states[Connection.WIFI]     = 1;
            states[Connection.CELL_2G]  = 1;
            states[Connection.CELL_3G]  = 1;
            states[Connection.CELL_4G]  = 1;
            states[Connection.CELL]     = 0;
            states[Connection.NONE]     = 0;
			if(states[networkState]!=0){
			sincronizar();
			}else{
			alert("Para utilizar esta aplicación necesita conexión a internet");
			 navigator.app.exitApp();
			}
        }
function sincronizar(){

	db.transaction(function(tx) {
	//tx.executeSql('DROP TABLE descuentos ');
	tx.executeSql('create table if not exists descuentos(id,tituloPromo,desde,hasta,descripcion,img,version)');
	   tx.executeSql('create table if not exists BBEMBARAZO(id,edad,semanasEmba,semanasPubli,fechaIngreso)');
	   	tx.executeSql('create table if not exists temaSeman(id,titulo,texto TEXT)');
		tx.executeSql('create table if not exists generoNinnos(id,nombre,genero,version,estado)');
	});
	uri="https://movilmultimediasa.com/abcMobil/post.php?des=1";
	$.getJSON(uri + '?function=' + 'check' + '&callback=?', function (json_data) {
	version0=0 ;
	db.transaction(function(tx) {
	tx.executeSql('SELECT * FROM descuentos', [], function (tx, results) {
	if(results.rows.length!=0 ){ version0=results.rows.item(0).version; }
	}, null);
	});				
	db.transaction(function(tx) {
	for(index in json_data){

	if(json_data[index].version!=version0){
	tx.executeSql('insert into descuentos(id,tituloPromo,desde,hasta,descripcion,img,version) values ("'+json_data[index].id+'","'+json_data[index].tituloPromo+'","'+json_data[index].desde+'","'+json_data[index].hasta+'","'+json_data[index].descripcion+'","'+json_data[index].img+'","'+json_data[index].version+'")');
	}
	}
	});		
	});
	version1=0 ;
	db.transaction(function(tx) {
	tx.executeSql('SELECT * FROM generoNinnos', [], function (tx, results) {
	if(results.rows.length!=0 ){ version1=results.rows.item(0).version; }
	}, null);
	});
	uri="https://movilmultimediasa.com/abcMobil/post.php?gen=''";
	$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
	db.transaction(function(tx) {
	for(index in json_data){
	idIn=json_data[index].id;
	var nombreIn=String(json_data[index].nombre);
	var generoIn=json_data[index].genero;
	var versionIN=json_data[index].version;		
	if(json_data[index].version!=version1){
	tx.executeSql('insert into generoNinnos(id,nombre,genero,version,estado) values ("'+idIn+'","'+nombreIn+'","'+generoIn+'","'+versionIN+'","1")');
	}		  			
	}
	});	
	});
	
}
 function goToNext() {
    window.open('https://www.facebook.com/elabcdelospadres?fref=ts', '_blank', 'location=yes');  
    }
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
/*function loadedscroll(headerinter,footerinter,wrapper,scroller) {
	setHeight(headerinter,footerinter,wrapper);
	myScroll = new iScroll(scroller, {desktopCompatibility:true});
}
function setHeight(headerinter,footerinter,wrapper) {
	var headerH = document.getElementById(headerinter).offsetHeight,
		footerH = document.getElementById(footerinter).offsetHeight,
		wrapperH = window.innerHeight - headerH - footerH;
		document.getElementById(wrapper).style.height = wrapperH + 'px';
}*/
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
	 var tipotitu;
	( infoASoli === "ninnoSemanas" ) ? tipotitu="Semanas de nacido" : tipotitu="Semanas de Embarazo";
	$("#infosolicitada ul").disableSelection();
	$("#infosolicitada ul").html("");
	 uri="https://movilmultimediasa.com/abcMobil/post.php?infoSolicitada="+infoASoli+"&tiempo="+tiempo+"&semanaPubli="+semanaPubli;
			$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
				for(index in json_data){
				$("#infosolicitada ul").append("<li>"+json_data[index].contenido+"</li>");		
				}
				$("#infosolicitada #titutiempo h3").append("Con "+tiempo+" "+tipotitu);
	
			});
				myScroll3 = new iScroll('infosolicitada');
			setTimeout(function(){
				myScroll3.refresh();
			
			
			},900);
 }, null);
   });
	
});
$("#pagInfoSemanal").on('pagecreate', function(){
alert("divselectsexo top "+$("#divselectsexo").css("top"));
alert("divselectsexo margin-top "+$("#divselectsexo").css("margin-top"));
alert("divselectsexo top "+$("#divselectsexo select").css("top"));
alert("divselectsexo margin-top "+$("#divselectsexo select").css("margin-top"));
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
embarazo=$("#divCiclo select").val();
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
  tx.executeSql('create table if not exists BBEMBARAZO(id,edad,semanasEmba,semanasPubli,fechaIngreso)');
tx.executeSql('insert into BBEMBARAZO(id, edad, semanasEmba,semanasPubli,fechaIngreso) values (1,"'+edadNacido1+'","'+embarazoDtos+'","'+semapu+'","'+hoy+'")');
   });
   $.mobile.changePage($("#infosolicitada"), "none");
}
$("#TemasSemanales").on('pageinit', function(){
	
				db.transaction(function(tx) {
					tx.executeSql('SELECT * FROM temaSeman ORDER BY id', [], function (tx, results) {
						if(results.rows.length>0){
							$("#contenidoTemaSemana ul").disableSelection();
							$("#contenidoTemaSemana ul").html("");
							$("#tituloTemaSemana").append("<h2>"+results.rows.item(0).titulo+"</h2>");					
							$("#contenidoTemaSemana ul").append("<li>"+results.rows.item(0).texto+"</li>");							
									myScroll3 = new iScroll('contenidoTemaSemana', {hScrollbar: false});	
						}  
					}, null);
				});
});
function volverF(){
	var pregunta=confirm("Desea reingresar los datos");
	if(pregunta){
				db.transaction(function(tx) {
		tx.executeSql('DROP TABLE BBEMBARAZO ');
		});
		top.location="#pagInfoSemanal";
	}
}
$("#listaDeNombreBB1").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
$("#listaDeNombreBB1 ul").disableSelection();
$("#listaDeNombreBB1 ul").html("");
	
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

generoN(1,$("#listaDeNombreBB2 ul"),"footerinter2",'headerinter2','wr2','scrolle2');
/*$("#listaDeNombreBB2").on('vclick',function(){loadedscroll('headerinter2','footerinter2','wr2','scrolle2');});*/
});
$("#Descuentos").on('pagecreate', function(){
descuentos();
});
$("#eventoEmba2").on('pagebeforecreate', function(){
		//loadedscroll('headerinterEjer','footerinterEjer','wrEjer','scrolleEjer');
			myScroll3 = new iScroll('divEjer');
			setTimeout(function(){
				myScroll3.refresh();
			
			
			},500);
		
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
var block;
function generoN(id,objetos,footerinter,headerinter,wr,scrolle){		


db.transaction(function(tx) {
			tx.executeSql('create table if not exists bloqueos(id)');						
			tx.executeSql('SELECT * FROM generoNinnos where genero="'+id+'" and estado="1"', [], function (tx, results) {

				if(results.rows.length>0){
					for(var i = 0; i < results.rows.length; i++) {
					var idingreso=results.rows.item(i).id;
					//alert(idingreso);							
						//	alert(block);
						var conte;
						(id==2)?conte="contenidoNombreNinno":conte="contenidoNombresNina";
							sombra="sombraNombreG";
								if((i%2)!=0){
								sombra="sombraNombreT"
								}
								objetos.append("<li class='"+sombra+"' id='"+results.rows.item(i).id+"'>"+results.rows.item(i).nombre+"<a href='javascript:eliminarlista("+results.rows.item(i).id+")' class='remov' >Remover</a></li>");	
								if(i==(results.rows.length-1)){
								
									myScroll3 = new iScroll(conte);
									setTimeout(function(){
									myScroll3.refresh();


									},900);
											
								}
						
					}
				}				
			}, null);
		});
return true;
}
function descuentos(){
		db.transaction(function(tx) {
		cont=1;
		$(".listaDescuentos").html("");
		
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
				cont++;
				}			

		$('.listaDescuentos').disableSelection();
			myScroll3 = new iScroll("conteDescuentos");
									setTimeout(function(){
									myScroll3.refresh();


									},900);
				}  
				}, null);
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
function eliminarlista(id){
//alert(id);
db.transaction(function(tx) {
tx.executeSql('Update generoNinnos set estado=0 where id="'+id+'"');
   });
	$("#"+id).hide();
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
//**/