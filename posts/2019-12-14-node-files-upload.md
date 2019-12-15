---
date: 2019-12-14 23:51:00
title: Upload de arquivos com Nodejs
description: Enviando arquivos para o servidor
category: nodejs
background: "#88C34C"
image: "/assets/img/node-js-upload.jpg"
---

# Introdução

Existem algumas estratégias que podem ser adotadas ao realizar uploads de arquivos através da web, e a que vamos ver no post
é utilizando o [multipart/form-data](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

O FormData basicamente nos fornece um conjunto de pares chave/valor, representando os campos de um formulário. Com ele podemos
facilmente "anexar" arquivos em um formulário e enviar através de uma requisição para o servidor, que irá armazenar os arquivos.

Para isso vamos precisar de um server nodejs:

```javascript
const express = require('express');
const server = express();

server.post('/files', (req, res) => {
    return res.json({
        online: true
    });
});

server.listen(3333);
```

O código acima instância um servidor na porta ```3333``` da máquina, e cria a rota ```/files``` que será responsável por receber
e armazenar os arquivos.

Para realizar o upload dos arquivos vamos utilizar o Multer. Ele será o middleware responsável por "pegar" os arquivos que estamos enviando na
requisição e salvar no servidor.

# Multer

Após o servidor estar configurado, vamos instalar o pacote do multer através do npm/yarn: ```yarn add multer```.

Feito isso, vamos criar um arquivo que irá exportar um objeto com as configurações do multer e passa-las para a instância do middleware:

```javascript
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
    /**
     * Save files on disk
     */
    storage: multer.diskStorage({
        /**
         * Destination path to save files
         */
        destination: path.resolve(__dirname, 'tmp', 'uploads'),

        /**
         * Filename
         */
        filename: (req, file, cb) => {
            crypto.randomBytes(8, (err, res) => {
                if (err) return cb(err);

                return cb(null, res.toString('hex') + path.extname(file.originalname));
            });
        },

    }),
};
```

Como vamos gravar nossos arquivos em disco, a key ```storage``` do objeto recebe o método diskStorage do multer. O método diskStorage
recebe um objeto com dois valores importantes, são eles:

- Destination: Responsável por receber o path de onde nosso arquivo vai ser salvo;
- filename: Recebe uma função com 3 parâmetros, sendo a requisição(objeto contendo todas informações enviadas pelo client-side), o arquivo e um callback que é executado após a gravação do arquivo;

Se você tem dúvidas sobre callbacks, pode ler meu [post](https://www.maiconsilva.com/js-callbacks-promises-aw/) tratando o assunto.

Para randomizar o nome do arquivo, utilizei o ```randomBytes``` da [crypto](https://nodejs.org/api/crypto.html#crypto_crypto). Com isso evitamos conflitos
entre nomes de arquivos.

A função ```randomBytes``` recebe dois parâmetros, sendo err e res. Caso haja algum erro em gerar o nome randômico, o método irá retornar um erro.
Caso tudo ocorra como deveria, o método ```randomBytes``` retorna um nome randômico e salva nosso arquivo em disco com esse nome gerado.

# Adicionando o middleware na requisição

Feito as configurações do Multer, basta importa-las no nosso server e passar como um middleware na rota que será responsável por receber os arquivos.

```javascript
const express = require('express');
const server = express();

/**
 * Multer instance and config
 */
const multer = require('multer');
const multerConfig = require('./multer.config'); // ARQUIVO COM AS CONFIGURAÇÕES QUE FIZEMOS NO PASSO ANTERIOR
const upload = multer(multerConfig); // INSTÂNCIA DO MULTER COM NOSSAS CONFIGURAÇÕES

/**
 * Use multer to receive files
 * Get file value attached in FormData
 */
server.post('/files', upload.single('file'), (req, res) => {
    const { file } = req;

    if (file) {
        return res.json({
            file,
            fileSaved: true,
        });
    }

    return res.json({
        error: 'Erro ao salvar o arquivo.',
        fileSaved: false,
    });
});

server.listen(3333);
```

> De uma forma resumida: Middlewares são funções/métodos que processam a nossa requisição antes da controller, sendo executadas na ordem em que são passadas.

Veja que quando passamos o multer como middleware da rota ```/files```, estamos chamando o método ```single``` passando o parâmetro ```'file'``` pra ele.
Com isso o multer sabe que deve procurar chave 'file' no form que está recebendo, e que essa chave tem o valor de 1 arquivo anexado.

Existem outras formas de trabalhar com o multer além de receber um único arquivo por requisição, você pode conferir na
[documentação do multer](https://github.com/expressjs/multer).

# Conclusão

Assim que o multer salva o arquivo em disco, ele adiciona a chave file na nossa requisição contendo todas as informações do arquivo que foi salvo.
Com essas informações podemos relacionar tabelas em bancos de dados, enviar e-mail, salvar essas informações em alguma tabela etc... Vai depender da sua
necessidade.

Aqui você pode ver a estrutura da aplicação que usei para o exemplo enquanto escrevia o artigo.

```javascript
├── src
│   ├── temp
|   |   └── uploads
│   └── multer.config.js
|   └── server.js
└── README.md
```

Você pode conferir o código produzido durante a escrita do artigo no meu [github](https://github.com/maiconrs95/node-files-upload).

Dicas, sugestões, conselhos ou melhorias? Você pode entrar em contato comigo pelo meu email ou abrir uma PR no repositório [aqui](https://github.com/maiconrs95/maiconsilva).
