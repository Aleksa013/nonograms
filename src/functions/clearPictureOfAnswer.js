
const clearPicture = (element) =>{
    element.textContent =``;
    element.classList.contains("normal")?
    element.classList.remove("normal"):
    element.classList.contains("easy")?
    element.classList.remove("easy"):
    null;
}

export {clearPicture}