# kindle-todo (Shell & Web UI)

Lightweight terminal "To Do" app for Kindle (KUAL/Kterm) and minimal Linux systems, now with a parallel Web UI version.

This project contains two versions:
1.  **Shell Version**: A POSIX shell implementation with minimal dependencies, designed for Kterm.
2.  **Web UI Version**: A modern React-based graphical interface, designed to run offline in the Kindle's browser.

Both versions can be launched via KUAL.

---

## 1. Shell Version

A fast, reliable command-line to-do manager.

### Features
- POSIX shell implementation; minimal dependencies (coreutils, awk, sed, date).
- Week-based storage in `data/weeks/YYYY-WW.md` as simple lines.
- Commands: add, list, done, rm, edit, plugins, calendar.
- Plugin system: drop executable scripts in `plugins/`.
- Designed for e-ink terminals and low-resource devices.

### Shell Version Installation & Usage

1. Copy the project files (`bin`, `lib`, `plugins`, `data`) to your device, e.g., `/mnt/us/apps/kindle-todo`.
2. Ensure the main script is executable:
   ```sh
   chmod +x /mnt/us/apps/kindle-todo/bin/todo
   ```
3. **KUAL / Kterm Integration**:
   a. Copy `kual_launcher_shell.sh` to a KUAL extensions folder, e.g., `/mnt/us/extensions/todo-shell/`.
   b. Make it executable: `chmod +x /mnt/us/extensions/todo-shell/kual_launcher_shell.sh`.
   c. Edit the `APP_DIR` inside the launcher script to point to your installation path (`/mnt/us/apps/kindle-todo`).
   d. Launch from the KUAL menu. It will open Kterm with the `todo` app running.

---

## 2. Web UI Version

A rich graphical interface that runs offline in the Kindle's built-in browser.

### Features
- Modern React UI with components for adding, listing, and editing tasks.
- Calendar view to visualize tasks.
- "Smart Add" feature using Gemini API to break down tasks.
- Data is stored locally in the browser's localStorage.
- Packaged as a fully offline-capable static website.

### Web Version Installation & Usage

#### Step A: Build the Web App (on your PC)

You need Node.js and npm to build the web app.

1.  **Install dependencies**:
    ```sh
    npm install
    ```
2.  **Build the static files**:
    ```sh
    npm run build
    ```
    This will create a `dist/` directory containing `index.html` and other assets.

#### Step B: Deploy to Kindle

1. Copy the contents of the `dist/` directory to your device, e.g., `/mnt/us/apps/kindle-todo/web-ui/`.
2. **KUAL / Browser Integration**:
   a. Copy `kual_launcher_web.sh` to a KUAL extensions folder, e.g., `/mnt/us/extensions/todo-web/`.
   b. Make it executable: `chmod +x /mnt/us/extensions/todo-web/kual_launcher_web.sh`.
   c. Edit the `HTML_FILE_PATH` inside the launcher to point to your `index.html` file (`/mnt/us/apps/kindle-todo/web-ui/index.html`).
   d. Launch from the KUAL menu. It will open the Kindle's browser directly to the app.

---

## Data format (Shell version)

* Each line in weekly file: `id|YYYY-MM-DD|status|priority|tags|text`
* Files located at `data/weeks/YYYY-WW.md` for easy syncing.

## License

MIT
