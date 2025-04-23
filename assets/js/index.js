// ==================== Scroll Suave Aprimorado ====================
function smoothScroll(target) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const headerHeight = document.querySelector('header').offsetHeight;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - headerHeight;
  const duration = 600;
  let startTime = null;
  
  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

// ==================== Menu Mobile ====================
document.querySelector('.menu-mobile').addEventListener('click', function () {
  const nav = document.querySelector('.navbar');
  const icon = this.querySelector('i');
  
  nav.classList.toggle('active');
  
  if (nav.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// ==================== Links com Scroll Suave ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();                                                       
    const target = this.getAttribute('href');
    smoothScroll(target);
    
    // Fechar menu mobile, se aberto
    const nav = document.querySelector('.navbar');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      document.querySelector('.menu-mobile i').classList.remove('fa-times');
      document.querySelector('.menu-mobile i').classList.add('fa-bars');
    }
  });
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.navbar');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      document.querySelector('.menu-mobile i').classList.remove('fa-times');
      document.querySelector('.menu-mobile i').classList.add('fa-bars');
    }
  });
});

// Prevenir zoom em inputs no iOS
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('focus', function() {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    });
  });
});
// ==================== Carrossel dentro do Mockup====================
document.addEventListener('DOMContentLoaded', function () {
  const images = [
    'url("assets/img/dogs/pipoca1.jpg")',
    'url("assets/img/dogs/minniemaggie.jpg")',
    'url("assets/img/dogs/hannah.jpg")',
    'url("assets/img/dogs/chico.jpg")',
    'url("assets/img/dogs/moana.jpg")',
    'url("assets/img/dogs/logan.jpg")'
  ];
  
  const phoneMockup = document.querySelector('.phone-mockup');
  const carousel = document.querySelector('.phone-mockup .carousel-container');
  carousel.innerHTML = '';
  
  // Inserir imagens no carrossel
  images.forEach(img => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.style.backgroundImage = img;
    carousel.appendChild(slide);
  });
  
  // Inserir ícones de interação social
  const socialUI = `
    <div class="social-ui-fixed">
      <div class="social-btn like"><i class="fas fa-heart"></i></div>
      <div class="social-btn"><i class="fas fa-comment"></i></div>
      <div class="social-btn"><i class="fas fa-share"></i></div>
    </div>
  `;
  phoneMockup.insertAdjacentHTML('beforeend', socialUI);
  
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  slides[0].classList.add('active');
  
  // Função para rotacionar os slides
  function rotateSlides() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
    
    const nextDelay = currentIndex === 0 ? 5000 : 3000;
    setTimeout(rotateSlides, nextDelay);
  }
  
  setTimeout(rotateSlides, 5000);
  
  // Interação com botão de curtida
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.classList.contains('like')) {
        this.classList.toggle('active');
      }
    });
  });
});

// ==================== Destaque de Seção Ativa no Menu ====================
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector('header').offsetHeight;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
    
    const sectionTop = section.offsetTop - headerHeight;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
});
function alterarTextoMobile() {
  const titulo = document.querySelector('.pre-hospedagem');
  if (window.innerWidth <= 768) {
    titulo.innerHTML = 'Pré hospedagem';
  }
  if(window.innerWidth > 768) {
    titulo.innerHTML = '✋ O que você precisa saber antes da hospedagem'
  }
}

// Executa ao carregar a página
window.addEventListener('DOMContentLoaded', alterarTextoMobile);

// Executa se o usuário redimensionar a janela
window.addEventListener('resize', alterarTextoMobile);


document.querySelectorAll('.patinhas-animadas i').forEach(pata => {
  pata.addEventListener('mouseover', () => {
    pata.style.opacity = '0.7';
    pata.style.transform = 'scale(1.3)';
    pata.style.color = '#ff4757';
  });
  
  pata.addEventListener('mouseout', () => {
    pata.style.opacity = '0.3';
    pata.style.transform = 'scale(1)';
    pata.style.color = 'var(--verde)';
  });
});
