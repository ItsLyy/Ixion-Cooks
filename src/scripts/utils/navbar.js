const navbarLogic = () => {
  const btnMenu = document.querySelector('#btn-menu');
  const openMenu = document.querySelector('.open-logo');
  const closeMenu = document.querySelector('.close-logo');
  const navMenu = document.querySelector('.navbar-menu');

  window.onscroll = () => {
    const header = document.querySelector('header');
    const fixNav = header.offsetTop;

    if (window.pageYOffset > fixNav) {
      header.classList.add('navbar-fixed');
      btnMenu.classList.add('active');
    } else {
      header.classList.remove('navbar-fixed');
      btnMenu.classList.remove('active');
    }
  };

  let isOpen = false;

  btnMenu.onclick = () => {
    if (!isOpen) {
      openMenu.classList.add('deactive');
      closeMenu.classList.add('active');
      closeMenu.classList.remove('deactive');
      navMenu.classList.add('active');

      isOpen = true;
    } else {
      openMenu.classList.remove('deactive');
      closeMenu.classList.remove('active');
      closeMenu.classList.add('deactive');
      navMenu.classList.remove('active');

      isOpen = false;
    }
  };
};

export default navbarLogic;
