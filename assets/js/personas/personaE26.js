function recargar(){window.location.href=base_url+"personas/persona"}$(function(){redirectBrowser(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").on("click",function(){return $("html, body").animate({scrollTop:0},600),!1}),$('[data-tooltip!=""]').qtip({content:{attr:"data-tooltip"},position:{my:"top right"},style:{classes:"qtip-bootstrap qtip-DANE"},show:{event:"load",ready:!0},hide:function(e,o){$(this).show()}}),$("input[type=radio][name=cotizando_pension]").on("change",function(){1==$(this).val()?$("#cotizando_pension-1-panel").removeClass("hidden"):($("#cotizando_pension-1-panel").addClass("hidden"),$("input[name=fondo_cotiza]").prop("checked",!1))});new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("#frmPersona").validate({errorClass:"error-form",rules:{cotizando_pension:{required:!0},fondo_cotiza:{required:!0}},messages:{cotizando_pension:{required:"ERROR: Seleccione si la persona está cotizando actualmente a un fondo de pensiones."},fondo_cotiza:{required:"ERROR: Debe seleccionar un fondo de pensiones."}},onfocusout:function(e){$(e).valid()||$("#"+$(e).attr("id")).focus()},errorPlacement:function(e,o){$(o).parents(".form-group").first().append(e.attr("role","alert"))},highlight:function(e,o,a){$(e).parents(".form-group").first().addClass("has-error")},unhighlight:function(e,o,a){$(e).parents(".form-group").first().removeClass("has-error")},submitHandler:function(e){return!0}}),$("#btnSiguiente").on("click",function(){if($(".alert").addClass("hidden"),1==$("#frmPersona").valid()){$(this).addClass("disabled").prop("disabled",!0);var e=$("#frmPersona").serialize();$.ajax({url:base_url+"personas/persona/guardar",type:"POST",dataType:"json",data:e+"&numePers="+$("#frmPersona").data("nume_pers")+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccess").html("Guardando la(s) respuesta(s). Espere por favor..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccess").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),setTimeout(recargar,2e3)):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"persona"})}}),$("#btnAnterior").on("click",function(){$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"personas/persona/regresar",type:"POST",dataType:"json",data:"duracion="+duracionPagina()}).done(function(e){0==e.codiError?($("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),window.location.href=base_url+"personas/persona"):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"persona"})})});