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
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Methods: GET, POST, DELETE');

$pdo = new PDO('sqlite:../sqlite/email.db');

if($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $query = $pdo->query("select * from Emails");
        //$row = $query->fetch(PDO::FETCH_ASSOC);
        $all = $query->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($all));
    } catch (Exception $error) {
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao obter os dados!');
        echo json_encode($array);
    }
    
}
    
if($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se houve algum erro com o upload. Se sim, exibe a mensagem do erro
    if (!isset($_POST['email']) || !isset($_POST['nome'])) {
        $array  = array('status' => '400', 'mensagem' => 'Erro na solicitação');
        echo json_encode($array); 
        exit; // Para a execução do script
    }

    if (verificarEmailCadastrado()) {
        $array  = array('status' => '500', 'mensagem' => 'E-mail já cadastrado!');
        echo json_encode($array);
        exit;
    }
    
    // Inserir dados no sqlite
    $sql = "INSERT INTO Emails (Email, Nome) VALUES (?, ?)";

    try {
        $result = $pdo->prepare($sql);
        
        // Depois verifica se é possível mover o arquivo para a pasta escolhida
        if ($result->execute([$_POST['email'], $_POST['nome']])) {
            // Upload efetuado com sucesso, exibe uma mensagem e um link para o arquivo
             $array  = array('status' => '200', 'mensagem' => 'Salvo com sucesso');
            echo json_encode($array);
        } else {
            // Não foi possível fazer o upload, provavelmente a pasta está incorreta
            $array  = array('status' => '500', 'mensagem' => 'Erro ao salvar e-mail');
            echo json_encode($array);
        }
    
    } catch (Exception $error) {
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao inserir os dados!');
        echo json_encode($array);
    }
    
}

if($_SERVER["REQUEST_METHOD"] == "DELETE") {
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
        $query = $pdo->prepare("DELETE FROM Emails");
        if ($query->execute()) {
            $array = array('status' => '200', 'mensagem' => 'Deletado todos os dados com sucesso!');
            echo json_encode($array);
        }
        else {
            $array  = array('status' => '500', 'mensagem' => 'Infelizmente não foi possível deletar todos dados!');
            echo json_encode($array);
        }
    }
    exit;
}

function verificarEmailCadastrado() {
    $pdo = new PDO('sqlite:../sqlite/email.db');
    try {
        $query = $pdo->prepare("select * from Emails where Email =:email");
        //$row = $query->fetch(PDO::FETCH_ASSOC);
        $query->execute(['email' => $_POST['email'] ]);
        return $query->fetch();
        
    } catch (Exception $error) {
        return false;
    }
}