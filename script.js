let body = document.querySelector("body");

let btnAdd = document.querySelector(".btn-add");
let toDoList = document.querySelector("ul");
let input = document.querySelector("input");
let popup = document.querySelector(".popup");

let popupInfo = popup.children[1].children[0];
let popupInput = popup.children[1].children[1];
let popupBtnAccept = popup.children[1].children[2];
let popupBtnCancel = popup.children[1].children[3];

let checkBtns  = document.querySelectorAll(".complete");
let editBtns   = document.querySelectorAll(".edit");
let deleteBtns = document.querySelectorAll(".delete");

let infoP = document.querySelector("p");

let numberOfAssignments = 0;
let tmpEditBtnIndex = 4;

let editAssignmentsMapped = [];

function addAssignment(e)
{
    if(input.value != "" && (e.target == btnAdd || e.keyCode == 'Enter'))
    {
        editAssignmentsMapped.push('1');

        let newLi = document.createElement("li");
        let newDiv = document.createElement("div");
        let newBtn1 = document.createElement("button");
        let newBtn2 = document.createElement("button");
        let newBtn3 = document.createElement("button");
        let newI1 = document.createElement("i");
        let newI2 = document.createElement("i");
        let newP = document.createElement("p");

        newLi.setAttribute("data-id", "test4");
        newP.textContent = `${input.value}`;

        newDiv.setAttribute("class", "tools");

        newBtn1.setAttribute("class", "complete");
        newBtn2.setAttribute("class", "edit");
        newBtn2.textContent = "EDIT";
        newBtn3.setAttribute("class", "delete");

        newI1.setAttribute("class", "fas fa-check");
        newI2.setAttribute("class", "fas fa-times");

        newBtn1.appendChild(newI1);
        newBtn3.appendChild(newI2);

        newDiv.append(newBtn1, newBtn2, newBtn3);

        newLi.appendChild(newP);
        newLi.appendChild(newDiv);

        toDoList.appendChild(newLi);
        
        calculateTheNodes();
        numberOfAssignments++;

        changeInfoAboutAssignments(numberOfAssignments);
    }
    else if(input.value == "" && e.target == btnAdd)
    {
        infoP.textContent = 'Nie możesz dodać pustego zadania';
        infoP.style.color = 'red';
    }
}

function markCompletionOfAssignment(e)
{
    let x = Array.prototype.indexOf.call(checkBtns, e.target);

    if(toDoList.children[x].children[0].style.textDecoration != "line-through")
    {
        toDoList.children[x].children[0].style.textDecoration = "line-through";
        editAssignmentsMapped[x] = '0';
        changeInfoAboutAssignments(--numberOfAssignments);
    }
    else
    {
        toDoList.children[x].children[0].style.textDecoration = "none";
        editAssignmentsMapped[x] = '1';
        changeInfoAboutAssignments(++numberOfAssignments);
    }
}

function editAssignment(e)
{
    let x = Array.prototype.indexOf.call(editBtns, e.target);
    tmpEditBtnIndex = x;

    popupInfo.textContent = "";
    popup.style.display = "flex";
    popupBtnAccept.addEventListener("click", function(){
        if(popupInput.value != "" && tmpEditBtnIndex == x)
        {
            toDoList.children[x].children[0].textContent = `${popupInput.value}`;
            popup.style.display = "none";
            popupInput.value = "";
        }
        else
        {
            popupInfo.textContent = "Zadanie nie może być puste!";
            popupInfo.style.color = "red";
        }
    });
    popupBtnCancel.addEventListener("click", function(){
        popup.style.display = "none";
        return;
    });

    calculateTheNodes();
}

function deleteAssignment(e)
{
    let x = Array.prototype.indexOf.call(deleteBtns, e.target);

    if(editAssignmentsMapped[x] === '1')
        numberOfAssignments--;
    editAssignmentsMapped.splice(x, 1);

    toDoList.removeChild(toDoList.children[x]);
    calculateTheNodes();
    changeInfoAboutAssignments(numberOfAssignments);
}

function calculateTheNodes()
{
    checkBtns  = document.querySelectorAll(".complete");
    editBtns   = document.querySelectorAll(".edit");
    deleteBtns = document.querySelectorAll(".delete");
    
    for(const checkBtn of checkBtns)
        checkBtn.addEventListener("click", markCompletionOfAssignment);
    for(const editBtn of editBtns)
        editBtn.addEventListener("click", editAssignment);
    for(const deleteBtn of deleteBtns)
        deleteBtn.addEventListener("click", deleteAssignment);
}

function changeInfoAboutAssignments(numberOfAssignments)
{
    infoP.style.color = 'black';

    if(numberOfAssignments == 1)
        infoP.textContent = 'Na liście jest ' + numberOfAssignments + ' zadanie do zrobienia';
    else if(numberOfAssignments >= 1 && numberOfAssignments <= 4)
        infoP.textContent = 'Na liście są ' + numberOfAssignments + ' zadania do zrobienia';
    else if(numberOfAssignments >= 5)
        infoP.textContent = 'Na liście jest ' + numberOfAssignments + ' zadań do zrobienia';
    else
        infoP.textContent = 'Brak zadań na liście';
}

btnAdd.addEventListener("click", addAssignment);
body.addEventListener("keypress", addAssignment);

calculateTheNodes();