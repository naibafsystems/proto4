function recargar(){window.location.href=base_url+"hogar"}$(function(){redirectBrowser(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").on("click",function(){return $("html, body").animate({scrollTop:0},600),!1}),$('[data-tooltip!=""]').qtip({content:{attr:"data-tooltip"},position:{my:"top left"},style:{classes:"qtip-bootstrap qtip-DANE"}});new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("input[type=radio][name=despojo_tierras]").on("change",function(){1==$(this).val()?$("#despojo_tierras-1-panel").removeClass("hidden"):($("#despojo_tierras-1-panel").addClass("hidden"),$("#anios_despojo").val(""),$("input[name=retorno_despojo]").prop("checked",!1))}),$("#frmHogar").validate({errorClass:"error-form",rules:{despojo_tierras:{required:!0},anios_despojo:{required:!0},retorno_despojo:{required:!0}},messages:{despojo_tierras:{required:"Debes seleccionar una de las opciones del hogar."},anios_despojo:{required:"Debes seleccionar una de las opciones del hogar."},retorno_despojo:{required:"Debes seleccionar una de las opciones del hogar."}},onfocusout:function(e){$(e).valid()||$("#"+$(e).attr("id")).focus()},errorPlacement:function(e,r){$(r).parents(".form-group").first().append(e.attr("role","alert"))},highlight:function(e,r,o){$(e).parents(".form-group").first().addClass("has-error")},unhighlight:function(e,r,o){$(e).parents(".form-group").first().removeClass("has-error")},submitHandler:function(e){return!0}}),$("#btnSiguiente").on("click",function(){if($(".alert").addClass("hidden"),1==$("#frmHogar").valid()){var e=$("#frmHogar").serialize();$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"hogar/guardar",type:"POST",dataType:"json",data:e+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccess").html("Guardando las respuestas..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccess").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(e.avance+"% COMPLETADO").css("width",e.avance+"%"),setTimeout(recargar,2e3)):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"hogar"})}}),$("#btnAnterior").on("click",function(){$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"hogar/regresar",type:"POST",dataType:"json",data:"duracion="+duracionPagina()}).done(function(e){0==e.codiError?($("#progressbar").html(e.avance+"% COMPLETADO").css("width",e.avance+"%"),window.location.href=base_url+"hogar"):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"hogar"})})});