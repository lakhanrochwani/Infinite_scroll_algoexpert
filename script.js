const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';

// Write your code here.
let div = document.getElementById('testimonial-container');
let array = [];
let limit = 5;
let afterID = null;
function fetchTestimonials() {
  let URL = `${API_BASE_URL}?limit=${limit}`;
  if (afterID != null) {
    URL = `${API_BASE_URL}?limit=${limit}&after=${afterID}`;
  }
  fetch(URL)
    .then((res) => res.json())
    .then(({ testimonials, hasNext }) => {
      testimonials.forEach((test) => {
        let p = document.createElement('p');
        p.innerText = test.message;
        p.classList.add('testimonial');
        div.append(p);
      });
      if (hasNext) {
        afterID = testimonials[testimonials.length - 1].id;
      }
    });
}
fetchTestimonials();
div.addEventListener('scroll', handleScroll);

function handleScroll() {
  let checkEndOfScreen = this.scrollHeight - this.scrollTop - this.clientHeight;

  if (checkEndOfScreen > 0) return;
  if (checkEndOfScreen >= 0) {
    fetchTestimonials();
  }
}
