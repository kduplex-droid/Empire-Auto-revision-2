gsap.registerPlugin(ScrollTrigger);

// HERO
gsap.to(".hero img", { scale: 1, duration: 2 });

gsap.from(".hero-text h1", {
    y: 100,
    opacity: 0,
    duration: 1.5
});

gsap.from(".hero-text p", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    delay: 0.5
});

// PRODUCTS
gsap.to(".card", {
    scrollTrigger: {
        trigger: ".products",
        start: "top 80%"
    },
    opacity: 1,
    y: 0,
    stagger: 0.3
});

// WhatsApp animation
gsap.from(".whatsapp-btn", {
    scale: 0,
    duration: 1,
    delay: 2
});
