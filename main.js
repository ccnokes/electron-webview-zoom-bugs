const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1000
  });
	mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  mainWindow.openDevTools();
});
