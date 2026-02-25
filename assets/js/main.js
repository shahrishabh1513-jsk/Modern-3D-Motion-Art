const modelViewer = document.getElementById('modal');
let modelLoaded = false;
let modelVisible = false;

const ANIMATION = {
    MODEL_TIME_SCALE: 0.75,
    LOADER_FADE_DURATION: 0.8,
    LOADER_DELAY: 1.2,
    TEXT_TRANSLATE: 300,
    TEXT_ANIMATION_DURATION: 2,
    TEXT_DELAY: 0.5,
    EASE: {
        LOADER: "power3.out",
        TEXT: "power2.inOut"
    }
};

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.innerHTML = `${currentYear} 3D Motion Art Gallery. All rights reserved. | Created with for 3D Animation`;
    }
}

function modelConfig() {
    if (modelViewer) {
        modelViewer.timeScale = ANIMATION.MODEL_TIME_SCALE;
    }
}

function checkReady() {
    if (modelLoaded && modelVisible) {
        gsap.to(".loader-container", {
            opacity: 0,
            duration: ANIMATION.LOADER_FADE_DURATION,
            delay: ANIMATION.LOADER_DELAY,
            ease: ANIMATION.EASE.LOADER,
            onComplete: () => {
                document.querySelector(".loader-container").style.display = "none";
            }
        });

        gsap.fromTo(".bg-text-1", 
            { 
                x: -ANIMATION.TEXT_TRANSLATE,
                opacity: 0 
            },
            { 
                x: 0,
                opacity: 1,
                duration: ANIMATION.TEXT_ANIMATION_DURATION,
                delay: ANIMATION.TEXT_DELAY,
                ease: ANIMATION.EASE.TEXT 
            }
        );
        
        gsap.fromTo(".bg-text-2", 
            { 
                x: ANIMATION.TEXT_TRANSLATE,
                opacity: 0 
            },
            { 
                x: 0,
                opacity: 1,
                duration: ANIMATION.TEXT_ANIMATION_DURATION,
                delay: ANIMATION.TEXT_DELAY,
                ease: ANIMATION.EASE.TEXT 
            }
        );
        
        gsap.fromTo(".main-text", 
            { 
                scale: 0.5,
                opacity: 0,
                rotation: -10
            },
            { 
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.8,
                delay: ANIMATION.TEXT_DELAY + 0.3,
                ease: "elastic.out(1, 0.5)"
            }
        );
    }
}

if (modelViewer) {
    modelViewer.addEventListener('load', () => {
        modelLoaded = true;
        modelConfig();
        checkReady();
    });

    modelViewer.addEventListener('error', (error) => {
        console.error("Error loading model:", error);
        modelLoaded = true;
        checkReady();
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        modelVisible = entry.isIntersecting;
        if (modelVisible) {
            checkReady();
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px"
});

if (modelViewer) {
    observer.observe(modelViewer);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
    if (document.querySelector('footer')) {
        document.querySelector('footer').style.transition = "all 0.3s ease";
    }
    
    gsap.set(".bg-text-1, .bg-text-2, .main-text", {
        opacity: 0
    });
    
    setTimeout(() => {
        if (!modelLoaded) {
            modelLoaded = true;
            modelVisible = true;
            checkReady();
        }
    }, 3000);
});