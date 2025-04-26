// Декларация типа Object.hasOwn
interface ObjectConstructor {
  hasOwn(o: object, v: PropertyKey): boolean;
}

// Полифилл для Object.hasOwn
if (!Object.hasOwn) {
  Object.hasOwn = function (obj: object, prop: PropertyKey): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}

// Делаем файл модулем
export {};
