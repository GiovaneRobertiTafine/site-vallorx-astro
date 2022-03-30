<?php
    $dir    = 'https://vallorx.com.br/videos/';
    $files1 = scandir($dir);
    // $files2 = scandir($dir, 1);

    print_r($files1);
    // print_r($files2);
    if ($files1):
        $array  = array('status' => '200', 'mensagem' => 'Sua mensagem foi enviada com sucesso!');
        echo json_encode($array);
    else:
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao enviar sua mensagem!');
        echo json_encode($array);
    endif;
?>