# Te Amo Muito Client

## 📝 Descrição

TeamoMuito Client é uma aplicação web romântica desenvolvida com Next.js, que permite aos usuários criar homenagens personalizadas para seus relacionamentos. A aplicação permite que os usuários criem uma experiência única combinando fotos, datas especiais, mensagens e músicas, tudo isso culminando em um QR Code que revela a homenagem completa.

## 🔗 Repositórios Relacionados

- [Te Amo Muito Server](https://github.com/MateusHoffman/teamomuito_server) - Backend da aplicação que fornece as APIs necessárias para o funcionamento do cliente.

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 14** - Framework React para desenvolvimento web
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS para estilização
- **Axios** - Cliente HTTP para requisições
- **date-fns** - Biblioteca para manipulação de datas
- **html2canvas** - Geração de screenshots
- **qrcode.react** - Geração de QR Codes
- **react-player** - Player de mídia

### Ferramentas de Desenvolvimento

- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **Webpack** - Bundling de módulos
- **TypeScript** - Verificação de tipos

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Diretório principal da aplicação
│   ├── components/         # Componentes React reutilizáveis
│   ├── context/           # Contextos React para gerenciamento de estado
│   ├── services/          # Serviços e integrações com API
│   ├── utils/             # Funções utilitárias
│   ├── assets/            # Recursos estáticos (imagens, fontes, etc.)
│   ├── [slug]/            # Rotas dinâmicas
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal da aplicação
│   └── page.tsx           # Página inicial
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações.

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de código

## 🌟 Funcionalidades

- Criação de homenagens personalizadas para casais
- Upload de fotos do relacionamento
- Adição de data e hora do início do namoro
- Inclusão de mensagens personalizadas
- Integração com vídeos do YouTube
- Geração de QR Code para compartilhamento
- Interface moderna e responsiva
- Sistema de pagamento integrado
- Preview em tempo real da homenagem

## 🔒 Segurança

- Validação de dados do formulário
- Validação de e-mail
- Validação de tipos com TypeScript
- Linting para manter a qualidade do código
- Variáveis de ambiente para configurações sensíveis

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Autor

### Mateus Hoffman Silva

Desenvolvedor Full Stack apaixonado por criar experiências digitais únicas e memoráveis.

#### Contato

- 📧 Email: mateushoffmandev@gmail.com
- 📱 Celular: +55 19 989428951
- 💼 LinkedIn: [mateushoffman](https://www.linkedin.com/in/mateushoffman/)
- 💻 GitHub: [MateusHoffman](https://github.com/MateusHoffman)

## 🙏 Agradecimentos

Gostaria de expressar minha gratidão a todos que contribuíram para o desenvolvimento deste projeto:

- A todos os usuários que testaram e forneceram feedback valioso
- À comunidade open source por disponibilizar ferramentas incríveis
- Aos amigos e familiares que apoiaram durante o desenvolvimento
- A todos os casais que inspiram este projeto com suas histórias de amor

Este projeto é dedicado a todos os casais que buscam formas especiais de expressar seu amor e carinho.
