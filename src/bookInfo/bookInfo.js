import { DivComponent } from '../common/div';
import { TagList } from '../components/tag-list/tag-list';

import styles from './bookInfo.css';

export class BookInfo extends DivComponent {
  constructor(appState, bookState) {
    super();
    this.appState = appState;
    this.bookState = bookState;
  }

  render() {
    this.el.setAttribute('id', 'book-info');
    this.el.classList.add(`${styles.book}`);

    if (this.bookState.hasLoaded === false) {
      return this.el;
    }

    const inFavorites = this.appState.favorites.find(
      (book) => book.key === this.bookState.key
    );

    this.el.innerHTML = `
      <div class='${styles.main}'>
        <img src='/static/images/not-found.png' alt='Обложка книги' class='${
          styles.cover
        }'/>
      
      <div class='${styles['book-info']}'>
        <div class='${styles.info}'>Автор: <span class='${styles.bold}'>${
      this.bookState.author ? this.bookState.author : 'Не задан'
    }</span></div>
            <div class='${styles.info}'>Категория: <span class='${
      styles.bold
    }'>${this.bookState.subjects[0] || 'Не задан'}</span></div>
          <div class='${styles.info}'>Год изменения: <span class='${
      styles.bold
    }'>${this.bookState.lastModified}</span></div>
          <button class='${styles.button}' id='add-to-favoretes'>${
      inFavorites ? 'Убрать из избранного' : 'В избранное'
    }</button>
      </div>
    </div>
    <div class='${styles.title}'>Описание: </div>
    <div class='${styles.text}'>${this.bookState.description}</div>
    <div class='${styles.tag}'>Теги:</div>
    `;

    this.el.append(new TagList(this.bookState.subjects.slice(0, 5)).render());

    this.el.querySelector('#add-to-favoretes').addEventListener('click', () => {
      if (inFavorites) {
        this.appState.favorites = this.appState.favorites.filter(
          (book) => book.key !== this.bookState.key
        );
      } else {
        this.appState.favorites.push(this.bookState);
      }
    });

    return this.el;
  }
}
