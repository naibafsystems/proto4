function recargar(){window.location.href=base_url+"personas"}$(function(){redirectBrowser(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").on("click",function(){return $("html, body").animate({scrollTop:0},600),!1});new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("#btnContinuar").on("click",function(){$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"personas/persona/finalizar",type:"POST",dataType:"json",beforeSend:function(){$("#msgSuccess").html("Finalizando la sección..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccess").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),setTimeout(recargar,2e3)):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"persona"})})});