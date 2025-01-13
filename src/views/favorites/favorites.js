import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { CardList } from '../../components/card-list/card-list';
import { CardListTitle } from '../../components/card-list-title/card-list-title';

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Избранные книги');
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  render() {
    this.app.innerHTML = '';
    this.renderHeader();
    this.renderCardList();
  }

  renderHeader() {
    this.clearContainer('header');
    this.app.prepend(new Header(this.appState).render());
  }

  renderCardList() {
    this.clearContainer('card-list');
    this.clearContainer('title');
    this.app.append(new CardListTitle(this.appState).render());
    this.app.append(
      new CardList(this.appState, { list: this.appState.favorites }).render()
    );
  }
}
