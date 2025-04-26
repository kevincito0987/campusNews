console.log("Funcion animationCamper");

// Movimiento lateral (flotación suave)
gsap.to(".logo", {
    duration: 2,
    x: "+=10",
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

// Rotación sutil en ambas direcciones
gsap.to(".logo", {
    duration: 2,
    rotate: 10,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

// Zoom dinámico (acercar y alejar)
gsap.to(".logo", {
    duration: 1.5,
    scale: 1.2,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

// Rebote elástico (subir y bajar)
gsap.to(".logo", {
    duration: 1.5,
    y: "-=50",
    yoyo: true,
    repeat: -1,
    ease: "elastic.out(1, 0.3)"
});

// Inclinación rápida (balanceo alterno)
gsap.to(".logo", {
    duration: 0.8,
    rotate: -5,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

// Pulso adicional (respiración sutil)
gsap.to(".logo", {
    duration: 1.5,
    scale: 1.1,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

// Giro completo (rotación constante)
gsap.to(".logo", {
    duration: 4,
    rotate: 360,
    repeat: -1,
    ease: "linear"
});
