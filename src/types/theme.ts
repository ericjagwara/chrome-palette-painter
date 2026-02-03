export interface ThemeColors {
  frame: string;
  toolbar: string;
  tabBackground: string;
  tabText: string;
  accentColor: string;
}

export interface BackgroundSettings {
  type: 'solid' | 'image' | 'gradient';
  value: string; // hex color, image URL, or gradient CSS
  position: 'fill' | 'fit' | 'center' | 'tile';
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  background: BackgroundSettings;
  isPreset?: boolean;
  createdAt?: number;
}

export interface ThemeState {
  currentTheme: Theme;
  savedThemes: Theme[];
  previewMode: boolean;
}

export const DEFAULT_COLORS: ThemeColors = {
  frame: '#1a1a2e',
  toolbar: '#16213e',
  tabBackground: '#0f3460',
  tabText: '#e8e8e8',
  accentColor: '#e94560',
};

export const DEFAULT_BACKGROUND: BackgroundSettings = {
  type: 'solid',
  value: '#0a0a0f',
  position: 'fill',
};
