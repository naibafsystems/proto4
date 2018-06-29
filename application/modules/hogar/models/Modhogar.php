<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Modelo del modulo de hogar
 * @author oagarzond
 * @since  2017-02-21
 **/
class Modhogar extends My_model {

    public $msgError;
    public $msgSuccess;
    private $sufijoTabla;
    private $codiEncuesta;
    private $codiVivienda;
    private $codiHogar;
    private $totalPaginas;

    public function __construct() {
        $this->msgError = '';
        $this->msgSuccess = '';
        $this->codiEncuesta = 0;
        $this->codiVivienda = 0;
        $this->codiHogar = 0;
        $this->totalPaginas = 0;
        $this->sufijoTabla = 'ECP';
        if(in_array($this->config->item('tipoFormulario'), array('G', 'H'))) {
            $this->sufijoTabla = 'WCP';
        }
    }

    public function getMsgError() {
        return $this->msgError;
    }

    public function getMsgSuccess() {
        return $this->msgSuccess;
    }

    public function setCodiEncuesta($codiEncuesta) {
        $this->codiEncuesta = $codiEncuesta;
    }

    public function setCodiVivienda($codiVivienda) {
        $this->codiVivienda = $codiVivienda;
    }

    public function setCodiHogar($codiHogar) {
        $this->codiHogar = $codiHogar;
    }

    public function setTotalPaginas($totalPaginas) {
        $this->totalPaginas = $totalPaginas;
    }

    /**
     * Consulta los datos de la vivienda de la encuesta
     * @access Public
     * @author oagarzond
     * @param Array $arrDatos	Arreglo asociativo con los valores para hacer la consulta
     * @return Array Registros devueltos por la consulta
     */
    public function consultarHogar($arrDatos) {
        $data = array();
        $cond = '';
        $i = 0;
        if (array_key_exists("codiEncuesta", $arrDatos)) {
            $cond .= " AND H.COD_ENCUESTAS = " . $arrDatos["codiEncuesta"];
        }
        if (array_key_exists("idHogar", $arrDatos)) {
            $cond .= " AND H.ID_HOGAR = '" . $arrDatos["idHogar"] . "'";
        }
        if (array_key_exists("idVivienda", $arrDatos)) {
            $cond .= " AND H.ID_VIVIENDA = '" . $arrDatos["idVivienda"] . "'";
        }
        if (array_key_exists("fecha", $arrDatos)) {
            $cond .= " AND H.FECHA_INSERCION = '" . $arrDatos["fecha"] . "'";
        }

        $sql = "SELECT H.*
                FROM " . $this->sufijoTabla . "_HOGAR H
                WHERE H.ID_HOGAR IS NOT NULL " . $cond .
                " ORDER BY H.COD_ENCUESTAS, H.ID_VIVIENDA, H.ID_HOGAR";
        //pr($sql); exit;
        $query = $this->db->query($sql);
        while ($row = $query->unbuffered_row('array')) {
            $data[$i] = $row;
            $i++;
        }
        $this->db->close();
        return $data;
    }

    /**
     * Actualiza los datos del hogar de la encuesta
     * @access Public
     * @author oagarzond
     * @param Array $arrDatos   Arreglo asociativo con los valores para actualizar
     * @return Array Registros devueltos por la consulta
     */
    public function actualizarHogar($arrDatosHogar) {
        $this->msgError = '';

        try {
            $arrDatosHogar['FECHA_MODIFICACION'] = 'SYSDATE';
            $arrDatosHogar['USUARIO_MODIFICACION'] = $this->session->userdata('id');
            $arrWhereHogar['COD_ENCUESTAS'] = $this->codiEncuesta;
            $arrWhereHogar['ID_VIVIENDA'] = $this->codiVivienda;
            $arrWhereHogar['ID_HOGAR'] = $this->codiHogar;

            if (!$this->ejecutar_update($this->sufijoTabla . '_HOGAR', $arrDatosHogar, $arrWhereHogar)) {
                throw new Exception("No se pudo actualizar correctamente la información del hogar. SQL: " . $this->get_sql(), 1);
            }
            return true;
        } catch (Exception $e) {
            log_message('Error en la línea ' . $e->getLine() . ' en el archivo ' . $e->getFile() . ': error:' . $e->getMessage() . '.');
            $this->msgError = '<strong>Se presentarón inconvenientes en el servidor.</strong>';
            return false;
        }
    }

    /**
     * Actualiza el estado y la página en que va el usuario
     * @access Public
     * @author oagarzond
     * @param   Int     $estado Estado de la encuesta
     * @return Boolean
     */
    public function actualizarEstadoAC($estado = 0) {
        $this->msgError = '';
        $estadoActual = $this->session->userdata('estado');

        try {
            switch ($estado) {
                case 2:
                    if($estadoActual < 11) {
                        $arrDatosAC['ID_ESTADO_AC'] = 7;
                    }
                    $arrDatosAC['FECHA_INI_HOGAR'] = 'SYSDATE';
                    $arrDatosAC['PAG_HOGAR'] = $estado;
                    $arrWhereAC['COD_ENCUESTAS'] = $this->codiEncuesta;
                    if (!$this->ejecutar_update($this->sufijoTabla . '_ADMIN_CONTROL', $arrDatosAC, $arrWhereAC)) {
                        throw new Exception("No se pudo actualizar correctamente la información de control. SQL: " . $this->get_sql(), 1);
                    } else {
                        $sessionData['paginaHogar'] = $arrDatosAC['PAG_HOGAR'];
                        if($estadoActual < 11) {
                            $sessionData['estado'] = $arrDatosAC['ID_ESTADO_AC'];
                        }
                        if(!empty($sessionData)) {
                            $this->session->set_userdata($sessionData);
                        }
                    }
                    break;
                case 'f':
                    $arrDatosAC['FECHA_FIN_HOGAR'] = 'SYSDATE';
                    if($estadoActual < 11) {
                        $arrDatosAC['ID_ESTADO_AC'] = 8;
                    }
                    $arrDatosAC['PAG_HOGAR'] = $this->totalPaginas + 1;
                    $arrWhereAC['COD_ENCUESTAS'] = $this->codiEncuesta;
                    if (!$this->ejecutar_update($this->sufijoTabla . '_ADMIN_CONTROL', $arrDatosAC, $arrWhereAC)) {
                        throw new Exception("No se pudo actualizar correctamente la información de control. SQL: " . $this->get_sql(), 1);
                    } else {
                        $sessionData['paginaHogar'] = $arrDatosAC['PAG_HOGAR'];
                        $sessionData['fechaFinHogar'] = $arrDatosAC['FECHA_FIN_HOGAR'];
                        if($estadoActual < 11) {
                            $sessionData['estado'] = $arrDatosAC['ID_ESTADO_AC'];
                        }
                        if(!empty($sessionData)) {
                            $this->session->set_userdata($sessionData);
                        }
                    }
                    break;
                default:
                    $arrDatosAC['PAG_HOGAR'] = $estado;
                    $arrWhereAC['COD_ENCUESTAS'] = $this->codiEncuesta;
                    if (!$this->ejecutar_update($this->sufijoTabla . '_ADMIN_CONTROL', $arrDatosAC, $arrWhereAC)) {
                        throw new Exception("No se pudo actualizar correctamente la información de control. SQL: " . $this->get_sql(), 1);
                    } else {
                        $this->session->set_userdata('paginaHogar', $arrDatosAC['PAG_HOGAR']);
                    }
                    break;
            }
            return true;
        } catch (Exception $e) {
            log_message('Error en la línea ' . $e->getLine() . ' en el archivo ' . $e->getFile() . ': error:' . $e->getMessage() . '.');
            $this->msgError = '<strong>Se presentarón inconvenientes en el servidor.</strong>';
            return false;
        }
    }


    public function consultarNumeroHogares($codigo_encuesta) {
        $data = array();
        $cond = '';
        $i = 0;
        
        $sql = "SELECT V_TOT_HOG
                FROM " . $this->sufijoTabla . "_VIVIENDA
                WHERE COD_ENCUESTAS =  " . $codigo_encuesta ;
        
        $query = $this->db->query($sql);
        while ($row = $query->unbuffered_row('array')) {
            $data[$i] = $row;
            $i++;
        }
        $this->db->close();
        return $data;
    }

    public function consultarNumeroHogaresConstruidos($codigo_encuesta) {
        $data = array();
        $cond = '';
        $i = 0;
        
        $sql = "SELECT count(*) AS total
                FROM " . $this->sufijoTabla . "_HOGAR
                WHERE COD_ENCUESTAS =  " . $codigo_encuesta ;
        
        $query = $this->db->query($sql);
        while ($row = $query->unbuffered_row('array')) {
            $data[$i] = $row;
            $i++;
        }
        $this->db->close();
        return $data;
    }


    public function insertarDatosHogar($param) {
        //var_dump($param);exit;

        $id_hogar = $this->obtener_siguiente_id('SEQ_' . $this->sufijoTabla . '_HOGAR');

        $datosHogar['COD_ENCUESTAS'] = $param["COD_ENCUESTAS"];
        $datosHogar['ID_VIVIENDA'] = $param["ID_VIVIENDA"];
        $datosHogar['ID_HOGAR'] = $id_hogar;
        $datosHogar['H_NROHOG'] = $param["H_NROHOG"];
        $datosHogar['FECHA_INSERCION'] = 'SYSDATE';
        $datosHogar['USUARIO_INSERCION'] = "9898";

        /*$arrDatosEntrevista['CC_FECHA_INI'] = 'SYSDATE';
            if(!empty($arrRE['CC_RES_ENC'])) {
                $arrDatosEntrevista['CC_RES_ENC'] = $arrRE['CC_RES_ENC'];
            }
            //$arrDatosEntrevista['CC_COD_RECO'] = '';
            //$arrDatosEntrevista['CC_COD_SUPE'] = '';
            $arrDatosEntrevista['FECHA_INSERCION'] = 'SYSDATE';
            $arrDatosEntrevista['USUARIO_INSERCION'] = $arrDatos['idUsua'];
*/
            if (!$this->ejecutar_insert($this->sufijoTabla . '_HOGAR', $datosHogar)) {
                throw new Exception("No se pudo guardar correctamente la información del resultado de la entrevista. SQL: " . $this->get_sql(), 2);
            }
            return $id_hogar;
/*
        $this->db->trans_start();
        $this->db->insert('WCP_HOGAR', $param);
        $insert_id = $this->db->insert_id();
        $this->db->trans_complete();
        return  $insert_id;*/
    }

    public function consultarHogares($codigo_encuesta) {  
        $data = array();
        $cond = '';
        $i = 0;
        
        $sql = "SELECT H_NROHOG 
                FROM " . $this->sufijoTabla . "_HOGAR
                WHERE COD_ENCUESTAS =  " . $codigo_encuesta ;
        //echo $sql;exit;
        $query = $this->db->query($sql);
        while ($row = $query->unbuffered_row('array')) {
            $data[$i] = $row;
            $i++;
        }
        $this->db->close();
        return $data;
    }

    public function consultarIdHogar($codigo_encuesta,$hogar) {
        $data = array();
        $cond = '';
        $i = 0;
        
        $sql = "SELECT ID_HOGAR, H_NROHOG 
                FROM " . $this->sufijoTabla . "_HOGAR
                WHERE COD_ENCUESTAS =  " . $codigo_encuesta. " AND H_NROHOG= " .$hogar ;
        //echo $sql;exit;
        $query = $this->db->query($sql);
        while ($row = $query->unbuffered_row('array')) {
            $data[$i] = $row;
            $i++;
        }
        $this->db->close();
        return $data;
    }
}
//EOC