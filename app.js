var a = document.getElementById("parent");
var inp = document.getElementById("inp");
function createElem() {
  var pera = document.createElement("P");
  pera.setAttribute("class", "list");
  var text = inp.value;
  var finalText = document.createTextNode(text);
  pera.appendChild(finalText);

  var editBtn = document.createElement("BUTTON");
  editBtn.setAttribute("class", "inListBtn");
  editBtn.setAttribute("onclick", "editTodo(this)");
  var editText = '<i class="fas fa-edit"></i>';
  editBtn.innerHTML = editText;

  var deleteBtn = document.createElement("BUTTON");
  deleteBtn.setAttribute("class", "inListBtn");
  deleteBtn.setAttribute("onclick", "removeTodo(this)");
  var deleteText = '<i class="fas fa-minus"></i>';
  deleteBtn.innerHTML = deleteText;

  var btnParent = document.createElement("DIV");
  btnParent.appendChild(deleteBtn);
  btnParent.appendChild(editBtn);
  pera.appendChild(btnParent);

  a.appendChild(pera);
  console.log(pera);
  inp.value = "";
}
function removeTodo(e) {
  console.log(e.parentNode.parentNode);
  e.parentNode.parentNode.remove();
}
function editTodo(e) {
  var todoLi = e.parentNode.parentNode;
  var newText = prompt("Enter New Text", todoLi.firstChild.nodeValue);
  todoLi.firstChild.nodeValue = newText;
  console.log(todoLi.firstChild);
}
function deleteAll() {
  a.innerHTML = "";
}
