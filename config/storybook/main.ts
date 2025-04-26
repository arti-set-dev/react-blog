import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-mock',
    'storybook-addon-themes',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config: Configuration) => {
    const paths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      locales: '',
      buildLocales: '',
    };
    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts', '.tsx');
    config!.resolve!.alias = {
      ...config!.resolve!.alias,
      '@': paths.src,
    };

    // Удаляем стандартные обработчики изображений
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.filter((rule: RuleSetRule) => {
      if (rule.test instanceof RegExp) {
        return !rule.test.toString().includes('(ico|jpg|jpeg|png|gif|webp|avif)$');
      }
      return true;
    });

    // Удаляем стандартный обработчик SVG и добавляем свой
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });

    config!.module!.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      }],
    });

    // Используем собственный file-loader для изображений с четкими настройками
    config!.module!.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash:8][ext]',
      },
    });

    config!.module!.rules.push(buildCssLoader(true));

    // Добавляем настройку для отключения минимизации изображений
    if (config!.optimization) {
      config!.optimization.minimizer = [];
    }

    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );
    // Return the altered config
    return config;
  },
};
