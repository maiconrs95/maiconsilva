---
date: 2020-05-18 15:00:00
title: Tudo é objeto?
description: Herança e cadeia de protótipos
category: js
background: "#D6BA32"
image: "/assets/img/tudo-e-objeto.jpeg"
---

# Introdução

Acho que o ditado mais famoso envolvendo JavaScript é aquele que diz:

> Tudo é um objeto!

Mas será que é mesmo?

Vamos sub-dividir o JavaScript em dois tipos de dados, sendo:

- Primitivos
- Objetos

## Primitivos

Segundo nosso bom e velho [MDN](https://developer.mozilla.org/pt-BR/docs/Glossario/Primitivo), existem 6 tipos de dados primitivos no JavaScript:

- [String](https://developer.mozilla.org/pt-BR/docs/Glossario/String)
- [Number](https://developer.mozilla.org/pt-BR/docs/Glossario/N%C3%BAmero)
- [Boolean](https://developer.mozilla.org/pt-BR/docs/Glossario/Booleano)
- [Symbol](https://developer.mozilla.org/pt-BR/docs/Glossario/Symbol) (Novo no ES6)
- [Null](https://developer.mozilla.org/pt-BR/docs/Glossario/Nulo)
- [Undefined](https://developer.mozilla.org/pt-BR/docs/Glossario/undefined)

Com exceção de ```null``` e ```undefined``` todos são objetos! :tada:

## Objetos

O JavaScript conta com uma série de Objetos pré-definidos que podem ser usados por nós para trabalhar dados, mas também podemos utilizar de recursos como um construtor de objetos e criar nossos próprios objetos.

Um exemplo de um construtor pré-definido é o Array:

```javascript
const arr = []; // Instância do objeto Array

Array.prototype // [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
```

### Construtor e Instâncias em JavaScript

A Programação Orientada a Objetos faz uso constante de objetos (sério?), propriedades e métodos. Onde esses objetos interagem entre sí para formar aplicações complexas.

Imagine que vamos criar uma pessoa utilizando um objeto simples:

```javascript
const maicon = {
    name: 'Maicon Silva',
    yarnOfBirth: 1995,
    job: 'developer',
};
```

O que podemos fazer para simplificar a criação de ```pessoa``` no nosso código é criar um objeto especial ```Person```, que é reponsável por receber as propriedades que uma pessoa deve ter e cria-la para nós. Isso também é conhecido como Classe em POO, mas no JavaScript nós podemos chamar de Construtor ou Protótipo, e com base nesse construtor nós criamos quantas pessoas quisermos.

```javascript
function Person(name, yarnOfBirth, job) {
    this.name        = name;
    this.job         = job;
    this.yarnOfBirth = yarnOfBirth;
}

const Maicon = new Person('Maicon', 1995, 'developer'); // Person {name: "Maicon", job: "developer", yarnOfBirth: 1995}
```

A partir desse momento, todas as pessoas criadas são instâncias do nosso construtor ```Person```.

### Herança

Em termos simples, herança é quando um objeto é baseado em outro objeto, obtendo acesso à propriedades e métodos do objeto base.

Agora além de pessoa, vamos criar um atleta. Mas um atleta assim como uma pessoa possui um nome, um ano de nascimento, um emprego, além de seus métodos e propriedades particulares como se ele é um atleta olímpico, quantas medalhas possui etc. Então o que podemos fazer é usar herança.

Dessa forma, fazemos com que o atleta herde propriedades e métodos inicialmente contidos no construtor ```Person```.

### Herança: Protótipos

A herança em JavaScript é baseada em [protótipos](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes). Na prática isso significa que todo objeto em JavaScript possui uma propriedade chamada ```prototype``` que possibilita a herança no JS.

Para que qualquer instância de ```Person``` herde seus métodos ou atributos precisamos adiciona-los ao prototype de ```Person```.

```javascript
function Person(name, yarnOfBirth, job) {
    this.name        = name;
    this.job         = job;
    this.yarnOfBirth = yarnOfBirth;
};

Person.prototype.calculateAge = function() {
    console.log(2020 - this.yarnOfBirth);
};

const Maicon = new Person('Maicon', 1995, 'developer'); // Person {name: "Maicon", job: "developer", yarnOfBirth: 1995}

Maicon.calculateAge(); // 25
```

Dessa forma ```Maicon``` herda calculateAge e pode executa-la em seu contexto. Isso faz com que qualquer objeto instanciado através de ```Person``` herde o método calculateAge.

### Herança: Cadeias de Protótipos

```Person``` é um objeto e todos os objetos em JavaScript são descendentes do [Object](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object). Todos os objetos herdam métodos e propriedades de ```Object.prototype```.

Isso é o que faz a cadeia de protótipos funcionar. Quando acessamos um método ou propriedade de um objeto o JavaScript primeiro tenta encontrar o método no objeto exato, mas se não encontra-lo ele olha para o protótipo do objeto, que é o protóripo de seu "pai". Com isso ele sobe a cadeia de protótipos, e isso continua até que não haja mais protótipos para análisar, que é nulo. E nulo não possui protótipo, então undefined é retornado.

# Conclusão

Vimos que nem tudo no JavaScript é um objeto, pois ```null``` e ```undefined``` não possuem caracteristicas de um objeto.

Também vimos:

- Vimos que variáveis inicializadas através de construtores pré-definidos no JS herdam métodos que podemos usar, como no caso do arrays que herdam métodos como map, filter, pop etc;
- Todo objeto no JavaScript possui uma propriedade ```prototype```, que possibilita a herança;
- A propriedade ```prototype``` de um objeto é onde adicionamos métodos e atributos que queremos que outros objetos herdem;
- A propriedade ```prototype``` de um objeto não é o protótipo do construtor em sí, mas é o protótipo de todas as instâncias que são criadas através dele;
- Quando o JavaScript não encontra um método que foi chamado na instância do objeto atual, ele sobe na cadeia de protótipos até que método seja enconstrado ou que undefined seja retornado;

Dicas, sugestões, conselhos ou melhorias? Você pode entrar em contato comigo pelas minhas redes ou abrir uma PR no repositório
[aqui](https://github.com/maiconrs95/maiconsilva).
