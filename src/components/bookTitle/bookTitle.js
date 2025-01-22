import { DivComponent } from '../../common/div';
import styles from './bookTitle.css';

export class BookTitle extends DivComponent {
  constructor(bookTitle) {
    super();
    this.bookTitle = bookTitle;
  }

  render() {
    this.el.setAttribute('id', 'body');
    this.el.classList.add(`${styles['title-box']}`);
    this.el.innerHTML = `
      <h1 class='${styles.title}'>${this.bookTitle}</h1>
    `;

    return this.el;
  }
}
