import { Project, SyntaxKind, Node } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

if (!removedFeatureName) {
  throw new Error('Indicate the name of a feature-flag');
}

if (!featureState) {
  throw new Error('Indicate the condition of the feature (on or off)');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Incorrect state of features (on or off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFeature = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier)
      && child.getText() === 'toggleFeatures'
    ) {
      isToggleFeature = true;
    }
  });

  return isToggleFeature;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
      );

      if (!objectOptions) return;

      const offFunctionProperty = objectOptions.getProperty('off');
      const onFunctionProperty = objectOptions.getProperty('on');

      const featureNameProperty = objectOptions.getProperty('name');

      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

      if (featureName !== removedFeatureName) return;

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
