// CONFIGURATION DES IMAGES (.jpeg selon vos fichiers)
const images = [
    'image1.jpeg', 'image2.jpeg', 'image3.jpeg', 
    'image4.jpeg', 'image5.jpeg', 'image6.jpeg'
];

let currentIndex = 0;
const sliderImg = document.getElementById('slider-img');

// FONCTION SLIDER
function showImage(index) {
    if (!sliderImg) return;
    sliderImg.style.opacity = 0;
    setTimeout(() => {
        currentIndex = index;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        sliderImg.src = images[currentIndex];
        sliderImg.style.opacity = 1;
    }, 400);
}

function nextImage() { showImage(currentIndex + 1); }
function prevImage() { showImage(currentIndex - 1); }

// DEFILEMENT AUTO
setInterval(nextImage, 5000);

// ANIMATIONS AU SCROLL
function reveal() {
    let reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);

// GESTION FORMULAIRE INSCRIPTION
const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Succès ! Votre demande d'inscription a été envoyée à EDUPLACE SARL. Nous vous reviendrons très bientôt.");
        this.reset();
    });
}

// Lancer au démarrage
reveal();