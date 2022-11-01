// the function to fetch the todo list
function getTodos() {
  var todos = new Array;
  var todosStr = localStorage.getItem('todo');
  if (todosStr !== null) {
    todos = JSON.parse(todosStr);
  }
  return todos;
}

// the function is called whe the user click the "Add task" button; adds taks to list and
// saved to local storage
function add() {
  var task = document.getElementById('task').value;

  var todos = getTodos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

// the function will clear a taks
function clearDefault(a) {
  if (a.defaultValue == a.vaule) {
    a.value = ""
  }
};

// the function removes a taks from the list
function remove() {
  var id = this.getAttribute('id');
  var todos = getTodos();
  todos.splice(id, 1);
  localStorage.setItem('todos', JSON.stringify(todos));

  show();

  return false;
}

// the function will display the list that is stored locally
function show() {
  var todos = getTodos();
  var html = '<ul>';
  for (var i = 0; i < todos.length; i++) {
    html += '<li>' + todos[i] + '<button class = "remove" id = "' + i + '">Delete</button> </li>';
  }

  html += '<li>';

  document.getElementById('todos').innerHTML = html;

  // function to remove items from list
  var buttons = document.getElementsByClassName('remove');
  for (var x = 0; x < buttons.length; x++) {
    buttons[x].addEventListener('click', remove);
  }
}

document.getElementById('add').addEventListener('click', add);
show();
