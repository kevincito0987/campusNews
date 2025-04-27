console.log("Funcion animationCamper"); // 🎯 Verificar el inicio de las animaciones

// 🌊 Movimiento lateral: Simula flotación suave
gsap.to(".logo", {
    duration: 2,       // ⏳ Duración de la animación
    x: "+=10",         // ➡️ Desplazamiento hacia adelante y atrás
    yoyo: true,        // 🔁 Alterna el movimiento
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Movimiento fluido y natural
});

// 🔄 Rotación sutil: Simula giro alterno
gsap.to(".logo", {
    duration: 2,       // ⏳ Duración de la animación
    rotate: 10,        // ↩️ Rotación hacia ambos lados
    yoyo: true,        // 🔁 Alterna el giro
    repeat: -1,        // ♾️ Repetición infinita
    ease: "sine.inOut" // ✨ Movimiento suave
});

// 🔍 Zoom dinámico: Efecto de acercar y alejar
gsap.to(".logo", {
    duration: 1.5,     // ⏳ Duración del efecto
    scale: 1.2,        // 🔎 Ampliación hacia adelante
    yoyo: true,        // 🔁 Alterna entre ampliación y reducción
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Movimiento natural
});

// 💫 Rebote elástico: Simula un salto en gravedad cero
gsap.to(".logo", {
    duration: 1.5,     // ⏳ Duración del efecto
    y: "-=50",         // 🔼 Movimiento hacia arriba
    yoyo: true,        // 🔁 Alterna entre salto y reposo
    repeat: -1,        // ♾️ Repetición infinita
    ease: "elastic.out(1, 0.3)" // ✨ Rebote suave y elástico
});

// ⚖️ Inclinación rápida: Balanceo alterno
gsap.to(".logo", {
    duration: 0.8,     // ⏳ Duración del movimiento
    rotate: -5,        // ↩️ Rotación rápida hacia ambos lados
    yoyo: true,        // 🔁 Alterna entre rotación hacia adelante y atrás
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Movimiento suave y dinámico
});

// 💨 Pulso adicional: Simula un efecto de respiración
gsap.to(".logo", {
    duration: 1.5,     // ⏳ Duración del pulso
    scale: 1.1,        // 🔎 Escalado ligero
    yoyo: true,        // 🔁 Alterna el efecto de expansión y contracción
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Movimiento suave
});

// 🌍 Giro completo: Rotación constante
gsap.to(".logo", {
    duration: 4,       // ⏳ Tiempo para una rotación completa
    rotate: 360,       // 🔄 Rotación completa
    repeat: -1,        // ♾️ Repetición infinita
    ease: "linear"     // ✨ Movimiento continuo y uniforme
});

// 🎬 Efectos dinámicos al cargar la página
window.addEventListener("load", () => {
    // 🌟 Fade-in en el contenido principal
    gsap.from(".content", {
        opacity: 0,     // 👻 Comienza invisible
        scale: 0.8,     // 🔍 Aparece ligeramente reducido
        duration: 1.5,  // ⏳ Duración del efecto
        ease: "power2.out" // ✨ Movimiento suave al aparecer
    });

    // ⚡ Flash inicial en el logo
    gsap.from(".logo", {
        opacity: 0,     // 👻 Comienza invisible
        scale: 1.2,     // 🔎 Aparece ampliado inicialmente
        duration: 1.5,  // ⏳ Duración del efecto
        ease: "power1.out" // ✨ Movimiento suave
    });
});

// 🎯 Animación en las tarjetas
const cards = document.querySelectorAll(".card"); // 📂 Seleccionar todas las tarjetas

cards.forEach((card) => {
    // 🌟 Animación de aparición para cada tarjeta
    gsap.from(card, {
        opacity: 0,        // 👻 Comienza invisible
        y: 20,             // 🔽 Aparece desde abajo
        duration: 0.8,     // ⏳ Duración de la animación
        ease: "power2.out" // ✨ Movimiento suave en la transición
    });
});
