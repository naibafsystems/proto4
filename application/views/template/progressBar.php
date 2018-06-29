<?php
$classBar = ($view == 'inicio')?'progress-bar-dane-inicio-fucsia':'progress-bar-dane';
$classFooter = ($view == 'inicio' || $view == 'registro')?'':'';
?>
    <footer class="footer division-footer logged-in-footer">
        <div class="row footer-progress-bar">
            <div class="col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10 col-md-offset-3 col-md-6">
                <div class="progress active">
                    <div id="progressbar" class="progress-bar <?=$classBar?>" style="width: <?=$avance?>" role="alert" aria-valuenow="<?=$avance?> Completado" aria-valuemin="0" aria-valuemax="100">
                        <a class="link-section-inicio" href="" alt="<?=$avance?>"><?=$avance?> COMPLETADO</a>
                    </div>
                </div>
            </div>
            <!-- <div class="col-sm-12 col-md-3 contact-button-container">
                <button id="contact-button" class="contact-button contact-button-logged-in" tabindex="0" aria-label="Abrir información de contacto">
                    <img class="contact-button-icon chat-icon-image chat-icon-image-logged-in" src="<?=base_url_images('chat_blanco.png'); ?>" align="left" alt="icono de chat">
                    <span class="contact-button-text button-text-logged-in" tabindex="0">CONTÁCTENOS</span>
                </button>

                <div id="chat-info-container" class="chat-info-container chat-info-container-logged-in hidden">
                    <div class="close-chat-info-container">
                        <div class="chat-title-column chat-icon-container">
                            <img class="icon-chat-title  chat-icon-image " src="<?=base_url_images('chat_blanco.png'); ?>" alt="icono de chat">
                        </div>
                        <div class="chat-title-column chat-info-title">
                            <p class="title-chat-container">CONTÁCTENOS</p>
                        </div>
                        <div class="title-chat-separator"></div>
                        <div id="chat-title-column" class="chat-title-column chat-icon-container" tabindex="0" role="button" aria-label="Cerrar información de contacto">
                            <img class="close-chat-info-icon" src="<?=base_url_images('cerrar_blanco.png'); ?>" alt="icono de cerrar chat">
                        </div>
                    </div>
                    <div class="enter-chat-button-container">
                        <button id="enter-chat-button" class="enter-chat-button">INGRESE AL CHAT</button>
                    </div>
                    <div class="info-chat-container">
                        <div class="info-chat-text-container">
                            <p class="subtitle-chat-info margin-top-chat-text" tabindex="0">Línea de atención al usuario:</p>
                            <p class="chat-info-text" tabindex="0">018000 942 123  |  (571) 597 8323</p>
                            <p class="subtitle-chat-info" tabindex="0">Horario:</p>
                            <p class="chat-info-text set-margin-cero" tabindex="0">Lunes a domingo</p>
                            <p class="chat-info-text" tabindex="0">6:00 a.m a 11:00 pm</p>
                            <p class="subtitle-chat-info" tabindex="0">Correo electrónico:</p>
                            <p class="chat-info-text" tabindex="0">ecenso@dane.gov.co</p>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </footer>
<!--</div>-->





