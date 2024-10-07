let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop) {
    // Scroll hacia abajo
    document.querySelector('.navbar').classList.add('navbar-hidden');
  } else {
    // Scroll hacia arriba
    document.querySelector('.navbar').classList.remove('navbar-hidden');
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// document.querySelectorAll('.proyecto-card').forEach(card => {
//   const video = card.querySelector('video');

//   card.addEventListener('mouseenter', () => {
//       video.play();  // Reproduce el video al hacer hover
//   });

//   card.addEventListener('mouseleave', () => {
//       video.pause(); // Pausa el video cuando el mouse sale
//       video.currentTime = 0;  // Opcional: reinicia el video al principio
//   });
// });

function togglePlayPause(videoElement) {
  if (videoElement.paused) {
      videoElement.play();
  } else {
      videoElement.pause();
  }
}

$(document).ready(() => {
  const $carousel = $('#projects');
  const $projectContainers = $('.proyect-container');

  if ($carousel.length > 0 && $projectContainers.length > 0) {
      $projectContainers.on('mouseenter', function() {
          $carousel.carousel('pause');
          console.log('Carrusel pausado con jQuery');
      });

      $projectContainers.on('mouseleave', function() {
          $carousel.carousel('cycle');
          console.log('Carrusel reanudado con jQuery');
      });
  } else {
      console.error("No se encontró el elemento de carrusel o los contenedores de proyectos.");
  }
});



// Seleccionar el video
const videos = document.querySelectorAll('#projects video');

videos.forEach(video => {
  video.addEventListener('mouseenter', function() {
    $('#projects').carousel('pause'); // Detener el carrusel
    video.play(); // Reproducir el video
  });

  video.addEventListener('mouseleave', function() {
    $('#projects').carousel('cycle'); // Reanudar el carrusel
    video.pause(); // Detener el video cuando se quite el hover
    video.currentTime = 0; // Reiniciar el video al inicio
  });
});

