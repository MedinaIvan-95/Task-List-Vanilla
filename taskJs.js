const body = document.querySelector("body");
const switchButtom = document.querySelector(".switch-buttom");
const mainContainer = document.querySelector(".main-container");
const newTask = document.querySelector("#new-task");
const addTask = document.querySelector(".add-task");
const taskContainer = document.querySelector(".task-container");
const item = document.querySelector(".task");
const modal = document.querySelector(".modal-background");
const closeBtn = document.querySelector(".close");
const editTask = document.querySelector("#edit");
const editTaskBtn = document.querySelector(".edit-button");
//llamada de la funcion localStorage para que sea lo primero en ejecutarse al recargar la pagina
loadLocalStorage();

//variable vacia que se usa para actualizar el texto de la nueva tarea
let newText;

//Con esta funcion guardamos las tareas en localStorage
function setLocalStorageTask (saveTask) {
  //Usamos el JSON.parse para convertir una cadena de texto en un objeto JSON
  //Obtenemos lo que esxiste en localSotrage o en su defecto que nos regrese un array vacio
  const taskStorage = JSON.parse(localStorage.getItem("task") || "[]");
  //hacemos push en el array
  taskStorage.push(saveTask);
  //Guardamos en localSotrage usando JSON.stringify que convierte un objeto a string
  localStorage.setItem("task",JSON.stringify(taskStorage));
}

function loadLocalStorage () {
  //Convertimos lo que exista en localStorage en un objeto JSON
  const taskStorage = JSON.parse(localStorage.getItem("task") || "[]");
  //Por cada elemento almacenado vamos a crear un item en la lista 
  taskStorage.forEach((element) => {
      taskContainer.appendChild(createTask(element));
  });
}

//Funcion para cambiar el tema oscuro
function changeTheme () {
  body.classList.toggle("dark-page-theme");
  mainContainer.classList.toggle("main-container");   
  mainContainer.classList.toggle("dark-list-theme");

  const theme = body.classList.contains("dark-page-theme") ? "dark" : "ligth";

  localStorage.setItem("theme", theme);
}

const storageTheme = localStorage.getItem("theme");

//Si lo contenido en localStorage es "dark" se ejecuta el condicional
if(storageTheme === "dark"){
  body.classList.add("dark-page-theme");
  mainContainer.classList.remove("main-container");
  mainContainer.classList.add("dark-list-theme");
}

//Funcion para crear una nueva tarea
function createTask (pText) {
  const div = document.createElement("div");
  div.className = "task";
  const check = document.createElement("span");
  check.className = "check-incomplete";
  const text = document.createElement("p");
  text.className = "text";
  text.textContent = pText;
  const edit = document.createElement("span");
  edit.textContent = "Editar";
  edit.className  = "edit-item";
  const clear = document.createElement("span");
  clear.textContent = "Borrar";
  clear.className = "delete-item";
  taskContainer.appendChild(div);
  div.append(check ,text,edit,clear);
  return div;
}
//Funcion añadir a la lista de tareas
function addNewTask (e) {
  e.preventDefault();
  
  //Validacion para evitar agregar tareas vacias
  if(newTask.validity.valueMissing == true){
    return newTask.reportValidity();
  } 

  createTask(newTask.value);

  setLocalStorageTask(newTask.value); 
}

//funcion para marcar como completado las tareas
function completeTask  (e) {
  if(e.target.classList.contains("check-incomplete")){
    e.target.classList.toggle("check-complete");
   }
}

//funcion para mostrar el modal de editar tareas
function showModal (e) {
  if(e.target.classList.contains("edit-item")){
    modal.classList.toggle("modal-off");
    newText = e.target.previousElementSibling;
   }
}

//funcion para borrar tareas
function deleteTask (e) {
  //borrar elemento de localStorage
  const deleteTask = e.target.previousElementSibling.previousElementSibling;
  const taskStorage = JSON.parse(localStorage.getItem("task"));
  const deleteStorage = taskStorage.filter((element) => {
    return element != deleteTask.textContent;
  }); 
  localStorage.setItem("task",JSON.stringify(deleteStorage));
  if(e.target.classList.contains("delete-item")){
    e.target.parentElement.remove();
  }
}

//funcion para cerrar el modal
function closeModal () {
  modal.classList.toggle("modal-off");
}

//funcion para editar tareas
function editTaskItem (e) {
  e.preventDefault();
  const taskStorage = JSON.parse(localStorage.getItem("task"));
  if(editTask.validity.valueMissing == true){
    return editTask.reportValidity();
  }
  //Para editar el elemento en localStorage
  const newLocalStorage = taskStorage.map((element) => {
    return element == newText.textContent ? element = editTask.value : element;
  });
  localStorage.setItem("task",JSON.stringify(newLocalStorage));
  return newText.textContent = editTask.value;
};

switchButtom.addEventListener("click", changeTheme);

addTask.addEventListener("click", addNewTask);

taskContainer.addEventListener("click",deleteTask);

taskContainer.addEventListener("click", completeTask);

taskContainer.addEventListener("click",showModal);

closeBtn.addEventListener("click",closeModal);

editTaskBtn.addEventListener("click", editTaskItem);

