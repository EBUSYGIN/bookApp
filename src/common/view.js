export class AbstractView {
  constructor() {
    this.app = document.getElementById('root');
  }

  setTitle(title) {
    document.title = title;
  }

  clearContainer(id) {
    const oldContainer = this.app.querySelector(`#${id}`);
    if (oldContainer) oldContainer.remove();
  }

  render() {
    return;
  }

  destroy() {
    return;
  }
}
