const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const client = require('electron-connect').client;


let argv = require('yargs').argv;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window;

function createWindow(){
    var indexPage;
   
    if(argv.dev){
      indexPage = 'src/index.html';
    }else{
      indexPage = 'app/index.html';
    }

    //create the browser window.
    window = new BrowserWindow({
       useContentSize: true
    });

    window.maximize();

    //and load the index.html of the app.
    window.loadURL(
        url.format({
            pathname: path.join(__dirname, indexPage),
            protocol: 'file',
            slashes: true
        })
    );

    //open the devtools.
    window.webContents.openDevTools();

    window.on('closed', () => {
        window = null;
    });

    client.create(window);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (window === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.