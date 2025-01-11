import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/search';
import { CardList } from '../../components/card-list/card-list';

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
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
    if (path === 'favorites') {
      this.renderHeader();
      this.renderCardList();
    }
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadBooks(
        this.state.searchQuery,
        this.state.offset
      );
      this.state.list = data.docs;
      this.state.numFound = data.numFound;
      this.state.loading = false;
    }

    if (path === 'loading' || path === 'list') this.renderCardList();
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
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  clearContainer(id) {
    const oldContainer = this.app.querySelector(`#${id}`);
    if (oldContainer) oldContainer.remove();
  }

  render() {
    this.app.innerHTML = '';
    this.renderHeader();
    this.renderSearch();
    this.renderCardList();
  }

  renderHeader() {
    this.clearContainer('header');
    this.app.prepend(new Header(this.appState).render());
  }

  renderSearch() {
    this.clearContainer('search');
    this.app.append(new Search(this.state).render());
  }

  renderCardList() {
    this.clearContainer('card-list');
    this.app.append(new CardList(this.appState, this.state).render());
  }
}
