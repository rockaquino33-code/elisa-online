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
        const winId = app.dataset.window;
        const win = document.getElementById(winId);
        win.classList.remove("hidden");
        addTaskIcon(winId, "<i class='fa-solid fa-window-maximize'></i>");
        setupWindow(winId);
    });
});

// ----------------------
// Calculadora funcional
// ----------------------
const calcDisplay = document.getElementById("calc-display");
if (calcDisplay) {
    document.querySelectorAll("#calc-buttons button").forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.textContent;
            if (val === "=") {
                try {
                    calcDisplay.value = eval(calcDisplay.value);
                } catch {
                    calcDisplay.value = "Erro";
                }
            } else {
                calcDisplay.value += val;
            }
        });
    });
}

// ----------------------
// Painel de Controle: troca de tema
// ----------------------
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.style.backgroundColor = "#111";
        document.querySelector(".wallpaper").style.filter = "brightness(0.5)";
    } else {
        document.body.style.backgroundColor = "#fff";
        document.querySelector(".wallpaper").style.filter = "brightness(1)";
    }
}

// Exemplo: botão dentro da janela de Configurações
const sysWin = document.getElementById("system-window");
if (sysWin) {
    const content = sysWin.querySelector(".window-content");
    const btnDark = document.createElement("button");
    btnDark.textContent = "Tema Escuro";
    btnDark.onclick = () => applyTheme("dark");
    const btnLight = document.createElement("button");
    btnLight.textContent = "Tema Claro";
    btnLight.onclick = () => applyTheme("light");
    content.appendChild(btnDark);
    content.appendChild(btnLight);
}

// ----------------------
// Ícones de status (Wi-Fi, Som, Bateria)
// ----------------------
const statusBar = document.querySelector(".task-clock");
if (statusBar) {
    const wifi = document.createElement("i");
    wifi.className = "fa-solid fa-wifi";
    wifi.style.marginLeft = "15px";

    const sound = document.createElement("i");
    sound.className = "fa-solid fa-volume-high";
    sound.style.marginLeft = "10px";

    const battery = document.createElement("i");
    battery.className = "fa-solid fa-battery-three-quarters";
    battery.style.marginLeft = "10px";

    statusBar.appendChild(wifi);
    statusBar.appendChild(sound);
    statusBar.appendChild(battery);
}
