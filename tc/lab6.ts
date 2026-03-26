//рекурсивный readonly
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

//выбирает из объекта T свойства типа U
export type PickedByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

//генерирует обработчики вида onEventName
export type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};