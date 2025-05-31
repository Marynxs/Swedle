import { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // Defina aqui as cores/paletas que seu app usa
  const colors = {
    background: isDark ? '#232323' : '#ffffff',
    cardBackground: isDark ? '#1e1e1e' : '#f9f9f9',
    foreground: isDark ? '#ffffff' : '#323232',
    placeholder: isDark ? '#b0b0b0' : '#838383',
    tabBarIconActive: isDark ? '#ffffff' : '#323232',
    tabBarIconInactive: isDark ? '#7a7a7a' : '#A6A6A6',
    clientContainer: isDark ? '#393939' : '#E7E7E7',
    yellowTextDark: isDark ? '#F0BC20' : '#838383',
    buttonPlus: isDark ? '#000' : '#ffffff',
    profilePicker: isDark ? '#bdbdbd' : '#000',
    menuButton: isDark ? '#454545': '#fff',
    redirectText: isDark ? '#fff' : '#000'
  };

  return { theme, isDark, colors, toggleTheme };
}