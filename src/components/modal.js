import './../styles/modal.scss';

const Modal = (element, purpose, time =0, nonogram=0, level=0, winners=[]) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
const modal = document.createElement('div');
const buttonNewGame = document.createElement('div');
buttonNewGame.className = 'button_new-game';
modal.classList.add('modal');

const textAboutTime = minutes === 0 ? `${seconds} seconds!` : `${minutes} minutes and ${seconds} seconds!`;
if(purpose === "winn"){
buttonNewGame.textContent = "New Game";

modal.innerHTML =  
`<p>
<span>Great!</span> 
You have solved the nonogram ${nonogram} level ${level}!</p>
<p>Game solution time : ${textAboutTime}</p>`
} else if(purpose === "check") {
    const header = document.createElement("h2");
    header.textContent = `
    Honorary list of winners:
    `;    
    const list = document.createElement('ul');
    if(winners.length === 0){
        const li = document.createElement("li");
        li.classList.add("menu_item");
        li.textContent = `There isn't winner yet`;
        list.append(li);
    }else{
        const times = [];
        const anotherWin = [...winners];
        winners.forEach((arr, index) => {
            times.push(arr[index]);
        });
        times.sort((a,b) => a - b);
       
        const setWinners = new Set(anotherWin);
        setWinners.forEach((winner) => {
                const minutes = Math.trunc(winner[0] / 60);
                const seconds = winner[0] % 60;
                const li = document.createElement("li");
                li.classList.add(`winners_item`);
                li.textContent = `${winner[2].toUpperCase()} level ${winner[1].toUpperCase()} : Time ${minutes} minutes and ${seconds} seconds`;
                list.append(li);            
        })   
        
    }
    modal.prepend(header);
    modal.append(list);
    buttonNewGame.textContent = "Close list";
}

modal.append(buttonNewGame)
element.appendChild(modal);

}

export {Modal};

