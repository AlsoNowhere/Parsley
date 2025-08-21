const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.body.querySelector("header");
  const [, divElement] = headerElement.children;
  const [minimiseButton, closeButton] = divElement.children;

  minimiseButton.addEventListener("click", () => {
    ipcRenderer.send("minimize");
  });

  closeButton.addEventListener("click", () => {
    ipcRenderer.send("close");
  });

  window.addEventListener("selectFolder", (event) => {
    const { detail } = event;
    const { defaultFolder } = detail ?? {};

    // ** What to do when selected.
    ipcRenderer.once("folderSelected", (_, response) => {
      window.dispatchEvent(new CustomEvent("folderSelected", { detail: response }));
    });

    // ** Trigger the folder load on main process.
    ipcRenderer.send("selectFolder_main", ["C:\\Users\\Daniel\\Home", defaultFolder]);
  });
});
