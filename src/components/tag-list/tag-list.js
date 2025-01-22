import { DivComponent } from '../../common/div';
import { Tag } from '../tag/tag';
import styles from './tag-list.css';

export class TagList extends DivComponent {
  constructor(tags) {
    super();
    this.tags = tags;
  }

  render() {
    this.el.classList.add(`${styles['tag-list']}`);

    for (const tag of this.tags) {
      this.el.append(new Tag(tag).render());
    }

    return this.el;
  }
}
