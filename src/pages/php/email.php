<?php
    header('Content-type: text/html; charset=utf-8');
    
    // Conta de Email no servidor de hospedagem
    define('SERVIDOR', 'private@vallorx.com.br');
    
    // Para onde será enviado o contato
    define('DESTINO', 'private@vallorx.com.br');
    
    // Identifica o site que foi enviada a mensagem
    define('SITE', 'vallorx');
    
    if (isset($_POST)):
        $nome    = (isset($_POST['nome']))? $_POST['nome']: '';
        $empresa    = (isset($_POST['empresa']))? $_POST['empresa']: '';
        $email   = (isset($_POST['email']))? $_POST['email']: '';
        $ddd   = (isset($_POST['ddd']))? $_POST['ddd']: '';
        $telefone   = (isset($_POST['telefone']))? $_POST['telefone']: '';
        $assunto = (isset($_POST['assunto']))? $_POST['assunto']: '';
        $msg     = (isset($_POST['mensagem']))? $_POST['mensagem']: '';

        // Valida se foram preenchidos todos os campos
        if (empty($nome) || empty($empresa) || empty($email) || empty($ddd) || empty($telefone) || empty($assunto) || empty($msg)):
            $array  = array('status' => '400', 'mensagem' => 'Preencher todo os campos obrigatórios(*)!');
            echo json_encode($array);
        else:
    
            // if (empty($assunto)):
            //     $assunto = "Contato enviado pelo site " . SITE;
            // endif;
    
            // Monta a mensagem do email
            $mensagem = "Contato enviado pelo site ".SITE."\n";
            $mensagem .= "----------------------------------------------------------\n";
            $mensagem .= "Nome: ".$nome."\n";
            $mensagem .= "E-mail: ".$email."\n";
            $mensagem .= "Telefone: ".$ddd.$telefone."\n";
            $mensagem .= "----------------------------------------------------------\n";
            $mensagem .= "Assunto: \n".$assunto."\n";
            $mensagem .= "Mensagem: \n".$msg."\n";
    
            // Envia o e-mail e captura o retorno
            $retorno = EnviaEmail(DESTINO, $assunto, $mensagem);
            
            // Conforme o retorno da função exibe a mensagem para o usuário
            if ($retorno):
                $array  = array('status' => '200', 'mensagem' => 'Sua mensagem foi enviada com sucesso!');
                echo json_encode($array);
            else:
                $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao enviar sua mensagem!');
                echo json_encode($array);
            endif;
    
        endif;
    endif;
    
    // Função para envio de e-mail usando a função nativa do PHP mail()
    function EnviaEmail($para, $assunto, $mensagem){
    
        $headers = "From: ".SERVIDOR."\n";
        $headers .= "Reply-To: $para\n";
        $headers .= "Subject: $assunto\n";
        $headers .= "Return-Path: ".SERVIDOR."\n";
        $headers .= "MIME-Version: 1.0\n";
        $headers .= "X-Priority: 3\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\n";
    
        $retorno = mail($para, $assunto, nl2br($mensagem), $headers);
        return $retorno;
    }

    // require("./js/PHPMailer-master/src/PHPMailer.php");
    // require("./js/PHPMailer-master/src/SMTP.php");
    //  $mail = new PHPMailer\PHPMailer\PHPMailer();
    //  $mail->IsSMTP(); // enable SMTP
    //  $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    //  $mail->SMTPAuth = true; // authentication enabled
    //  $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    //  $mail->Host = "servidor.hostgator.com.br";
    //  $mail->Port = 465; // or 587
    //  $mail->IsHTML(true);
    //  $mail->Username = "private@vallorx.com.br";
    //  $mail->Password = "vallorX*2020";
    //  $mail->SetFrom($email);
    //  $mail->Subject = $assunto;
    //  $mail->Body = $mensagem;
    //  $mail->AddAddress("private@vallorx.com.br");
    //     if(!$mail->Send()) {
    //        echo "Mailer Error: " . $mail->ErrorInfo;
    //     } else {
    //        echo "Mensagem enviada com sucesso";
    //     }

?> 
