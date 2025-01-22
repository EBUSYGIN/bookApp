import { DivComponent } from '../../common/div';

import styles from './header.css';

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add(`${styles.header}`);
    this.el.setAttribute('id', 'header');
    this.el.innerHTML = `
      <div>
        <img src='/static/images/logo.svg' alt='логотип' />
      </div>
      <div class=${styles.menu}>
        <a class='${styles.menu__item1}' href='#'>
          <img src='/static/images/icons/search.svg' alt='Поиск' />
          Поиск книг
        </a>
        <a class='${styles.menu__item2}' href='#/favorites'>
          <img src='/static/images/icons/favorites.svg' alt='Избранное' />
           Избранное
        </a>
        <div class='${styles.menu__counter}'>${this.appState.favorites.length}</div>
      </div>
    `;
    return this.el;
  }
}
