# 🌎 Sistema de Informações de Países — Projeto Fullstack

O sistema desenvolvido tem como objetivo a entrega da matéria de Programação Fullstack do curso de Engenharia de Software da UTFPR de Cornélio Procópio, sendo desenvolvido em **Node.js**, **Express**, **MySQL** e **React**, permitindo cadastrar, pesquisar e visualizar os países do banco do sistema.  
O projeto seguiu alguns critérios exigidos na matérias, sendo:
- Criação de requisitos de login, busca e inserção
- Apenas usuários logados podem realizar busca e inserção (aplicado por Middleware no back-end e autenticação JWT)
- Front-end por React utilizando o SPA e comunicação com back-end por HTTP
- Back-end utilizando o Express.js utilizando o padrão de rotas Restful e acesso ao banco de dados
- Implementação do banco de dados por MySQL
- Divisão de pastas em routes, models e config
- Verificação de preenchimento de campos no servidor (por Middleware no back-end pelo arquivo Routes e na obrigatoriedade dos campos no front-end)
- Envio de mensagens de validação do servidor (por respostas de erros e Try e Catch no back-end)
- Implementação do padrão REST na API desenvolvida
- Implementação de criptografia das senhas, prevenção de ataques de injeção, detecção de autenticação e identificação e realização de logs (feito nos arquivos do Models e Routes do back-end)
- Implementação de otimização do front-end (utilização do BUILD do front-end)
- Implementação de cache no back-end (implementado nos arquivos Models para as respostas do banco de dados mais rápida)
- Configuração do padrão de pool de conexões (implementado pelo arquivo .ENV com os arquivos da pasta config)
---

## 🚀 Tecnologias Utilizadas

### 🔧 Back-end
- **Node.js** + **Express**: Criação de servidor e API
- **mysql2**:  Biblioteca utilizado para conexão de banco de dados
- **dotenv**: Para a criação e uso de variáveis de ambiente
- **bcrypt**: Para hashing de senhas
- **jsonwebtoken**: Para autenticação de usuário por meio de token
- **cors** e **express.json()**: Comunicação da API back-end com o front-end 
- **ES Modules (import/export)**: Importação e Exportação de modulos dos arquivos
- **node-cache**: Biblioteca utilizada para a realização de cache de consultas do banco

### 💻 Front-end
- **React.js** com **React Router**: Criação de páginas e rotas do front-end
- **Context API**: Para controle de autenticação e dados
- **Create React App**: Para build otimizado e compressão do front-end
- **Fetch API**: Para comunicação com o back-end

### ⚙️ Softwares Necessários
- **Node.js (v18+)**: Executar o servidor backend e o build do frontend
- **npm (v9+)**: Gerenciador de pacotes do Node
- **MySQL Server (v8+)**: Banco de Dados

### 🏗️ Como executar
Com os softwares necessários, tanto na pasta do backend como na pasta do front-end, faça o comando:
<pre> npm install </pre>
Fazendo isso, no arquivo .env do backend, insira as informações do seu banco de dados da máquina local e então salve. Faça então o seguinte comando na pasta do backend:
<pre> node server.js </pre>
Com isso, o sistema irá rodar na porta 443 do localhost e é só abrir o navegador e ir em localhost:443 (ou na porta que o terminal falar)


Desenvolvido por: 

Gabriel Kenji Inoue - A2504170

Pedro Lucas Vila Landgraf - A2504227
