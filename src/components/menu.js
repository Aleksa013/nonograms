import './../styles/menu.scss';


const Menu = (element) => {
    const menu = document.createElement('div');
    const list = document.createElement('ul');
    const burger = document.createElement('div');
    const purposesArr = ["New game", "Reset game", "Save game", "Continue last game", "Random game", "Check winners", "Available pictures"];
    menu.classList.add ('menu');
    list.classList.add('menu_list');
    burger.classList.add('burger');
    for(let i = 0; i < 3; i += 1){
        const span = document.createElement('span');
        span.classList.add(`${i}`);
        burger.append(span);
    }
    menu.prepend(burger);
    menu.append(list);
    purposesArr.forEach((purpose )=> {
        const li = document.createElement("li");
        li.classList.add(`menu_item`);
        li.textContent = ` ${purpose}`;
        list.append(li);
    });    
   element.appendChild(menu);

   burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    list.classList.toggle('show-menu')
   })
}

export {Menu};