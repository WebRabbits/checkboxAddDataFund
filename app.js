//// Get Element DOM
//Получаем элемент <tbody> из DOM
const tableQuery = document.querySelector(
  '.table.table-bordered.table-condensed.table-striped.show-prtable>tbody'
);

//Получаем элемент <select> списка всех платёжных систем
const paySystems = document.querySelector('select[name="PaySystem"]');
// console.log(paySystems);

//Получаем все элементы <tr> из DOM
const trIdBody = document.querySelectorAll('tbody>tr');

const sqlText = document.querySelector('#SQLText').innerText.split('\n');
const sqlTextNewArray = sqlText.filter((el) => el != '');
console.log(sqlTextNewArray);
let sqlTextNewString;
for (const item of sqlTextNewArray) {
  console.log(item.trim());
  sqlTextNewString += item.trim() + ' ';
}
console.log(sqlTextNewString.replace('undefined', ''));

//// Render Logic
//Добавляем новый стобец для чекбоксов
const thColumn = document.createElement('th');
thColumn.innerText = 'Select a request';
document.querySelector('thead>tr').prepend(thColumn);

//Перебираем все элементы из HTMLCollection по <tr> тегам. Создаёс <input/> теги у каждого блока с значениями полученных данных по запрсоам
for (const resultElem of tableQuery.children) {
  // const tdCheckbox = document.createElement('td');
  // tdCheckbox.className = 'tdCheckbox';
  // tdCheckbox.style.textAlign = 'center';

  const inputCheck = document.createElement('input');
  inputCheck.className = 'inputCheck';
  inputCheck.type = 'checkbox';
  inputCheck.value = '';
  inputCheck.style.cursor = 'pointer';
  resultElem.prepend(inputCheck);
}

const divTextarea = document.createElement('div');
divTextarea.className = 'containt-textarea-result-data-query';

const textareaResultDataQuery = document.createElement('textarea');
textareaResultDataQuery.className = 'textarea-result-data-query';
textareaResultDataQuery.style.width = '720px';
textareaResultDataQuery.style.height = '190px';
textareaResultDataQuery.style.fontSize = '14px';
textareaResultDataQuery.style.padding = '10px';
textareaResultDataQuery.style.marginBottom = '20px';

const btnCopy = document.createElement('button');
btnCopy.className = 'btn-copy';
btnCopy.innerText = 'Copy Result';

const notifyBlock = document.createElement('div');
notifyBlock.className = 'notify-block';

const notifyText = document.createElement('span');
notifyText.className = 'notify-text';

document.querySelector('.payment-requests__data > .row').prepend(divTextarea);
divTextarea.prepend(textareaResultDataQuery);
divTextarea.append(btnCopy);
divTextarea.append(notifyBlock);
notifyBlock.prepend(notifyText);

/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

//// Data preparation logic
//Подготовка данных для работы с ними
const check = document.getElementsByClassName('inputCheck'); // Получем NodeList всех input элементов
// console.log(check);

//Добавляем в input.value значение идетификатора из тега <tr> по каждому блоку запросов
Array.from(check).forEach((elCheck, elInd) => {
  // console.log(elCheck);
  for (const [key, val] of Object.entries(trIdBody)) {
    if (key == elInd) {
      elCheck.value = val.id;
      elCheck.id = key;
    }
  }
});

//Получаем массив всех input элементов и маппим получение всех внутренних дочерних элементов <td> из <tr> таблицы
let arrCheckbox = Array.from(check).map((el) => el.parentElement.children);

//Получаем массив, в который маппим все значения, которые содержаться отдельные массивы всех элементов с страницы из таблицы
let arrChecboxText = arrCheckbox.map((el) =>
  Array.from(el).map((el) => el.innerText)
);

//При помощи метода splice - маппим флаг с значением false 0-ым элементом из input
Array.from(arrChecboxText).map((el) =>
  el.splice(0, 1, arrCheckbox[0][0].checked)
);
console.log(arrChecboxText);

/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

//// Event logic
//Формируем массив из массивободного значения NodeList, перебираем все элементы массива отмеченных элементов, запускаем обработчик события по клику на отмеченном чекбоксе элемента
Array.from(check).forEach((item) =>
  item.addEventListener('click', () => workCheckedElem(item, preDataProcessing))
);

btnCopy.addEventListener('click', copyResult);

/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

//// Main logic
//Функция с обработкой проставления/снятия чекбокса в input. Изменяет у полученных отмеченных элементов значение первого элемента массива на "true"
function workCheckedElem(item, preDataProcessing) {
  console.log(item);
  if (item.checked === true) {
    arrChecboxText.forEach((el, ind) => {
      if (item.id == ind) {
        el.splice(0, 1, true);
        if (el[0] === true) {
          preDataProcessing(el);
        }
      }
    });
  } else {
    arrChecboxText.forEach((el, ind) => {
      if (item.id == ind) {
        el.splice(0, 1, false);
        if (el[0] === false) {
          textareaResultDataQuery.innerHTML = '';
          for (let i = 0; i < arrChecboxText.length; i++) {
            if (arrChecboxText[i][0] == true) {
              const renderUpdateData = arrChecboxText[i].sort((a, b) => a > b);
              preDataProcessing(renderUpdateData);
            }
          }
        }
      }
    });
  }
}

//Обрабатываем полученные данные из массива отмеченных элементов и форматируем полученные значения из функции workCheckedElem
function preDataProcessing(arrChecboxTextElement) {
  const [, colId, colRequest, colDatatime, colResponse] = arrChecboxTextElement;
  console.log(arrChecboxTextElement);

  console.log(colDatatime);
  const colID = colId.split('\n').splice(1, 1).toString();

  let idPaySystem;
  for (const res of paySystems) {
    colId.split('\n').splice(2, 1).toString() == res.innerText
      ? (idPaySystem = res.value)
      : null;
  }

  const colSpeedQuery = colDatatime.split(' ').splice(3, 1).toString();
  // console.log(colDatatime.split(' ').splice(3, 1).toString()); - ПОСЛЕ ПРАВОК ЗАМЕНИТЬ НА ДАННОЕ ЗНАЧЕНИЕ

  viewTextData(
    idPaySystem,
    colID,
    colRequest,
    colDatatime,
    colSpeedQuery,
    colResponse
  );
}

//Показываем результат отмеченных чекбоксов в <textarea>
function viewTextData(
  idPaySystem,
  colID,
  colRequest,
  colDatatime,
  colSpeedQuery,
  colResponse
) {
  // console.log(colDatatime.split('\n').splice(0, 1));
  const viewTextMap = new Map();
  viewTextMap
    .set('req_id', colID)
    .set('req_system_id', idPaySystem == undefined ? '0' : idPaySystem)
    .set('req_data', colRequest)
    .set(
      'req_datetime',
      colDatatime.split(' ').splice(0, 2).toString().replace(',', ' ')
    )
    .set('req_response', colResponse)
    .set('req_status', 'NULL')
    .set('req_rsptime', colSpeedQuery.substring(1, colSpeedQuery.length - 1));

  let viewText = `******************************************************\nreq_id: ${viewTextMap.get(
    'req_id'
  )}\nreq_system_id: ${viewTextMap.get(
    'req_system_id'
  )}\nreq_data: ${viewTextMap.get('req_data')}\nreq_datetime: ${viewTextMap.get(
    'req_datetime'
  )}\nreq_response: ${viewTextMap.get(
    'req_response'
  )}\nreq_status: ${viewTextMap.get(
    'req_status'
  )}\nreq_rsptime: ${viewTextMap.get('req_rsptime')}\n`;

  return (textareaResultDataQuery.innerHTML += `${viewText}`);
}

//Копируем результат из <textarea>
function copyResult() {
  let textareaVal = textareaResultDataQuery.value.trim();
  console.log(textareaVal);
  if (
    (textareaVal == '' &&
      !textareaResultDataQuery.classList.contains('element-active-empty')) ||
    textareaResultDataQuery.classList.contains('element-active-done')
  ) {
    textareaResultDataQuery.classList.remove('element-active-done');
    textareaResultDataQuery.classList.add('element-active-empty');
    textareaResultDataQuery.style.padding = '10px';
    textareaResultDataQuery.style.fontSize = '14px';
    copyNotify(textareaVal);
  }

  if (textareaVal !== '') {
    textareaResultDataQuery.classList.contains('element-active-empty') == true
      ? textareaResultDataQuery.classList.remove('element-active-empty')
      : textareaResultDataQuery.classList.add('element-active-done');

    textareaResultDataQuery.classList.add('element-active-done');
    copyNotify(textareaVal);
    navigator.clipboard
      .writeText(textareaVal)
      .then((copyText) => {
        if (copyText === undefined) {
          console.log(`copy`);
          btnCopy.innerText = 'Copied!';
          setTimeout(() => {
            btnCopy.innerText = 'Copy Result';
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(`Error>>> ${error}`);
      });
  }
}

//Показываем нотификацию при разном результате копирования
function copyNotify(isCopy) {
  if (!isCopy) {
    notifyBlock.style.backgroundColor = '#ff4e4e';
    notifyBlock.style.opacity = '1';
    notifyText.innerText = 'Отметьте блоки с запросами для копирования';
  } else {
    notifyBlock.style.backgroundColor = '#88d370';
    notifyBlock.style.opacity = '1';
    notifyText.innerText = 'Данные успешно скопированы!';
  }
  setTimeout(() => {
    notifyBlock.style.opacity = '0';
  }, 2500);
}
