import { DivComponent } from '../../common/div';
import styles from './card.css';

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #removeFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (book) => book.key !== this.cardState.key
    );
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
  }

  render() {
    this.el.setAttribute('id', 'card');
    this.el.classList.add(`${styles.card}`);

    const inFavorites = this.appState.favorites.find(
      (book) => book.key === this.cardState.key
    );
    const title = this.cardState.title || 'Название не задано';
    const author = this.cardState.author_name || 'Автор не задан';
    const key = this.cardState.key.substring(7);

    this.el.innerHTML = `<a href='#/book/${key}'>
      <div class='${styles.header}'>
         
        ${
          this.cardState.cover_edition_key
            ? `<img src='https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg' alt='Обложка книги' class='${styles.cover}'/>`
            : `<img src='/static/images/not-found.png' alt='Обложка книги' class='${styles.cover}'/>`
        }
        
      </div></a>
      <div class='${styles.info}'>
          <a href='#/book/${key}}'>
        <div class='${styles.tag}'>${
      this.cardState.subject
        ? this.cardState.subject.slice(0, 3).join(', ')
        : 'Не задан жанр'
    }
        </div>
        <div class='${styles.title}'>
          ${title}
        </div>
        <div class='${styles.author}'>
          ${author}
        </div>
        </a>     
        <button class='${styles.button} ${
      inFavorites ? `${styles.favorite}` : ''
    }'>
          ${
            inFavorites
              ? `<img src="/static/images/icons/favorites.svg" />`
              : `<img src="/static/images/icons/favorite-white.svg" />`
          }
        </button>
      </div>
    
    `;

    if (inFavorites) {
      this.el.querySelector('button').addEventListener('click', (e) => {
        this.#removeFromFavorites();
        e.stopPropagation();
      });
    } else {
      this.el.querySelector('button').addEventListener('click', (e) => {
        this.#addToFavorites();
        e.stopPropagation();
      });
    }

    return this.el;
  }
}
