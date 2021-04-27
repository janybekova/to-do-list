let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let deleteBtn = document.querySelector('.btn-warning')

deleteBtn.addEventListener('click', () => {
    clear()
    view()
})

addBtn.addEventListener('click',() => {
    addTodo()
})
todoName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo()
})

function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || []
}

function addTodo(){
    let newTodo = todoName.value
    if (newTodo.length > 0) {
        let todos = getTodos()
        todos = [...todos, newTodo]
        localStorage.setItem('todos', JSON.stringify(todos))
        view()
        todoName.value = ''
    }
}

function view() {
    let tasks = getTodos()
    let list = ''
    tasks.forEach(item => list = list + `<li class="list-group-item d-flex justify-content-between">${item} <button class="btn-basket btn btn-danger"><i class="far fa-trash-alt"></i></button> </li>`)
    todoBlock.innerHTML = '<ul class="list-group" style="margin-top: 40px">' + list + '</ul>'
    document.querySelectorAll('.btn-danger').forEach((button, idx)=> {
        button.addEventListener('click', () => {
            tasks.splice(idx, 1)
            localStorage.setItem('todos', JSON.stringify(tasks))
            view()
        })
    })
}

function clear() {
    localStorage.removeItem('todos')
    view()
}

view()
