
const checkGrids = (x, y, used, level) => {
    if(used && level){
        let newItem;
        if(level === "hard"){
            newItem  = `${x}-${y}`;
        } else {
            newItem = `${x}`+`${y}`;
        }
        
        used.includes(newItem)? 
        used.splice(used.indexOf(newItem),1):
        used.push(newItem);   
        return used;
    }else{
       return [];
    }
   
}

export {checkGrids}