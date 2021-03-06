$(function () {
    //Si el navegador es Internet Explorer, se redirecciona al módulo de Internet Explorer
    redirectBrowser();

    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

    $('[data-tooltip!=""]').qtip({
        content: { attr: 'data-tooltip' },
        position: { my: 'top left' },
        style: { classes: 'qtip-bootstrap qtip-DANE' }
    });

    var dialogo = new BootstrapDialog({
        title: 'Instancia del dialogo',
        message: 'Mensaje generico'
    });

    $('input[type=radio][name=enfermo]').on('change', function() {
        if($(this).val() == 1) {
            $('#enfermo-1-panel').removeClass('hidden');
        } else if($(this).val() == 2) {
            $('#enfermo-1-panel').addClass('hidden');
            $('#atencion-col').addClass('hidden');
            $('#atencion-1-panel').addClass('hidden');
            $('input[name=tratamiento]').prop('checked', false);
            $('input[name=atencion]').prop('checked', false);
            $('input[name=calidad]').prop('checked', false);
        }
    });



    $('input[type=radio][name=tratamiento]').on('change', function() {
        if($(this).val() == 1) {
            $('#atencion-col').removeClass('hidden');
            var strAncla='#atencion-lbl';
            $('body,html').stop(true,true).animate({
                scrollTop: $(strAncla).offset().top
            },1000);
        } else {
            $('#atencion-col').addClass('hidden');
            $('#atencion-1-panel').addClass('hidden');
            $('input[name=atencion]').prop('checked', false);
            $('input[name=calidad]').prop('checked', false);
        }
    });

    $('input[type=radio][name=atencion]').on('change', function() {
        if($(this).val() == 1) {
            $('#atencion-1-panel').removeClass('hidden');
        } else if($(this).val() == 2) {
            $('#atencion-1-panel').addClass('hidden');
            $('input[name=calidad]').prop('checked', false);
        }
    });

    $('#frmPersona').validate({
        errorClass: 'error-form',
        rules: {
            enfermo: {required: true},
            tratamiento: {required: true},
            atencion: {required: true},
            calidad: {required: true},
        },
        messages: {
            enfermo: {required: 'ERROR: Debe seleccionar si la persona en los últimos 30 días tuvo problemas de salud.'},
            tratamiento: {required: 'ERROR: Debe seleccionar la persona a quién acudió por problemas de salud.'},
            atencion: {required: 'ERROR: Debe seleccionar la persona a quién acudió por problemas de salud.'},
            calidad: {required: 'ERROR: Debe seleccionar la persona a quién acudió por problemas de salud.'},
        },
        /*acc*/
        onfocusout: function (element) {
            if(!$(element).valid()) {
                $('#' + $(element).attr('id')).focus();
            }
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').first().append(error.attr('role', 'alert'));
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').first().addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').first().removeClass('has-error');
        },
        submitHandler: function (form) {
            return true;
        }
    });

    $('#btnSiguiente').on('click', function() {
        $('.alert').addClass('hidden');
        if ($('#frmPersona').valid() == true) {
            var frm = $('#frmPersona').serialize();
            $(':input').addClass('disabled').prop('disabled', true);
            $(':button').addClass('disabled').prop('disabled', true);
            $.ajax({
                url: base_url + 'personas/persona/guardar',
                type: 'POST',
                dataType: 'json',
                data: frm + '&numePers=' + $('#frmPersona').data('nume_pers') + '&duracion=' + duracionPagina(),
                beforeSend: function () {
                    $('#msgSuccess').html('Guardando la(s) respuesta(s). Espere por favor...');
                    $('#divMsg').removeClass('hidden');
                    $('#divMsgSuccess').removeClass('hidden');
                }
            })
            .done(function(data) {
                if(data.codiError == 0) {
                    $('#msgSuccess').html(data.mensaje);
                    $('#divMsg').removeClass('hidden');
                    $('#divMsgSuccess').removeClass('hidden');
                    $('#progressbar').html(data.avance + ' COMPLETADO').css('width', data.avance);
                    //setTimeout(recargar, 2000);
                    recargar();
                } else {
                    $('#msgError').html(data.mensaje);
                    $('#divMsg').removeClass('hidden');
                    $('#divMsgAlert').removeClass('hidden');
                }
            })
            .fail(function(jqXHR) {
                window.location.href = base_url + 'persona';
            });
        }
    });

    $('#btnAnterior').on('click', function() {
        $(':input').addClass('disabled').prop('disabled', true);
        $(':button').addClass('disabled').prop('disabled', true);
        $.ajax({
            url: base_url + 'personas/persona/regresar',
            type: 'POST',
            dataType: 'json',
            data: 'duracion=' + duracionPagina()
        })
        .done(function(data) {
            if(data.codiError == 0) {
                $('#progressbar').html(data.avance + ' COMPLETADO').css('width', data.avance);
                window.location.href = base_url + 'personas/persona';
            } else {
                $('#msgError').html(data.mensaje);
                $('#divMsg').removeClass('hidden');
                $('#divMsgAlert').removeClass('hidden');
            }
        })
        .fail(function(jqXHR) {
            window.location.href = base_url + 'persona';
        });
    });
});

function recargar() {
    window.location.href = base_url + 'personas/persona';
}