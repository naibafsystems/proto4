$(function(){redirectBrowser(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").on("click",function(){return $("html, body").animate({scrollTop:0},600),!1});var a=new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("#formulario").soloNumeros().maxlength(15).verificaEspacios(),$("#nombre1Pers").soloNombre().maxlength(30).convertirMayuscula().verificaEspacios(),$("#nombre2Pers").soloNombre().maxlength(30).convertirMayuscula().verificaEspacios(),$("#apellido1Pers").soloNombre().maxlength(30).convertirMayuscula().verificaEspacios(),$("#apellido2Pers").soloNombre().maxlength(30).convertirMayuscula().verificaEspacios();var e=$("#tabla_personas").DataTable({processing:!0,columns:[{data:"tipo_docu"},{data:"nume_docu"},{data:"nombre"},{data:"jefe"},{data:"sexo"},{data:"edad"},{data:"opciones"}],language:{url:base_url+"assets/plugins/DataTables/datatables.locale-es.json"},paging:!0,pageLength:50,bFilter:!0,ordering:!0,responsive:!0,searching:!1,info:!1});$.fn.buscarPersonas=function(){for(var a=0,s=generarURLserialize("formUsuario"),o=0;o<s.length;o++)isNaN(s[o])&&s[o].indexOf("%2F")>0&&(s[o]=formatearFecha(s[o])),"-"==s[o]&&a++;a<7&&($("#btnBuscar").button("loading"),e.ajax.url(base_url+"personas/consultarGrillaSoporte/"+s.join("/")).load())},$("#formUsuario").on("submit",function(a){a.preventDefault(),$(this).buscarPersonas()}),$("#btnBuscar").on("click",function(){$(this).buscarPersonas()}),$("#tabla_personas").on("click",".verHogar",function(){$(this).parents("form").find("input,select").not("[type=hidden]").val("");var e=$(this);$.ajax({url:base_url+"hogar/validarHogar",type:"POST",dataType:"json",data:{encuesta:e.data("encuesta"),opc:"verHogar"}}).done(function(e){0==e.codiError?window.location.href=e.url:(a.setTitle("Error al consultar el proceso"),a.setType(BootstrapDialog.TYPE_DANGER),a.setMessage(e.mensaje),a.open())}).fail(function(e){a.setTitle("Error al consultar el proceso"),a.setType(BootstrapDialog.TYPE_DANGER),a.setMessage(e.responseText),a.open()})}),$("#tabla_personas").on("draw.dt",function(){$("#btnBuscar").button("reset")}),$("#tabla_personas").on("click",".verEntrevistas",function(){$(this).parents("form").find("input,select").not("[type=hidden]").val("");var e=$(this);$.ajax({url:base_url+"encuesta/verResultadoEntrevistas",type:"POST",dataType:"json",data:{encuesta:e.data("encuesta")}}).done(function(e){0==e.codiError?(a.setTitle(e.title),a.setType(BootstrapDialog.TYPE_INFO),a.setSize(BootstrapDialog.SIZE_WIDE),a.setMessage($(e.view)),a.onShown(function(){$(".tabla_entrevistas").DataTable({paging:20,info:!1,search:!1,language:{url:base_url+"assets/plugins/DataTables/datatables.locale-es.json"}})})):(a.setTitle("Error al consultar las entrevistas"),a.setType(BootstrapDialog.TYPE_DANGER),a.setMessage(e.mensaje)),a.open()}).fail(function(e){a.setTitle("Error al consultar las entrevistas"),a.setType(BootstrapDialog.TYPE_DANGER),a.setMessage(e.responseText),a.open()})}),$("#tabla_personas").on("draw.dt",function(){$("#btnBuscar").button("reset")})});