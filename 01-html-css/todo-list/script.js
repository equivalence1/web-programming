if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

var items_present = 0;
var mark_all = document.getElementById("mark_all");

function change_items_present_cnt(chg) {
    items_present += chg;

    var footer = document.getElementById("footer");
    var todo_section = document.getElementById("todo_section");
    if (items_present == 0) {
        footer.style.display = "none";
        todo_section.style.display = "none";
    } else {
        footer.style.display = "block";
        todo_section.style.display = "block";
    }

    recalc_todo_cnt();
}

function recalc_todo_cnt() {
    var todo_cnt = 0;
    var checkboxes = document.getElementsByClassName("todo_checkbox");
    for (var i = 1; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked)
            todo_cnt++;
    }

    var cnt_div = document.getElementById("todo_cnt");
    var item_txt = " item";
    if (items_present > 1)
        item_txt = " items";
    cnt_div.innerHTML = "<b>" + todo_cnt + "</b>" + item_txt + " left";

    if (todo_cnt == 0)
        mark_all.checked = true;
    else
        mark_all.checked = false;

    if (todo_cnt != items_present) {
        if (items_present - todo_cnt < 2)
            item_txt = " item";
        else
            item_txt = " items";
        cnt_div.innerHTML += "<a id=\"clear_checked\">Clear " + (items_present - todo_cnt) + item_txt + "</a>";
        var clear_checked = document.getElementById("clear_checked");
        clear_checked.onclick = function() {
            var checkboxes = document.getElementsByClassName("todo_checkbox");
            var items = document.getElementsByClassName("todo_item");
            var i = checkboxes.length - 1;
            while (i != 0) {
                if (checkboxes[i].checked)
                    items[i].getElementsByClassName("delete_button")[0].click();
                i--;
            }
            recalc_todo_cnt();
        }
    }
}

function duplicate() {
    var original = document.getElementById("stub");
    var clone = original.cloneNode(true);
    clone.removeAttribute("id");
    original.parentNode.appendChild(clone);
    return clone;
}

function delete_item(item) {
    recalc_todo_cnt();
    item.remove();
    change_items_present_cnt(-1);
}

function create_item(todo_input) {
    if (todo_input.value.trim() == "")
        return;

    var item = duplicate();
    item.getElementsByClassName("todo_label")[0].innerHTML = todo_input.value;
    item.style.display = "block";
    item.getElementsByClassName("delete_button")[0].onclick = function() {
        delete_item(item);
    }
    item.getElementsByClassName("todo_checkbox")[0].onclick = function() {
        recalc_todo_cnt();
    }

    change_items_present_cnt(1);
    recalc_todo_cnt();
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

mark_all.onclick = function() {
    var checkboxes = document.getElementsByClassName("todo_checkbox");
    for (var i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = mark_all.checked;
    }
    recalc_todo_cnt();
}

change_items_present_cnt(0);
recalc_todo_cnt();
