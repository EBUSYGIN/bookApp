import './app.css';
import { ErrorView } from './views/error/error';
import { MainView } from './views/main/main';

class App {
  routes = [{ path: '', view: MainView }];

  appState = {
    favorites: []
  };

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentView) {
      //destroy all the app before rendering another view
      this.currentView.destroy();
    }

    const route = this.routes.find((route) => route.path === location.hash);

    if (!route) {
      this.currentView = new ErrorView();
      this.currentView.render();
      return;
    }

    const view = route.view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
