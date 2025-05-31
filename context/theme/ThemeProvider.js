import React, { useState, useEffect, useCallback } from 'react';
import { Appearance } from 'react-native'; 
import ThemeContext from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function ThemeProvider({ children }) {

  const STORAGE_KEY = '@app_theme';
  // 1) Tenta detectar o esquema atual do sistema (iOS/Android)
  const colorScheme = Appearance.getColorScheme(); // 'light' ou 'dark' ou null
  // Se colorScheme for null defaulta para 'light'
  const initialScheme = colorScheme === 'dark' ? 'dark' : 'light';

  const [theme, setTheme] = useState(initialScheme);

  // Função que alterna entre 'light' e 'dark'
  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    try {
      //  Atualiza estado local
      setTheme(newTheme);
      // Grava no AsyncStorage para persistir
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Erro ao salvar tema no AsyncStorage:', error);
    }
  }, [theme]);

  const loadThemeFromStorage = useCallback(async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      } else {
        // Se não houver nada salvo, usamos o esquema do sistema
        setTheme(initialScheme);
      }
    } catch (error) {
      console.error('Erro ao ler tema do AsyncStorage:', error);
      // Em caso de erro, manter o valor que veio do sistema
      setTheme(initialScheme);
    }
  }, [initialScheme]);

  useEffect(() => {
    loadThemeFromStorage();
  }, [loadThemeFromStorage]);

  

  // (Opcional) Se quiser reagir a mudança do sistema em tempo real:
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      // Se o usuário **não** tiver fixado manualmente, podemos sincronizar com o sistema
      // Comente a próxima linha se não quiser que o sistema sobreponha a escolha do usuário
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
