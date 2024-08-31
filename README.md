# Meter Scan Water Gas

## Descrição

O **Meter Scan Water Gas** é um serviço back-end desenvolvido para gerenciar a leitura individualizada do consumo de água e gás. O diferencial deste serviço é a utilização de inteligência artificial para extrair medições a partir de fotos dos medidores. Esse sistema visa facilitar a coleta de dados de consumo, oferecendo uma maneira prática e eficiente de monitorar o uso de água e gás.

## Tecnologias Usadas

- **Node.js**: Uma plataforma de execução de JavaScript no servidor, baseada no motor V8 do Google Chrome. Permite a construção de aplicações de rede rápidas e escaláveis, usando uma arquitetura orientada a eventos e baseada em I/O não bloqueante.

- **Express**: Um framework web para Node.js que facilita o desenvolvimento de aplicativos e APIs. Oferece uma ampla gama de recursos para criar servidores HTTP e gerenciar rotas, tornando o desenvolvimento mais rápido e organizado.

- **TypeScript**: Um superset do JavaScript que adiciona tipagem estática ao código. Ajuda a detectar erros antes da execução e melhora a manutenção e escalabilidade do código, oferecendo uma experiência de desenvolvimento mais robusta.

- **ESLint**: Uma ferramenta de linting para JavaScript e TypeScript que ajuda a identificar e corrigir problemas no código. Fornece regras e boas práticas para manter a qualidade e a consistência do código ao longo do projeto.

- **Prettier**: Um formatador de código que garante que o código seja formatado de maneira consistente. Integra-se com várias ferramentas e editores, garantindo que o estilo de código siga padrões uniformes e reduza o tempo gasto com formatação manual.

- **Prisma com PostgreSQL**: Prisma é uma ferramenta de ORM (Object-Relational Mapping) que facilita a interação com bancos de dados relacionais. O PostgreSQL é um sistema de gerenciamento de banco de dados relacional poderoso e de código aberto. Juntos, oferecem uma solução eficiente para acessar e gerenciar dados de forma segura e eficaz.

- **Docker**: Uma plataforma que permite a criação, o gerenciamento e a execução de containers. Containers são ambientes isolados que empacotam uma aplicação e suas dependências, garantindo que ela funcione de forma consistente em qualquer ambiente, desde o desenvolvimento até a produção.

- **Google Gemini**: Um serviço de processamento de imagens e reconhecimento de texto fornecido pelo Google. No projeto, é utilizado para extrair medições a partir de fotos de medidores, usando inteligência artificial para interpretar e converter imagens em dados utilizáveis.

## Configuração para Ambiente

### Criando o `.env`

O arquivo .env serve tanto para desenvolvimento quanto para Docker. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# POSTGRES
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=meterscanwatergas

# BACKEND
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/meterscanwatergas?schema=public

# GEMINI
GEMINI_API_KEY=<chave da API>
```

### Desenvolvimento

Para configurar o ambiente de desenvolvimento, siga estes passos:

1. Instale as dependências do projeto:

```env
npm install
```

2. Execute as migrações do Prisma:

```env
npx prisma migrate dev
```

3. Inicie o servidor em modo de desenvolvimento:

```env
npm run dev
```

### Docker

Para rodar o projeto em um container Docker, use o comando:

```env
docker compose up
```

## Instalando o Docker

Para instalar o Docker, siga os passos descritos na [documentação oficial do Docker](https://docs.docker.com/get-docker/). O guia fornece instruções detalhadas para diferentes sistemas operacionais, garantindo que você possa configurar o Docker corretamente em seu ambiente de desenvolvimento.
