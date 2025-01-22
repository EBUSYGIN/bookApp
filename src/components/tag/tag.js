import { DivComponent } from '../../common/div';
import styles from './tag.css';

export class Tag extends DivComponent {
  constructor(tag) {
    super();
    this.tag = tag;
  }

  render() {
    this.el.classList.add(`${styles.tag}`);
    this.el.innerHTML = `${this.tag}`;

    return this.el;
  }
}
