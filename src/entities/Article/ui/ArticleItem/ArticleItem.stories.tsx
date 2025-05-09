/* eslint-disable max-len */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import storybookImage from './storybook.jpg';
import { ArticleItem } from './ArticleItem';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleType, ArticleBlockType } from '../../model/types/articleType';

export default {
  title: 'entities/ArticleItem',
  component: ArticleItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    mockData: [
      {
        url: 'https://testapi.ru/users/',
        method: 'GET',
        status: 200,
        response: [
          {
            id: '1',
            username: 'Roman',
            avatar: storybookImage,
          },
        ],
      },
    ],
  },
} as ComponentMeta<typeof ArticleItem>;

const Template: ComponentStory<typeof ArticleItem> = (args) => (
  <ArticleItem {...args} />
);

const article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'Roman',
    avatar: storybookImage,
  },
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '2',
      type: ArticleBlockType.CODE,
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
    },
    {
      id: '3',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '4',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '5',
      type: ArticleBlockType.CODE,
      code: "consts path = require('path');\n\nconsts server = jsonServer.create();\n\nconsts router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: '6',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '7',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '8',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
      ],
    },
  ],
} as Article;

// Стандартный дизайн (старый)
export const GridView = Template.bind({});
GridView.args = {
  article,
  view: ArticleView.GRID,
};
GridView.decorators = [StoreDecorator({})];

export const ColumnView = Template.bind({});
ColumnView.args = {
  article,
  view: ArticleView.COLUMN,
};
ColumnView.decorators = [StoreDecorator({})];

export const GridViewBlank = Template.bind({});
GridViewBlank.args = {
  article,
  view: ArticleView.GRID,
  blank: true,
};
GridViewBlank.decorators = [StoreDecorator({})];

export const ColumnViewBlank = Template.bind({});
ColumnViewBlank.args = {
  article,
  view: ArticleView.COLUMN,
  blank: true,
};
ColumnViewBlank.decorators = [StoreDecorator({})];

// Новый дизайн (редизайн)
export const GridViewRedesigned = Template.bind({});
GridViewRedesigned.args = {
  article,
  view: ArticleView.GRID,
};
GridViewRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ColumnViewRedesigned = Template.bind({});
ColumnViewRedesigned.args = {
  article,
  view: ArticleView.COLUMN,
};
ColumnViewRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridViewBlankRedesigned = Template.bind({});
GridViewBlankRedesigned.args = {
  article,
  view: ArticleView.GRID,
  blank: true,
};
GridViewBlankRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ColumnViewBlankRedesigned = Template.bind({});
ColumnViewBlankRedesigned.args = {
  article,
  view: ArticleView.COLUMN,
  blank: true,
};
ColumnViewBlankRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridViewInvertedOnHover = Template.bind({});
GridViewInvertedOnHover.args = {
  article,
  view: ArticleView.GRID,
  invertOnHover: true,
};
GridViewInvertedOnHover.decorators = [StoreDecorator({})];

export const GridViewInvertedOnHoverRedesigned = Template.bind({});
GridViewInvertedOnHoverRedesigned.args = {
  article,
  view: ArticleView.GRID,
  invertOnHover: true,
};
GridViewInvertedOnHoverRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
