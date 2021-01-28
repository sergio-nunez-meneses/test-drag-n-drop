// const draggableElements = 10;
//
// function getBy(attribute, value) {
//   if (attribute === 'tag') {
//     return document.getElementsByTagName(value);
//   } else if (attribute === 'id') {
//     return document.getElementById(value);
//   } else if (attribute === 'name') {
//     return document.getElementsByName(value)[0];
//   } else if (attribute === 'class') {
//     return document.getElementsByClassName(value);
//   }
// }
//
// function randomHexColor() {
//   return '#' + Math.floor(Math.random() * 16777215).toString(16);
// }
//
// function dragStartHandler(e) {
//   console.log('dragged ' + e.target.id + ' element');
//
//   e.dataTransfer.setData('text/plain', e.target.id);
//   e.currentTarget.style.backgroundColor = '#f0ad4e';
// }
//
// function dragOverHandler(e) {
//   console.log('dragging element');
//
//   e.preventDefault();
//   e.dataTransfer.dropEffect = 'move';
// }
//
// function dropHandler(e) {
//   console.log('element dropped');
//
//   e.preventDefault();
//   const id = e.dataTransfer.getData('text'),
//     draggableElement = getBy('id', id),
//     droppable = e.target;
//
//   draggableElement.style.backgroundColor = draggableElement.dataset.color;
//   droppable.appendChild(draggableElement);
//
//   e.dataTransfer.clearData();
// }
//
// class DraggableDiv {
//   constructor(id) {
//     // create
//     this.element = document.createElement('div');
//     this.element.id = 'draggable' + id;
//     this.element.innerHTML = this.element.id;
//
//     // style
//     this.element.setAttribute('class', 'draggable-div');
//     this.color = randomHexColor();
//     this.element.style.backgroundColor = this.color;
//     this.element.setAttribute('data-color', this.color); // store color
//
//     // allow drag
//     this.element.draggable = true;
//     this.element.setAttribute('ondragstart', 'dragStartHandler(event)');
//
//     getBy('id', 'dragContainer').appendChild(this.element);
//   }
// }
//
// for (var i = 0; i < draggableElements; i++) {
//   new DraggableDiv(i);
// }

// new test

var list = document.getElementById('list'),
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
  original = colors.slice(),
  randomized = colors.sort(() => Math.random() - 0.5),
  dragging, draggedOver;

function generateList(original, randomized) {
  if (randomized.join('') !== original.join('')) {
    renderListItems(randomized);
  } else {
    generateList(original, randomized);
  }
}

function renderListItems(colors) {
  list.innerText = '';

  colors.forEach(item => {
    // create
    var listItem = document.createElement('li');
    listItem.style.backgroundColor = item;
    listItem.innerText = item;

    // allow dragging
    listItem.draggable = true;
    listItem.addEventListener('drag', dragStartHandler);
    listItem.addEventListener('dragover', dragOverHandler);
    listItem.addEventListener('drop', compare);

    list.appendChild(listItem);
  });
}

function dragStartHandler(e) {
  dragging = e.target.innerText;
  console.log('start dragging:', dragging);
}

function dragOverHandler(e) {
  e.preventDefault();

  draggedOver = e.target.innerText;
  console.log('drag over:', draggedOver);
}

function compare(e) {
  console.log(dragging, draggedOver);

  var index1 = randomized.indexOf(dragging),
    index2 = randomized.indexOf(draggedOver);
  console.log('index1: ' + index1, 'index2: ' + index2);
};

generateList(original, randomized);
