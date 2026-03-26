import { test } from 'vitest';
import { expectTypeOf } from 'expect-type'; 
import { DeepReadonly, PickedByType, EventHandlers } from '../tc/lab6';


test('DeepReadonly: should handle deep nesting and arrays', () => {
  type Complex = {
    user: {
      profile: { name: string };
      tags: string[];
    };
  };

  type Expected = {
    readonly user: {
      readonly profile: { readonly name: string };
      readonly tags: readonly string[]; // Массивы тоже должны стать readonly
    };
  };

  expectTypeOf<DeepReadonly<Complex>>().toEqualTypeOf<Expected>();
});