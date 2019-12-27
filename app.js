var d = document;
var taskNow = -1;
var taskLast = 0;
var taskList = d.querySelector(".kus");
var taskTemplate = '<div>';

function Parent(x, y) {
    for (let i = 0; i < y; i++) {
        x = x.parentNode;
    }
    return x;
}

function Check(x) {
    let card = Parent(x, 3);
    if (x.checked) {
        card.querySelector(".title")
            .style.textDecoration = "line-through";
        card.querySelector(".title")
            .style.opacity = "0.5";
        card.querySelector(".edit")
            .style.opacity = "0.5";
        card.querySelector(".delete")
            .style.opacity = "0.5";
    } else {
        card.querySelector(".title")
            .style.textDecoration = "none";
        card.querySelector(".title")
            .style.opacity = "1";
        card.querySelector(".edit")
            .style.opacity = "1";
        card.querySelector(".delete")
            .style.opacity = "1";
    }
}

function Edit(x) {
    d.querySelector(".card")
        .style.display = "flex";
    if (x == -1) {
        taskNow = -1;
    } else {
        taskNow = Parent(x, 2)
            .getAttribute("data-id");

        let Task = d.querySelector(".row[data-id='" + taskNow + "']");
        d.querySelector(".card-wrap input[name='check']")
            .checked = Task.querySelector(".flash")
            .classList.contains("high");
        d.querySelector(".card-wrap input[type=text]")
            .value = Task.querySelector(".title")
            .innerHTML;
    }
}

function Destroy(x) {
    Parent(x, 2)
        .remove();
}

function Cancel() {
    d.querySelector(".card")
        .style.display = "none";
    d.querySelector(".card-wrap input[name='check']")
        .checked = false;
    d.querySelector(".card-wrap input[type=text]")
        .value = "Описание задачи";
    taskNow = -1;
}

function Submit() {
    let task_value;
    let text = d.querySelector(".card-wrap input[type=text]");
    if (d.querySelector(".card-wrap input[type=checkbox]")
        .checked) {
        task_value = "high";
    } else {
        task_value = "";
    }
    if (taskNow == -1) {
		taskTemplate = '<div class="row" data-id="' + (taskLast++) + '">\
					<div class="checkbox">\
					   <label> \
						<input type="checkbox" onclick="Check(this)"> \
						<span class="check_ico"><img src="images/check.svg" alt="check mark"></span> \
						</label> \
					</div>\
					<div class="flash ' + task_value + '"></div> \
					<div class="active central"> \
						<span class="title ">' + text.value + '</span> \
						<input type="button" class="edit" onclick="Edit(this)" > \
						<input type="button" class="delete" onclick="Destroy(this)">\
					</div>\
				</div>';

        taskList.insertAdjacentHTML('beforeend', taskTemplate);
    } else {
        let Selector = ".row[data-id='" + taskNow + "']";
        let Task = d.querySelector(Selector);
        Task.querySelector(".title")
            .innerHTML = text.value;
        if (task_value != "") {
            Task.querySelector(".flash")
                .classList.add("flash", task_value);
        } else {
            Task.querySelector(".flash")
                .classList.remove("high");
        }

    }
    Cancel();
}



