import { ScrollSaveActions, ScrollSaveReducer } from './ScrollSaveSlice';
import { ScrollSaveSchema } from '../types/ScrollSaveSchema';

describe('ScrollSaveSlice', () => {
  test('setScrollPosition для нового пути', () => {
    const state: DeepPartial<ScrollSaveSchema> = {
      scroll: {},
    };

    expect(
      ScrollSaveReducer(
        state as ScrollSaveSchema,
        ScrollSaveActions.setScrollPosition({
          path: '/articles',
          position: 500,
        }),
      ),
    ).toEqual({
      scroll: {
        '/articles': 500,
      },
    });
  });

  test('setScrollPosition для существующего пути (обновление позиции)', () => {
    const state: DeepPartial<ScrollSaveSchema> = {
      scroll: {
        '/articles': 100,
        '/profile': 200,
      },
    };

    expect(
      ScrollSaveReducer(
        state as ScrollSaveSchema,
        ScrollSaveActions.setScrollPosition({
          path: '/articles',
          position: 300,
        }),
      ),
    ).toEqual({
      scroll: {
        '/articles': 300,
        '/profile': 200,
      },
    });
  });

  test('setScrollPosition для нового пути с существующими данными', () => {
    const state: DeepPartial<ScrollSaveSchema> = {
      scroll: {
        '/articles': 100,
        '/profile': 200,
      },
    };

    expect(
      ScrollSaveReducer(
        state as ScrollSaveSchema,
        ScrollSaveActions.setScrollPosition({
          path: '/main',
          position: 150,
        }),
      ),
    ).toEqual({
      scroll: {
        '/articles': 100,
        '/profile': 200,
        '/main': 150,
      },
    });
  });

  test('setScrollPosition с нулевой позицией', () => {
    const state: DeepPartial<ScrollSaveSchema> = {
      scroll: {
        '/articles': 100,
      },
    };

    expect(
      ScrollSaveReducer(
        state as ScrollSaveSchema,
        ScrollSaveActions.setScrollPosition({
          path: '/articles',
          position: 0,
        }),
      ),
    ).toEqual({
      scroll: {
        '/articles': 0,
      },
    });
  });

  test('setScrollPosition с отрицательной позицией (валидация не требуется по спецификации)', () => {
    const state: DeepPartial<ScrollSaveSchema> = {
      scroll: {},
    };

    expect(
      ScrollSaveReducer(
        state as ScrollSaveSchema,
        ScrollSaveActions.setScrollPosition({
          path: '/articles',
          position: -50,
        }),
      ),
    ).toEqual({
      scroll: {
        '/articles': -50,
      },
    });
  });
});
