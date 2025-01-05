import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/search';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Поиск книг');
  }

  appStateHook(path) {
    console.log(path);
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.list = await this.loadBooks(
        this.state.searchQuery,
        this.state.offset
      );
    }
  }

  async loadBooks(q, offset) {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${q}&offset=${offset}`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'book-app (e.busygin2003@gmail.com)'
          }
        }
      );
      const data = await res.json();
      return data.docs;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    this.app.innerHTML = '';
    this.renderHeader();
    this.app.append(new Search(this.state).render());
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
