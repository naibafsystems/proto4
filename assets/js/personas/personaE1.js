function recargar(){window.location.href=base_url+"personas/persona"}$(function(){redirectBrowser(),$(window).scroll(function(){$(this).scrollTop()>400?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").on("click",function(){return $("html, body").animate({scrollTop:0},600),!1}),$('[data-tooltip!=""]').qtip({content:{attr:"data-tooltip"},position:{my:"top left"},style:{classes:"qtip-bootstrap qtip-DANE"}});var a=(new BootstrapDialog({title:"Instancia del dialogo",message:"Mensaje generico"}),function(a,e){return 0==a.length?($("#"+idCampo+"-error").html("Selecciona la fecha de nacimiento.").removeClass("hide").show(),$("#"+idCampo).val("").focus(),!1):calculaEdad(a,"")==e});$.validator.addMethod("validarFecha",function(a,e,r){var i=$("#"+r[0]).val(),n=$("#"+r[1]).val(),o=$("#"+r[2]).val();if(i.length>0&&n.length>0&&o.length>0){return moment(i+"-"+n+"-"+o).isValid()}return!0}),$.validator.addMethod("validarEdad",function(e,r,i){var n=$("#"+i[0]).val(),o=$("#"+i[1]).val(),d=$("#"+i[2]).val();return!(n.length>0&&o.length>0&&d.length>0)||a(n+"-"+o+"-"+d,e)}),$.validator.addMethod("jefeMenorEdad",function(a,e,r){var i=$("#"+r[0]).val(),n=$("#"+r[1]).val();return i.length>0&&(!(1==n&&i<10)&&($("#"+r[0]+"-error").hide(),$("#"+r[1]+"-error").hide(),!0))}),$("input[type=radio][name=sabe_fecha]").on("change",function(){1==$(this).val()?$("#sabe_fecha-1-panel").removeClass("hidden"):2==$(this).val()&&($("#sabe_fecha-1-panel").addClass("hidden"),$("#anio_naci").val(""),$("#mes_naci").val(""),$("#dia_naci").val(""))}),$("#dia_naci").on("blur",function(){var a=$("#anio_naci").val(),e=$("#mes_naci").val(),r=$("#dia_naci").val();if(a.length>0&&e.length>0&&r.length>0){moment(a+"-"+e+"-"+r).isValid()}}),$("#frmPersona").validate({errorClass:"error-form",rules:{sabe_fecha:{required:!0},anio_naci:{required:!0,validarFecha:["anio_naci","mes_naci","dia_naci"]},mes_naci:{required:!0,validarFecha:["anio_naci","mes_naci","dia_naci"]},dia_naci:{required:!0,validarFecha:["anio_naci","mes_naci","dia_naci"]},edad_persona:{required:!0,validarEdad:["anio_naci","mes_naci","dia_naci"],jefeMenorEdad:["edad_persona","jefe_hogar"]}},messages:{sabe_fecha:{required:"Error: Debes seleccionar una de las opciones del personas."},anio_naci:{required:"Error: Seleccione el año de la fecha de nacimiento.",validarFecha:"Error: La fecha de nacimiento definida no es válida.",validarMayorEdad:"Error: Es menor de edad y no estas habilitado para realizar la inscripción al eCenso."},mes_naci:{required:"Error: Seleccione el mes de la fecha de nacimiento.",validarFecha:"Error: La fecha de nacimiento definida no es válida.",validarMayorEdad:"Error: Es menor de edad y no estas habilitado para realizar la inscripción al eCenso."},dia_naci:{required:"Error: Seleccione el día de la fecha de nacimiento.",validarFecha:"Error: La fecha de nacimiento definida no es válida.",validarMayorEdad:"Error: Es menor de edad y no estas habilitado para realizar la inscripción al eCenso."},edad_persona:{required:"Error: Debe seleccionar la edad de la persona.",validarEdad:"Error: Los años cumplidos no coinciden con la fecha de nacimiento de la persona.",jefeMenorEdad:"ERROR: No puede ser jefe(a) del hogar si es menor de 10 años."}},onfocusout:function(a){$(a).valid()||$("#"+$(a).attr("id")).focus()},errorPlacement:function(a,e){$(e).parents(".form-group").first().append(a.attr("role","alert"))},highlight:function(a,e,r){$(a).parents(".form-group").first().addClass("has-error")},unhighlight:function(a,e,r){$(a).parents(".form-group").first().removeClass("has-error")},submitHandler:function(a){return!0}}),$("#btnSiguiente").on("click",function(){if($(".alert").addClass("hidden"),1==$("#frmPersona").valid()){var a=$("#frmPersona").serialize();$(":input").addClass("disabled").prop("disabled",!0),$(":button").addClass("disabled").prop("disabled",!0),$.ajax({url:base_url+"personas/persona/guardar",type:"POST",dataType:"json",data:a+"&numePers="+$("#frmPersona").data("nume_pers")+"&duracion="+duracionPagina(),beforeSend:function(){$("#msgSuccess").html("Guardando la(s) respuesta(s). Espere por favor..."),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden")}}).done(function(a){0==a.codiError?($("#msgSuccess").html(a.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgSuccess").removeClass("hidden"),$("#progressbar").html(a.avance+" COMPLETADO").css("width",a.avance),setTimeout(recargar,2e3)):($("#msgError").html(a.mensaje),$("#divMsg").removeClass("hidden"),$("#divMsgAlert").removeClass("hidden"))}).fail(function(a){window.location.href=base_url+"persona"})}})});