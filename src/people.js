function addPeople() {
  let peopleName = String(document.getElementById("inputAddPeople").value);
  let peopleId = new Date().getTime();
  if (peopleName.length > 0 && peopleName.trim()) {
    people[peopleId] = peopleName;
    peopleHowMuchPay[peopleId] = [];
  }
  document.getElementById("inputAddPeople").value = null;
  renderPeople();
  renderProduct();
}

function cleanerPeople() {
  let container = document.getElementById("resultsDomPeople");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function renderPeople() {
  cleanerPeople();
  cleanerSummProductForPeople();
  let results = document.getElementById("resultsDomPeople");
  let peopleNames = Object.values(people);
  let peopleId = Object.keys(people);
  for (i = 0; i < peopleNames.length; i++) {
    // создаем DIV для вывода имен
    let divBlockPeople = document.createElement("div");
    divBlockPeople.innerText = peopleNames[i];
    results.appendChild(divBlockPeople);
    divBlockPeople.setAttribute("class", "col results-dom-people-names");
    divBlockPeople.setAttribute("id", peopleId[i]);
    // добавлкение кнопки удаления Имени
    let delBtns = document.createElement("button");
    delBtns.setAttribute("class", "fa fa-close btn btn-info");
    divBlockPeople.appendChild(delBtns);
    delBtns.addEventListener("click", deletePeople);
  }
}

function deletePeople(event) {
  delete people[event.target.parentNode.id];
  renderPeople();
  renderProduct();
}
