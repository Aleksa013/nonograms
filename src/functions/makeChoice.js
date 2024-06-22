import './../styles/listTasks.scss';

const makeChoice = (element, data) =>{
    const listTasks = document.createElement("div");
    listTasks.className = "tasks";
    const list = document.createElement("ul");
    list.className = "tasksList";
    data.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `${task.level}`;
        li.classList.add(`${index}`)
        li.textContent = `
        ${task.name.toUpperCase()} - Level ${task.level}
        `
        list.append(li);
    })
    listTasks.append(list)
    element.append(listTasks)
}
export {makeChoice}