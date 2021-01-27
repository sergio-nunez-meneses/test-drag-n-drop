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
