// ----------------------
// Relógio na barra de tarefas
// ----------------------
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    document.getElementById("task-time").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// ----------------------
// Menu iniciar toggle
// ----------------------
const startBtn = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");

startBtn.addEventListener("click", () => {
    startMenu.classList.toggle("start-open");
});

// ----------------------
// Funções de janela
// ----------------------
function setupWindow(winId) {
    const win = document.getElementById(winId);
    const minBtn = win.querySelector(".min");
    const maxBtn = win.querySelector(".max");
    const closeBtn = win.querySelector(".close");

    // Fechar
    closeBtn.addEventListener("click", () => {
        win.classList.add("hidden");
        removeTaskIcon(winId);
    });

    // Maximizar
    maxBtn.addEventListener("click", () => {
        win.classList.toggle("maximized");
    });

    // Minimizar
    minBtn.addEventListener("click", () => {
        win.classList.add("minimized");
        setTimeout(() => win.classList.remove("minimized"), 1200);
    });

    // Arrastar janela
    const titlebar = win.querySelector(".window-titlebar");
    let isDragging = false, offsetX, offsetY;

    titlebar.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

// ----------------------
// Barra de tarefas dinâmica
// ----------------------
function addTaskIcon(winId, iconHtml) {
    if (!document.querySelector(`#task-${winId}`)) {
        const icon = document.createElement("div");
        icon.className = "task-icon";
        icon.id = `task-${winId}`;
        icon.innerHTML = iconHtml;
        icon.onclick = () => {
            const win = document.getElementById(winId);
            win.classList.remove("hidden");
        };
        document.querySelector(".task-icons").appendChild(icon);
    }
}

function removeTaskIcon(winId) {
    const icon = document.querySelector(`#task-${winId}`);
    if (icon) icon.remove();
}

// ----------------------
// Abrir apps pelo menu iniciar
// ----------------------
document.querySelectorAll(".app").forEach(app => {
    app.addEventListener("click", () => {
        const appName = app.querySelector("p").textContent.toLowerCase();
        let winId = "";

        if (appName.includes("configurações")) winId = "system-window";
        // Aqui você pode criar outras janelas: explorer-window, browser-window etc.

        if (winId) {
            const win = document.getElementById(winId);
            win.classList.remove("hidden");
            addTaskIcon(winId, "<i class='fa-solid fa-window-maximize'></i>");
            setupWindow(winId);
        }
    });
});
