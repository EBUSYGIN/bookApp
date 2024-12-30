import { AbstractView } from '../../common/view';

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setTitle('Поиск книг');
  }

  render() {
    this.app.innerHTML = '';
    const main = document.createElement('div');
    main.innerHTML = 'test';
    this.app.append(main);
  }
}
