let items = [];

let elements = document.getElementsByClassName("row");
let priority = document.getElementsByClassName("priority-button");
let text = document.getElementsByClassName("text");
let done = document.getElementsByClassName("completed-button");
let remove = document.getElementsByClassName("remove-button");

let priorityChanged;
let completionChanged;
let itemRemoved;





window.onload = function() {
    document.getElementById("tasks").onmouseover = runModificationFunctions;

    document.getElementById("addButton").onclick = createItem;
};





const prioritizeItem = function() {
    priorityChanged = false;

    for (let i = 0; i < priority.length; i++) {
        priority[i].onclick = function() {
            if (items[i].prioritized === false) {
                const elementToPrioritize = elements[i];
                priority[i].style.color = "yellow";
                elements[0].before(elementToPrioritize);
                items[i].prioritized = true;

                const objectToMove = items[i];
                items.splice(i, 1);
                items.unshift(objectToMove);
                priorityChanged = true;
            }
            else if (items[i].prioritized) {
                const elementToPrioritize = elements[i];
                priority[i].style.color = "white";
                elements[elements.length - 1].after(elementToPrioritize);
                items[i].prioritized = false;

                const objectToMove = items[i];
                items.splice(i, 1);
                items.push(objectToMove);
                priorityChanged = true;
            }
        };

        if (priorityChanged) {
            break;
        }
    }
};





const markAsComplete = function() {
    completionChanged = false;

    for (let i = 0; i < done.length; i++) {
        done[i].onclick = function() {
            if (items[i].completed === false) {
                text[i].style.setProperty("text-decoration", "line-through");
                text[i].style.color = "#32CD32";
                items[i].completed = true;
            }
            else if (items[i].completed) {
                text[i].style.setProperty("text-decoration", "none");
                text[i].style.color = "white";
                items[i].completed = false;
            }
        };

        if (priorityChanged) {
            break;
        }
    }
};






const removeItem = function() {
    itemRemoved = false;

    for (let i = 0; i < remove.length; i++) {
        remove[i].onclick = function() {
            const elementToRemove = elements[i];
            elementToRemove.remove();
            items.splice(i, 1);
            itemRemoved = true;
        };

        if (itemRemoved) {
            break;
        }
    }
}





const runModificationFunctions = function() {
    prioritizeItem();
    markAsComplete();
    removeItem();
};





const createItem = function() {
    let input = document.getElementById("textbox").value;
    if (input === "") {}
    else {
        let object = {
            task: input,
            prioritized: false,
            completed: false,
            htmlRow: null,
            htmlPriority: null,
            htmlText: null,
            htmlDone: null,
            htmlCheck: null,
            htmlRemove: null
        }

        items.push(object);

        let x = items.indexOf(object);

        items[x].htmlRow = document.createElement("tr");
        items[x].htmlRow.setAttribute("class", "row");
        document.getElementById("tasks").append(items[x].htmlRow);

        items[x].htmlPriority = document.createElement("td");
        items[x].htmlPriority.setAttribute("class", "priority-button");
        items[x].htmlPriority.innerHTML = "!";
        elements[x].append(items[x].htmlPriority);

        items[x].htmlText = document.createElement("td");
        items[x].htmlText.innerHTML = items[x].task;
        items[x].htmlText.setAttribute("class", "text");
        elements[x].append(items[x].htmlText);

        items[x].htmlDone = document.createElement("td");
        items[x].htmlDone.setAttribute("class", "completed-button");
        elements[x].append(items[x].htmlDone);

        items[x].htmlCheck = document.createElement("img");
        items[x].htmlCheck.src = "images/check.png";
        items[x].htmlCheck.setAttribute("class", "check");
        done[x].append(items[x].htmlCheck);

        items[x].htmlRemove = document.createElement("img");
        items[x].htmlRemove.setAttribute("class", "remove-button");
        items[x].htmlRemove.src = "images/x.png";
        elements[x].append(items[x].htmlRemove);
    }
    document.getElementById("textbox").value = "";
};
