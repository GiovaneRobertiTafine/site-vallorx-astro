<?php
// Instalar o SQLITE3
// criar o BD na linha de comando:
// sqlite3 teste.db
// isso vai entrar voce no comando sqlite3 em seguida criar a tabela com:
// create table videos (Id integer primary key, FileName, Description, Title);
// se usar .tables na linha de comando mostra as tabelas
// Para rodar esse arquivo basta usar:
// php -S localhost:8000 index.php
// depois abrir a pagina localhost:8000
header('Content-type: text/html; charset=utf-8');
$pdo = new PDO('sqlite:../sqlite/videos.db');

if($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $query = $pdo->query("select * from videos");
        //$row = $query->fetch(PDO::FETCH_ASSOC);
        $all = $query->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($all));
    } catch (Exception $error) {
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao obter os dados!');
        echo json_encode($array);
    }
    
}
    
if($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pasta onde o arquivo vai ser salvo
    $_UP['pasta'] = '../videos/';
     
    // Verifica se houve algum erro com o upload. Se sim, exibe a mensagem do erro
    if ($_FILES['video']['error'] != 0 || !isset($_POST['description']) || !isset($_POST['title'])) {
        $array  = array('status' => '400', 'mensagem' => 'Erro na solicitação');
        echo json_encode($array); 
        exit; // Para a execução do script
    }
    
    // Caso script chegue a esse ponto, não houve erro com o upload e o PHP pode continuar
    
    $resultValidacaoArquivo = validacaoArquivo();
    if ($resultValidacaoArquivo) {
        echo $resultValidacaoArquivo;
        exit;
    }
    
    $resultId = verificarUltimoIdVideo();
    if ($resultId) {
        $nomeFinal = $resultId . '-' . $_FILES['video']['name'];
    } else {
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve erro ao buscar dados para inserir o video!');
        echo json_encode($array);
        exit;
    }
    
    // Script para o SQLITE3
    $data = [
        'FileName' => $nomeFinal,
        'Description' => $_POST['description'],
        'Title' => $_POST['title']
    ];
    
    // Inserir dados no sqlite
    $sql = "INSERT INTO videos (FileName, Description, Title) VALUES (:FileName, :Description, :Title)";

    try {
        $result = $pdo->prepare($sql);
        
        // Depois verifica se é possível mover o arquivo para a pasta escolhida
        if (move_uploaded_file($_FILES['video']['tmp_name'], $_UP['pasta'] . $nomeFinal) && $result->execute($data)) {
            // Upload efetuado com sucesso, exibe uma mensagem e um link para o arquivo
             $array  = array('status' => '200', 'mensagem' => 'Salvo com sucesso');
            echo json_encode($array);
        } else {
            // Não foi possível fazer o upload, provavelmente a pasta está incorreta
            $array  = array('status' => '500', 'mensagem' => 'Erro ao salvar o arquivo');
            echo json_encode($array);
        }
    
    } catch (Exception $error) {
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao inserir os dados!');
        echo json_encode($array);
    }
    
}

if($_SERVER["REQUEST_METHOD"] == "DELETE") {
    parse_str(file_get_contents("php://input"),$post_vars);
    
    if ($_GET['file_name']) {
        $stmt = $pdo->prepare("DELETE FROM videos WHERE FileName = ?");
        if ($stmt->execute([$_GET['file_name']]) && unlink("../videos/".$_GET['file_name'])) {
            $array  = array('status' => '200', 'mensagem' => 'Deletado com sucesso!');
            echo json_encode($array);
        } else {
            $array  = array('status' => '500', 'mensagem' => 'Infelizmente não foi possível deletar!');
            echo json_encode($array);
        }
        
    } else {
        $query = $pdo->prepare("DELETE FROM videos");
        $mascara= "../videos/*.mp4";
        if (array_map( "unlink", glob( $mascara) ) && $query->execute()) {
            $array  = array('status' => '200', 'mensagem' => 'Deletado todos os dados com sucesso!');
            echo json_encode($array);
        }
        else {
            $array  = array('status' => '500', 'mensagem' => 'Infelizmente não foi possível deletar todos dados!');
            echo json_encode($array);
        }
    }
    exit;
}

function verificarUltimoIdVideo() {
    $pdo = new PDO('sqlite:../sqlite/videos.db');
    try {
        $query = $pdo->query("select * from videos ORDER BY id DESC LIMIT 1;");
        //$row = $query->fetch(PDO::FETCH_ASSOC);
        $all = $query->fetchAll(PDO::FETCH_ASSOC);
        return $all[0]["Id"] + 1;
        
    } catch (Exception $error) {
        return false;
    }
}

function validacaoArquivo() {
    // Tamanho máximo do arquivo (em Bytes)
    $_UP['tamanho'] = 1024 * 1024 * 25; // 2Mb
     
    // Array com as extensões permitidas
    $_UP['extensoes'] = array('mp4');
    
    // Faz a verificação da extensão do arquivo
    $extensao = strtolower(end(explode('.', $_FILES['video']['name'])));
    if (array_search($extensao, $_UP['extensoes']) === false) {
        $array  = array('status' => '400', 'mensagem' => 'Erro no formato do arquivo');
        return json_encode($array);
    }
    
    // Faz a verificação do tamanho do arquivo
    else if ($_UP['tamanho'] < $_FILES['video']['size']) {
        $array  = array('status' => '400', 'mensagem' => 'Erro no tamanho do arquivo');
        return json_encode($array);
    }
    
    return false;
}
