import "./../styles/mode.scss";

const ButtonMode = (element, classButton) => {
    const button = document.createElement("div");
    const circle = document.createElement("div");
    button.className = `${classButton}`;
    circle.className = `${classButton}-circle`;
    button.append(circle);
    element.prepend(button);
}

export {ButtonMode}