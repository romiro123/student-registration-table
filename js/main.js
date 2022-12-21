let students = [
  {
    name: 'Денис',
    surname: 'Кононов',
    lastname: 'Вениаминович',
    faculty: 'Психологии',
    birthday: new Date(1991, 11, 1),
    teachingStart: 2020,
  },
  {
    name: 'Максим',
    surname: 'Максимов',
    lastname: 'Альбертович',
    faculty: 'Математический',
    birthday: new Date(1994, 5, 16),
    teachingStart: 2019,
  },
  {
    name: 'Алексей',
    surname: 'Иванов',
    lastname: 'Игоревич',
    faculty: 'Юридический',
    birthday: new Date(1999, 1, 25),
    teachingStart: 2018,
  },
  {
    name: 'Иван',
    surname: 'Иванов',
    lastname: 'Иванович',
    faculty: 'Журналистики',
    birthday: new Date(2000, 5, 16),
    teachingStart: 2000,
  },
  {
    name: 'Аркадий',
    surname: 'Борисов',
    lastname: 'Сергеевич',
    faculty: 'Математический',
    birthday: new Date(2003, 5, 16),
    teachingStart: 2021,
  },
];

function getFio(student) {
  return `${student.surname} ${student.name} ${student.lastname}`;
}

//конец учебы "-до" '2013'
function getTeachingLastYear(student) {
  return student.teachingStart + 4;
}

//курс '(3 курс)'
function getCourse(student) {
  const course = new Date().getFullYear() - student.teachingStart;
  if (course <= 4) {
    return `(${course} курс)`;
  }
  return textContent = '(Закончил)';
}

//дата др строкой
function getBirthdayStr(student) {
  const yyyy = student.birthday.getFullYear();
  let mm = student.birthday.getMonth() + 1;//?
  let dd = student.birthday.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return dd + '.' + mm + '.' + yyyy;
}

// возраст '(28 лет)'
function getAge(student) {
  const today = new Date();
  let age = today.getFullYear() - student.birthday.getFullYear();
  let m = today.getMonth() - student.birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < student.birthday.getDate())) {
    age--;
  }
  return age;
}

//определяем tbody
const $studentsList = document.getElementById('students-list');

//*** создание/добавление в DOM строки студента ***//
function studentTr(student) {
  let $studentTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $facultyTD = document.createElement('td'),
    $birthdayTD = document.createElement('td'),
    $teachingStartTD = document.createElement('td')

  $fioTD.textContent = `${student.surname} ${student.name} ${student.lastname}`;
  $facultyTD.textContent = student.faculty;
  $birthdayTD.textContent = `${getBirthdayStr(student)} (${getAge(student)} лет)`;
  $teachingStartTD.textContent = `${student.teachingStart} - ${getTeachingLastYear(student)} ${getCourse(student)}`;

  $studentTR.append($fioTD);
  $studentTR.append($facultyTD);
  $studentTR.append($birthdayTD);
  $studentTR.append($teachingStartTD);

  return $studentTR;
}

//*** СОРТИРОВКА ***//
function sortStudents(item, direction) {
  let filterStudents = [...students];
  let newArrStudents = filterStudents.sort(function (a, b) {
    let directionIf = a[item] < b[item];
    if (direction == true) {
      directionIf = a[item] > b[item];
    };
    if (directionIf == true) {
      return - 1;
    };
  });
  return newArrStudents;
};

//Аргументы и его значение по умолчанию для сортировки
let sortName = '';
let sortDirection = true;

const btnTR = document.querySelectorAll('.btn--th');

for (btnTRSelected of btnTR) {
  btnTRSelected.addEventListener('click', btnSort);
}

// сортировка по нажатию на соответствующую кнопку в th
function btnSort(event) {
  if (event.target.closest('#th--fio')) {
    //console.log('btn fio');
    sortName = 'surname';
    //sortName = getFio(student);
    //console.log('sortName ' + '- ' + sortName);
    sortDirection = !sortDirection;
    //console.log('sortDirection ' + '- ' + sortDirection);
    render()
  };
  if (event.target.closest('#th--faculty')) {
    sortName = 'faculty';
    sortDirection = !sortDirection;
    render()
  };
  if (event.target.closest('#th--bday')) {
    sortName = 'birthday';
    sortDirection = !sortDirection;
    render()
  };
  if (event.target.closest('#th--year')) {
    sortName = 'teachingStart';
    sortDirection = !sortDirection;
    render()
  };
}


//*** ФИЛЬТРАЦИЯ ***//
function filterStudents(item, value, arr) {
  let newArrStudents = arr.filter(function (a) {
    if (a[item] == value) {
      return true;
    };
  });
  return newArrStudents;
};

let filterInpName
let filterInpValue

const btnFilter = document.querySelectorAll('.btn__filter');

for (btnFilterSelected of btnFilter) {
  btnFilterSelected.addEventListener('click', filter);
}


function filter(e) {
  e.preventDefault();
  if (e.target.closest('#btn-filter-fio')) {
    let input = document.querySelector('#filter-fio');
    filterInpName = 'surname';
    filterInpValue = input.value;
    render()
  };

  if (e.target.closest('#btn-filter-faculty')) {
    let input = document.querySelector('#filter-faculty');
    filterInpName = 'faculty';
    filterInpValue = input.value;
    render()
  };

  if (e.target.closest('#btn-filter-start-teaching')) {
    console.log('clikkkk!')
    let input = document.querySelector('#filter-start-teaching');
    filterInpName = 'teachingStart';
    filterInpValue = Number(input.value);
    render()
  };

  if (e.target.closest('#btn-filter-end-teaching')) {
    let input = document.querySelector('#filter-end-teaching');
    filterInpName = 'teachingStart';
    filterInpValue = Number(input.value);
    render()
  };

  if (e.target.closest('#btn-filter-del')) {
    let input = document.querySelectorAll('.filter__input');
    for (i of input) {
      i.value = null;
    };
    filterInpName = null;
    filterInpValue = null;
    render()

  };
};

const form = document.forms.formAddStudent;

let surname = form.nameForm; //Фамилия
let name = form.firstnameForm; //имя
let lastname = form.middlenameForm; //Отчество
let birthday = form.bday;
let teachingStart = form.yearEducation;
let faculty = form.facultyForm;
const todayYear = (new Date()).getFullYear();

form.addEventListener('submit', function (event) {
  event.preventDefault();


  surname = firstUppercase(form.nameForm.value);
  name = firstUppercase(form.firstnameForm.value);
  lastname = firstUppercase(form.middlenameForm.value);
  birthday = new Date(form.bday.value);
  teachingStart = Number(form.yearEducation.value);
  faculty = firstUppercase(form.facultyForm.value);

  //------------валидация------------------//
  if (!textTest(surname)) {
    //console.log(!textTest(surname));
    //console.log(surname);
    console.log('ccl');

    if (check(nameForm)) { }
    nameForm.parentElement.insertAdjacentHTML(
      'beforeend',
      `<div class="error">
       В поле должны содержаться только символы киррилицы surname
       </div>`
    );
    return false;
  }

  if (!textTest(name)) {
    if (check(firstnameForm)) { }
    firstnameForm.parentElement.insertAdjacentHTML(
      'beforeend',
      `<div class="error">
        В поле должны содержаться только символы киррилицы
        </div>`
    );
    return false;
  }

  if (!textTest(lastname)) {
    if (check(middlenameForm)) { }
    middlenameForm.parentElement.insertAdjacentHTML(
      'beforeend',
      `<div class="error">
      В поле должны содержаться только символы киррилицы
      </div>`
    );
    return false;
  }

  if (teachingStart > todayYear) {
    if (check(yearEducation)) { }
    yearEducation.parentElement.insertAdjacentHTML(
      'beforeend',
      `<div class="error">
      Максимальное значение ${todayYear} год
      </div>`
    );
    return false;
  }

  if (!textTest(faculty)) {
    if (check(facultyForm)) { }
    facultyForm.parentElement.insertAdjacentHTML(
      'beforeend',
      `<div class="error">
      В поле должны содержаться только символы киррилицы
      </div>`
    );
    return false;
  }

  modalBody.classList.remove('add-student--active');
  alert('Студент добавлен');
  let newStudent = {
    surname: firstUppercase(form.nameForm.value),
    name: firstUppercase(form.firstnameForm.value),
    lastname: firstUppercase(form.middlenameForm.value),
    birthday: new Date(form.bday.value),
    teachingStart: Number(form.yearEducation.value),
    faculty: firstUppercase(form.facultyForm.value),
  };

  students.push(newStudent);
  render()
});


//функция теста для текстовых полей
function textTest(input) {
  return /^([А-Яа-я\-\']{2,15})$/.test(input);
};

//проверка блока с ошибкой
function check(value) {
  value.addEventListener('focus', function (event) {
    if (value.nextElementSibling) {
      value.nextElementSibling.remove();
    }
    return;
  });
};

//первая заглавная буква
function firstUppercase(str) {
  return result = str.charAt(0).toUpperCase() + str.slice(1);
};

//функция рендера
function render(arr) {
  let newArrStudents = [...students];

  //отчищаем массив
  $studentsList.innerHTML = '';

  //сортированный массив
  newArrStudents = sortStudents(sortName, sortDirection, newArrStudents);
  //фильтрованный массив
  newArrStudents = filterStudents(filterInpName, filterInpValue, newArrStudents);

  for (student of newArrStudents) {
    $studentsList.append(studentTr(student));
  }

}
render()
