function recargar(){window.location.href=base_url+"registro"}$(function(){redirectBrowser(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").click(function(){return $("html, body").animate({scrollTop:0},600),!1});var e=new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("#contrasena1").keypress(function(e){if(32==e.charCode)return!1}),$("#contrasena2").keypress(function(e){if(32==e.charCode)return!1}),$("#frmRegistro").validate({errorClass:"error-form",rules:{contrasena1:{required:!0,minlength:8,maxlength:20,validarPass:!0},contrasena2:{required:!0,minlength:8,maxlength:20,validarPass:!0,equalTo:"#contrasena1"}},messages:{contrasena1:{required:"ERROR: Digite una contraseña válida.",minlength:"ERROR: La contraseña debe ser mínimo de {0} caracteres.",maxlength:"ERROR: La contraseña debe ser máximo de {0} caracteres.",validarPass:"ERROR: La contraseña debe contener al menos: una letra mayúscula, una letra minúscula, un número o carácter especial. con mínimo ocho (8) caracteres."},contrasena2:{required:"ERROR: Digite una contraseña válida.",minlength:"ERROR: La contraseña debe ser mínimo de {0} caracteres.",maxlength:"ERROR: La contraseña debe ser máximo de {0} caracteres.",validarPass:"ERROR: La contraseña debe contener al menos: una letra mayúscula, una letra minúscula, un número o carácter especial. con mínimo ocho (8) caracteres.",equalTo:"ERROR: Las contraseñas no coinciden."}},onfocusout:function(e){$(e).valid()||$("#"+$(e).attr("id")).focus()},errorPlacement:function(e,a){$(a).parents(".form-group").first().append(e.attr("role","alert"))},highlight:function(e,a,r){$(e).parents(".form-group").first().addClass("has-error")},unhighlight:function(e,a,r){$(e).parents(".form-group").first().removeClass("has-error")},submitHandler:function(e){return!0}}),$("#btnSiguiente").on("click",function(){if($(".alert").addClass("hidden"),1==$("#frmRegistro").valid()){var a=$.md5($("#contrasena1").val());$("#contrasena1").val(a),$("#contrasena2").val(a);var r=$("#frmRegistro").serialize();$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"registro/guardar",type:"POST",dataType:"json",data:r+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccess").html("Guardando las respuestas..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccess").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),setTimeout(recargar,2e3)):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(a){e.setTitle("Error al guardar"),e.setType(BootstrapDialog.TYPE_DANGER),e.setMessage(a.responseText),e.open()})}}),$("#btnAnterior").on("click",function(){$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"registro/regresar",type:"POST",dataType:"json",data:"duracion="+duracionPagina()}).done(function(e){0==e.codiError?($("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),window.location.href=base_url+"registro"):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(a){e.setTitle("Error al regresar"),e.setType(BootstrapDialog.TYPE_DANGER),e.setMessage(a.responseText),e.open()})}),$(".terminosCondiciones").on("click",function(a){$.ajax({url:base_url+"encuesta/terminosCondiciones",type:"POST",dataType:"json"}).done(function(a){e.setTitle(a.title),e.setType(BootstrapDialog.TYPE_INFO),e.setMessage($(a.view)),e.open()}).fail(function(a){e.setTitle("Manejo de error"),e.setType(BootstrapDialog.TYPE_DANGER),e.setMessage(a.responseText),e.open()})})});