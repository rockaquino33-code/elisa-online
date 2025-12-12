// Botão fechar
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("win11-window").style.display = "none";
});

// Maximizar
document.querySelector(".max").addEventListener("click", () => {
    const w = document.getElementById("win11-window");
    if (!w.classList.contains("maximized")) {
        w.classList.add("maximized");
        w.style.width = "95vw";
        w.style.height = "95vh";
    } else {
        w.classList.remove("maximized");
        w.style.width = "70vw";
        w.style.height = "auto";
    }
});

// Minimizar
document.querySelector(".min").addEventListener("click", () => {
    const w = document.getElementById("win11-window");
    w.style.transform = "scale(0)";
    setTimeout(() => {
        w.style.transform = "scale(1)";
    }, 1200);
});
