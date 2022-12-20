const openForm = document.querySelector('.btn--add');
const modalBody = document.querySelector('.add-student-wrap');
openForm.addEventListener('click', () => {
  modalBody.classList.toggle('add-student--active')
})

const closeForm = document.querySelector('.btn--form-close');

closeForm.addEventListener('click', () => {
  modalBody.classList.remove('add-student--active');
})
