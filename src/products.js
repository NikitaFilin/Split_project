const people = {};

const items = [];

const peopleHowMuchPay = [];

function addProduct() {
  let productValue = String(document.getElementById("inputAddProduct").value);
  let priceValue = Number(document.getElementById("inputAddPrice").value);
  let productId = new Date().getTime();
  let peopleId = [];
  let itemsInfo = {
    productId,
    productValue,
    priceValue,
    peopleId,
  };
  if (productValue.length > 0 && productValue.trim() && priceValue > 0) {
    items.push(itemsInfo);
  }
  console.log(items);
  renderProduct();
}

function cleanerProduct() {
  let container = document.getElementById("resultsDomProduct");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function renderProduct() {
  cleanerProduct();
  cleanerSummProductForPeople();
  let resultsDomProductBlock = document.getElementById("resultsDomProduct");
  for (let i = 0; i < items.length; i++) {
    //Создаем элементы для вставвки в главный блок resultsDomProduct
    let li = document.createElement("li");
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("button");
    let span4 = document.createElement("span");
    //Вставляем данные в созданные элементы
    span.innerHTML = items[i].productValue;
    span2.innerHTML = items[i].priceValue;
    //Добавляем им класс и функции
    span.setAttribute("class", "col-2 span-results-dom-product-name");
    span2.setAttribute("class", "col-2 span-results-dom-price");
    span3.setAttribute("class", "col-1 btn btn-info fa fa-trash .btn-del");
    span3.addEventListener("click", deleteProduct);
    span4.setAttribute("class", "col-7 checkbox-block");
    span4.setAttribute("id", "checkboxBlockId");
    li.setAttribute("class", "span-results-dom-product");
    li.setAttribute("id", i);
    //Помещаем все значения в строчку списка
    li.appendChild(span);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(span4);
    resultsDomProductBlock.appendChild(li);
    //Добавляем чекбоксы в строки
    let peopleId = Object.keys(people);
    for (let id in peopleId) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.setAttribute("class", "col checkbox");
      span4.appendChild(checkbox);
      checkbox.setAttribute("id", peopleId[id]);
    }
  }
  //Обнуляем значение в Инпут
  document.getElementById("inputAddProduct").value = null;
  document.getElementById("inputAddPrice").value = null;
}

function deleteProduct(event) {
  let productId = event.target.parentNode;
  items.splice(items[productId], 1);
  renderProduct();
}

function checkBoxValue() {
  cleanerСheckBoxValue();
  // получаем массив чекбоксов arrCheckbox [];
  let arrCheckbox = document.querySelectorAll("input:checked");
  // вынимаем из бокса id
  for (let el of arrCheckbox) {
    let parentId = el.parentNode.parentNode.id;
    items[parentId]["peopleId"].push(el.id);
  }
}

function cleanerСheckBoxValue() {
  for (i = 0; i < items.length; i++) {
    items[i]["peopleId"].length = 0;
  }
}

function summProduct() {
  let sumProductBlock = document.getElementById("parentResultsPersonSumBlock");
  let productSum = 0;
  for (let el of items) {
    productSum += el["priceValue"];
  }
  sumProductBlock.innerText = productSum;
}

function summProductDomResults() {
  let peopleId = Object.keys(people);
  for (let id of peopleId) {
    let spanResultsPersonSum = document.getElementById("spanResultsPersonSum");
    let resultsSumBlock = document.createElement("div");
    resultsSumBlock.setAttribute("class", "col results-dom-people-amount");
    let sumArr = peopleHowMuchPay[id].reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    resultsSumBlock.innerText = sumArr;
    spanResultsPersonSum.appendChild(resultsSumBlock);
  }
}

function summProductForPeople() {
  cleanerSummProductForPeople();
  checkBoxValue();
  summProduct();
  for (let i = 0; i < items.length; i++) {
    // получаем сумму по каждому товару, деленную на выбранных людей
    let personSum = Math.ceil(
      items[i]["priceValue"] / items[i]["peopleId"].length
    );
    // получаем массив id людей, выбравших товар.
    let personChecked = items[i]["peopleId"];
    for (let j = 0; j < personChecked.length; j++) {
      peopleHowMuchPay[personChecked[j]].push(personSum);
    }
  }
  summProductDomResults();
}

function cleanerSummProductForPeople() {
  let container = document.getElementById("spanResultsPersonSum");
  let peopleId = Object.keys(peopleHowMuchPay);
  for (let el of peopleId) {
    peopleHowMuchPay[el] = [];
  }
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
