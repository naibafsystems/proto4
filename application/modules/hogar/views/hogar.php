
<?php
echo "<h3>";
echo "El hogar seleccionado es: Hogar N&uacute;mero ";
echo $numHogar;
echo "</h3>";
echo "<div class='row>";
echo "<div class='col-xs-12' >";
for($j=0;$j<count($hogares);$j++){
    
    echo "<button type='button' class='btn btn-danger' aria-label='Left Align'>";
    ?>
    <a href="<?php echo base_url('hogar/edicionHogar/'.$hogares[$j]["H_NROHOG"]) ?>"><?php echo "HOGAR NUMERO ".$hogares[$j]["H_NROHOG"]; ?></a>
    <?php
    echo "</button>";
    
}
echo "</div>";
echo "</div>";
?>
<div class="row">
    <div class="col-xs-12" >
        <button type="button" class="btn btn-danger" aria-label="Left Align">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span><a href="<?php echo base_url('hogar/seleccionHogar') ?>">Agregar Hogar</a>
        </button>
        <button type="button" class="btn btn-danger" aria-label="Left Align">
            <a href="<?php echo base_url('inicio') ?>">Inicio</a>
        </button>
    </div>
</div>
<div class="row">
    <div id="divVideo" class="col-xs-12 col-sm-12 col-md-6 hidden">
        <div class="embed-responsive embed-responsive-16by9">
            <?php if(!empty($URLVideo)) { ?>
                <iframe src="<?=$URLVideo?>?rel=0&fs=0&showinfo=0&modestbranding=1" class="youtube-video" frameborder="0" scrolling="no" height="100%" width="100%" allowfullscreen></iframe>
            <?php } ?>
        </div>
    </div>
    <div id="divForm" class="col-xs-12 col-sm-12 col-md-12">
        <form id="frmHogar" name="frmHogar" role="form" method="post">
            <?php if($mostrarSituaciones == 'SI') {?>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <label class="control-label">¿Algún miembro de su hogar ha vivido alguna de las siguientes situaciones entre 1985 y la fecha de hoy?</label>
                        </div>
                    </div>
                </div>
            <?php } ?>
            <?php foreach ($var as $k => $v) { ?>
                <div class="row">
                    <div id="<?= $v['REFERENCIA_HTML']; ?>-col" class="col-xs-12 col-sm-12 col-md-12 <?php echo(!empty($v['HIDDEN']) && $v['HIDDEN'] == 'SI') ? 'hidden': '';?> ">
                        <fieldset>
                            <div class="form-group">
                                <label id="<?= $v['REFERENCIA_HTML']; ?>-lbl" class="control-label" for="<?= $v['REFERENCIA_HTML'] ?>"> <?= $v['DESCRIPCION'];?>
                                    <?php if (!empty($v['AYUDA'])) { ?>
                                        &nbsp;<span class="glyphicon glyphicon-info-sign font-help" id="<?= $v['REFERENCIA_HTML']; ?>-ayuda" data-tooltip="<?=$v['AYUDA']?>" aria-describedby="acc_ayuda_<?= $v['REFERENCIA_HTML']; ?>" aria-hidden="true"></span>
                                        <div id="acc_ayuda_<?= $v['REFERENCIA_HTML']; ?>" class="acc-offscreen"><?= $v['AYUDA'] ?></div>
                                    <?php } ?>
                                </label>
                                <div>
                                <?php if ($v['TIPO_CAMPO'] == "SELUNICA") {
                                    echo mostrar_select($v, $v["OPCIONES"]);
                                } else if ($v['TIPO_CAMPO'] == "SELUNICA_RAD") {
                                    echo mostrar_radios($v, $v["OPCIONES"]);
                                } else if ($v['TIPO_CAMPO'] == "TEXTO") {
                                    echo mostrar_input_text($v);
                                } ?>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            <?php } ?>
            <div class="row">
                <div class="form-group">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <?php if($mostrarAnterior == 'SI') { ?>
                            <button type="button" id="btnAnterior" name="btnAnterior" class="btn btn-back"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Anterior</button>
                        <?php } ?>
                        <button type="button" id="btnSiguiente" name="btnSiguiente" class="btn btn-dane-success">Guardar y continuar <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12">&nbsp;</div>
            </div>
            <div class="row <?php echo (strlen($msgSuccess) == 0 || strlen($msgError) == 0) ? 'hidden' : ''; ?>" id="divMsg">
                <div class="form-group">
                    <div class="col-md-12">
                        <div id="divMsgSuccess" class="alert alert-success <?php echo (strlen($msgSuccess) == 0) ? 'hidden' : ''; ?>">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong id="msgSuccess"><?= $msgSuccess ?></strong>
                        </div>
                        <div id="divMsgAlert" class="alert alert-danger <?php echo (strlen($msgError) == 0) ? 'hidden' : ''; ?>">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong id="msgError"><?= $msgError ?></strong>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>