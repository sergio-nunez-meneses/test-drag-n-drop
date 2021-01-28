var maxColors = 10,
  colors = [],
  originalColors = colors.slice(),
  randomizedColors = colors.sort(() => Math.random() - 0.5),
  list = document.getElementById('list'),
  dragging, draggedOver;

function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

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
    listItem.id = item;
    listItem.style.backgroundColor = item;
    listItem.innerText = randomizedColors.indexOf(item);

    // allow dragging
    listItem.draggable = true;
    listItem.addEventListener('drag', dragStartHandler);
    listItem.addEventListener('dragover', dragOverHandler);
    listItem.addEventListener('drop', compareItems);

    list.appendChild(listItem);
  });
}

function dragStartHandler(e) {
  dragging = e.target.id;
  // console.log('hover dragged');
}

function dragOverHandler(e) {
  e.preventDefault();

  draggedOver = e.target.id;

  if (draggedOver !== dragging) {
    // console.log('hover dragged over');
  }
}

function compareItems(e) {
  var index1 = randomizedColors.indexOf(dragging),
    index2 = randomizedColors.indexOf(draggedOver);

  randomizedColors.splice(index1, 1);
  randomizedColors.splice(index2, 0, dragging);

  renderListItems(randomizedColors);
};

for (var i = 0; i < maxColors; i++) {
  colors.push(randomHexColor());
}

generateList(originalColors, randomizedColors);
