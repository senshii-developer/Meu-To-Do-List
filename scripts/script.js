const list = document.querySelector('.tasks-list')
const addButton = document.querySelector('.add-task-button')
const inputTask = document.querySelector('.task-input')
const body = document.querySelector('body')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function idGenerator() {
    return Date.now()
}

addButton.addEventListener('click', addDefaultTask)
inputTask.addEventListener('keydown', (event) => {
    const keyName = event.key
    console.log(keyName)
    if (keyName === 'Enter') {
        addDefaultTask()
    }
})

function addDefaultTask() {
    const nowTask = idGenerator()
    const inputValue = inputTask.value.trim()
    if (inputValue) {
        addTask(nowTask, inputValue, true)
    }
}


function editButton(task) {
    const foundModal = document.querySelector('.modal')
    if(foundModal) foundModal.remove()
    const taskValue = task.querySelector('span')

    const ContentEditModal = `
    <span>Edite sua Tarefa:</span>
    <input class="new-task" placeholder:'Digite aqui...' type:'text' value=${taskValue.textContent}>`
    const actionsEditModal = `<button class="confirm-edit">Editar</button>`

    const modalElement = createModal('',ContentEditModal,actionsEditModal)

    const idFind = task.getAttribute('id')
    console.log(idFind)
    const editButton = modalElement.querySelector('.confirm-edit')
    const editInput = modalElement.querySelector('.new-task')

    editButton.addEventListener('click', confirmEdit)
    editInput.addEventListener('keydown', (event) => {
        const keyName = event.key
        if (keyName === 'Enter') {
            confirmEdit()
        }
    })

    function confirmEdit() {
        const taskText = modalElement.querySelector('input').value.trim()
        if (taskText) {
            taskValue.textContent = taskText
            const foundTaskIndex = tasks.findIndex((task) => task.id === idFind)
            tasks[foundTaskIndex].value = taskText
            localStorage.setItem('tasks', JSON.stringify(tasks))
            modalElement.remove()
        }
    }
}

function deleteButton(task) {
    const foundModal = document.querySelector('.modal')
    if (foundModal) foundModal.remove()
    const editContainer = document.querySelector('.edit-container')
    const idFind = task.getAttribute('id')

    const contentDeleteModal = `<span>Deseja mesmo deletar a Tarefa ${task.querySelector('span').textContent}?</span>`
    const actionsDeleteModal = `<div class='buttons-delete-container'>
        <button id='confirm' class="confirm-delete"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
	        <path fill="#4B352A" d="m23.15 5.4l-2.8-2.8a.5.5 0 0 0-.7 0L7.85 14.4a.5.5 0 0 1-.7 0l-2.8-2.8a.5.5 0 0 0-.7 0l-2.8 2.8a.5.5 0 0 0 0 .7l6.3 6.3a.5.5 0 0 0 .7 0l15.3-15.3a.5.5 0 0 0 0-.7" />
            </svg></button>
        <button id='cancel' class="confirm-delete"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
	        <path fill="#4B352A" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z" />
            </svg></button>
    </div>`

    const modalElement = createModal('',contentDeleteModal,actionsDeleteModal)

    const confirmButton = document.querySelector('#confirm')
    const cancelButton = document.querySelector('#cancel')

    confirmButton.addEventListener('click', confirmDelete)
    cancelButton.addEventListener('click', () => {
        modalElement.remove()
    })

    function confirmDelete() {
        tasks = tasks.filter((task) => task.id !== idFind)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        task.remove()
        modalElement.remove()
    }
}

tasks.forEach((task) => {
    const idTask = task.id
    const valueTask = task.value

    addTask(idTask, valueTask)
})



function addTask(id, value, newTask) {
    const listItem = document.createElement('li')
    listItem.className = "list-item"
    listItem.setAttribute('id', id)
    
    listItem.innerHTML = `
    <span>${value}</span>
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
    if (newTask) {
        inputTask.value = ''
        tasks.push({
            id: id.toString(),
            value: value
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    listItem.querySelector('.edit-button').addEventListener("click", () => editButton(listItem))
    listItem.querySelector('.delete-button').addEventListener("click", () => deleteButton(listItem))
}

function dateTask() {
    const dateContainer = document.createElement('div')
    dateContainer.className='date-container'

    const dateRequest = document.createElement('span')
    dateRequest.className ='date-request'
    const inputDate = document.createElement('input')
    inputDate.setAttribute('type','date')
    inputDate.className ='input-date'

    dateContainer.append(dateRequest,inputDate)

    body.appendChild(dateContainer)
}

function createModal(header,content,actions) {
    const modalElement = document.createElement('div')
    modalElement.className = 'modal'

    modalElement.innerHTML=`
    <div class='modal-backdrop'></div>
    <div class='modal-body'>
        <div class='header>
            ${header}
        </div>
        <div class='content'>
            ${content}
        </div>
        <div class='actions'>
            ${actions}
        </div>
    </div>
    `

    body.appendChild(modalElement)
    return modalElement
}