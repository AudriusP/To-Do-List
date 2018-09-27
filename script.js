var initialToDoItems = ['First', 'Second'];
const toDoItems = [];

window.onload = function() {
  loadLocalStorage();
};

function addItem(textToAdd) {
  if(!textToAdd || toDoItems.indexOf(textToAdd) !== -1) {
    document.getElementById('error').innerText = 'Item text is empty or item already exists in the list!';
    return;
  } else {
    document.getElementById('error').innerText = '';
  }

  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  li.appendChild(checkbox);

  const span = document.createElement('span');
  span.onclick = function() {
    toggleCheckBox(checkbox);
  };
  li.appendChild(span);

  const text = document.createTextNode(textToAdd);
  span.appendChild(text);

  const deleteButton = document.createElement('button');
  deleteButton.appendChild(document.createTextNode('Delete'));
  deleteButton.onclick = function() {
    deleteItem(li, textToAdd);
  };
  li.appendChild(deleteButton);

  const element = document.getElementById('toDoList');
  element.appendChild(li);
  toDoItems.push(textToAdd);
  updateLocalStorage();
}

function toggleCheckBox(checkBox) {
  checkBox.checked = !checkBox.checked;
}

function deleteItem(element, text) {
  element.parentNode.removeChild(element);
  toDoItems.splice(toDoItems.indexOf(text), 1);
  updateLocalStorage();
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
}
