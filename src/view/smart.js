import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._film = {};
  }

  updateElement(scrollDown) {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    if(scrollDown){
      this.getElement().scrollTop = this.getElement().scrollHeight;
    }

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
