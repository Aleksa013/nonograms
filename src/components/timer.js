

const Timer = (element, time) =>{    
    const minutes = Math.trunc(time/60);
    const seconds = time % 60;
element.textContent = ``;
if(minutes < 10 && seconds < 10) {
    element.textContent = `0${minutes} : 0${seconds}`
}else if(minutes > 9 && seconds < 10){
    element.textContent = `${minutes} : 0${seconds}`
}else if(minutes > 9 && seconds > 9){
    element.textContent = `${minutes} : ${seconds}`
}else if(minutes < 10 && seconds > 9){
    element.textContent = `0${minutes} : ${seconds}`
}
}
export {Timer}