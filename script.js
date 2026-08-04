// ==============================================
// BLOGTECH CESAR - INTERATIVIDADE E ANIMAÇÕES
// ==============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================================
     1. CONTADOR DE LIKES FUNCIONAL
     ============================================== */
  let likes = 0;

  const likeBtn = document.getElementById('likeButton');
  const likeCounter = document.getElementById('likeCounter');
  const heartIcon = document.getElementById('heartIcon');

  if (likeBtn && likeCounter) {
    likeBtn.addEventListener('click', () => {
      // Incrementa a contagem de curtidas
      likes++;

      // Atualiza o texto tratando singular e plural
      const textoCurtida = likes === 1 ? 'curtida' : 'curtidas';
      likeCounter.textContent = `${likes} ${textoCurtida}`;

      // Aplica a animação de pulso no botão
      likeBtn.classList.add('pulse-anim');

      // Troca o ícone temporariamente durante o clique
      if (heartIcon) {
        heartIcon.textContent = '⚡';
      }

      // Remove a classe de animação após 300ms
      setTimeout(() => {
        likeBtn.classList.remove('pulse-anim');
        if (heartIcon) {
          heartIcon.textContent = '🚀';
        }
      }, 300);
    });
  }


  /* ==============================================
     2. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL)
     ============================================== */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  // Observador para fazer os cards e elementos surgirem suavemente
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        scrollObserver.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  // Seleciona os elementos da página que receberão a animação
  const animatedElements = document.querySelectorAll('.post, .stat-card, .timeline-item, .like-card');

  animatedElements.forEach(el => {
    // Configura o estado inicial invisível e ligeiramente deslocado
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    
    scrollObserver.observe(el);
  });


  /* ==============================================
     3. ANIMAÇÃO DAS BARRAS DE PROGRESSO DA IA
     ============================================== */
  const progressBars = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const finalWidth = entry.target.style.width;
        
        // Zera a largura inicial e depois preenche suavemente
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
          entry.target.style.width = finalWidth;
        }, 150);

        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));

});
