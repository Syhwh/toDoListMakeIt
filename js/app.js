//  var source = document.getElementById("task").innerHTML;
//  var template = Handlebars.compile(source);
// var context ={
//    tasks: [{task: "My First Blog Post!"},
//     {task: "My Secon Blog Post!"},
//     {task: "My third Blog Post!"}]
// }
// const t= ()=>{
//     context.tasks.forEach(element => {
//         return (element);
//     });
// }
// var data=template(t().json())
// document.getElementById('tasks').innerHTML += data;


const _get = () => {
    $.ajax({
        type: "GET",
        url: "http://makeitreal-todo.herokuapp.com/todo_items",
        headers: { "Content-Type": "application/json" },
    }).done(function (data) {
        data.forEach(element => {
            task(element);
        })

    });
}


const _post = (value) => {
    console.log(value);
    $.ajax({
        type: "POST",
        url: "http://makeitreal-todo.herokuapp.com/todo_items",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ "title": value }),
    }).done(function (data) {
        task(data);
    });
}

const _delete = (id) => {
    $.ajax({
        type: "DELETE",
        url: "http://makeitreal-todo.herokuapp.com/todo_items/" + id,
        headers: { "Content-Type": "application/json" }
    }).done(function (data) {
        console.log('Deleted');
    });
}

const _put = (task, id) => {
    console.log('en el Put Data', task);
    console.log('en el Put ID', id);
    $.ajax({
        type: "PATCH",
        url: "http://makeitreal-todo.herokuapp.com/todo_items/" + id,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(task)
    }).done(function (data) {
        console.log('Data Updated');
    });
}

const task = (input) => {
    return $('.tasks').append(`<li class="  d-flex justify-content-between  card-text task" id=${input.id}><span class='delete'><i class="fa fa-trash"></i></span> ${input.title} <span class="edit"><i class="fa fa-pencil "></i></span></li>`)
}




$("input").on('keypress', function (e) {
    if (e.which == 13) {
        _post($(this).val());
        $(this).val('')
    }

})



$('ul').on('click', '.delete', 'i', function (e) {
    const id = parseInt($('.task').attr('id'));
    $(this).parent().remove();
    _delete(id)
    event.stopPropagation();
})

const state = (data) => {
    _put(data, data.id);
}


$('ul').on('click', 'li', function (e) {
    const id = parseInt($('.task').attr('id'));
    $(e.currentTarget).toggleClass("completed");
    if ($(e.currentTarget).hasClass('completed')) {
        state({ 'id': id, 'done': true })
    } else {
        state({ 'id': id, 'done': false })
    }
    event.stopPropagation();
});

$('ul').on('click', '.edit', function () {
    const id = $(this).parent().attr('id')
    const text = $(this).parent().text();
    $(this).parent().replaceWith('<input type="text" id=' + id + ' class="form-control editText" placeholder="Add new task" value=' + text + ' aria-label="Username" aria-describedby="basic-addon1">')
    console.log('Esto es ID' + id);
    event.stopPropagation();

})



$("ul").on('keypress', '.editText', function (e) {

    if (e.which == 13) {
        const id = parseInt($(this).attr('id'));
        const text = $(this).val();
        console.log('se MANDA AQUI ');
        state({ 'id': id, 'title': text });
        $(this).replaceWith(`<li class=" d-flex justify-content-between card-text task" id=${id}><span class='delete'><i class="fa fa-trash"></i></span> ${text} <span class="edit"><i class="fa fa-pencil "></i></span></li>`)

    }
    event.stopPropagation();
})






$(document).ready(
    _get()
);
