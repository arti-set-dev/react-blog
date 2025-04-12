import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2020',
  userId: '1',
  type: ['IT'],
  blocks: [],
};

const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);

export const createArticle = (article?: Article) => cy
  .request({
    method: 'POST',
    url: 'http://localhost:5000/posts',
    headers: { Authorization: `Bearer ${token}` },
    body: article ?? defaultArticle,
  })
  .then((resp) => resp.body);

export const removeArticle = (articleId?: string) => cy.request({
  method: 'DELETE',
  url: `http://localhost:5000/posts/${articleId}`,
  headers: { Authorization: 'asasf' },
});

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId?: string): Chainable<void>;
    }
  }
}
