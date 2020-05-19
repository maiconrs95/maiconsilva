---
date: 2020-05-16 18:15:00
title: Bem vindo, Deno
description: Um overview sobre o novo interpretador JS
category: deno
background: "#222222"
image: "/assets/img/deno.jpeg"
---

# O que é o Deno?

Deno é um runtime para JavaScript e TypeScript baseado no V8 e na linguagem de programação Rust. Foi criado por Ryan Dahl, criador original do Node.js, e é focado em segurança e produtividade.

Nesse artigo vamos dar uma olhada em algumas features presentes no Deno e também em como ele funciona.

> Segundo o Ryan Dahl, o Deno foi criado para tratar alguns assuntos que ele deverira ter pensado mais quando desenvolveu o nodejs. E NÃO, ele não vai substituir o node.

## Principais caracteristicas

- Seguro por padrão. Sem acesso a arquivos, redes ou ambientes (a menos que seja explicitamente ativado).
- Possui um runtime TypeScript
- Os scripts podem ser agrupados em um único arquivo JavaScript.
- Construido em [Rust](https://www.rust-lang.org/) (o núcleo do Deno foi escrito em Rust, Node em C ++), [Tokio](https://tokio.rs/) (loop de eventos) e [V8](https://v8.dev/) (runtime JavaScript)

## Deno x Node

O Deno não usa o npm para gerenciar seus módulos. Isso é feito referenciando URLS através do "ES Modules".

```javascript
import * as log from "https://deno.land/std/log/mod.ts";
```

- Não utiliza ```package.json``` para resolução de módulos
- Todas as ações assíncronas no Deno retornam uma ```Promise```
- O Deno requer permissões explícitas para acessar arquivos, redes e ambientes
- Deno sempre morre por erros não capturados

## Preparando o ambiente

A instalação é bem simples, basta seguir a [documentação](https://deno.land/). Como estou no Ubuntu vou instalar usando Shell (macOS, Linux):

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

No fim da instalação será mostrado no console a configuração necessária pra utilizar o ```deno``` em seu ambiente.

Caso tenha alguma dúvida você pode consultar [aqui.](https://deno.land/manual/getting_started/setup_your_environment)

### Primerio script

O Deno também é um runtime TypeScript, então para testar eu criei um repositório ```starting-deno``` com o arquivo ```deno.ts```.

```javascript
let message: string;

message = 'Hello, Maicon!';
```

```shell
> deno run deno.ts

Compile file:///home/maicon/Documentos/projects/my-projects/starting-denojs/deno.ts
Hello, Maicon!
```

Legal, né não? Ele compila o código e depois executa, sem a necessidade de transpiladores de terceiros.

## HTTP e FileSystem

Primeiro vamos subir um servidor de demonstração pra começar a ver as caracteristicas do deno em ação.

Crie o arquivo server.ts, e então:

```ts
/** ES Modules */
import { serve } from "https://deno.land/std@0.50.0/http/server.ts";

/** Create Server */
const server = serve({
    port: 3000
});

console.log("http://localhost:3000/");

/** Async "for" iterator to listening server requests */
for await (const req of server) {
    req.respond({
        body: "Hello World\n"
    });
}
```

Ao rodar o script server.ts, o deno importa o módulo ```std@0.50.0/http/server.ts``` e salva ele em cache, como a node_modules faz no node.

Para rodar o server basta em seu terminal rodar ```deno run server.ts```

Após o deno transpilar e interpretar os módulos temos um erro no console:

```shell
error: Uncaught PermissionDenied: network access to "0.0.0.0:3000", run again with the --allow-net flag
```

Isso aconteceu porque não explicitamos o acesso a rede para o deno com a flag ```--allow-net```.

Criar um servidor ou intepretar um script pode não apresentar muitos riscos, mas esse cenário muda quando estamos executando módulos de terceiros em nossa máquina/servidor, certo?

> A flag --allow-net da a permissão de rede para nosso script, mas ele ainda não tem permissão para ler nem gravar em nosso sistema de arquivos

E se tentarmos ler um arquivo em um script interpretado pelo deno?

Podemos fazer isso utilizando o bom e velho FileSystem:

```javascript
import { readJson } from "https://deno.land/std/fs/mod.ts";

const file = await readJson("./foo.json");

console.log(file);
```

Alguns módulos ainda não estão [estáveis](https://deno.land/manual/runtime/stability) na v1.0.0, e para ter acesso a essas apis podemos utilizar a flag ```--unstable```.

```shell
deno run --unstable  fs.js

error: Uncaught PermissionDenied: read access to "/home/maicon/Documentos/projects/my-projects/starting-denojs/foo.json", run again with the --allow-read flag
```

Como não explicitamos a flag para leitura de arquivos ele não acessa o arquivo solicitado no script.

# Conclusão

O deno ainda é novo, e provavelmente tem um caminho bem legal pela frente e não foi lançado para substituir o node.

Vimos algumas coisas bem legais nele como permissões explicitas e também suporte "nativo" ao typescript. Isso pode nos ajudar a enxergar para qual lado o javascript tende a caminhar.

Você pode conferir o código produzido durante a escrita do artigo no meu [Github](https://github.com/maiconrs95/starting-deno).

Dicas, sugestões, conselhos ou melhorias? Você pode entrar em contato comigo pelo meu email ou abrir uma PR no repositório [aqui](https://github.com/maiconrs95/maiconsilva).
