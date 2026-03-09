const list = document.querySelector('.tasks-list')
const addButton = document.querySelector('.add-task-button')
const inputTask = document.querySelector('.task-input')
const body = document.querySelector('body')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []




function idGenerator() {
    return Date.now()
}

addButton.addEventListener('click', addTask)
inputTask.addEventListener('keydown', (event) =>  {
    const keyName = event.key
    console.log(keyName)
    if(keyName === 'Enter'){
        addTask()
    }
})

function addTask() {
    const nowTask = idGenerator()
    const inputValue = inputTask.value.trim()
    if (inputValue) {
        const listItem = document.createElement('li')
        listItem.className = "list-item"
        listItem.setAttribute('id',nowTask)

        listItem.innerHTML = `
    <span>${inputValue}</span>
    <div class="button-container">
        <button class="edit-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24">
	    <path fill="#4B352A" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
        </svg></button>
        <button class="delete-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24">
	    <path fill="#4B352A" d="M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6zm-10 4a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1m4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1m0-8a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2z" />
        </svg></button>
    </div>`
        const editContainer = document.querySelector('.edit-container')
        if (editContainer) {
            editContainer.remove()
        }
        list.appendChild(listItem)
        inputTask.value = ''

        tasks.push({
            id: nowTask.toString(),
            value: inputValue})

        listItem.querySelector('.edit-button').addEventListener("click", () => editButton(listItem)) 
        listItem.querySelector('.delete-button').addEventListener("click", () => deleteButton(listItem))
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
}
    

function editButton(task) {
    if(document.querySelector('.edit-container')) return
    const taskValue = task.querySelector('span')
    const editContainer = document.createElement('div')
    editContainer.className = 'edit-container'
    editContainer.innerHTML = `
    <span>Digite a Nova Tarefa:</span>
    <input class="new-task" placeholder:'Digite aqui...' type:'text' value=${taskValue.textContent}>
    <button class="confirm-edit">Editar</button>`
    
    body.appendChild(editContainer)

    const idFind = task.getAttribute('id')
    console.log(idFind)
    const editButton = editContainer.querySelector('.confirm-edit')
    const editInput = editContainer.querySelector('.new-task')

    editButton.addEventListener('click', confirmEdit)
    editInput.addEventListener('keydown', (event) => {
        const keyName = event.key
        if(keyName === 'Enter'){
            confirmEdit()
        }
    })

    function confirmEdit() {
        const taskText = editContainer.querySelector('input').value.trim()
        if(taskText){
            taskValue.textContent = taskText
            const foundTaskIndex = tasks.findIndex((task) => task.id === idFind)
            tasks[foundTaskIndex].value = taskText
            localStorage.setItem('tasks',JSON.stringify(tasks))
            editContainer.remove()
        }   
    }   
}

function deleteButton(task) {
    const editContainer = document.querySelector('.edit-container')
    const idFind = task.getAttribute('id')
    tasks = tasks.filter((task) => task.id !== idFind)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    task.remove()
    if(editContainer){
        editContainer.remove()
    }
}

tasks.forEach()