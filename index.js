function onSubmitForm() {
    let formData = readForm();
    insertNewTask(formData);
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
    cell3.innerHTML = "<a>Edit</a> <a onClick=deleteTask(this)>Delete</a> "
}

function deleteTask(a) {
    let row = a.parentElement.parentElement
    document.getElementById("taskList").deleteRow(row.rowIndex);
}