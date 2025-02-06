@echo off

:: Inicia a API Petshop em um novo cmd
echo Iniciando a API Petshop...
start cmd /k "java -jar ./target/mercado-0.0.1-SNAPSHOT.jar --server.port=8080 --spring.datasource.url=jdbc:mysql://localhost:3306/mercado --spring.datasource.username=root --spring.datasource.password="

:: Espera até que a API esteja disponível
echo Aguardando a API estar disponível em http://localhost:8080...
:checkAPI
timeout /t 5 >nul
curl -s http://localhost:8081 >nul 2>&1
if %errorlevel% neq 0 (
    echo API ainda não disponível. Tentando novamente...
    goto checkAPI
)

:: Quando a API estiver disponível, abre o Edge no endereço desejado
echo API iniciada com sucesso. Abrindo navegador...
start msedge --new-tab http://localhost:8080/swagger-ui/index.html#/

echo API iniciada e navegador aberto!
pause
