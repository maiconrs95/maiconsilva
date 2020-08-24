---
date: 2020-08-24 10:00:00
title: Separando responsabilidades com React Hooks
description: Como separar a camada de estados e regra de negócio com custom hooks
category: react
background: "#53CFF9"
image: "/assets/img/posts-images/shell-script/bash-wallpaper.jpeg"
---

# Introdução

Que os Hooks do React vieram pra facilitar nossa experiência como desenvolvedor todos sabemos, mas
como de fato aproveitar todo o poder que essa biblioteca tão amada pela comunidade nos fornece?

Criando "Custom Hooks" para abstrair nossa camada de estado e regras de negócio da view.

Vamos ver onde encaixar essa mentalidade em um exemplo prático.

> É recomendável que você tenha algum conhecimento em React Hooks para entender melhor o exemplo do post.

#### Índice

- [Nossa demanda](#nossa-demanda)
- [Nosso custom hook](#nosso-hook)
- [Utilizando o custom hook](#utilizando-o-custom-hook)

## Nossa demanda

> Vou estar usando a API do Github para o exemplo do post.

Imagine a seguinte demanda:

- O usuário deve filtrar uma lista de repositórios baseado em um `username`;
- O usuário deve poder excluir um repositório dessa lista;
- O usuário deve poder atualizar um repositório dessa lista;

Partindo dessa demanda vamos definir que nossa camada de estado, regras de negócio e view devem ser independentes.

Dessa forma criamos componentes desacoplados facilitando testes, reutilização, manutenção e afins.

## Nosso Custom Hook

Nosso hook vai ter algumas responsabilidades:

- Deve reber um `username` e buscar os repositórios desse user;
- Deve indicar se os repositórios ainda estão sendo buscados na api (loading status);
- Deve fornecer um método para excluir um repositório através de um id fornecido;
- Deve fornecer um método para atualizar um repositório através de um id fornecido e os dados a serem atualizados, onde nome é obrigatório;

> Nessa parte do desenvolvimento é muito comum o dev criar componentes com estados e regras vinculados, ou seja, o componente faz tudo. Ele busca os dados, valida as regras etc etc. Isso faz com que a view do seu componente seja 100% acoplada ao estado e as regras de negócio.

O que vamos fazer aqui é criar um custom hook chamado `useUserRepositories`, que tem como responsabilidade os items que citamos acima.

Então, vamos aos items:

- Deve reber um `username` e buscar os repositórios desse user;

```typescript
const toJSON = (data: Response) => data.json();

export interface Repositorie {
  id: number;
  name: string;
}

interface Props {
  username: string;
}

const useUserRepositories = ({ username }: Props) => {
  const [repositories, setRepositories] = useState<Repositorie[]>([]);

  useEffect(() => {
    (async () => {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        ).then(toJSON);

        setRepositories(response);
    })();
  }, [username]);

  return {
    repositories,
  };
};
```

- Deve indicar se os repositórios ainda estão sendo buscados na api (loading status);

Para esse item, basta refatorarmos o `useEffect` onde a busca acontece e export o status de `loading` no nosso hook:

```typescript
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        ).then(toJSON);

        setRepositories(response);
      } catch (e) {
        alert("Erro ao buscar os repositórios de: " + username);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  return {
    loading,
    repositories,
  };
```

- Deve fornecer um método para excluir um repositório através de um id fornecido;

Aqui entra um ponto importante. A fim de facilitar o exemplo, eu não vou realizar nenhuma chamada a api para excluir o item, mas vou exclui-lo do estado atual do hook. Pra isso vamos fazer um `filter` nos repostiróios atuais e retornar todos que possuir um `id` diferente do que foi fornecido pelo método responsável por excluir o item da lista.

No inicio do post deixamos uma coisa bem clara, a camada de estado deve ser separada da camadada de regras de negócio, certo?

Com isso, vamos criar uma função com a seguinte assinatura:

- Recebe a lista de repositórios atual;
- Recebe o `id` do item que deve ser excluido;
- Retorna todos os repositórios, com exceção do item que deve ser exlcuido.

Essa função é reposável pela regra:

- Excluir um repositório através de um id fornecido;

```typescript
const removeRepositorie = (prevState: Repositorie[], repoID: number) =>
  prevState.filter((repo) => repo.id !== repoID);
```

Agora precisamos utilizar ela no nosso hook pra manipular o estado de repositórios atual e expor esse método para que qualquer dev possa usa-lo quando necessário:

```typescript
  ...

  const handleRemove = (repoID: number) => {
    setRepositories(removeRepositorie(repositories, repoID));
  };

  ...

  return {
    loading,
    repositories,
    handleRemove,
  };
```

E agora vamos ao último item do nosso hook:

- Deve fornecer um método para atualizar um repositório através de um id fornecido e os dados a serem atualizados, onde nome é obrigatório.

Da mesma forma que fizemos no método de exclusão, aqui vamos criar uma função que tem como responsablidade:

- Validar os items obrigaróios `id` e `name`;
- Atualizar um repositório baseado em um `id` informado.

```typescript
const updateRepositorie = (
  prevState: Repositorie[],
  repositorie: Repositorie
) => {
  if (!repositorie.id) {
    throw new Error("id é obrigaróio");
  }

  if (!repositorie.name) {
    throw new Error("Name é obrigaróio");
  }

  return prevState.map((repo) =>
    repo.id === repositorie.id ? repositorie : repo
  );
};
```

Agora precisamos utiliza-la em nosso hook, e também expor ela pra qualquer dev que precise atualizar um repositório:

```typescript
  ...

  const handleUpdate = (repositorie: Repositorie) => {
    try {
      setRepositories(updateRepositorie(repositories, repositorie));
    } catch (e) {
      alert(e);
    }
  };

  return {
    loading,
    repositories,
    handleRemove,
    handleUpdate
  };
```

Percebe que nada foi renderizado aqui, mas temos dados dos repositórios baseado em um `usename`, métodos para exlcuir e atualizar um repositório cumprindo todas as regras de negócio definidas no inicio dessa sessão do post?

Com isso podemos utilizar esse hook em qualquer lugar da aplicação. Com ele podemos renderizar items, excluir items e também atualizar items seja por modal, formulários ou qualquer outra coisa que seja, pois nossa camada de estado e de regras está 100% separada da nossa view.

Aqui está o hook completo:

```typescript
import { useState, useEffect } from "react";

const toJSON = (data: Response) => data.json();

export interface Repositorie {
  id: number;
  name: string;
}

interface Props {
  username: string;
}

const removeRepositorie = (prevState: Repositorie[], repoID: number) =>
  prevState.filter((repo) => repo.id !== repoID);

const updateRepositorie = (
  prevState: Repositorie[],
  repositorie: Repositorie
) => {
  if (!repositorie.id) {
    throw new Error("id é obrigaróio");
  }

  if (!repositorie.name) {
    throw new Error("Name é obrigaróio");
  }

  return prevState.map((repo) =>
    repo.id === repositorie.id ? repositorie : repo
  );
};

const useUserRepositories = ({ username }: Props) => {
  const [repositories, setRepositories] = useState<Repositorie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        ).then(toJSON);

        setRepositories(response);
      } catch (e) {
        alert("Erro ao buscar os repositórios de: " + username);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const handleRemove = (repoID: number) => {
    setRepositories(removeRepositorie(repositories, repoID));
  };

  const handleUpdate = (repositorie: Repositorie) => {
    try {
      setRepositories(updateRepositorie(repositories, repositorie));
    } catch (e) {
      alert(e);
    }
  };

  return {
    loading,
    username,
    repositories,
    handleRemove,
    handleUpdate
  };
};

export default useUserRepositories;
```

Com isso já podemos importa-lo nos componentes da aplicação e utiliza-lo, aproveitando dos beneficios dos hooks.

## Utilizando o Custom Hook

Com nosso hook pronto pra uso só falta um última coisa:

- Dar a possibilidade do usuário final interagir com nossa aplicação.

De forma mais resumida, precisamos de um componente para renderizar os repositórios e também da a possiblidade do usuário remover e atualizar items.

Aqui eu vou separar em dois componentes.

- `UserRepositories`: A lista de repositórios, com um botão para excluir e editar um repositório;
- `EditRepositorie`: Um componente de formulário, que recebe o repositório que deve ser atualizado, e no submit executa nosso método de update fornecido pelo hook;

### UserRepositories

```typescript
import React, { useState } from "react";

import EditRepositorie from "../EditRepositorie";
import useUserRepositories from "../../hooks/useUserRepositories";

const UserRepositories = () => {
  const {
    loading,
    username,
    repositories,
    handleRemove,
    handleUpdate
  } = useUserRepositories({
    username: "maiconrs95"
  });

  const [editableRepositorie, setEditableRepositorie] = useState({});

  if (loading) {
    return <p>Carregando repositórios</p>;
  }

  return (
    <>
      <h1>Repositórios de {username}</h1>

      <div>
        <EditRepositorie
          repositorie={editableRepositorie}
          cancelEdit={() => setEditableRepositorie({})}
          onSubmit={handleUpdate}
        />

        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>
              {repo.name}
              <span>
                <button
                  className="remove"
                  onClick={() => handleRemove(repo.id)}
                >
                  X
                </button>
                <button
                  className="update"
                  onClick={() => setEditableRepositorie(repo)}
                >
                  Editar
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserRepositories;
```

### EditRepositorie

```typescript
import React, { useRef, FormEvent, useEffect } from "react";

import { Repositorie } from "../../hooks/useUserRepositories";

interface Props {
  repositorie: Repositorie;
  cancelEdit: () => void;
  onSubmit: (repo: Repositorie | object) => void;
}

const EditRepositorie: React.FC<Props> = ({
  repositorie,
  onSubmit,
  cancelEdit
}) => {
  const inputRef = useRef(null);
  const disabledActions = !repositorie.id || !repositorie.name;

  useEffect(() => {
    inputRef.current.value = repositorie.name || "";
  }, [repositorie]);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const repo = {
      id: repositorie.id,
      name: inputRef.current.value
    };

    onSubmit(repo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Editar: {repositorie.name}</p>
      <input ref={inputRef} disabled={disabledActions} />

      <button type="submit" disabled={disabledActions}>
        Salvar
      </button>
      <button type="button" onClick={cancelEdit}>
        cancelar
      </button>
    </form>
  );
};

export default EditRepositorie;
```

## Conclusão

Nesse post você viu como criar um custom hook pra separar as reponsabilidades do seu app react e também pra compartilhar lógica entre componentes.

Vimos um exemplo prático onde é dado uma demanda e precisamos implementa-la.

Pra isso, criamos um hook que:

- Recebe um `username` e lista os repositórios do usário informado;
- Fornece um método para remover um repositório da lista baseado em um `id`;
- Atualiza um repostiróio da lista baseado em um `id`;

Também consumimos esse hook exibindo as coisas em tela, dando a possibilidade do nosso usuário interagir com nosso app.

Você pode conferir o código produzido durante a escrita do artigo no meu [Codesandbox](https://codesandbox.io/s/regras-negocio-hooks-rhw9p).


