import AbstractView from '../abstract.js';
import {createFilmsTemplate, createFilmsListExtraTemplate, createFilmsTopCommentedTemplate} from './film-containers-tpl.js';
import {createElement} from '../../utils/render.js';

export default class FilmContainers extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }

  getTemplateFilmsListExtra(films) {
    return createElement(createFilmsListExtraTemplate(films));
  }

  getTemplateFilmsTopCommented(films) {
    return createElement(createFilmsTopCommentedTemplate(films));
  }
}
