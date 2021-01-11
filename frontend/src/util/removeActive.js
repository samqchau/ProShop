const removeActive = () => {
  const active = document.getElementsByClassName('active');
  [...active].forEach((element) => element.classList.remove('active'));
};

export default removeActive;
