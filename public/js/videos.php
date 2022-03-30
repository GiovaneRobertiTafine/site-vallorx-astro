<?php
    $dir = 'https://vallorx.com.br/videos';
    $files = array_diff(scandir($dir), array('.', '..'));
    // $files2 = scandir($dir, 1);

    print_r($files);
    // print_r($files2);
    echo $files
    // if ($files):
    //     $array  = array('status' => '200', 'mensagem' => 'Sua mensagem foi enviada com sucesso!', 'data' => $files);
    //     echo json_encode($array);
    // else:
    //     $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao enviar sua mensagem!');
    //     echo json_encode($array);
    // endif;
?>