import { AbstractView } from '../../common/view';
import './error.css';

export class ErrorView extends AbstractView {
  constructor() {
    super();
  }

  render() {
    this.app.innerHTML = `
    <h1>404 Error Page</h1>
    <section class="error-container">
      <span class="four"><span class="screen-reader-text">4</span></span>
      <span class="zero"><span class="screen-reader-text">0</span></span>
      <span class="four"><span class="screen-reader-text">4</span></span>
    </section>
    <div class="link-container">
      <a href='/#' class="more-link">Visit the original</a>
  </div>
`;
  }
}
