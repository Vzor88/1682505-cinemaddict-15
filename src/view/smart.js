import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._film = {};
  }

  updateElement(scrollDown) {
    const scrollY = this.getElement().scrollTop;
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    if(scrollDown) {
      this.getElement().scrollTop = scrollY;
    }

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
