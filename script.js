document.querySelectorAll(".desktop-icon").forEach(icon => {
  icon.addEventListener("dblclick", () => {
    const winId = icon.dataset.window;
    const win = document.getElementById(winId);
    win.classList.remove("hidden");
    addTaskIcon(winId, "<i class='fa-solid fa-window-maximize'></i>");
    setupWindow(winId);
  });
});
