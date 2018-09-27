var initialToDoItems = ['First', 'Second'];
const toDoItems = [];

window.onload = function() {
  loadLocalStorage();
};

function addItem(itemText) {
  if (!checkInputValidity(itemText)) { return; }

  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  li.appendChild(checkbox);

  const span = document.createElement('span');
  span.onclick = function() {
    toggleCheckBox(checkbox);
  };
  li.appendChild(span);

  const text = document.createTextNode(itemText);
  span.appendChild(text);

  createButton('upButton', 'Up', moveItemUp, li);
  createButton('downButton', 'Down', moveItemDown, li);
  createButton('deleteButton', 'Delete', deleteItem, li, itemText);

  const element = document.getElementById('toDoList');
  element.appendChild(li);
  toDoItems.push(itemText);
  updateLocalStorage();
  updateDisabledButtons();
}

function toggleCheckBox(checkBox) {
  checkBox.checked = !checkBox.checked;
}

function deleteItem(element, text) {
  element.parentNode.removeChild(element);
  toDoItems.splice(toDoItems.indexOf(text), 1);
  updateLocalStorage();
  updateDisabledButtons();
}

function updateLocalStorage() {
  localStorage.setItem('toDoItems', toDoItems.join('|'));
}

function loadLocalStorage() {
  if (localStorage.getItem('toDoItems') !== '') {
    initialToDoItems = localStorage.getItem('toDoItems').split('|');
  }
  initialToDoItems.forEach(function(item) {
    addItem(item);
  });
  updateDisabledButtons();
}

function moveItemUp(element) {
  element.parentNode.insertBefore(element, element.previousElementSibling);
  updateDisabledButtons();
}

function moveItemDown(element) {
  element.parentNode.insertBefore(element, element.nextElementSibling.nextElementSibling);
  updateDisabledButtons();
}

function updateDisabledButtons() {
  var lis = document.getElementsByTagName('li');
  lis = [].slice.call(lis);

  lis.forEach(function (element) {
    const upButton = element.getElementsByClassName('upButton').item(0);
    const downButton = element.getElementsByClassName('downButton').item(0);

    if(!element.previousElementSibling) {
      upButton.setAttribute('disabled', 'true');
    } else if (!element.nextElementSibling) {
      downButton.setAttribute('disabled', 'true');
    } else {
      upButton.removeAttribute('disabled');
      downButton.removeAttribute('disabled');
    }
  })
}

function createButton(className, buttonText, onclick, parentElement, itemText) {
  const button = document.createElement('button');
  button.setAttribute('class', className);
  button.appendChild(document.createTextNode(buttonText));
  button.onclick = function() {
    onclick(parentElement, itemText);
  };
  parentElement.appendChild(button);
}

function checkInputValidity(itemText) {
  if(!itemText || toDoItems.indexOf(itemText) !== -1) {
    document.getElementById('error').innerText = 'Item text is empty or item already exists in the list!';
    return false;
  } else {
    document.getElementById('error').innerText = '';
    return true;
  }
}