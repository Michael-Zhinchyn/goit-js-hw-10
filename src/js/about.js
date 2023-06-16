const clickableElements = document.querySelectorAll('.clickable-element');

clickableElements.forEach(element => {
  element.addEventListener('click', function (event) {
    event.stopPropagation(); // Щоб запобігти "всплиттю" події вгору
    const description = this.querySelector('.description');
    description.style.display =
      description.style.display === 'none' ? 'block' : 'none';
  });
});

document.addEventListener('click', function () {
  clickableElements.forEach(element => {
    const description = element.querySelector('.description');
    if (description.style.display === 'block') {
      description.style.display = 'none';
    }
  });
});
