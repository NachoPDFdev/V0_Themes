# V0 Themes

V0 Chat Styler is a browser extension that enhances the visual experience of your chat interface with customizable themes and styling options.

## Features

- Multiple theme options:
  - Dark mode
  - Light mode
  - VS Code-inspired mode
- Customizable colors for sent and received messages
- Adjustable font settings (weight, size, family)
- VS Code-like syntax highlighting for code snippets
- Responsive design for various screen sizes

## Installation

1. Clone this repository or download the ZIP file.
2. Open your browser's extension management page:
   - Chrome: `chrome://extensions`
   - Firefox: `about:addons`
   - Edge: `edge://extensions`
3. Enable "Developer mode" (usually a toggle in the top right).
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the extension icon in your browser toolbar to open the popup.
2. Choose your preferred theme (Dark, Light, or VS Code).
3. Customize colors and font settings as desired.
4. Your changes will be applied immediately to the chat interface.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by popular code editor themes and chat applications
- Built with love for developers and chat enthusiasts


## Overview

V0 Chat Styler is a browser extension that enhances the visual experience of chat interfaces with customizable themes and styling options. It offers three main themes: Dark mode, Light mode, and VS Code-inspired mode.

## Files Structure

- `manifest.json`: Extension configuration file
- `popup.html`: HTML for the extension's popup interface
- `popup.js`: JavaScript for popup functionality
- `content.js`: Content script for applying styles to the chat interface
- `styles.css`: Main CSS file containing all styling rules
- `README.md`: Project overview and installation instructions

## Styling (styles.css)

### Root Variables

The extension uses CSS variables for easy customization:
