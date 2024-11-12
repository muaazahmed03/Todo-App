// Firebase configuration (already in your HTML file head section)
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFmrwB4Y_S0-m3ZxY0pLpBTK0T-phsvQQ",
  authDomain: "project2-e8f9b.firebaseapp.com",
  databaseURL: "https://project2-e8f9b-default-rtdb.firebaseio.com",
  projectId: "project2-e8f9b",
  storageBucket: "project2-e8f9b.appspot.com",
  messagingSenderId: "856053373304",
  appId: "1:856053373304:web:500798699fb0977492908d",
  measurementId: "G-Q5Z12N0KST"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Selectors
var a = document.getElementById("parent");
var inp = document.getElementById("inp");

// Load all todos from Firebase on page load
window.onload = function() {
  database.ref("todos").once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      const todoData = childSnapshot.val();
      displayTodo(todoData.text, childSnapshot.key);
    });
  });
};

// Function to create a new todo item and save it to Firebase
function createElem() {
  const text = inp.value;
  if (!text) return; // Prevent empty inputs

  const newTodoRef = database.ref("todos").push(); // Create a new todo node
  newTodoRef.set({
    text: text,
    id: newTodoRef.key // Use Firebase key as ID
  });

  // Display the new todo item
  displayTodo(text, newTodoRef.key);
  inp.value = ""; // Clear input field
}

// Function to render a todo item in the DOM
function displayTodo(text, id) {
  const pera = document.createElement("P");
  pera.setAttribute("class", "list");
  pera.setAttribute("data-id", id);
  pera.textContent = text;

  // Edit and delete buttons
  const editBtn = document.createElement("BUTTON");
  editBtn.setAttribute("class", "inListBtn");
  editBtn.setAttribute("onclick", "editTodo(this)");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';

  const deleteBtn = document.createElement("BUTTON");
  deleteBtn.setAttribute("class", "inListBtn");
  deleteBtn.setAttribute("onclick", "removeTodoFirebase(this)");
  deleteBtn.innerHTML = '<i class="fas fa-minus"></i>';

  // Append buttons to item
  const btnParent = document.createElement("DIV");
  btnParent.appendChild(deleteBtn);
  btnParent.appendChild(editBtn);
  pera.appendChild(btnParent);

  a.appendChild(pera); // Add todo to the list
}

// Function to remove a todo item from Firebase and the DOM
function removeTodoFirebase(e) {
  const todoLi = e.parentNode.parentNode;
  const todoId = todoLi.getAttribute("data-id");

  // Remove from Firebase
  database.ref("todos/" + todoId).remove();

  // Remove from DOM
  todoLi.remove();
}

// Function to edit a todo item and update Firebase
function editTodo(e) {
  const todoLi = e.parentNode.parentNode;
  const todoId = todoLi.getAttribute("data-id");
  const newText = prompt("Enter New Text", todoLi.firstChild.nodeValue);

  if (newText) {
    // Update in Firebase
    database.ref("todos/" + todoId).update({ text: newText });

    // Update in DOM
    todoLi.firstChild.nodeValue = newText;
  }
}

// Function to delete all todos from Firebase and the DOM
function deleteAll() {
  database.ref("todos").remove(); // Remove all from Firebase
  a.innerHTML = ""; // Clear DOM
}
