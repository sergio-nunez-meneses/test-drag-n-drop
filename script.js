var list = document.getElementById('list'),
  maxColors = 10,
  colors = [],
  originalColors = colors.slice(),
  randomizedColors = colors.sort(() => Math.random() - 0.5),
  draggingItem, draggedOverItem;

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
    new ListItem(item);
  });
}

class ListItem {
  constructor(item) {
    // set
    this.element = document.createElement('li');
    this.element.id = item;
    this.element.style.backgroundColor = item;
    this.element.innerText = randomizedColors.indexOf(item);
    this.draggedIndex;
    this.draggedOverIndex;

    // allow dragging
    this.element.draggable = true;
    this.element.addEventListener('drag', (e) => {
      this.dragStartHandler(e);
    });
    this.element.addEventListener('dragover', (e) => {
      this.dragOverHandler(e);
    });
    this.element.addEventListener('drop', (e) => {
      this.compareItems(e);
    });

    // create
    list.appendChild(this.element);
  }

  dragStartHandler = function(e) {
    draggingItem = e.target.id;
    // console.log('hover dragged');
  }

  dragOverHandler = function(e) {
    e.preventDefault();

    draggedOverItem = e.target.id;

    if (draggedOverItem !== draggingItem) {
      // console.log('hover dragged over');
    }
  }

  compareItems = function(e) {
    this.draggedIndex = randomizedColors.indexOf(draggingItem),
    this.draggedOverIndex = randomizedColors.indexOf(draggedOverItem);

    randomizedColors.splice(this.draggedIndex, 1);
    randomizedColors.splice(this.draggedOverIndex, 0, draggingItem);

    renderListItems(randomizedColors);
  };
}

// init

for (var i = 0; i < maxColors; i++) {
  colors.push(randomHexColor());
}

generateList(originalColors, randomizedColors);
