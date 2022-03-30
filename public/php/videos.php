<?php
    header('Content-type: text/html; charset=utf-8');
    function console_log( $data ){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }
    if (isset($_GET)):
        $dir = '../assets/videos-news';
        if (is_dir($dir)):
            $files = array_values(array_diff(scandir($dir), array('..', '.')));
            // do something
        else:
            $array  = array('status' => '400', 'mensagem' => 'Erro interno ao obter os dados.');
            echo json_encode($array);
        endif;

        if ($files):
            $array  = array('status' => '200', 'mensagem' => 'Dados obtidos com sucesso.', 'data' => $files);
            echo json_encode($array);
        else:
            $array  = array('status' => '500', 'mensagem' => 'Não foi possível obter os dados.');
            echo json_encode($array);
        endif;

    endif;
?>