const vpTouch = window.matchMedia('(pointer: coarse)');

const toggleClass = (el) => {
  el.classList.toggle('is-active');
}

const removeClass = (header, body) => {
  header.classList.remove('is-active');
  body.classList.remove('scroll-lock');
}

const unitBurgerToggle = () => {
  const header = document.querySelector('header');

  if(!header) {
    return;
  }

  const body = document.querySelector('body');
  const burger = header.querySelector('.burger');
  const menu = header.querySelector('.menu');
  const dropdown = header.querySelector('.dropdown');
  const dropBtn = dropdown.querySelector('[data-drop]');

  burger.addEventListener('click', () => {
    toggleClass(header);

    if(header.classList.contains('is-active')) {
      body.classList.add('scroll-lock');
    } else {
      body.classList.remove('scroll-lock');
    }
  });

  menu.addEventListener('click', (e) => {
    if(!e.target.closest('.menu__list') && header.classList.contains('is-active')) {
      removeClass(header, body);
    }
  });

  if(vpTouch.matches) {
    dropBtn.addEventListener('click', () => {
      toggleClass(dropdown);
    });
  }
};

unitBurgerToggle();