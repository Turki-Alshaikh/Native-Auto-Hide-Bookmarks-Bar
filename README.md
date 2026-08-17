
# 🔖 Native Auto-Hide Bookmarks Bar

A lightweight Chrome Extension that automatically hides the bookmarks bar and reveals it perfectly on mouse hover. Engineered to be a **100% pixel-perfect** clone of Google Chrome's native UI, seamlessly blending into your browser experience.

## ✨ Features

* **Pixel-Perfect Native UI:** Exact replica of Chrome's Material You design (Dark Mode), including fonts, colors, border radii, and hover effects.
* **Auto-Hide Functionality:** Keeps your browser screen clean by hiding the bookmarks bar. It slides down smoothly only when you hover at the top of the page.
* **Full Folder Support:** Fully functional dropdown menus for folders and nested sub-folders, mimicking the exact native click-and-hover behavior.
* **Smart RTL/LTR Support:** Automatically detects the browser's UI language. Uses CSS Logical Properties to dynamically flip the layout, margins, and dropdown directions for Right-to-Left (e.g., Arabic) and Left-to-Right (e.g., English) languages.
* **Modern Architecture:** Built with Vanilla JavaScript and pure CSS. Fully compliant with Chrome's **Manifest V3**.

## 📸 Preview

*(Place a GIF or Image here showing the hover effect and dropdowns)*
<!-- ![Extension Preview](link-to-your-image.png) -->

## 🛠️ Installation (Developer Mode)

Since this extension requires modification of the browser's native-like UI behavior, it is currently loaded via Developer Mode.

1. Clone this repository or download the ZIP file:
   ```bash
   git clone [https://github.com/Turki-Alshaikh/Native-Auto-Hide-Bookmarks-Bar.git](https://github.com/Turki-Alshaikh/Native-Auto-Hide-Bookmarks-Bar.git)



2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** by toggling the switch in the top right corner.
4. Click on the **"Load unpacked"** button.
5. Select the extracted folder containing the `manifest.json` file.
6. **Important:** Make sure to hide the default Chrome bookmarks bar (Right-click on it -> Uncheck "Show bookmarks bar" or `Ctrl+Shift+B`) to prevent overlapping.

## 💻 Tech Stack

* **HTML5 & CSS3:** Utilizing CSS Logical Properties for dynamic directional styling.
* **Vanilla JavaScript:** DOM manipulation, recursive tree building, and event listeners.
* **Chrome Extensions API:** `chrome.bookmarks` and `chrome.i18n` for data retrieval and localization.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/Turki-Alshaikh/Native-Auto-Hide-Bookmarks-Bar/issues).

## 👨‍💻 Author

**Turki Alshaikh**

* GitHub: [@Turki-Alshaikh](https://www.google.com/search?q=https://github.com/Turki-Alshaikh)

## 📄 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).
