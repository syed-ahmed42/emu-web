import { createContext } from 'react';

export const RomContext = createContext({
    rom: null,
    setRom: () => {},
  });