function recargar(){window.location.href=base_url+"ubicacion"}$(function(){redirectBrowser();var e="",a=$("#frmUbicacion");$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").click(function(){return $("html, body").animate({scrollTop:0},600),!1}),$('[data-tooltip!=""]').qtip({content:{attr:"data-tooltip"},position:{my:"top left"},style:{classes:"qtip-bootstrap qtip-DANE"}});new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("#numero_via").textoDireccion().maxlength(20),$("#numero_via2").textoDireccion().maxlength(20),$("#numero_placa").textoDireccion().maxlength(20),$("#complementos").textoDireccion().maxlength(100),$("#tipo_via, #numero_via, #numero_via2, #numero_placa, #complementos").change(function(e){var a=($(this),$("#tipo_via ")),i=$("#numero_via "),r=$("#numero_via2 "),o=$("#numero_placa"),n=$("#complementos");""==a.val()&&""==i.val()&&""==r.val()&&""==o.val()&&""==n.val()&&(a.rules("add",{selectVacio:!0}),i.rules("add",{required:!0}),r.rules("add",{required:!0}),o.rules("add",{required:!0}),n.rules("add",{required:!0})),""==a.val()&&""==i.val()&&""==r.val()&&""==o.val()&&""!=n.val()&&(a.rules("add",{selectVacio:!1}),i.rules("add",{required:!1}),r.rules("add",{required:!1}),o.rules("add",{required:!1}),n.rules("add",{required:!0}),a.valid(),i.valid(),r.valid(),o.valid()),""==a.val()&&""==i.val()&&""==r.val()&&""==o.val()||""!=n.val()||(a.rules("add",{selectVacio:!0}),i.rules("add",{required:!0}),r.rules("add",{required:!0}),o.rules("add",{required:!0}),n.rules("add",{required:!1}),n.valid())}),a.validate({errorClass:"error-form",rules:{tipo_via:{selectVacio:!0},numero_via:{required:!0},numero_via2:{required:!0},numero_placa:{required:!0},complementos:{required:!0}},messages:{tipo_via:{selectVacio:"ERROR: Seleccione el tipo de vía de la dirección."},numero_via:{required:"ERROR: Digite el número de vía de la dirección."},numero_via2:{required:"ERROR: Digite el número de vía secundaria de la  dirección."},numero_placa:{required:"ERROR: Digite el número de placa de la dirección."},complementos:{required:"ERROR: Digite la dirección."}},errorPlacement:function(e,a){$(a).parents(".form-group").first().append(e.attr("role","alert"))},highlight:function(e,a,i){$(e).parents(".form-group").first().addClass("has-error")},unhighlight:function(e,a,i){$(e).parents(".form-group").first().removeClass("has-error")},submitHandler:function(e){return!0}}),$("#btnSiguiente").on("click",function(){1==$("#frmUbicacion").valid()&&($("#divContent").addClass("hidden"),e=$("#tipo_via").val(),$("#numero_via").val().length>0&&(e+=" "+$("#numero_via").val()),$("#numero_via2").val().length>0&&(e+=" &#35; "+$("#numero_via2").val()),$("#numero_placa").val().length>0&&(e+=" - "+$("#numero_placa").val()),$("#complementos").val().length>0&&(e+=" "+$("#complementos").val()),$("#direccion-confirm").html(e),$("#mensajeConfirmacion").removeClass("hidden"))}),$("#btnAnteriorConfirmacion").on("click",function(){$("#divContent").removeClass("hidden"),$("#mensajeConfirmacion").addClass("hidden")}),$("#btnSiguienteConfirmacion").on("click",function(){$(".alert").addClass("hidden");var e=$("#frmUbicacion").serialize();$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"ubicacion/guardar",type:"POST",dataType:"json",data:e+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccessConfirm").html("Guardando las respuestas..."),$("#divMsgConfirm").removeClass("hidden"),$("#divMsgSuccessConfirm").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccessConfirm").html(e.mensaje),$("#divMsgConfirm").removeClass("hidden"),$("#divMsgSuccessConfirm").removeClass("hidden"),$("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),setTimeout(recargar,2e3)):($("#msgErrorConfirm").html(e.mensaje),$("#divMsgConfirm").removeClass("hidden"),$("#divMsgAlertConfirm").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"ubicacion"})}),$("#btnAnterior").on("click",function(){$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"ubicacion/regresar",type:"POST",dataType:"json",data:"duracion="+duracionPagina()}).done(function(e){0==e.codiError?($("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),window.location.href=base_url+"ubicacion"):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"ubicacion"})})});