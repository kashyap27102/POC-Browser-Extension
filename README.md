# Weather Extension

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
3. `npm i --save-dev <package_name>` to install new packages

## How to Load Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

## Concepts Used

- **Manifest File Configuration**: Defining the extension's metadata and settings.
- **Icons**: Specifying icons of different sizes for the extension.
- **Browser Action**: Defining a popup, title, and icon for the extension's browser action.
- **Permissions**: Requesting permissions for alarms, context menus, and storage.
- **Options Page**: Providing a custom options page. -**Background Service Worker**: Using a background service worker script for handling background tasks.
- **Content Scripts**: Injecting scripts into web pages that match certain URL patterns (<all_urls>).
