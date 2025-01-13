import { DivComponent } from '../../common/div';
import styles from './card-list-title.css';

export class CardListTitle extends DivComponent {
  constructor(parentState) {
    super();
    this.parentState = parentState;
  }

  render() {
    this.el.setAttribute('id', 'title');
    if (this.parentState.loading) {
      this.el.innerHTML = `<h1 class='${styles.title}'>Загружаем книги. Подождите, пожалуйста</h1>`;
      return this.el;
    }

    this.el.innerHTML = `<h1 class='${styles.title}'>Найдено книг - ${this.parentState.numFound}</h1>`;
    return this.el;
  }
}
