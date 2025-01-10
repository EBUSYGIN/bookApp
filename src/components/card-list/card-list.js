import { DivComponent } from '../../common/div';
import { Card } from '../card/card';
import styles from './card-list.css';

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    this.el.setAttribute('id', 'card-list');
    this.el.classList.add(`${styles['card-list']}`);

    if (this.parentState.loading) {
      this.el.innerHTML = `<h1 class='${styles.title}'>Загружаем книги. Подождите, пожалуйста</h1>`;
      return this.el;
    }

    this.el.innerHTML = `<h1 class='${styles.title}'>Найдено книг - ${this.parentState.numFound}</h1>`;

    for (const card of this.parentState.list) {
      this.el.append(new Card(this.appState, card).render());
    }

    return this.el;
  }
}
