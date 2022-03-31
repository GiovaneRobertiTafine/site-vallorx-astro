<?php
// Instalar o SQLITE3
// criar o BD na linha de comando:
// sqlite3 teste.db
// isso vai entrar voce no comando sqlite3 em seguida criar a tabela com:
// create table videos (Id integer primary key, FileName, Description);
// se usar .tables na linha de comando mostra as tabelas
// Para rodar esse arquivo basta usar:
// php -S localhost:8000 index.php
// depois abrir a pagina localhost:8000
header('Content-type: text/html; charset=utf-8');
$pdo = new PDO('sqlite:../sqlite/videos.db');

if (isset($_GET)) {
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
    
if (isset($_POST) && isset($_POST['nome'])) {
    $data = [
        'FileName' => 'arquivo.mp4',
        'Description' => 'Descrição do arquivo!',
    ];
    
    // Inserir dados no sqlite
    $sql = "INSERT INTO videos (FileName, Description) VALUES (:FileName, :Description)";

    try {
        $result = $pdo->prepare($sql);
   
        $result->execute($data);
    
    } catch (Exception $error) {
         $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao inserir os dados!');
        echo json_encode($array);
    }
    
    
}


$result.close();