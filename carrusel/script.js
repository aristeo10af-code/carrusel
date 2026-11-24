const wrapper = document.getElementById('wrapper');
const botones = document.querySelectorAll('.boton-arcade');
const btnNext = document.getElementById('nextBtn');
const btnPrev = document.getElementById('prevBtn');

let index = 0;
const totalSlides = 5;
let autoPlay = setInterval(slideSiguiente, 5000);

function actualizar() {
    // Mueve el carrusel
    wrapper.style.transform = `translateX(-${index * 20}%)`;
    
    // Actualiza los botones inferiores
    botones.forEach((btn, i) => {
        btn.classList.toggle('activo', i === index);
    });
}

function slideSiguiente() {
    index = (index + 1) % totalSlides; // Al llegar al final vuelve a 0
    actualizar();
}

function slideAnterior() {
    index = (index - 1 + totalSlides) % totalSlides; // Al inicio va al último
    actualizar();
}

// Resetear tiempo al interactuar
function resetTimer() {
    clearInterval(autoPlay);
    autoPlay = setInterval(slideSiguiente, 5000);
}

// Eventos Mouse
btnNext.addEventListener('click', () => { slideSiguiente(); resetTimer(); });
btnPrev.addEventListener('click', () => { slideAnterior(); resetTimer(); });

botones.forEach(btn => {
    btn.addEventListener('click', (e) => {
        index = parseInt(e.target.dataset.index);
        actualizar();
        resetTimer();
    });
});

// Eventos Teclado
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") { slideSiguiente(); resetTimer(); }
    if (e.key === "ArrowLeft") { slideAnterior(); resetTimer(); }
});