// Configuration de la galerie
const media = [
    {type:'img', src:'galerie/image1.jpeg'}, {type:'img', src:'galerie/image2.jpeg'},
    {type:'img', src:'galerie/image3.jpeg'}, {type:'img', src:'galerie/image4.jpeg'},
    {type:'img', src:'galerie/image5.jpeg'}, {type:'img', src:'galerie/image6.jpeg'},
    {type:'img', src:'galerie/image7.jpeg'}, {type:'img', src:'galerie/image8.jpeg'},
    {type:'img', src:'galerie/image9.jpeg'}, {type:'img', src:'galerie/image10.jpeg'},
    {type:'img', src:'galerie/image11.jpeg'}, {type:'img', src:'galerie/image12.jpeg'},
    {type:'video', src:'galerie/video1.mp4'}, {type:'video', src:'galerie/video2.mp4'},
    {type:'video', src:'galerie/video3.mp4'}, {type:'video', src:'galerie/video4.mp4'}
];

let idx = 0;

function openLightbox(i) {
    idx = i;
    showMedia();
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function showMedia() {
    const div = document.getElementById('lightbox-content');
    const item = media[idx];
    div.innerHTML = item.type === 'img' ? 
        `<img src="${item.src}">` : `<video src="${item.src}" controls autoplay></video>`;
}

function changeMedia(n) {
    idx = (idx + n + media.length) % media.length;
    showMedia();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-content').innerHTML = '';
    document.body.style.overflow = 'auto';
}

// Gestion de l'inscription via Web3Forms
const form = document.getElementById('eduForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Envoi en cours...";
    result.style.color = "orange";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
    .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
            result.innerHTML = "Merci ! Votre inscription est bien reçue.";
            result.style.color = "green";
            form.reset();
        } else {
            result.innerHTML = res.message;
            result.style.color = "red";
        }
    })
    .catch(error => {
        result.innerHTML = "Une erreur est survenue !";
        result.style.color = "red";
    });
});

// Clavier
document.addEventListener('keydown', (e) => {
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowRight") changeMedia(1);
    if(e.key === "ArrowLeft") changeMedia(-1);
});