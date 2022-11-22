let selectRow = null;
let tasks = [];

updatePageAfterRefresh();


function onSubmitForm() {
    if (validate()) {
        let formData = readForm();
        if (selectRow == null) {
            insertNewTask(formData);
        }
        else {
            updateTask(formData);
        }
        resetForm();
    }

}
function readForm() {
    let formData = {};
    formData["task"] = document.getElementById("task").value;
    formData["discription"] = document.getElementById("discription").value;
    return formData
}

function insertNewTask(formData) {
    let table = document.getElementById("taskList").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.task;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.discription;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = "<a onClick=editForm(this)>Edit</a> <a onClick=deleteTask(this)>Delete</a> "
    tasks.push(formData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function resetForm() {
    document.getElementById("task").value = "";
    document.getElementById("discription").value = "";
    selectRow = null;
}

function deleteTask(a) {
    let row = a.parentElement.parentElement
    document.getElementById("taskList").deleteRow(row.rowIndex);
    tasks.splice(row.rowIndex - 1, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editForm(a) {
    selectRow = a.parentElement.parentElement;
    document.getElementById("task").value = selectRow.cells[0].innerHTML;
    document.getElementById("discription").value = selectRow.cells[1].innerHTML;
}

function updateTask(formData) {
    selectRow.cells[0].innerHTML = formData.task;
    selectRow.cells[1].innerHTML = formData.discription;
    tasks.splice(selectRow.rowIndex - 1, 1, { task: formData.task, discription: formData.discription });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function validate() {
    isValid = true;
    if (document.getElementById("task").value == "") {
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");

    }
    else {
        isValid = true;
        if (!document.getElementById("labelId").classList.contains("hide")) {
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function updatePageAfterRefresh() {
    if (localStorage.getItem("tasks") == null) {
        console.log("Local storage is empty")
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        for (let index = 0; index < tasks.length; index++) {
            let name = tasks[index].task;
            let discription2 = tasks[index].discription;
            document.getElementById("tbody").innerHTML +=
                `<tr>
            <td>${name}</td>
            <td>${discription2}</td>
            <td>${"<a onClick=editForm(this)>Edit</a> <a onClick=deleteTask(this)>Delete</a> "}</td>
            </tr>
            `
        }
    }

}


