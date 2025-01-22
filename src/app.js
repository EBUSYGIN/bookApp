import { ErrorView } from './views/error/error';
import { FavoritesView } from './views/favorites/favorites';
import { MainView } from './views/main/main';
import { BookView } from './views/book/Book';
import Navigo from 'navigo';

class App {
  appState = {
    favorites: []
  };

  constructor() {
    this.router = new Navigo('/', { hash: true });
    this.setRoutes();
    this.router.resolve();
  }

  setRoutes() {
    this.router.on('/', () => {
      this.route(MainView);
    });

    this.router.on('/favorites', () => {
      this.route(FavoritesView);
    });

    this.router.on('/book/:id', (match) => {
      this.route(BookView, match.data.id);
    });

    this.router.notFound(() => {
      this.route(ErrorView);
    });
  }

  route(View, params = {}) {
    if (this.currentView) {
      //destroy all the app before rendering another view
      this.currentView.destroy();
    }

    this.currentView = new View(this.appState, params);
    this.currentView.render();
  }
}

new App();
