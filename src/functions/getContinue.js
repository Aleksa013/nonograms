import {ctx, drawField, getPicture} from "./../components/field";

const continueGames = (arr, data,  numberPictures, audio, purpose, themeOn = false) => {
    let measure;
    let axis;
    ctx.clearRect(0, 0, 500, 500);
    getPicture(data).then(drawField(data[numberPictures]));
    audio.play();
    if(data[numberPictures].level === "easy"){
        measure = 40;
        axis = 150;     
    }else if (data[numberPictures].level === "normal"){
        measure = 35;
        axis = 120;        
    }else if (data[numberPictures].level === "hard"){
        measure = 25;
        axis = 100;        
    }
    if(purpose === "continue"){
        if(themeOn === true){
            ctx.fillStyle = "rgb(10, 10, 10)"
          }else if(themeOn === false){
            ctx.fillStyle = "rgb(117, 129, 129)";
          }
        if(arr.length > 0){
            const drawAgain = setInterval(()=> {
                if(!arr.length){
                    clearInterval(drawAgain);
                }
                const grid = arr.shift();
                const x = grid[0],
                      y = grid[1];
        
                ctx.fillRect(x  * measure+ 1 +axis, y * measure +1  +axis, measure -2.15, measure- 2.15);
               if(arr.length === 0){
                clearInterval(drawAgain);
               }
            }, 100);
        }else{
            drawField(data[numberPictures])
        }
     
    }else if(purpose === "show"){
        if(themeOn === true){
            ctx.fillStyle = "rgb(10, 10, 10)"
          }else if(themeOn === false){
            ctx.fillStyle = "rgb(117, 129, 129)";
          }
        if(data[numberPictures].level === "normal" ||data[numberPictures].level === "easy"){
            arr.forEach(grid =>{
                const x = grid[0],
                      y = grid[1];    
                ctx.fillRect(x  * measure+ 1 +axis, y * measure +1  +axis, measure -2.15, measure- 2.15);
            })
        }else {
            arr.forEach(grid =>{
               const oneGrid = grid.split('-')
                const x = oneGrid[0],
                      y = oneGrid[1];    
                ctx.fillRect(x  * measure+ 1 +axis, y * measure +1  +axis, measure -2.15, measure- 2.15);
            })
        }
       
    }   
    
}

export {continueGames}