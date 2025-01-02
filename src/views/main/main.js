import { AbstractView } from '../../common/view';
import onChange from 'on-change';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0
  };

  constructor(appState) {
    super();
    this.setTitle('Поиск книг');
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  appStateHook(path, state, newState) {
    console.log(path);
    console.log(state);
    console.log(newState);
  }

  render() {
    this.app.innerHTML = '';
    const main = document.createElement('div');
    main.innerHTML = `Число книг: ${this.appState.favorites.length}`;
    this.app.append(main);
    this.appState.favorites.push('');
  }
}
