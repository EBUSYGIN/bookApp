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

    for (const card of this.parentState.list) {
      this.el.append(new Card(this.appState, card).render());
    }

    return this.el;
  }
}
