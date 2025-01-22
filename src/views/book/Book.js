import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { BookTitle } from '../../components/bookTitle/bookTitle';
import { BookInfo } from '../../bookInfo/bookInfo';

export class BookView extends AbstractView {
  bookState = {
    hasLoaded: false,
    title: '',
    description: '',
    subjects: [],
    lastModified: new Date().getFullYear(),
    cover: null,
    authorKey: null,
    key: null
  };

  constructor(appState, bookId) {
    super();
    this.setTitle('Книга');
    this.appState = appState;
    this.appState = onChange(this.appState, this.#appStateHook.bind(this));
    this.bookState = onChange(this.bookState, this.#stateHook.bind(this));
    this.#loadBook(bookId);
  }

  async #loadBook(bookId) {
    try {
      const bookData = await fetch(
        `https://openlibrary.org/works/${bookId}.json`
      );
      const book = await bookData.json();
      this.bookState.title = book?.title ?? '';
      this.bookState.subjects = book?.subjects ?? [];
      this.bookState.description = book?.description ?? '';
      this.bookState.cover = book?.covers[0] ?? [];
      this.bookState.lastModified = new Date(
        book?.last_modified.value
      ).getFullYear();
      this.bookState.authorKey = book?.authors[0].author.key;
      this.bookState.key = book?.key;
      this.bookState.hasLoaded = true;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async #loadAuthor(authorKey) {
    try {
      const res = await fetch(`https://openlibrary.org${authorKey}.json`);
      const data = await res.json();
      this.bookState.author = data.name;
    } catch (e) {
      console.log(e);
    }
  }

  #appStateHook(path) {
    if (path === 'favorites') this.render();
  }

  async #stateHook(path) {
    if (path === 'hasLoaded' || path === 'author') this.renderBody();

    if (path === 'authorKey') this.#loadAuthor(this.bookState.authorKey);
  }

  render() {
    this.app.innerHTML = '';
    this.renderHeader();
    this.renderBody();
  }

  renderHeader() {
    this.clearContainer('header');
    this.app.prepend(new Header(this.appState).render());
  }

  renderBody() {
    this.clearContainer('body');
    this.clearContainer('book-info');
    this.app.append(new BookTitle(this.bookState.title).render());
    this.app.append(new BookInfo(this.appState, this.bookState).render());
  }
}
