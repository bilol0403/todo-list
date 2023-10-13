
const elForm = document.querySelector('#form')
const elInput = document.querySelector('#input')
const elSubtitle = document.querySelector('#subtitle');
const elBtnSubmit = document.querySelector('#btn__submit')
const elBtnComplete = document.querySelector('#btn__complete')
const elBtnDelete = document.querySelector('#btn__delete')
const elList = document.querySelector('#list')
const elSpan = document.querySelector('#span')
const elBtnTheme = document.querySelector('#btn__theme')
const elTitle = document.querySelector('#title')
let todoArray = getToLocal() || [
    {
        id:0,
        title: 'kitob uqish',
        completed:true,
        date:'2023-03-23 '
    },
    {
        id:1,
        title: 'kitob',
        completed:true,
        date:'2023-03-1 '
    },
    {
        id:2,
        title: 'kelish',
        completed:false,
        date:'2023-03-23 '
    }
];






// creating new element render = add to html
function renderTodos(array){
    // var value = elInput.value;
    elList.textContent = '';
    for (let i = 0; i < array.length; i++) {
        const resultDate = generateDate(array[i].date)
        const li = document.createElement('li');
        li.className = "d-flex justify-content-between list-group-item"
        li.innerHTML = `<div>
                            <h3 style =  '${array[i].completed ? ' text-decoration:line-through' : ''}' id="subtitle" class="title">${array[i].title}</h3>
                            <p class="h6">${resultDate}</p>
                        </div>
                        <div>
                            <button data-id=${array[i].id} id="btn__complete" class="btn-completed btn bg-info text-light">Complete</button>
                            <button data-id=${array[i].id} id="btn__delete" class="btn btn-delete bg-danger text-light">Delete</button>
                        </div>`
        elForm.reset();
        elList.append(li)
        
    }
}
renderTodos(todoArray)


// function time
function generateDate(time){
    const date = new Date(time);
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate() ;
    if(month < 10){
        month = '0' + month
    }
    if(day < 10){
        day = '0' + day
    }
    return `${year}/${month}/${day}`
}

// main function
elBtnSubmit.addEventListener('click', function(evt) {
    evt.preventDefault()
    let date = document.querySelector('.date').value;
    console.log(date)
    var value = elInput.value;
    if (value === ''){
        elSpan.style.display = 'block'
        return;
    }else{
        elSpan.style.display = 'none'
    }
    
    const newObj = {
        // id:todoArray[todoArray.length - 1].id ? todoArray[todoArray.length - 1].id +1 : 0,
        id:todoArray.length > 0 ? todoArray[todoArray.length - 1].id +1 : 0,
        title:value,
        completed:false,
        date:date,
    }

    todoArray.push(newObj);
    console.log(todoArray)
    saveToLocal(todoArray)
    renderTodos(todoArray)
    
})

function saveToLocal(value){
    window.localStorage.setItem('todos', JSON.stringify(value))
}
function getToLocal(){
    return JSON.parse(window.localStorage.getItem('todos'))
}

elList.addEventListener('click', function(evt){
    const element = evt.target;
    if(element.className.includes('btn-completed')){
        // console.log('completed')
        const id = Number(element.dataset.id);
        for (let i = 0; i < todoArray.length; i++) {
            const todo = todoArray[i]
            if(todo.id === id){
                console.log(todo)
                // if(todo.completed){
                //     todo.completed = false
                // }else{
                //     todo.completed = true
                // }
                todo.completed = !todo.completed
            }
        }
        saveToLocal(todoArray)
    renderTodos(todoArray)
    }

    if(element.className.includes('btn-delete')){
        const id = Number(element.dataset.id);
        const result = []
        for (let i = 0; i < todoArray.length; i++) {
            const todo = todoArray[i]
            if(todo.id !== id){
                result.push(todo)
            }
        }
        todoArray = result
        saveToLocal(todoArray)
        renderTodos(todoArray)
    }
})


//  theme
let theme = 'light'
elBtnTheme.addEventListener('click', function () {
    elBtnTheme.textContent = ''
    if(theme === 'dark'){
        document.body.style.background = '#fff'
        theme = 'light'
        elBtnTheme.textContent = 'change to dark'
        elTitle.style.color = '#000'
    }else {
        document.body.style.background = '#000'
        theme = 'dark'
        elTitle.style.color = '#fff'
        elBtnTheme.textContent = 'change to light'
    }
});








