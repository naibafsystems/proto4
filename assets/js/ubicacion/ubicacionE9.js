function recargar(){window.location.href=base_url+"ubicacion"}$(function(){var e={};redirectBrowser(),$('[data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").click(function(){return $("html, body").animate({scrollTop:0},600),!1}),$('[data-tooltip!=""]').qtip({content:{attr:"data-tooltip"},position:{my:"top left"},style:{classes:"qtip-bootstrap qtip-DANE"}});var a=(new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"}),function(){var a="",i=$("#plantilla_complemento").clone(),o=$("#agregar_comple").children().length;i.attr("id","divComple"+o),e["divComple"+o]={},i.find("input, select").each(function(e,i){a=$(i).attr("name"),$(i).attr("name",a+o)}),$("#agregar_comple").append(i.removeClass("hidden"))});$(".adicion").soloNombre().maxlength(30).verificaEspacios(),$("input[type=radio][name=tiene_comple_direccion]").on("change",function(){1==$(this).val()?a():2==$(this).val()&&$("#agregar_comple").html("")}),$("#agregar_comple").on("change",".otro_comple",function(e){1==$(this).val()&&a()}),$("#agregar_comple").on("blur","input[type=text],select",function(a){item=$(this);var i="",o="";item.attr("class").search("adicionarComple")&&(i=item.parent().parent().parent().parent().attr("id"),e[i][item.data("field")]=item.val()),$.each(e,function(e,a){$.each(a,function(e,a){o=o+" "+a})}),$("#complemento_ingresado").val($.trim(o))}),$("#frmUbicacion").validate({errorClass:"error-form",rules:{tiene_comple_direccion:{required:!0}},messages:{tiene_comple_direccion:{required:"ERROR: Seleccione si la dirección tiene o no complemto."}},onfocusout:function(e){$(e).valid()||$("#"+$(e).attr("id")).focus()},errorPlacement:function(e,a){$(a).parents(".form-group").first().append(e.attr("role","alert"))},highlight:function(e,a,i){$(e).parents(".form-group").first().addClass("has-error")},unhighlight:function(e,a,i){$(e).parents(".form-group").first().removeClass("has-error")},submitHandler:function(e){return!0}}),$("#btnSiguiente").on("click",function(){if($(".alert").addClass("hidden"),1==$("#frmUbicacion").valid()){var e=$("#frmUbicacion").validate(),a="";if($("#agregar_comple").find(".adicionarComple").each(function(e){"complemento"==$(this).attr("name")&&0==$(this).val().length&&(a+="<li>Seleccione todos los tipos de complemento.</li>"),"adicion"==$(this).attr("name")&&0==$(this).val().length&&(a+="<li>Digite todos los complementos.</li>")}),$("#agregar_comple").find(".otro_comple").each(function(e){var i=$(this).attr("name");$("input[type=radio][name="+i+"]").is(":checked")||(a+="<li>Seleccione si quiere agregar otro complemento.</li>")}),a.length>0)return a="<ul>"+a+"</ul>",e.showErrors({tiene_comple_direccion:a}),!1;var i=$("#frmUbicacion").serialize();$.ajax({url:base_url+"ubicacion/guardar",type:"POST",dataType:"json",data:i+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccess").html("Guardando las respuestas..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccess").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),setTimeout(recargar,2e3)):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"ubicacion"})}}),$("#btnAnterior").on("click",function(){$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"ubicacion/regresar",type:"POST",dataType:"json",data:"duracion="+duracionPagina()}).done(function(e){0==e.codiError?($("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),window.location.href=base_url+"ubicacion"):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"ubicacion"})})});