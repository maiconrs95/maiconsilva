---
date: 2020-08-24 10:00:00
title: "React Hooks: extraindo a lógica dos componentes para funções reutilizáveis"
description: Como criar custom hooks de forma efetiva
category: react
background: "#53CFF9"
image: "/assets/img/posts-images/separando-camadas-react-hooks/banner.png"
---

# Introdução

Que os Hooks do React vieram pra facilitar nossa experiência como desenvolvedor todos sabemos, mas
como aproveitar melhor o poder que essa biblioteca tão amada pela comunidade nos fornece?

Criando "Custom Hooks" para abstrair o estado e as regras dos componentes.

Vamos ver onde encaixar essa mentalidade em um exemplo prático.

> É recomendável que você tenha algum conhecimento em React Hooks para entender melhor o exemplo do post.

#### Índice

- [Nossa demanda](#nossa-demanda)
- [Nosso custom hook](#nosso-hook)
- [Utilizando o custom hook](#utilizando-o-custom-hook)

## Nossa demanda

> Vamos usar a API do Github para o exemplo do artigo.

Imagine os seguintes requisitos:

- O usuário deve filtrar uma lista de repositórios baseado em um `username`;
- O usuário deve ser capaz de excluir um repositório dessa lista;
- O usuário deve ser capaz de atualizar um repositório dessa lista;

vamos definir que nossa camada de estado, regras de negócio e view devem ser independentes.

Dessa forma criamos componentes desacoplados facilitando testes, reutilização, manutenção e afins.

## Nosso Custom Hook

Nosso hook vai ter algumas responsabilidades:

- Deve receber um `username` e buscar os repositórios desse user;
- Deve indicar se os repositórios ainda estão sendo buscados na api (loading status);
- Deve fornecer um método que recebe um argumento `id` e exclui o repositório relacionado a esse `id`;
- Deve fornecer um método que recebe um `id`, os campos do repositório a serem atualizados e atualiza o repositório
relacionado ao `id` passado.

> Nessa parte do desenvolvimento é muito comum o dev criar componentes com estados e regras vinculados, ou seja, o componente faz tudo. Ele busca os dados, valida as regras etc etc. Isso faz com que a view do seu componente seja 100% acoplada ao estado e as regras de negócio.

O que vamos fazer aqui é criar um custom hook chamado `useUserRepositories`, que tem como responsabilidade preencher os requisitos que citamos acima.

Então, vamos aos itens:

- Deve receber um `username` e buscar os repositórios desse user;

```typescript
const toJSON = (data: Response) => data.json();

export interface Repository {
  id: number;
  name: string;
}

interface Props {
  username: string;
}

const useUserRepositories = ({ username }: Props) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

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

Para esse item, basta refatorarmos o `useEffect` onde a busca acontece e expor o status de `loading` no nosso hook:

```typescript
  const [repositories, setRepositories] = useState<Repository[]>([]);
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

  return {
    loading,
    repositories,
  };
```

- Deve fornecer um método que recebe um argumento `id` e exclui o repositório relacionado a esse `id`;

Aqui entra um ponto importante. A fim de facilitar o exemplo, eu não vou realizar nenhuma chamada a api para excluir o repositório, mas vou exclui-lo do estado atual do hook. Pra isso vamos fazer o `filter` e manipular o estado de `repositories`.

No inicio do post deixamos uma coisa bem clara, a camada de estado deve ser separada da camada de regras de negócio, certo?

Com isso, vamos criar uma função com a seguinte assinatura:

- Recebe a lista de repositórios atual;
- Recebe o `id` do item que deve ser excluído;
- Retorna todos os repositórios, com exceção do item que deve ser excluído.

Essa função é reponsável pela regra:

- Excluir um repositório através de um `id` fornecido;

```typescript
const removeRepository = (prevState: Repository[], repoID: number) =>
  prevState.filter((repo) => repo.id !== repoID);
```

Agora precisamos utilizar ela no nosso hook pra manipular o estado de repositórios atual e expor esse método para que qualquer dev possa usa-lo quando necessário:

```typescript
  ...

  const handleRemove = (repoID: number) => {
    setRepositories(removeRepository(repositories, repoID));
  };

  ...

  return {
    loading,
    repositories,
    handleRemove,
  };
```

E agora vamos ao último item do nosso hook:

- Deve fornecer um método que recebe um `id`, os campos do repositório a serem atualizados e atualiza o repositório
relacionado ao `id` passado.

Da mesma forma que fizemos no método de exclusão, aqui vamos criar uma função que tem como responsabilidades:

- Validar os campos obrigatórios `id` e `name`;
- Atualizar um repositório baseado em um `id`.

```typescript
const updateRepository = (
  prevState: Repository[],
  repository: Repository
) => {
  if (!repository.id) {
    throw new Error("id é obrigatório");
  }

  if (!repository.name) {
    throw new Error("Name é obrigatório");
  }

  return prevState.map((repo) =>
    repo.id === repository.id ? repository : repo
  );
};
```

Agora precisamos utiliza-la em nosso hook, e também expor ela pra qualquer dev que precise atualizar um repositório:

```typescript
  ...

  const handleUpdate = (repository: Repository) => {
    try {
      setRepositories(updateRepository(repositories, repository));
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

Percebe que nada foi renderizado aqui, mas temos os dados dos repositórios baseado em um `username`, métodos para excluír e atualizar um repositório, cumprindo todos requisitos que definimos para nossa demanda?

Com isso, podemos utilizar esse hook em qualquer lugar da aplicação. Com ele podemos obter repositórios, renderizar, excluir `items` e também atualizar `items` seja por modal, formulários ou qualquer outra coisa que seja, pois nossa camada de estado e de regras está 100% separada da nossa view.

Aqui está o hook completo:

```typescript
import { useState, useEffect } from "react";

const toJSON = (data: Response) => data.json();

export interface Repository {
  id: number;
  name: string;
}

interface Props {
  username: string;
}

const removeRepository = (prevState: Repository[], repoID: number) =>
  prevState.filter((repo) => repo.id !== repoID);

const updateRepository = (
  prevState: Repository[],
  repository: Repository
) => {
  if (!repository.id) {
    throw new Error("id é obrigatório");
  }

  if (!repository.name) {
    throw new Error("Name é obrigatório");
  }

  return prevState.map((repo) =>
    repo.id === repository.id ? repository : repo
  );
};

const useUserRepositories = ({ username }: Props) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
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
    setRepositories(removeRepository(repositories, repoID));
  };

  const handleUpdate = (repository: Repository) => {
    try {
      setRepositories(updateRepository(repositories, repository));
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

Esse é um dos principais benefícios dos custom Hooks: Reaproveitar dados e regras nos componentes.

Agora vamos consumir esse hook e ver ele funcionando na nossa aplicação.

## Utilizando o Custom Hook

Com nosso hook pronto pra uso, só falta uma coisa:

- Dar a possibilidade do usuário final interagir com nossa aplicação.

De forma mais resumida, precisamos de um componente para renderizar os repositórios e também dar a possiblidade do usuário remover e atualizar esses dados.

Aqui eu vou separar em dois componentes.

- `UserRepositories`: A lista de repositórios, que vai renderizar os dados, e também os botões para executar as ações de excluir e atualizar repositórios;
- `EditRepository`: Um componente de formulário, que recebe o repositório que deve ser atualizado, e no submit executa nosso método de update fornecido pelo hook `useUserRepositories`.

### UserRepositories

```typescript
import React, { useState } from "react";

import EditRepository from "../EditRepository";
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

  const [editableRepository, setEditableRepository] = useState({});

  if (loading) {
    return <p>Carregando repositórios</p>;
  }

  return (
    <>
      <h1>Repositórios de {username}</h1>

      <div>
        <EditRepository
          repository={editableRepository}
          cancelEdit={() => setEditableRepository({})}
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
                  onClick={() => setEditableRepository(repo)}
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

### EditRepository

```typescript
import React, { useRef, FormEvent, useEffect } from "react";

import { Repository } from "../../hooks/useUserRepositories";

interface Props {
  repository: Repository;
  cancelEdit: () => void;
  onSubmit: (repo: Repository | object) => void;
}

const EditRepository: React.FC<Props> = ({
  repository,
  onSubmit,
  cancelEdit
}) => {
  const inputRef = useRef(null);
  const disabledActions = !repository.id || !repository.name;

  useEffect(() => {
    inputRef.current.value = repository.name || "";
  }, [repository]);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const repo = {
      id: repository.id,
      name: inputRef.current.value
    };

    onSubmit(repo);
  };

  return (
    <form onSubmit={handleSubmit}>
      {repository.name ? (
        <p>Editar: {repository.name}</p>
      ) : (
        <p>Selecione um repositório para editar</p>
      )}
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

export default EditRepository;
```

### Componente renderizado

![Image](/assets/img/posts-images/separando-camadas-react-hooks/componente-renderizado.jpeg)

## Conclusão

Nesse post você viu como criar um custom hook pra separar as responsabilidades do seu app react e também pra compartilhar lógica entre componentes.

Vimos um exemplo prático onde é dado uma demanda com alguns requisitos e precisamos implementa-la.

Pra isso, criamos um hook que:

- Recebe um `username` e lista os repositórios do usário informado;
- Fornece um método para remover um repositório da lista baseado em um `id`;
- Atualiza um repositório da lista baseado em um `id`.

Também consumimos esse hook exibindo as coisas em tela, dando a possibilidade do usuário interagir com nosso app.

Você pode conferir o código produzido durante a escrita do artigo no meu [Codesandbox](https://codesandbox.io/s/regras-negocio-hooks-rhw9p).


