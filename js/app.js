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

// Función para verificar el ancho de la pantalla y ajustar el carrusel
function ajustarCarrusel() {
  if (window.innerWidth <= 750) {
    // Selecciona todos los elementos del carrusel
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelector('.carousel-indicators');
    const controls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');

    // Remueve las clases del carrusel de cada elemento
    items.forEach(item => {
      item.classList.remove('carousel-item');
      item.style.display = 'block'; // Asegura que cada elemento se muestre en bloque
    });

    // Oculta los indicadores y los controles
    if (indicators) indicators.style.display = 'none';
    controls.forEach(control => control.style.display = 'none');
  } else {
    // Restaura el carrusel para pantallas más grandes
    const items = document.querySelectorAll('.carousel > div');
    const indicators = document.querySelector('.carousel-indicators');
    const controls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');

    items.forEach(item => {
      item.classList.add('carousel-item');
      item.style.display = ''; // Limpia el estilo en línea para restaurar el comportamiento
    });

    if (indicators) indicators.style.display = '';
    controls.forEach(control => control.style.display = '');
  }
}

// Ejecuta la función al cargar la página y cada vez que se redimensiona la ventana
window.addEventListener('load', ajustarCarrusel);
window.addEventListener('resize', ajustarCarrusel);


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

