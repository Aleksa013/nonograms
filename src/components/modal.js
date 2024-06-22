import './../styles/modal.scss';



const Modal = (element, purpose, time =0, nonogram=0, level=0, winners=[]) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
const modal = document.createElement('div');
const buttonNewGame = document.createElement('div');
buttonNewGame.className = 'button_new-game';
modal.classList.add('modal');
if(purpose === "winn"){
buttonNewGame.textContent = "New Game";

if(minutes === 0){
    modal.innerHTML = `
    <p>
<span>Great!</span> 
You have solved the nonogram ${nonogram} level ${level}!</p>
<p>Game solution time : ${seconds} seconds!</p>
    
`
}else{
    modal.innerHTML = `
    <p>
<span>Great!</span> 
You have solved the nonogram ${nonogram} level ${level}!</p>
<p>Game solution time :${minutes} minutes and ${seconds} seconds!</p>
`
}
} else if(purpose === "check") {
    const header = document.createElement("h2");
    header.textContent = `
    Honorary list of winners:
    `;    
    const list = document.createElement('ul');
    if(winners.length === 0){
        console.log('no')
        const li = document.createElement("li");
        li.classList.add("menu_item");
        li.textContent = `There isn't winner yet`;
        list.append(li);
    }else{
        const times = [];
        const anotherWin = [...winners];
        const winnerSort =[];
        winners.forEach(arr => {
            times.push(arr[0]);
        });
        times.sort((a,b) => a - b);
        for(let i = 0; i < times.length; i += 1){
            for(let k = 0; k < anotherWin.length; k += 1){
                if(times[i] === anotherWin[k][0]){
                    winnerSort.push(winners[k]);
                    anotherWin.splice(k, 1);
                }
            }
        }
       
        for(let i = 0; i < winnerSort.length; i += 1){
            if(i < 5){
                const minutes = Math.trunc(winnerSort[i][0] / 60);
                const seconds = winnerSort[i][0] % 60;
                const li = document.createElement("li");
                li.classList.add(`winners_item`);
                li.textContent = `${winnerSort[i][2].toUpperCase()} level ${winnerSort[i][1].toUpperCase()} : Time ${minutes} minutes and ${seconds} seconds`;
                list.append(li);
            }
           
        } 
    }
    modal.prepend(header);
    modal.append(list);
    buttonNewGame.textContent = "Close list";
}

modal.append(buttonNewGame)
element.appendChild(modal);

}

export {Modal};

