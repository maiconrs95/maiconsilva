---
date: 2020-01-07 23:39:00
title: Entendendo This, Bind, Call e Apply no JavaScript
description: Assimilando os conceitos
category: js
background: "#D6BA32"
image: "/assets/img/js-fundamentals.jpeg"
---

# Introdução

Um conceito muito importante para quem trabalha com JavaScript é o uso da palavra-chave [this](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this), porém o seu uso pode ser um pouco confuso para alguns desenvolvedores, principalmente quando vindo de outras linguagens.

De forma resumida o ```this``` referencia um objeto, e seu valor pode variar dependendo se o objeto é global, se está sob o modo estrito ou em um construtor. E também pode variar de forma explícita com base na utilização dos function proptotype methods [bind](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function/bind), [call](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function/Call) e [apply](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function/Apply).

Complexo, né? Porém nesse artigo vamos desvendar o uso do ```this``` em seus diferentes contextos.

## Contexto implícito

Existem 4 contextos principais onde o ```this``` pode ser inferido implicitamente:

- Contexto global
- Como um método dentro de um objeto
- Como o construtor de uma função ou classe
- Como manipulador de eventos no DOM

### Global

No contexto global ```this``` tem como referência o [Global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object).
Quando estamos trabalhando no navegador, o contexto global é o ```window```. Quando estamos trabalhando no node, o contexto global é o ```global```.

Para os exemplos vamos utilizar console do Google Chrome. Para isso, basta abrir o navegador, apertar f12 e selecionar a aba console.

Feito isso, vamos ao código.

No console do navegador:

```javascript
console.log(this);

// Output
Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
```

Vemos que o valor de ```this``` é ```Window```. Isso porque ```Window``` é o objeto global do Browser.

Sabemos que funções possuem seu próprio contexto/escopo para variáveis. Dito isso, podemos pensar que se colocarmos o ```this``` dentro de uma função, o ```this``` fará referência a função a qual seu contexto está inserido, mas não. Uma função de nível superior ainda manterá a referência do ```this``` como sendo o objeto global.

Podemos escrever uma função de nível superior ou uma função que não está associada a nenhum objeto, como esta:

```javascript
function printThis() {
  console.log(this);
}

printThis();

// Output
Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
```

Vemos que mesmo inserido no contexto da função, o ```this``` faz referência ao objeto global ```Window```.

No entanto, ao usarmos o [modo estrito do JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode),
o valor de ```this``` dentro de uma função será ```undefined```.

```javascript
'use strict'

function printThis() {
  console.log(this);
}

printThis();

// Output
undefined
```

Geralmente, é mais seguro usar o modo estrito para reduzir a probabilidade do ```this``` ter um escopo inesperado. Raramente alguém vai querer se referir ao ```window``` usando ```this```.

> Para obter mais informações sobre o modo estrito você pode consultar a [documentação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) do MDN.

### Um método de objeto

Um método é basicamente uma função armazenada em um objeto. Uma ação que esse objeto pode executar. Um método usa ```this``` para se referenciar as propriedades de um objeto.

```javascript
const people = {
    name: 'Maicon Silva',
    yearOfBirth: 1995,

    describe() {
        console.log(`${this.name} was born in ${this.yearOfBirth}`);
    },
};

people.describe();

// Output
"Maicon Silva was born in 1995"
```

Neste exemplo ```this``` é o mesmo que people.

Em um objeto aninhado, ```this``` refere-se ao escopo do objeto atual do método. No exemplo a seguir, ```this.age``` dentro do ```details``` se refere a ```people.details.age```.

```Javascript
const people = {
    name: 'Maicon Silva',
    yearFounded: 1995,
    details: {
        age: 24,

        printDetails() {
            console.log(`The age is ${this.age}`);
        }
    },
};

people.details.printDetails();

// Output
"The age is 24"
```

Outra maneira de se pensar sobre isso é que ```this``` tem como referência o primeiro objeto no lado esquerdo do método.

### Um construtor de funções

Quando usamos a palavra-chave ```new```, o JS cria uma instância de uma função ou classe. Os construtores de funções eram a maneira padrão de inicializar um objeto definido pelo programador antes da introdução de classes do ECMAScript 2015.

```javascript
function Country(name, yearFounded) {
    this.name = name;
    this.yearFounded = yearFounded;

    this.describe = function() {
        console.log(`${this.name} was founded in ${this.yearFounded}`);
    };
}

const brasil = new Country('Braisl', 1822);

brasil.describe();

// Output
"Brasil was founded in 1822"
```

Nesse contexto, ```this``` está vinculado à instancia de ```Country```, que está contida na constante ```brasil```.

### Um construtor de classe

Um construtor de classe se assemelha a um construtor de funções, criando uma instância da classe e armazenando em uma variável. Existem diferenças fundamentais entre funções construtoras e classes que abordaremos num próximo post, mas podemos ver como o ```this``` se comporta em um construtor de classe:

```javascript
class Country {
    constructor(name, yearFounded) {
        this.name = name;
        this.yearFounded = yearFounded;
    }

    describe() {
        console.log(`${this.name} was founded in ${this.yearFounded}`);
    }
}

const brasil = new Country('Braisl', 1822);

brasil.describe();

// Output
"Brasil was founded in 1822"
```

Da mesma forma que na função construtora, o ```this``` está vinculado à instancia de ```Country``` armazenada na constante brasil.

### Um manipulador de eventos no DOM

No navegador, há um contexto do ```this``` especial para manipuladores de eventos. Em um manipulador de eventos como o ```addEventListner```, ```this``` fará referência a ```event.currentTarget```. Na maioria das vezes os desenvolvedores simplesmente usam ```event.target``` ou ```event.currentTarget``` conforme o necessário para acessar os eventos do DOM, mas é importante termos em mente como o ```this``` é afetado nesse contexto.

No exemplo a seguir, criaremos um botão, adicionaremos um texto e vamos anexa-lo ao DOM. Quando registrarmos o valor ```this``` dentro do manipulador de evento, ele fará referência ao elemento criado.

```javascript
const button = document.createElement('button');
button.textContent = 'Click me';
document.body.append(button);

button.addEventListener('click', function(event) {
  console.log(this);
});

// Output
<button>Click me</button>
```

Ao fazer isso, temos um botão anexado à página que diz "Click me". Se clicarmos no botão, veremos ```<button>Click me</button>``` no console, isso porque o ```this``` anexado ao eventListner no botão faz referência ao próprio elemento criado, o button.

## Contexto explicito

Em todos os exemplos anteriores, o valor de ```this``` foi determinado por seu contexto implícito  - seja global, em um objeto, em uma função construtura ou classe e até mesmo em manipuladores de eventos do DOM. No entanto, usando ```call```, ```bind``` ou ```apply```, podemos determinar explícitamente o que ```this``` deve referenciar.

### Call e Apply

```call``` e ```apply``` são muito semelhantes - eles invocam uma função com um contexto de ```this``` especifico e argumentos opcionais. A única diferença entre eles é que ```call``` requer que os argumentos adicionais sejam passados um por um, enquanto ```apply``` recebe os argumentos como uma matriz.

No exemplo a seguir, criaremos um objeto e uma função que faz referência ao ```this``` sem ter o ```this``` referenciado em seu contexto.

```javascript
const book = {
  title: 'The Lord of the rings',
  author: 'J.R.R Tolkien',
};

function summary() {
  console.log(`${this.title} was written by ${this.author}.`);
}

summary();

// Output
"undefined was written by undefined"
```

Como a função ```summary``` e o objeto ```book``` não possuem nenhuma ligação, ```summary``` vai imprimir ```undefined```, pois procura o ```this.title``` e ```this.author``` no objeto global e não os encontra.

> Nota: Tentar isso no modo estrito resultaria em ```Uncaught TypeError: Cannot read property 'title' of undefined```.

Nesse caso, podemos usar ```call``` ou ```apply``` e chamar o contexto de ```this``` do objeto ```book``` na função.

```javascript
summary.call(book);
// ou
summary.apply(book);

// Output
"The Lord of the rings was written by J.R.R Tolkien."
```

Agora existe uma conexão entre ```book``` e ```summary```, quando esses métodos são aplicados.

Vamos confirmar o que ```this``` está referenciando:

```javascript
function printThis() {
  console.log(this);
}

printThis.call(book);

{title: "The Lord of the rings", author: "J.R.R Tolkien"}
```

Podemos ver que ```this``` agora referencia o objeto passado como argumento.

É assim que ```call``` e ```apply``` funcionam da mesma maneira, mas como eu disse anteriormente existe uma pequena diferença em como esses métodos recebem argumentos adicionais, onde ```call``` recebe os argumentos um a um, enquanto ```apply``` recebe uma matriz de argumentos.

```javascript
function longerSummary(genre, year) {
    console.log(
        `${this.title} was written by ${this.author}. It's a ${genre} history written in the year ${year}.`
    );
}
```

Com o ```call``` cada valor que desejamos enviar para a função é enviado como um argumento adicional:

```javascript
longerSummary.call(book, 'fantasy', 1937);

// Output
"The Lord of the rings was written by J.R.R Tolkien. It's a fantasia history written in the year 1937."
```

Se tentarmos enviar os argumentos da mesma forma utilizando o ```apply``` vamos ter uma Exception.

```javascript
longerSummary.apply(book, 'fantasy', 1937);

// Output
"Uncaught TypeError: CreateListFromArrayLike called on non-object at <anonymous>:1:15"
```

Diferente do ```call```, os argumentos adicionais utilizando o ```apply``` devem ser passados em uma matriz:

```javascript
longerSummary.call(book, ['fantasy', 1937]);

// Output
"The Lord of the rings was written by J.R.R Tolkien. It's a fantasia history written in the year 1937."
```

A diferença entre passar os parâmetros um a um e em uma matriz é minima, porém é bom estarmos cientes disso. Utilizando o ```apply``` podemos usar um array literal, por exemplo, ```fun.apply(this, ['comer', 'beber'])```, ou um objeto [```array```](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array), por exemplo, ```fun.apply(this, new Array('comer', 'beber'))```.

### Bind

Ambos ```call``` e ```apply``` são méotods one-time, ou seja, ao aplicarmos algum contexto em uma função, essa função será executada com contexto uma vez, porém continuará inalterada(sem contexto).

Em alguns casos, pode ser necessário usar um método/função repetidamente com o contexto do ```this``` de outro objeto. Nesse caso podemos usar o ```bind``` para criar um novo método/função com o ```this``` explicito.

```javascript
const bookWithSummary = summary.bind(book);

bookWithSummary();

// Output
"The Lord of the rings was written by J.R.R Tolkien."
```

Neste exemplo, quando a função ```bookWithSummary``` for chamada, ela sempre retornará o valor original do ```this``` associado pelo método ```bind```. A tentativa de vincular um novo contexto à função ```bookWithSummary``` vai falhar, portanto, podemos confiar em uma função ou método associado pelo ```bind``` para retornar o ```this``` esperado.


```javascript
const bookWithSummary = summary.bind(book);

bookWithSummary(); // "The Lord of the rings was written by J.R.R Tolkien."

const book2 = {
    title: 'This is book 2',
    author: 'This is author of book 2',
};

bookWithSummary.bind(book2); // "The Lord of the rings was written by J.R.R Tolkien."
```

No exemplo acima vemos um caso onde ```bookWithSummary``` recebe o segundo ```bind(book2)```, mas mantém o valor do primeiro.

### Arrow Functions

[Arrow Functions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions) não possuem um escopo
para o ```this```. Em vez disso, elas passam para um próximo nível de execução.

```javascript
const whoAmI = {
    name: 'Maicon Silva',
    regularFunction: function() {
        console.log(this.name);
    },
    arrowFunction: () => {
        console.log(this.name);
    }
}

whoAmI.regularFunction(); // "Maicon Silva"
whoAmI.arrowFunction(); // undefined
```

Pode ser útil usar arrow functions nos casos em que precisamos que o ```this``` faça refrência ao contexto externo. Por exemplo,
caso tivessemos um listener dentro de uma classe, provavelmente o ```this``` precisaria fazer referência a algum valor da classe.

No exemplo a seguir, criaremos um botão no DOM, e também uma classe que terá um listener que vai alterar o valor do botão para um valor
referenciado na própria classe:

```javascript
const button = document.createElement('button');
button.textContent = 'Click me';
document.body.append(button);

class Display {
    constructor() {
        this.buttonText = 'New Text';

        button.addEventListener('click', event => {
            event.target.textContent = this.buttonText
        });
    }
}

new Display();
```

Quando o botão é acionado seu texto muda para "New Text". Se não tivessemos usado uma arrow function ali o valor
do ```this``` no listener seria o ```event.currentTarget``` e não seriamos capaz de acessar o valor dentro da classe sem vinculá-la
explícitamente à função.

## Conclusão

Neste artigo vimos os diferentes valores que o ```this``` pode receber de forma implícita em tempo de execução e explícita utilizando
os métodos ```call```, ```bind``` e ```apply```. Também aprendemos como a falta do contexto do ```this``` pode ser usado nas arrow functions.

Dicas, sugestões, conselhos ou melhorias? Você pode entrar em contato comigo pelas minhas redes ou abrir uma PR no repositório
[aqui](https://github.com/maiconrs95/maiconsilva).

