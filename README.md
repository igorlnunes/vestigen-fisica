# Vestibular Fácil: Preparação para o Vestibular de Física

---

Este projeto é uma aplicação **Angular 19** desenvolvida em **TypeScript**. Seu objetivo é auxiliar estudantes do ensino médio na preparação para o vestibular, com foco em **física**. A aplicação utiliza a **Inteligência Artificial Gemini do Google** para gerar questões de física, com alternativas, a partir de diversos tópicos do ensino médio.

Após selecionar uma alternativa, é possível **gerar a resolução** da questão. A aplicação renderiza fórmulas e equações utilizando **Markdown e LaTeX**, otimizando a apresentação do conteúdo.

## Como Executar a Aplicação

---

Para rodar o DescomplicaVest em sua máquina, siga os passos abaixo:

### 1. Obtenha a Chave da API do Google Gemini

Uma chave de API do Google Gemini é necessária para o funcionamento da aplicação. Instruções para obtenção da chave estão disponíveis em [Como Obter uma Chave de API](https://aistudio.google.com/app/apikey).

### 2. Configure a Chave da API

Abra o arquivo `src/environments/environment.ts` e insira sua chave da API no campo `googleApiKey`:

```typescript
export const environment = {
  production: false,
  googleApiKey: 'SUA_CHAVE_DA_API_AQUI', // Substitua pela sua chave
};
```

### 3. Instale as Dependências

No terminal, navegue até o diretório do projeto e execute o comando para instalar as dependências:

```bash
npm install
```

### 4. Inicie a Aplicação

Com as dependências instaladas, inicie o servidor de desenvolvimento:

```bash
ng serve
```

A aplicação estará acessível em seu navegador via `http://localhost:4200/`.

---