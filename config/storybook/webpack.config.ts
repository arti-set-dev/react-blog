import path from 'path';
import webpack, { DefinePlugin } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };
  config.resolve?.modules?.push(paths.src);
  config.resolve?.extensions?.push('.ts', '.tsx');
  config!.resolve!.alias = {
    ...config.resolve?.alias,
    '@': paths.src,
  };

  if (config.module) {
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules?.map((rule: any) => {
      if (rule.test && /svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    }) || [];
  }

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  config.module?.rules?.push(buildCssLoader(true));

  config.plugins?.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify('http://localhost:3000'),
    __PROJECT__: JSON.stringify('storybook'),
  }));

  return config;
};
