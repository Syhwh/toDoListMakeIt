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







$("input").on('keypress', function (e) {
    if (e.which == 13) {
        task($(this).val())
        _post( $(this).val());       
        $(this).val('')
    }
})
const _post=(value)=>{
    $.ajax({
        type: "POST",
        url: "http://makeitreal-todo.herokuapp.com/todo_items/<item_id>",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ "title":value })
    }).done(function (data) {
        console.log(data);
    });
}

const _delete=(value)=>{
    console.log('delete'+value);
    $.ajax({
        type: "DELETE",
        url: `"http://makeitreal-todo.herokuapp.com/todo_items"/${value}`,
        headers: { "Content-Type": "application/json" },
        //data: { "id": value }
    }).done(function (data) {
        console.log(data);
    });
}


const task = (input) => {
    return $('.tasks').append(`<li class="card-text task" id=${input.id}><span><i class="fa fa-trash delete"></i></span> ${input.title} <span><i class="fa fa-pencil edit"></i></span>     </li> `)
}

$('ul').on('click', 'span .delete', function (e) {
    console.log('En el DELETE'+ $(this).parent().parent().attr('id'));
    $(this).parent().parent().remove();
    _delete( $(this).parent().parent().attr('id'))
    event.stopPropagation();

})

$('ul').on('click', 'span .edit', function (e) {
    const text = $(this).parent('li').text()
    $(this).parent().parent().replaceWith(`<li> <input type="text" class="form-control editText" value=${text} aria-label="Username"
     aria-describedby="basic-addon1"></li>`)
    // $("input").val($(this).parent().parent().val());    
    event.stopPropagation();

})


$("ul").on('keypress', '.editText', function (e) {
    if (e.which == 13) {
        let text = $(this).val();
        console.log(text);
        printTask()
        $(this).replaceWith(`<li class="card-text" ><span><i class="fa fa-trash delete"></i></span> ${text} <span><i class="fa fa-pencil edit"></i></span>     </li> `)
    }
    event.stopPropagation();
})

$('ul').on('click', 'li', function (e) {
    console.log(e.currentTarget.className);
    $(e.currentTarget).toggleClass("completed");
    event.stopPropagation();
});


const printTask = () => {
    $.get("http://makeitreal-todo.herokuapp.com/todo_items", function (data) {
       data.forEach(element => {
           task(element);
        });
    });
}
$(document).ready(
    printTask()
);
