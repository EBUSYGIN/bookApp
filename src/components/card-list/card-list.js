import { DivComponent } from '../../common/div';
import styles from './card-list.css';

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading) {
      this.el.innerHTML = `<div class='${styles.loader}'>Загружаем книги. Подождите, пожалуйста</div>`;
      return this.el;
    }

    this.el.innerHTML = `<h1 class='${styles.title}'>Найдено книг - ${this.parentState.list.length}</h1>`;
    return this.el;
  }
}
