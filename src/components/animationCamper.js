console.log("Funcion animationCamper"); // 🎯 Punto de partida para verificar la función

// 🌊 Movimiento lateral: Simula flotación suave
gsap.to(".logo", {
    duration: 2,       // ⏳ Duración de la animación
    x: "+=10",         // ➡️ Desplazamiento hacia adelante y atrás
    yoyo: true,        // 🔁 Alterna el movimiento
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Efecto suave y natural
});

// 🔄 Rotación sutil: Simula giro alterno
gsap.to(".logo", {
    duration: 2,       // ⏳ Duración del giro
    rotate: 10,        // ↩️ Inclinación hacia los lados
    yoyo: true,        // 🔁 Alterna el giro
    repeat: -1,        // ♾️ Repetición infinita
    ease: "sine.inOut" // ✨ Efecto fluido
});

// 🔍 Zoom dinámico: Efecto de acercar y alejar
gsap.to(".logo", {
    duration: 1.5,     // ⏳ Duración del zoom
    scale: 1.2,        // 🔎 Escalado hacia adelante
    yoyo: true,        // 🔁 Alterna el zoom
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Suavidad en el efecto
});

// 💫 Rebote elástico: Simula salto en gravedad cero
gsap.to(".logo", {
    duration: 1.5,     // ⏳ Duración del rebote
    y: "-=50",         // 🔼 Movimiento hacia arriba
    yoyo: true,        // 🔁 Alterna el salto
    repeat: -1,        // ♾️ Repetición infinita
    ease: "elastic.out(1, 0.3)" // ✨ Rebote natural
});

// ⚖️ Inclinación rápida: Balanceo alterno
gsap.to(".logo", {
    duration: 0.8,     // ⏳ Duración del balanceo
    rotate: -5,        // ↩️ Movimiento rápido hacia ambos lados
    yoyo: true,        // 🔁 Alterna el balanceo
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Suavidad en el giro
});

// 💨 Pulso adicional: Efecto de respiración sutil
gsap.to(".logo", {
    duration: 1.5,     // ⏳ Duración del pulso
    scale: 1.1,        // 🔎 Escalado ligero
    yoyo: true,        // 🔁 Alterna el tamaño
    repeat: -1,        // ♾️ Repetición infinita
    ease: "power1.inOut" // ✨ Movimiento fluido
});

// 🌍 Giro completo: Rotación constante
gsap.to(".logo", {
    duration: 4,       // ⏳ Tiempo para el giro completo
    rotate: 360,       // 🔄 Rotación completa
    repeat: -1,        // ♾️ Repetición infinita
    ease: "linear"     // ✨ Movimiento lineal y constante
});

// 🎬 GSAP: Efecto dinámico al cargar la página
window.addEventListener("load", () => {
    // 🌟 Fade-in y escala en el contenido principal
    gsap.from(".content", {
        opacity: 0,     // 👻 Comienza invisible
        scale: 0.8,     // 🔍 Aparece más pequeño inicialmente
        duration: 1.5,  // ⏳ Duración del efecto
        ease: "power2.out" // ✨ Suavidad al aparecer
    });

    // ⚡ Flash inicial en el logo
    gsap.from(".logo", {
        opacity: 0,     // 👻 Comienza invisible
        scale: 1.2,     // 🔎 Aparece más grande inicialmente
        duration: 1.5,  // ⏳ Tiempo de la animación
        ease: "power1.out" // ✨ Movimiento suave
    });
});
