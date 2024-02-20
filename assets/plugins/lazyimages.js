const images = document.querySelectorAll('div img');

const options = {
  root: document.querySelector('div'), // выбираем целевой div
  rootMargin: '0px',
  threshold: 1.0 // изображение будет загружено, когда оно полностью видимо
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // загрузка изображения
      observer.unobserve(img); // прекращаем отслеживание этого изображения
    }
  });
}, options);

images.forEach(img => {
  observer.observe(img); // начинаем отслеживать каждое изображение
});
