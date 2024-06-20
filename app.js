'use strict';

// Get Element DOM
const tableQuery = document.querySelector(
  '.table.table-bordered.table-condensed.table-striped.show-prtable>tbody'
);
const paymentrequestDataBlock = document.querySelector(
  '.payment-requests__data > .row'
);
// console.log(paymentrequestDataBlock);
const paySystems = document.querySelector('select[name="PaySystem"]');
// console.log(paySystems);

// Render Logic
for (const resultElem of tableQuery.children) {
  const tdCheckbox = document.createElement('td');
  tdCheckbox.className = 'tdCheckbox';
  tdCheckbox.style.textAlign = 'center';

  const inputCheck = document.createElement('input');
  inputCheck.className = 'inputCheck';
  inputCheck.type = 'checkbox';
  inputCheck.value = '';
  inputCheck.id = '1';
  inputCheck.style.cursor = 'pointer';
  resultElem.prepend(tdCheckbox);
  tdCheckbox.prepend(inputCheck);
}

const divTextarea = document.createElement('div');
divTextarea.className = 'containt-textarea-result-data-query';
const textareaResultDataQuery = document.createElement('textarea');
textareaResultDataQuery.className = 'textarea-result-data-query';
textareaResultDataQuery.style.width = '720px';
textareaResultDataQuery.style.height = '190px';
paymentrequestDataBlock.prepend(divTextarea);
divTextarea.prepend(textareaResultDataQuery);

const check = document.querySelectorAll('.inputCheck');
// console.log(check);

check.forEach((item) =>
  item.addEventListener('click', () => {
    workCheckedElem(item, getElementForm);
  })
);

function workCheckedElem(item, getElementForm) {
  const thisBlockCheck = item.parentElement.parentElement.children;
  // console.log(thisBlockCheck);

  const getDataArr = Array.from(thisBlockCheck).map(
    (result) => result.innerText
  );
  console.log(getDataArr);

  let [, colId, colRequest, colData, colResponse] = getDataArr;
  // console.log(colId, colRequest, colData, colResponse);

  const colID = colId.split('\n').slice(0, 1).toString();
  // console.log(colID);

  let idThisPaySystem;
  for (const result of paySystems) {
    if (colId.split('\n')[1] == result.textContent) {
      idThisPaySystem = result.value;
    }
  }
  // console.log(idThisPaySystem);
  getElementForm(
    item,
    idThisPaySystem,
    colID,
    colRequest,
    colData,
    colResponse,
    viewDataQuery
  );
}

function getElementForm(
  item,
  idThisPaySystem,
  colID,
  colRequest,
  colData,
  colResponse,
  viewDataQuery
) {
  // console.log(item, idThisPaySystem, colID, colRequest, colData, colResponse);
  item.value = `req_id: ${idThisPaySystem};req_system_id: ${colID};req_data: ${colRequest};req_datetime: ${colData};req_response: ${colResponse}`;

  let elementFormArray = [];
  check.forEach((el, index) => {
    console.log(el);
    if (el.checked === true) {
      // console.log(el.value.split(';'));
      const elConvertToArray = el.value.split(';');
      elementFormArray.push(elConvertToArray);

      textareaResultDataQuery.innerHTML = viewDataQuery(elementFormArray);
    }
  });

  console.log(elementFormArray);

  // textareaResultDataQuery.innerHTML += elementFormArray;

  // viewDataQuery(elementFormArray);
}

function viewDataQuery(data) {
  // console.log(data);
  let resultDataBlock;
  data.forEach((element, item) => {
    const [req_id, req_system_id, req_data, req_datetime, req_response] =
      element;
    // console.log(req_id, req_system_id, req_data, req_datetime, req_response);
    resultDataBlock = `*************************** ${
      item + 1
    }. row ***************************
    ${req_id}
    ${req_system_id}
    ${req_data}
    ${req_datetime}
    ${req_response}\n
    `;
  });

  // data.some((el, index) => {
  //   if
  // })
  return resultDataBlock;

  textareaResultDataQuery.innerHTML += resultDataBlock;
  textareaResultDataQuery.innerHTML = resultDataBlock;
}

// const tdCheckbox = document.querySelectorAll('.tdCheckbox');

// tdCheckbox.forEach((thisElement) =>
//   thisElement.firstChild.addEventListener('change', checkTrue)
// );

// const check = document.querySelectorAll('.inputCheck');
// check.forEach((item) =>
//   item.addEventListener('change', (event) => {
//     if (item.checked) {
//       const thisBlockCheck = event.target.parentElement.parentElement.children;
//       // console.log(thisBlockCheck);

//       const getDataArr = Array.from(thisBlockCheck).map(
//         (result) => result.innerText
//       );

//       setValueInput(item, getDataArr);
//     } else {
//       item.value = '';
//       textareaResultDataQuery.innerHTML = item.value;
//     }
//   })
// );

// function setValueInput(item, getDataArr) {
//   console.log(item);
//   console.log(getDataArr);

//   let [, colId, colRequest, colData, colResponse] = getDataArr;

//   let colID = colId.split('\n').slice(0, 1).toString();
//   let idThisPaySystem;
//   for (const resultElemSelectPaySystems of paySystems) {
//     if (colId.split('\n')[1] == resultElemSelectPaySystems.textContent) {
//       idThisPaySystem = resultElemSelectPaySystems.value;
//     }
//   }

//   console.log(idThisPaySystem, colID, colRequest, colData, colResponse);

//   item.value = `req_id: ${idThisPaySystem}\nreq_system_id: ${colID}\nreq_data: ${colRequest}\nreq_datetime: ${colData}\nreq_response: ${colResponse}`;

//   viewOutputResult(item);
// }

// function checkTrue(item, event) {
//   console.log(item.target);
//   if (this.checked === true) {
//     const thisBlockCheck = event.target.parentElement.parentElement.children; // Получаем HTMLCollection всех дочерних элементов из текущего полученного <tr> элемента
//     console.log(thisBlockCheck);

//     const getDataArr = Array.from(thisBlockCheck).map(
//       (result) => result.innerText // Приводим HTMLCollection к тиму массива и маппим новый массив из всех полученных значений <td> блоков. Получаем их значения из свойства innerText.
//     );

//     console.log(getDataArr);

//     getDataThisCheckBlock(getDataArr);
//   } else {
//     // console.log(event);
//   }
// }

// function getDataThisCheckBlock(itemValue) {
//   console.log(itemValue.value);

//   // const itemValueArray = itemValue.value.split(',');
//   // console.log(itemValueArray);

//   let [, colId, colRequest, colData, colResponse] = itemValue;

//   let colID = colId.split('\n').slice(0, 1).toString();
//   let idThisPaySystem;
//   for (const resultElemSelectPaySystems of paySystems) {
//     if (colId.split('\n')[1] == resultElemSelectPaySystems.textContent) {
//       idThisPaySystem = resultElemSelectPaySystems.value;
//     }
//   }

//   preparingOutputResult(
//     idThisPaySystem,
//     colID,
//     colRequest,
//     colData,
//     colResponse
//   );
// }

// function preparingOutputResult(
//   idPaySystem,
//   idQuery,
//   requestQuery,
//   dataQuery,
//   responseQuery
// ) {
//   const resultQueryBody = {
//     req_id: idQuery,
//     req_system_id: idPaySystem,
//     req_data: requestQuery,
//     req_datetime: dataQuery,
//     req_response: responseQuery,
//   };
//   viewOutputResult(resultQueryBody);
// }

//// ДОДЕЛАТЬ ЛОГИКУ ВЫВОДА ИНФОРМАЦИИ ИЗ ЗАПРОСОВ В textarea
//// Написать условия последовательного добавления отмеченных запросов при установке/снятии чекбокса (проверка установки/снятии чекбокса делается в функции checkTrue - возможно стоит отслеживать состояние чекболса по флгу/переключателю и на его основе писать условие о отрисовки результата в textarea)
// function viewOutputResult(item) {
//   // const bodyQuery = `req_id: ${query.req_id}\nreq_system_id: ${query.req_system_id}\nreq_data: ${query.req_data}\nreq_datetime: ${query.req_datetime}\nreq_response: ${query.req_response}`;

//   // textareaResultDataQuery.innerHTML += `\n\n${bodyQuery}`;

//   // item.checked ? console.log(`check`) : console.log(`not checked`);

//   if (item.value) {
//     textareaResultDataQuery.innerHTML += `\n\n${item.value}`;
//   }
// }

/* 
mysql> SELECT * FROM PaymentRequests WHERE req_datetime BETWEEN "2024-06-03 15:06:45" AND "2024-06-03 15:10:45" AND (req_data LIKE '%3427826%' OR req_response LIKE '%3427826%') \G;
*************************** 1. row ***************************
       req_id: 16900613
req_system_id: 1219
     req_data: http://funcore.1.keepalive.proxy:8080/sandbox.p2p-transfer.live/api/v5/invoice/get POST {"order_id":3427826,"amount":"21.15","currency":"USD","client_expense":0,"return_url":"https:\/\/test-devcasino.egamings.com?message=PAYMENT_PENDING&amount=21.15&tid=3427826&RedirectId=12626","response_url":"https:\/\/test-devcasino.egamings.com?message=PAYMENT_PENDING&amount=21.15&tid=3427826&RedirectId=12626","cancel_url":"https:\/\/test-devcasino.egamings.com?message=PAYMENT_FAIL&amount=21.15&tid=3427826&RedirectId=12626","server_url":"https:\/\/apitest.fundist.org\/System\/Payments\/Return\/Payport","customer_id":"7146800","locale":"en","currency2currency":true,"exact_currency":true,"filter_payment_system_types":["card_number"]}
       req_ip: 89.111.53.69
 req_datetime: 2024-06-03 15:08:45
 req_response: 200 OK {"url":"https:\/\/sandbox.p2p-transfer.live\/payment\/invoice\/post\/checkout\/103277?signature=77fc7b529aa9320c177fc76b29325f109c0274d94a8948762114adcc442bca03","merchant_id":207,"invoice_id":103277,"order_id":3427826,"amount":0,"amount_currency":21.15,"currency":"USD","order_desc":null,"merchant_amount":0,"client_expense":0,"status":1}
   //req_status: NULL
  //req_rsptime: 0.332824
*************************** 2. row ***************************
       req_id: 16900772
req_system_id: 0
     req_data: {"SafePost":{"invoice_id":"103277","merchant_id":"207","order_id":"3427826","amount":"0","amount_currency":"21.15","currency":"USD","merchant_amount":"0","status":"-1","account_info":"","cancellation_reason":"CANCELED_BY_USER","signature":"6a7311478d46b056989131b90e736e17fd155a07"},"Url":"en\/Payments\/Return\/Payport","RequestHttpMethod":"POST","RequestUri":"\/System\/Payments\/Return\/Payport?&","UserAgent":"GuzzleHttp\/7","RemotePort":"","RemoteUser":"NO REMOTE_USER","HttpReferrer":"NO HTTP_REFERER","RAW_HTTP_REQUEST":"invoice_id=103277&merchant_id=207&order_id=3427826&amount=0&amount_currency=21.15&currency=USD&merchant_amount=0&status=-1&account_info=&cancellation_reason=CANCELED_BY_USER&signature=6a7311478d46b056989131b90e736e17fd155a07"}
       req_ip: 185.82.127.95
 req_datetime: 2024-06-03 15:08:55
 req_response: {"status":"success"}
   //req_status: NULL
  //req_rsptime: 0.046448
*/
