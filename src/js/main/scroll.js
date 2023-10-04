const scroll = document.querySelector('.blog');

  const setCastomScroll = () => {
    if(!scroll) {
      return;
    }

    const thumb = scroll.querySelector('.blog__scrollbar span');

    scroll.addEventListener('scroll', function () {
      thumb.style.transform = `translateY(${scroll.scrollTop}px)`;
    });
  }

  setCastomScroll();