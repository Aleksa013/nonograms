import {ctx, drawField, getPicture} from '../components/field';


const getNewGame = (data, number) => { 
  ctx.clearRect(0, 0, 500, 500);
  getPicture(data).then(drawField(data[number], data[number]));
}

export {getNewGame}