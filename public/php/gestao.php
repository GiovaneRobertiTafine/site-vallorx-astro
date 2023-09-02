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

if($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        if (getenv('ACCESS') === $_POST['access']) {
            $array  = array('status' => '200', 'mensagem' => 'Acesso');
            echo json_encode($array);
        } else {
            $array  = array('status' => '401', 'mensagem' => 'Sem acesso');
            echo json_encode($array);
        }
    } catch (Exception $error) {
        $array  = array('status' => '500', 'mensagem' => 'Infelizmente houve um erro ao obter os dados!');
        echo json_encode($array);
    }
    
}