# E-Ink Todo (Web App Edition)

A lightweight, minimalist to-do list application built with React and TypeScript, optimized for E-Ink devices like the Kindle. This project is a modern web-based re-imagining of the original `kindle-todo` shell script concept.

## Features

-   **Modern Tech Stack:** Built with React, TypeScript, and Vite for a fast development experience and an optimized build.
-   **E-Ink Friendly UI:** High-contrast, minimalist design using Tailwind CSS. No complex animations or colors.
-   **Fully Offline:** The application is built into a self-contained package, requiring no internet connection to run on the Kindle. All tasks are stored in the browser's `localStorage`.
-   **AI-Powered Task Breakdown:** An optional feature using the Gemini API to break down large tasks into smaller, manageable sub-tasks.
-   **Views:** Includes both a traditional list view and a monthly calendar view.
-   **Kindle Integration:** Designed to be launched directly from the KUAL menu on a jailbroken Kindle.

## Development Setup

To run this application on your local machine for development.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set up Gemini API Key (Optional):**
    If you want to use the "Smart Add" feature, create a `.env.local` file in the root of the project and add your API key:
    ```
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    *Note: In the final application, the API key is expected to be set as an environment variable `process.env.API_KEY`.*

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start a local server, typically at `http://localhost:5173`.

## Building for Kindle

This process packages the application into static HTML, CSS, and JS files that can be run on the Kindle.

1.  **Build the App:**
    ```bash
    npm run build
    ```
    This command will create a `dist` folder in your project root. This folder contains everything needed to run the app.

2.  **Prepare the Launcher:**
    A launcher script is needed to open the app from KUAL. A pre-made script is available in `kual_launcher/launcher.sh`.

## Installation on Kindle

**Prerequisites:** Your Kindle must be jailbroken and have KUAL installed.

1.  **Copy App Files:**
    *   Connect your Kindle to your computer via USB.
    *   Create a folder for the app on your Kindle, for example: `/mnt/us/apps/eink-todo`.
    *   Copy the entire contents of the `dist` folder from your computer into the `/mnt/us/apps/eink-todo` folder on your Kindle.

2.  **Install KUAL Launcher:**
    *   Create a new extension folder for KUAL: `/mnt/us/extensions/EInkTodo`.
    *   Copy the `kual_launcher/launcher.sh` file from the project into this new folder.
    *   **Crucially, edit `launcher.sh` on your Kindle** to ensure the `APP_DIR` variable points to the correct path where you copied the `dist` contents. For example: `APP_DIR="/mnt/us/apps/eink-todo"`.

3.  **Run the App:**
    *   Safely eject your Kindle.
    *   Open KUAL on your Kindle.
    *   You should see an "EInkTodo" entry. Tap it to launch the to-do application in the Kindle's browser.

## How It Works

The `launcher.sh` script uses `lipc-set-prop`, a Kindle-specific Inter-Process Communication tool, to tell the `com.lab126.appmgrd` service to start the browser (`com.lab126.browser`) and have it open the local `index.html` file. This is the magic that connects the KUAL menu to your packaged web app.
