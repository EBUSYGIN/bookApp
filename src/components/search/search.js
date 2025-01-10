import { DivComponent } from '../../common/div';
import styles from './search.css';

export class Search extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  search() {
    const value = this.el.querySelector('input').value;
    this.appState.searchQuery = value;
  }

  render() {
    this.el.setAttribute('id', 'search');
    this.el.classList.add(`${styles.search}`);
    this.el.setAttribute('id', '');
    this.el.innerHTML = `
      <div class='${styles.wrapper}'>
        <img src='/static/images/icons/search.svg' alt='Поиск' class='${
          styles.icon
        }'/>
        <input type='text' placeholder='${
          this.appState.searchQuery
            ? this.appState.searchQuery
            : 'Найти книгу или автора....'
        }'
        class='${styles.input}'/>
      </div>
      
      <button class='${styles.button}'>
        <img src='/static/images/icons/search-white.svg' alt='Иконка поиска' />
      </button>
    `;

    this.el.querySelector('button').addEventListener('click', () => {
      this.search();
    });

    this.el.querySelector('input').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.search();
      }
    });

    return this.el;
  }
}
