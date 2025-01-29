import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('@/**/*.ts');
project.addSourceFilesAtPaths('@/**/*.tsx');

const files = project.getSourceFiles();
const uiPaths = path.resolve(__dirname, '..', '..', '@', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPaths);
const componentDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];

  return layers.some((layer) => value.startsWith(layer));
}

componentDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`;
  const indexFile = directory.getSourceFile(indexFilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()};'`;
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });

    file.save();
  }
});

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    const segments = valueWithoutAlias.split('/');

    const isSharedLayer = segments?.[0] === 'shared';
    const isUiSlice = segments?.[1] === 'ui';

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

project.save();
