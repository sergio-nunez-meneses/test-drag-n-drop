function randomHexColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function dragStartHandler(e) {
  console.log('drag started');

  e.dataTransfer.setData('text/plain', e.target.id);
  e.currentTarget.style.backgroundColor = '#f0ad4e';
}

function dragOverHandler(e) {
  console.log('dragging element');

  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function dropHandler(e) {
  console.log('element dropped');

  e.preventDefault();
  var id = e.dataTransfer.getData('text'),
    draggableElement = document.getElementById(id),
    droppable = event.target;

  droppable.appendChild(draggableElement);
  // e.dataTransfer.clearData();
}

class DraggableDiv {
  constructor(id, width, height) {
    // create
    this.element = document.createElement('div');
    this.element.id = 'drag' + id;

    // style
    this.style = this.element.style;
    this.style.width = width + 'px';
    this.style.height = height + 'px';
    this.color = randomHexColor();
    this.style.backgroundColor = this.color;

    // allow drag
    this.element.draggable = true;
    this.element.setAttribute('ondragstart', 'dragStartHandler(event)');

    document.getElementById('dragContainer').appendChild(this.element);
  }
}

let div = new DraggableDiv(1, 100, 100);
