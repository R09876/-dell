const vp768 = window.matchMedia('(max-width: 768px)');

const unitBurgerToggle = () => {
  const header = document.querySelector('header');

  if(!header) {
    return;
  }

  const body = document.querySelector('body');
  const burger = header.querySelector('.burger');
  const menu = header.querySelector('.menu');

  burger.addEventListener('click', () => {
    header.classList.toggle('is-active');

    if(header.classList.contains('is-active')) {
      body.classList.add('scroll-lock');
    } else {
      body.classList.remove('scroll-lock');
    }
  });

  menu.addEventListener('click', (e) => {
    if(!e.target.closest('.menu__list') && header.classList.contains('is-active')) {
      header.classList.remove('is-active');
      body.classList.remove('scroll-lock');
    }
  });

  if(vp768.matches) {
    const links = header.querySelectorAll('.nav__link');

    links.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('is-active');
        body.classList.remove('scroll-lock');
      });
    });
  }
};

unitBurgerToggle();