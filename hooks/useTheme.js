import { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#232323' : '#ffffff',          // Cor de fundo principal
    cardBackground: isDark ? '#1e1e1e' : '#f9f9f9',       // Fundo de cards/containers
    foreground: isDark ? '#ffffff' : '#323232',          // Cor do texto e objetos principal
    placeholder: isDark ? '#b0b0b0' : '#838383',          // Cor do placeholder dos inputs
    tabBarIconActive: isDark ? '#ffffff' : '#323232',    // Ícone da tab ativa
    tabBarIconInactive: isDark ? '#7a7a7a' : '#A6A6A6',   // Ícone da tab inativa
    clientContainer: isDark ? '#393939' : '#E7E7E7',      // Fundo do container de cliente
    yellowTextDark: isDark ? '#F0BC20' : '#838383',       // Texto amarelo visível no modo escuro
    buttonPlus: isDark ? '#000' : '#ffffff',              // Cor do botão de adicionar
    profilePicker: isDark ? '#bdbdbd' : '#000',           // Cor do seletor de imagem de perfil
    menuButton: isDark ? '#454545' : '#fff',              // Cor do botão de menu
    redirectText: isDark ? '#fff' : '#000'                // Texto de redirecionamento
  };

  return { theme, isDark, colors, toggleTheme };
}