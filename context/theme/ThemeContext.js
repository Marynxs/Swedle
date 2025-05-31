import React, { createContext } from 'react';

/**
 * Estrutura do objeto de contexto:
 * {
 *   theme: 'light' | 'dark',
 *   toggleTheme: () => void
 * }
 *
 * O valor padrão aqui (defaultValue) só será usado
 * caso algum componente consuma sem ter o Provider.
 */
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export default ThemeContext;