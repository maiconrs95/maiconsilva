---
date: 2019-12-01 04:25:00
title: Abstraindo as chamadas da aplicação para uma camada de serviços
description: Separando as responsabilidades de uma aplicação front end
category: react
background: "#53CFF9"
image: "/assets/img/Embedded-Software-Engineering.jpeg"
---

## Introdução

Salve pessoal! Cá estava eu, pensando em qual seria o próximo conhecimento relevante que eu poderia compartilhar com os colegas de profissão.
Foi então que me veio em mente algo que eu gosto muito de exercitar quando estou codando, que é "separar as responsabilidades" do código ao máximo possível.

Bom, se você não se preocupa em pelo menos tentar manter um código bem organizado, então essa é a hora de começar a se preocupar com isso.

## Motivação

Em um cenário real, é comum que uma aplicação faça chamadas externas para api's ou serviços para alimentar a view/app. Isso é algo que pode ser feito usando [fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch), [XML HTTP](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHTTPRequest) ou até mesmo um sdk.

Para facilitar o trabalho e evitar "repetição de código" é possível abstrair as chamadas externas do app em uma camada de serviços, onde podemos criar [Promises](https://www.maiconsilva.com/js-callbacks-promises-aw/) que irão fazer o trabalho de buscar os dados e retornar para a view apenas aquilo que é necessário para a aplicação. 👌

```javascript
export const getUserRepos = user => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${user}/repos`)
        .then(data => data.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
};
```
Isso evita de ter que repetir a url do fetch e o tratamento da resposta em cada lugar onde essa chamada seria necessária na aplicação, evitando repetir código e facilitando a implementação.

Tendo o serviço criado, basta chamar nos componentes onde ele vai ser útil e ser feliz.

```javascript
async function handleSubmit(evt) {
    evt.preventDefault();

   if (loading) return;

   setLoading(true);

   try {
        const repos = await getUserRepos(inputValue);

        setUserRepos(repos);
    } catch (error) {
        alert(error);
    } finally {
        setLoading(false);
    }
}
```

Aqui está o código completo do componente onde foi usado o service:

```javascript
import React, { useState } from "react";

import { getUserRepos } from "../services/user.service";

function UserPage() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRepos, setUserRepos] = useState(null);

  /**
   * Set Input Value
   *
   * @param {object} evt
   */
  function handleInputValue(evt) {
    setInputValue(evt.target.value);
  }

  /**
   * Submit form
   *
   * @param {object} evt
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const repos = await getUserRepos(inputValue);

      setUserRepos(repos);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-data">
          <input
            type="search"
            value={inputValue}
            onChange={handleInputValue}
            disabled={loading}
          />
        </div>
        <div className="form-data">
          <button type="submit" disabled={loading}>
            {loading ? "Carregando" : "Buscar"}
          </button>
        </div>
      </form>

      {userRepos && userRepos.length && (
        <ul>
          {userRepos.map((repo, i) => (
            <li key={i}>
              <p>
                <b>Repo:</b> {repo.full_name}
              </p>
              <a href={repo.html_url} target="blank">
                Github page
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserPage;
```

Caso a resposta precise ser tratada antes de chegar para a view renderizar, é possível fazer isso dentro do próprio service, deixando a responsabilidade de buscar os dados e devolver os dados tratados exclusivamente para o service, evitando código desnecessário e facilitando a manutenção.

## Conclusão

Aqui você pode ver a estrutura da aplicação que usei para o exemplo enquanto escrevia o artigo.

```bash
├── src
│   ├── pages
|   |   └── User.js
│   └── services
|       └── user.service.js
└── README.md
```

Você pode conferir o código produzido durante a escrita do artigo no meu [code sandbox](https://codesandbox.io/s/mutable-snowflake-4qnwv).

Dicas, sugestões, conselhos ou melhorias? Você pode entrar em contato comigo pelo meu email ou abrir uma PR no repositório [aqui](https://github.com/maiconrs95/maiconsilva).
