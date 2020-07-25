const container = document.getElementById('container');
const cells = document.querySelectorAll('.cell');

let gridSize = 16;
let paintType = 'normal';

function setGrid(gridSize) {
    container.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
    container.style.gridTemplateRows = `repeat (${gridSize}, auto)`;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);  
    }
}

setGrid(gridSize);

function clearGrid() {
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    })
}
function changeGrid () {
    container.innerHTML = "";
    gridSize = document.querySelector('#grid-size').value;
    setGrid(gridSize);
}

const clearButton = document.querySelector('#clear-btn');
clearButton.addEventListener('click', () => {
    changeGrid();
});

function color() {
    const newColor = document.querySelector('#color').value;
    return newColor;
}
function randomColor() {
    let randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    return randomColor;
}

function paint(e) {
    if (e.target !== e.currentTarget) {    
        let touchedCell = e.target;
        switch(paintType) {
            case 'normal':
                touchedCell.style.backgroundColor = color();
                touchedCell.style.opacity = 1;
                break;
            case 'sketch':
                let darken = Number(e.target.style.opacity);
                e.target.style.opacity = darken += 0.1;
                e.target.style.backgroundColor = color();
                break;
            case 'rainbow':
                touchedCell.style.backgroundColor = randomColor();
                touchedCell.style.opacity = 1;
                break;
            case 'eraser':
                touchedCell.style.background = null;
                touchedCell.style.opacity = null;
        }
    }
}
container.addEventListener('mouseover', paint);

// paint types selection 
document.querySelector('#normal-btn')
    .addEventListener('click', () => {
        container.style.background.color = 'white';
        paintType = 'normal';
});
document.querySelector('#sketch-btn')
    .addEventListener('click', () => {
        paintType = 'sketch';
});
document.querySelector('#rainbow-btn')
    .addEventListener('click', () => {
        paintType = 'rainbow';
});
document.querySelector('#eraser')
    .addEventListener('click', () => {
        paintType = 'eraser';
    })

// utils