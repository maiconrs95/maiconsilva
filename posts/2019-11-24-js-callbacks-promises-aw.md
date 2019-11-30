---
date: 2019-11-24 23:07:00
title: Javascript Callbacks, Promises e Async/Await
description: Entendendo as diferenças
category: JS
background: "#D6BA32"
image: "/assets/img/assinc-js.png"
---

# Introdução

Algo relativamente comum na vida de qualquer programador javascript pode acabar gerando certa confusão em programadores iniciantes. O uso de Callbacks, Promises e Async/Await.

Aqui vai um post explicando o que é cada uma dessas features e suas diferentes formas de utilização.

# O que é um callback

Uma função callback é uma função passada a outra função como argumento, que será chamada sempre que alguma rotina ou ação estiver completa.

Exemplo:

```javascript
function greeting(name) {
    console.log('Hello ' + name);
}

function processOutput(callback) {
    callback('Jhony');
}

processOutput(greeting);
```

O exemplo acima é de um [synchronous](https://developer.mozilla.org/pt-BR/docs/Glossario/Sincrono) callback, como é executado imediatamente.
No entanto funções de callback são comumente usadas em operações [assíncronas](https://developer.mozilla.org/pt-BR/docs/Glossario/Assincrono).

Exemplo:

```javascript
const fs = require('fs');

console.log(1);

fs.readFile('./in1.txt', (err, contents) => {
    console.log(err, String(contents));
});

console.log(2);

console.log(3);
```
O output do exemplo acima é:

```javascript
1
2
3
null 'Eu sou in 1'
```

Vejamos que o código executou todos os logs e por último o ```fs.readFile```, mesmo a função ```fs.readFile``` estar sendo chamada entre os logs 1 e 2.

Isso acontece porque o método ```readFile``` é assíncrono e só temos o seu output depois que ele é processado e invoca o callback que recebeu como segundo argumento, após concluir sua rotina de leitura do arquivo in1.txt.
Dessa maneira o Javascript não bloqueia a Thread principal do programa enquanto executa métodos assíncronos.

O problema desse código pode aparecer a medida que precisamos ler mais arquivos, ou chamar mais funções assíncronas, e retornar essas operações de uma só vez, e gerenciar esse código aninhado pode ser um problema.

Exemplo:

```javascript
fs.readFile('./in1.txt', (err, contents) => {
    fs.readFile('./in2.txt', (err2, contents2) => {
        fs.readFile('./in3.txt', (err3, contents3) => {
            fs.readFile('./in4.txt', (err4, contents4) => {
                console.log(err, String(contents));
                console.log(err2, String(contents2));
                console.log(err3, String(contents3));
                console.log(err4, String(contents4));
            });
        });
    });
});
```

Uma outra forma de resolver chamadas assíncronas são as famosas Promises.

# O que é uma Promise?

Uma [Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise) é um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.
Essencialmente, uma Promise é um objeto retornado para o qual você adiciona callbacks, em vez de passar callbacks para uma função.

Exemplo:

```javascript
const fs = require('fs');

const readFile = (file) => new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
        if (err) {
            reject(err)
        } else {
            resolve(contents);
        }
    });
});

console.log(1);

readFile('./in1.txt')
    .then((contents) => {
        console.log(String(contents))
    });

console.log(2);

console.log(3);
```

O output do exemplo acima é:

```javascript
1
2
3
Eu sou in 1
```

O exemplo acima traz uma facilidade maior de manutenção, pois dessa forma o nosso código cresce pra baixo e não pra frente, criando aquela "barriga" callbacks aninhados.

Outro ponto importante é que ao fazermos ```const readFile = (file) => new Promise((resolve, reject)``` a variável readFile recebe um valor imediato(```Promise { <pending> }```) que pode ou não ser resolvido posteriormente através do then, catch ou finally.

E pra fechar o artigo teremos a terceira maneira de resolver chamadas assíncronas, o elegante async/await &hearts;

# O que é o async await?

Já sabemos que quando uma função assíncrona é chamada, ela retorna uma Promise.
Com isso, uma função assíncrona pode conter uma expressão await, que pausa a execução da função assíncrona e espera pela resolução da Promise passada, e depois retoma a execução da função assíncrona e retorna o valor resolvido. Ou seja, o [async/await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/funcoes_assincronas) nada mais é que uma forma mais "bonita" de resolver as Promises, dando a aparência de síncrono para um código assíncrono.

```javascript
const fs = require('fs');

const readFile = (file) => new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
        if (err) {
            reject(err)
        } else {
            resolve(contents);
        }
    });
});

console.log(1);

const init = async () => {
    const content = await readFile('./in1.txt');
    const content2 = await readFile('./in2.txt');
    console.log(String(content), String(content2));
}

console.log(init());

console.log(2);

console.log(3);
```

O output do exemplo acima é:

```javascript
1
Promise { <pending> }
2
3
Eu sou in 1 Eu sou in 2
```

No exemplo acima a função ```init``` executa a função ```readFile``` que retorna uma Promise passando ```async``` na declaração da função e ```await``` na execução do readFile, aguardando a resolução da Promise para então mostrar o output ```console.log(String(content), String(content2))```.
Uma forma de tratar exceções no async/await é envolver as chamadas sobre o try/catch, assim quando uma Promise falhar o código irá lançar uma exceção.

Exemplo:

```javascript
const init = async () => {
    try {
        const content = await readFile('./in1.txt');
        const content2 = await readFile('./in2.txt');
        console.log(String(content), String(content2));
    } catch (err) {
        console.log(err);
    }
}
```

# Conclusão

Qualquer desenvolvedor Javascript vai precisar trabalhar com operações assíncronas em algum momento. E como vimos no artigo existem 3 formas de se trabalhar com esse tipo de operação, sendo elas:

- [callbacks](https://developer.mozilla.org/pt-BR/docs/Glossario/Callback_function)
- [Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/funcoes_assincronas)

Você pode conferir o código produzido durante a escrita do artigo no meu [Github](https://github.com/maiconrs95/js-callbacks-promises-aw).

Dicas, sugestões, conselhos ou melhorias? Você pode entrar em contato comigo pelo meu email ou abrir uma PR no repositório [aqui](https://github.com/maiconrs95/maiconsilva).
