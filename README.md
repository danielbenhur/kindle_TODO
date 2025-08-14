# kindle-todo (Shell & Web UI)

Um aplicativo de tarefas leve com duas interfaces: uma de linha de comando robusta para Kterm e uma interface gráfica moderna para o navegador.

Este projeto foi reestruturado para ser o mais flexível possível:
1.  **Web UI (Padrão)**: Uma interface web moderna baseada em React que funciona **instantaneamente** no preview do Google AI Studio e em qualquer navegador, sem necessidade de instalação ou build.
2.  **Shell Version**: A implementação original em POSIX shell, agora organizada na pasta `shell/`, ideal para uso em terminais de baixa performance como o Kterm no Kindle.

---

## 1. Web UI Version (Visualização Instantânea)

A maneira mais fácil de usar o aplicativo. A interface gráfica é carregada diretamente no navegador.

### Como Funciona
Não é necessário `npm install` ou `npm run build` para testar. O `index.html` usa CDNs para carregar React, Tailwind CSS e Babel, que compilam e executam o aplicativo em tempo real no seu navegador.

### Recursos
- Interface moderna com React para adicionar, listar e editar tarefas.
- Visualização de calendário.
- Funcionalidade "Smart Add" que usa a API Gemini para quebrar tarefas complexas em subtarefas.
- Os dados são salvos localmente no `localStorage` do navegador.

### Executando no Kindle (Web UI)

Existem duas maneiras de colocar a UI web no Kindle:

#### Método A: Rápido e Fácil (Sem Build)
1.  Copie os seguintes arquivos e pastas para o seu Kindle, por exemplo, em `/mnt/us/apps/todo-web/`:
    - `index.html`
    - `index.css`
    - `index.tsx`
    - `App.tsx`, `types.ts`, `constants.ts`
    - as pastas `components/`, `context/`, `services/`
2.  Use o launcher `shell/kual_launcher_web.sh` (ajuste o caminho do arquivo nele) para abrir o `index.html` no navegador do Kindle.

#### Método B: Otimizado (com Build)
Este método cria uma versão mais rápida e otimizada, ideal para o Kindle.
1.  **No seu PC**, instale as dependências e construa o projeto:
    ```sh
    npm install
    npm run build
    ```
2.  Isso criará uma pasta `dist/`. Copie o **conteúdo** desta pasta para o seu Kindle (ex: `/mnt/us/apps/todo-web/`).
3.  Use o launcher `shell/kual_launcher_web.sh` para abrir o `index.html` a partir dessa pasta.

---

## 2. Shell Version

Uma interface de linha de comando rápida e confiável, localizada na pasta `shell/`.

### Recursos
- Implementação em POSIX shell com dependências mínimas (coreutils, awk, sed, date).
- Armazenamento em arquivos Markdown semanais em `shell/data/weeks/`.
- Comandos: `add`, `list`, `done`, `rm`, `edit`.

### Executando no Kindle (Shell Version)

1.  Copie a pasta `shell/` inteira para o seu dispositivo, por exemplo, para `/mnt/us/apps/todo-shell/`.
2.  Certifique-se de que o script principal é executável:
    ```sh
    chmod +x /mnt/us/apps/todo-shell/bin/todo
    ```
3.  **Integração com KUAL/Kterm**:
    a. Copie `shell/kual_launcher_shell.sh` para uma pasta de extensões do KUAL.
    b. Torne-o executável: `chmod +x /path/to/kual/extensions/launcher.sh`.
    c. Edite o `APP_DIR` dentro do launcher para apontar para o seu diretório de instalação (ex: `/mnt/us/apps/todo-shell`).
    d. Inicie pelo menu do KUAL. Ele abrirá o Kterm com o aplicativo de tarefas.

## Licença

MIT
