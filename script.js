function dragStartHandler(e) {
  console.log('drag started');

  e.dataTransfer.setData('text/plain', e.target.id);
  e.currentTarget.style.backgroundColor = '#f0ad4e';
}
