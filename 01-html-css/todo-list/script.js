var todo_cnt = 0;

function change_todo_cnt(chg) {
    todo_cnt += chg;
}

function duplicate() {
    var original = document.getElementById("stub");
    var clone = original.cloneNode(true);
    clone.removeAttribute("id");
    original.parentNode.appendChild(clone);
    return clone;
}

function delete_item(item) {
    item.remove();
    change_todo_cnt(-1);
}

function create_item(todo_input) {
    var item = duplicate();
    item.getElementsByClassName("todo_label")[0].innerHTML = todo_input.value;
    item.style.display = "block";
    item.getElementsByClassName("delete_button")[0].onclick = function() {
        delete_item(item);
    }
    change_todo_cnt(1);
}

var todo_input = document.getElementById("todo_input");
todo_input.onkeypress = function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        create_item(todo_input)
        todo_input.value = "";
    }
}

var mark_all = document.getElementById("mark_all");
mark_all.onclick = function() {
    var checkboxes = document.getElementsByClassName("todo_checkbox");
    for (var i in checkboxes)
        checkboxes[i].checked = mark_all.checked;
}
