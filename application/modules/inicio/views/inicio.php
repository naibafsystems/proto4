<?php
$msgSuccessFD = $this->session->flashdata('msgSuccess');
$msgErrorFD = $this->session->flashdata('msgError');
$msgWelcomeFD = $this->session->flashdata('msgWelcome');
if(!empty($msgSuccessFD)) {
    $msgSuccess = $msgSuccessFD;
}
if(!empty($msgErrorFD)) {
    $msgError = $msgErrorFD;
}
if(!empty($msgWelcomeFD)) {
    $msgWelcome = $msgWelcomeFD;
}
?>
<div class="row">
    <div class="col-md-12">
        <div id="divMsgSuccess" class="alert alert-success" <?php echo (strlen($msgSuccess) == 0) ? 'style="display: none;"' : ''; ?>>
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong id="msgSuccess"><?= $msgSuccess ?></strong>
        </div>
        <div id="divMsgAlert" class="alert alert-danger" <?php echo (strlen($msgError) == 0) ? 'style="display: none;"' : ''; ?>>
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong id="msgError"><?= $msgError ?></strong>
        </div>
    </div>
</div>
<div id="divMsgWelcome" class="<?php echo (strlen($msgWelcome) > 0) ? 'row' : 'row hidden'; ?>" id="acc_title" tabindex="-1">
    <div class="col-md-12 text-center section-title">
        <h3 class="title-ecenso join-and-tell-us-title"><?= $msgWelcome ?></h3>
    </div>
</div>

<div class="alineacionverticaltexto">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 text-justify">
            <p>Es necesario que complete <strong>todas las preguntas de cada sección para poder avanzar a la siguiente</strong>. Puede guardar y retomar el eCenso cuantas veces lo requiera, sin perder la información ya diligenciada en las distintas secciones y desde cualquier equipo o lugar. Esto, siempre y cuando lo realice dentro del plazo establecido.</p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 text-justify">
            <p><strong>Iniciemos</strong></p>
        </div>
    </div>
    <div class="row estilosinicio">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div id="panelUbicacion" class="panel panel-inicio-disabled">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-12 text-center textobold">
                            <div class="huge"><p>Ubicaci&oacute;n</p></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <img id="imgUbicacion" src="<?= base_url_images("inicio/inicio_ubicacion1.png"); ?>" height="80"/>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div id="subtituloUbicacion" class="col-xs-12 text-center textobold">
                            EMPEZAR <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="textoestilo2"><p>Preguntas sobre la ubicación de su vivienda.</p></div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div id="panelVivienda" class="panel panel-inicio-disabled">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-12 text-center textobold">
                            <div class="huge"><p>Vivienda<p></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <img id="imgVivienda" src="<?= base_url_images("inicio/inicio_vivienda1.png"); ?>" height="80"/>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div id="subtituloVivienda" class="col-xs-12 text-center textobold">
                            EMPEZAR <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="textoestilo2"><p>Preguntas sobre la vivienda en la que reside habitualmente.</p></div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div id="panelHogar" class="panel panel-inicio-disabled">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-12 text-center textobold">
                            <div class="huge"><p>Hogar</p></div>
                        </div>
                    </div>
                    <div class="row imgalineadoabajo">
                        <div class="col-md-12 text-center">
                            <img id="imgHogar" src="<?= base_url_images("inicio/inicio_hogar1.png"); ?>" height="80"/>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div id="subtituloHogar" class="col-xs-12 text-center textobold">
                            EMPEZAR <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="textoestilo2" ><p>Preguntas sobre las características de su hogar.</p></div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 panel-personas-container">
            <div id="panelPersonas" class="panel panel-inicio-disabled">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-12 text-center textobold">
                            <div class="huge"><p>Personas</p></div>
                        </div>
                    </div>
                    <div class="row imgalineadoabajo">
                        <div class="col-md-12 text-center">
                            <img id="imgPersonas" src="<?= base_url_images("inicio/inicio_personas1.png"); ?>" height="80"/>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div id="subtituloPersonas" class="col-xs-12 text-center textobold">
                                EMPEZAR <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="textoestilo2"><p>Preguntas sobre las personas que conforman su hogar.</p></div>
        </div>
    </div>
</div>

<?php if($descargarCertificado == 'SI') { ?>
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">&nbsp;</div>
</div>
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 text-center">
        <button type="button" id="btnDescargar" name="btnDescargar" class="btn btn-dane-success">Ver constancia de diligenciamiento <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> </button>
    </div>
</div>
<?php } ?>
