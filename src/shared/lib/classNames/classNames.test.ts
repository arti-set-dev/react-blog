import { classNames } from "./classNames"

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional class', () => {
        const expacted = 'someClass class1 class2';
        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expacted);
    });

    test('with mods', () => {
        const expacted = 'someClass class1 class2 hovered focused';
        expect(classNames('someClass', {hovered: true, focused: true}, ['class1', 'class2'])).toBe(expacted);
    });

    test('with mods false', () => {
        const expacted = 'someClass class1 class2 hovered';
        expect(classNames('someClass', {hovered: true, focused: false}, ['class1', 'class2'])).toBe(expacted);
    });

    test('with mods false', () => {
        const expacted = 'someClass class1 class2 hovered';
        expect(classNames('someClass', {hovered: true, focused: undefined}, ['class1', 'class2'])).toBe(expacted);
    });
})