import "./../styles/button.scss";

const Button = (element) => {
    const button = document.createElement('div');
    button.className = 'button_answer';
    button.textContent = "Solution";
    element.appendChild(button);
}

export {Button}