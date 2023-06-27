import { createContext } from 'react';

export const InputContext = createContext<
  string | number | boolean | Array<string>
>('');
