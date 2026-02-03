import { useState, useEffect, useCallback } from 'react';
import { Theme, DEFAULT_COLORS, DEFAULT_BACKGROUND } from '@/types/theme';
import { presetThemes } from '@/data/presetThemes';

const STORAGE_KEY = 'chrome-theme-customizer';

interface StoredData {
  currentTheme: Theme;
  savedThemes: Theme[];
}

const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  colors: DEFAULT_COLORS,
  background: DEFAULT_BACKGROUND,
};

export function useThemeStorage() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [savedThemes, setSavedThemes] = useState<Theme[]>([]);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredData = JSON.parse(stored);
        setCurrentTheme(data.currentTheme || defaultTheme);
        setSavedThemes(data.savedThemes || []);
      }
    } catch (error) {
      console.error('Failed to load themes from storage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data: StoredData = { currentTheme, savedThemes };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save themes to storage:', error);
    }
  }, [currentTheme, savedThemes, isLoaded]);

  const applyTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    setPreviewTheme(null);
  }, []);

  const previewThemeTemporarily = useCallback((theme: Theme | null) => {
    setPreviewTheme(theme);
  }, []);

  const saveTheme = useCallback((theme: Theme) => {
    const newTheme: Theme = {
      ...theme,
      id: `custom-${Date.now()}`,
      isPreset: false,
      createdAt: Date.now(),
    };
    setSavedThemes(prev => [...prev, newTheme]);
    return newTheme;
  }, []);

  const deleteTheme = useCallback((themeId: string) => {
    setSavedThemes(prev => prev.filter(t => t.id !== themeId));
  }, []);

  const updateTheme = useCallback((themeId: string, updates: Partial<Theme>) => {
    setSavedThemes(prev =>
      prev.map(t => (t.id === themeId ? { ...t, ...updates } : t))
    );
  }, []);

  const exportThemes = useCallback(() => {
    const data = { savedThemes, currentTheme };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chrome-themes-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [savedThemes, currentTheme]);

  const importThemes = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.savedThemes) {
            setSavedThemes(prev => [...prev, ...data.savedThemes]);
          }
          resolve();
        } catch (error) {
          reject(new Error('Invalid theme file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  const activeTheme = previewTheme || currentTheme;

  return {
    currentTheme,
    savedThemes,
    previewTheme,
    activeTheme,
    presetThemes,
    isLoaded,
    applyTheme,
    previewThemeTemporarily,
    saveTheme,
    deleteTheme,
    updateTheme,
    exportThemes,
    importThemes,
    setCurrentTheme,
  };
}
