const path = require("path");
const fileService = require("fs");

const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");

Menu.setApplicationMenu(null);

const allowedFileFormats = ["jpg"];

const imageCount = {
  count: 0,
};

const getDir = (dir) => {
  let filesAndFolders;
  try {
    filesAndFolders = fileService.readdirSync(dir);
  } catch (_) {
    return [];
  }
  const output = [];
  for (let x of filesAndFolders) {
    if (imageCount.count++ >= 100) {
      break;
    }
    const fullPath = path.join(dir, x);

    if (fileService.statSync(fullPath).isDirectory()) {
      output.push([x, getDir(fullPath)]);
      continue;
    }

    const fileFormat = x.split(".").at(-1);

    if (allowedFileFormats.includes(fileFormat)) {
      output.push(x);
    }
  }
  return output;
};

const getDirectory = (dir) => {
  imageCount.count = 0;
  return getDir(dir);
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
    },
  });

  mainWindow.maximize();

  mainWindow.loadFile("./index.html");

  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("close", () => {
    mainWindow.close();
  });

  ipcMain.on("selectFolder_main", async (event, [defaultPath, defaultFolder]) => {
    if (!!defaultFolder) {
      const pictureList = getDirectory(defaultFolder);
      event.sender.send("folderSelected", { folder: defaultFolder, pictureList });
      return;
    }

    const response = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      defaultPath,
    });

    if (response === undefined || response.filePaths.length === 0 || response.canceled) {
      event.sender.send("folderSelected", {});
      return;
    }

    const {
      filePaths: [folder],
    } = response;

    const pictureList = getDirectory(folder);
    event.sender.send("folderSelected", { folder, pictureList });
  });

  /* Open the DevTools. */
  mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
