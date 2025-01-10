import { DivComponent } from '../../common/div';
import styles from './card.css';

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render() {
    this.el.setAttribute('id', 'card');
    this.el.classList.add(`${styles.card}`);
    this.el.innerHTML = `
      <div class='${styles.header}'>
        ${
          this.cardState.cover_edition_key
            ? `<img src='https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg' alt='Обложка книги' class='${styles.cover}'/>`
            : `<img src='/static/images/not-found.png' alt='Обложка книги' class='${styles.cover}'/>`
        }
        
      </div>
      <div class='${styles.info}'>
        <div class='${styles.tag}'>${
      this.cardState.subject
        ? this.cardState.subject.slice(0, 3).join(', ')
        : 'Не задан жанр'
    }</div>
        <div class='${styles.title}></div>
        <div class='${styles.author}'></div>
      <div />
    `;

    return this.el;
  }
}
