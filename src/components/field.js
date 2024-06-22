import pictures from '../pictures.json';

const canvas = document.createElement('canvas');
canvas.classList.add('canvas');
canvas.setAttribute('id', 'myCanvas');
const width = '500',
height = '500';

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);


const ctx = canvas.getContext('2d');

// const drawRects = (rows, cols) => {
//     let axisX = 350;    
//     let lengthsCols = 0;
//     let lengthsRows = 0;
//     rows.forEach((row, index)=> {  
//         if( index % 5 === 0){
//             if (lengthsRows < row.length) {
//                 lengthsRows = row.length
//             }                
//             let axisY = 300;  
//             axisX -= 40;           
//             ctx.beginPath();
//             ctx.moveTo(axisX, axisY);
//             ctx.lineTo(axisX, axisY - lengthsRows*40);
//             ctx.lineWidth = 5;
//             ctx.stroke();
          
//             cols.forEach((col, number)=>{
//                 if(number % 5 === 0){
//                     if (lengthsCols < col.length) {
//                         lengthsCols = col.length
//                     }            
//                     axisY -= 40;           
//                     ctx.strokeRect(axisX, axisY, 200, 200);  
//                 }
                
//             })
//         }
       
//     });
// }
let axis;
let gridMeasure;
let spice;
const drawField = (data) => {
    drawLine('rows',data);
    drawLine('cols',data);
}

const drawLine = (purpose, data ) => {
    if(data.level === "easy"){
        axis = 150;
        gridMeasure = 40;
        spice = 100;
    }else if (data.level === "normal"){
        axis = 120;
        gridMeasure = 35;
        spice = 70;        
    }else if (data.level === "hard"){
        axis = 100;
        gridMeasure = 25;
        spice = 50;        
    }

    
    let maxLength = getMaxLength(data[`${purpose}`]);
    let axisToEnd = axis + data[`${purpose}`].length*gridMeasure;
    let axisNew = axis;
  
    for(let i = 0; i <= data[`${purpose}`].length; i += 1){       
        if (purpose === 'rows' ) {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(axis,axisNew);
            ctx.lineTo(axisToEnd,axisNew);
            ctx.stroke();            
        }
        if (purpose === 'cols') {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(axisNew,axis);
            ctx.lineTo(axisNew, axisToEnd);
            ctx.stroke();
        }  
        if(i < data[`${purpose}`].length){
            ctx.lineWidth = 2;  
            writeClues(purpose, data[`${purpose}`][i], axisNew, maxLength, gridMeasure, spice);
            console.log(axisNew)
        }     
        axisNew += gridMeasure;        
    }
    drawBoldLine(purpose, data[`${purpose}`], maxLength);
}
const drawBoldLine = (purpose, data, maxLength) => {
    if(data.level === "easy"){
        axis = 150;
        gridMeasure = 40;
    }else if (data.level === "normal"){
        axis = 100;
        gridMeasure = 35;
    }
    let axisNew = axis;
    let axisToStart = axisNew - 20  -  maxLength*(gridMeasure);
    let axisToEnd = axisNew + data.length * gridMeasure;
    for(let i = 0; i <= data.length; i += 1){
        if( i % 5 === 0){
            ctx.lineWidth = 5;        
        if (purpose === 'rows' ) {
            ctx.beginPath();
            ctx.moveTo(axisToStart,axisNew);
            ctx.lineTo(axisToEnd,axisNew);
            ctx.stroke();            
        }
        if (purpose === 'cols') {
            ctx.beginPath();
            ctx.moveTo(axisNew,axisToStart);
            ctx.lineTo(axisNew, axisToEnd);
            ctx.stroke();
        }      
        axisNew += gridMeasure * 5;
    }
    }
}
const writeClues = (purpose, arr, axis, maxLength, measure, spice) => {  
    let spiceToEnd = spice + 40 -  maxLength*measure;
    if(purpose === 'rows'){        
        let center ;   
        measure === 25 ? center = axis + 20 :  center = axis + 25 ;
        measure === 25 ? ctx.font = "19px serif" :  ctx.font = "24px serif" ;  
        arr.forEach((item )=> {                
                ctx.fillText(item, spice + 22, center);
                ctx.beginPath();
                ctx.moveTo(spice + 50, axis);
                ctx.lineTo(spiceToEnd , axis);
                ctx.stroke();  
                item > 9 ?
                spice -= 35:
                spice -= 20;     
        })
    } else{
        spice += 30;
        let center ;
        let plus;
        measure === 25 ? plus = 3  :  plus = 7 ;
        measure === 25 ? ctx.font = "19px serif" :  ctx.font = "24px serif" ;
        arr.forEach(item => {         
            item > 9? 
            center = axis + plus :
            center = axis + plus*2 ;  
               
            ctx.fillText(item,center,spice + 10);            
            ctx.beginPath();
            ctx.moveTo(axis , spice + 50);
            ctx.lineTo(axis , spiceToEnd);           
            ctx.stroke(); 
            measure === 25 ? spice -= 18  :  spice -= 30;        
              
        })
    
    }  
} 
const getMaxLength = (arr) => {   
    let maxLength = 0; 
    arr.forEach(item => {
    item.length > maxLength ? maxLength = item.length : maxLength;
    })
    console.log(maxLength, "maxLength")
    return maxLength;
}

const getPicture = pic => {
return new Promise((res, rej) => {
        const data = JSON.stringify(pic);
        data ?
         res(console.log("data")):
         rej(console.log('no data'))
      })
}

getPicture(pictures).then(drawField(pictures[0]));
// getPicture(pictures).then(drawRects(pictures[0].rows, pictures[0].cols))


export  {canvas, ctx, drawField, getPicture, drawBoldLine};