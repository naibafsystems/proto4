function recargar(){window.location.href=base_url+"ubicacion"}$(function(){var e={bis_via:"",bis_via2:""};redirectBrowser(),$('[data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").click(function(){return $("html, body").animate({scrollTop:0},600),!1}),$('[data-tooltip!=""]').qtip({content:{attr:"data-tooltip"},position:{my:"top left"},style:{classes:"qtip-bootstrap qtip-DANE"}});new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"});$("#letra_via").soloNombre().maxlength(3),$("#letra_sufijo").soloNombre().maxlength(3),$("#letra_via2").soloNombre().maxlength(3),$("#letra_sufijo2").soloNombre().maxlength(3),$("#numero_placa").soloNumeros().maxlength(3),$("#direccion").prop("readOnly",!0),$("input[type=checkbox]").on("click",function(){$(this).is(":checked")?e[$(this).attr("id")]="BIS":e[$(this).attr("id")]=""}),$("#frmUbicacion").on("blur","input,select",function(a){item=$(this);var i="";e[item.attr("id")]=item.val(),void 0!=e.tipo_via&&e.tipo_via.length>0&&(i=i+" "+e.tipo_via),void 0!=e.numero_via&&e.numero_via.length>0&&(i=i+" "+e.numero_via),void 0!=e.letra_via&&e.letra_via.length>0&&(i=i+" "+e.letra_via),void 0!=e.bis_via&&e.bis_via.length>0&&(i=i+" "+e.bis_via),void 0!=e.letra_sufijo&&e.letra_sufijo.length>0&&(i=i+" "+e.letra_sufijo),void 0!=e.cuadrante&&e.cuadrante.length>0&&(i=i+" "+e.cuadrante),void 0!=e.tipo_via2&&e.tipo_via2.length>0&&(i=i+" "+e.tipo_via2),void 0!=e.numero_via2&&e.numero_via2.length>0&&(i=i+" "+e.numero_via2),void 0!=e.letra_via2&&e.letra_via2.length>0&&(i=i+" "+e.letra_via2),void 0!=e.bis_via2&&e.bis_via2.length>0&&(i=i+" "+e.bis_via),void 0!=e.letra_sufijo2&&e.letra_sufijo2.length>0&&(i=i+" "+e.letra_sufijo2),void 0!=e.numero_placa&&e.numero_placa.length>0&&(i=i+" "+e.numero_placa),void 0!=e.cuadrante2&&e.cuadrante2.length>0&&(i=i+" "+e.cuadrante2),void 0!=e.complemento&&e.complemento.length>0&&(i=i+" "+e.complemento),void 0!=e.texto_complemento&&e.texto_complemento.length>0&&(i=i+" "+e.texto_complemento),$("#direccion").val($.trim(i))}),$("#frmUbicacion").validate({errorClass:"error-form",rules:{tipo_via:{selectVacio:!0},numero_via:{required:!0},tipo_via2:{selectVacio:!0},numero_via2:{required:!0},numero_placa:{required:!0}},messages:{tipo_via:{selectVacio:"ERROR: El tipo de vía no puede estar vacio."},numero_via:{required:"ERROR: Digite el número de vía."},tipo_via2:{selectVacio:"ERROR: El tipo de vía generadora no puede estar vacio."},numero_via2:{required:"ERROR: Digite el número de vía generadora."},numero_placa:{required:"ERROR: Digite el número de placa."}},onfocusout:function(e){$(e).valid()||$("#"+$(e).attr("id")).focus()},errorPlacement:function(e,a){var i=$("<li></li>");i.append(e),$("#direccion-error").append(i),$(a).parents(".form-group").first().append(e.attr("role","alert"))},highlight:function(e,a,i){$(e).parents(".form-group").first().addClass("has-error")},unhighlight:function(e,a,i){$(e).parents(".form-group").first().removeClass("has-error")},submitHandler:function(e){return!0}}),$("#btnSiguiente").on("click",function(){if($(".alert").addClass("hidden"),1==$("#frmUbicacion").valid()){var e=$("#frmUbicacion").serialize();$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"ubicacion/guardar",type:"POST",dataType:"json",data:e+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccess").html("Guardando las respuestas..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(e){0==e.codiError?($("#msgSuccess").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),setTimeout(recargar,2e3)):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"ubicacion"})}}),$("#btnAnterior").on("click",function(){$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"ubicacion/regresar",type:"POST",dataType:"json",data:"duracion="+duracionPagina()}).done(function(e){0==e.codiError?($("#progressbar").html(e.avance+" COMPLETADO").css("width",e.avance),window.location.href=base_url+"ubicacion"):($("#msgError").html(e.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(e){window.location.href=base_url+"ubicacion"})})});