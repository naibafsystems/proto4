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

    $('.scrollup').click(function() {
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

    $('input[type=radio][name=es_servidor]').on('change', function() {
        if($(this).val() == 1) {
            $('#es_servidor-1-panel').removeClass('hidden');
        } else if($(this).val() == 2) {
            $('#es_servidor-1-panel').addClass('hidden');
            $('#entidad').val('');
        }
    });

    $('#entidad').select2({
        allowClear: true,
        //containerCssClass: 'select2-container', // No funciona
        //dropdownCssClass: 'select2-container', // No funciona
        language: 'es',
        //minimumInputLength: 2,
        placeholder: 'Seleccione la entidad',
        theme: 'bootstrap',
        width: '100%'
    });
    
    $('#frmRegistro').validate({
        errorClass: 'error-form',
        rules: {
            es_servidor: {required: true},
            entidad: {selectVacio: true}
        },
        messages: {
            es_servidor: { required: 'ERROR: Seleccione si es servidor público.' },
            entidad: {selectVacio: 'ERROR: Seleccione la entidad.' }
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
        if ($('#frmRegistro').valid() == true) {
            var frm = $('#frmRegistro').serialize();
            $(':input').addClass('disabled').prop('disabled', true);
            $(':button').addClass('disabled').prop('disabled', true);
            $.ajax({
                url: base_url + 'registro/guardar',
                type: 'POST',
                dataType: 'json',
                data: frm + '&duracion=' + duracionPagina(),
                beforeSend: function () {
                    $('#msgSuccess').html('Guardando las respuestas...');
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
                    setTimeout(recargar, 2000);
                } else {
                    $('#msgError').html(data.mensaje);
                    $('#divMsg').removeClass('hidden');
                    $('#divMsgAlert').removeClass('hidden');
                }
            })
            .fail(function(jqXHR) {
                dialogo.setTitle('Error al guardar');
                dialogo.setType(BootstrapDialog.TYPE_DANGER);
                dialogo.setMessage(jqXHR.responseText);
                dialogo.open(); 
            });
        }
    });

    $('#btnAnterior').on('click', function() {
        $(':input').addClass('disabled').prop('disabled', true);
        $(':button').addClass('disabled').prop('disabled', true);
        $.ajax({
            url: base_url + 'registro/regresar',
            type: 'POST',
            dataType: 'json',
            data: 'duracion=' + duracionPagina()
        })
        .done(function(data) {
            if(data.codiError == 0) {
                $('#progressbar').html(data.avance + ' COMPLETADO').css('width', data.avance);
                window.location.href = base_url + 'registro';
            } else {
                $('#msgError').html(data.mensaje);
                $('#divMsg').removeClass('hidden');
                $('#divMsgAlert').removeClass('hidden');
            }
        })
        .fail(function(jqXHR) {
            dialogo.setTitle('Error al regresar');
            dialogo.setType(BootstrapDialog.TYPE_DANGER);
            dialogo.setMessage(jqXHR.responseText);
            dialogo.open();
        });
    });
});

function recargar() {
    window.location.href = base_url + 'registro';
}