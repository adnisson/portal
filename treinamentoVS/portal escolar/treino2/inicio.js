// ===============================
// SITE INICIAL: abas, animações e atalhos
// ===============================
(function(){
  // avisa o CSS que o JavaScript está ativo (as animações só valem com ele)
  document.documentElement.classList.add('js');

  const abas = document.querySelectorAll('.aba');
  const menuLinks = document.querySelectorAll('.menuLink');

  // anima os elementos .revelar quando aparecem na tela
  let observador = null;
  if('IntersectionObserver' in window){
    observador = new IntersectionObserver(function(entradas){
      entradas.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('visivel');
          observador.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }

  function revelar(){
    document.querySelectorAll('.aba.ativa .revelar:not(.visivel)').forEach(function(el){
      if(observador) observador.observe(el);
      else el.classList.add('visivel');
    });
  }

  // troca de aba (Início, Matrícula, Modalidades, Ensino)
  function mostrarAba(nome){
    abas.forEach(function(a){ a.classList.toggle('ativa', a.id === 'aba-' + nome); });
    menuLinks.forEach(function(l){
      const ativo = l.dataset.aba === nome;
      l.classList.toggle('ativo', ativo);
      if(ativo) l.setAttribute('aria-current', 'page');
      else l.removeAttribute('aria-current');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    revelar();
  }

  // qualquer elemento com data-aba leva para aquela aba (menu, atalhos e botões)
  document.querySelectorAll('[data-aba]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      mostrarAba(el.dataset.aba);
    });
  });

  // botões que abrem o login (data-acesso="aluno" ou "professor")
  document.querySelectorAll('[data-acesso]').forEach(function(el){
    el.addEventListener('click', function(){
      const alvo = el.dataset.acesso === 'professor' ? 'btnSouProfessor' : 'btnSouAluno';
      document.getElementById(alvo)?.click();
    });
  });

  mostrarAba('inicio');
})();