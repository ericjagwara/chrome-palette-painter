import { Theme } from '@/types/theme';

export const presetThemes: Theme[] = [
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    isPreset: true,
    colors: {
      frame: '#121212',
      toolbar: '#1e1e1e',
      tabBackground: '#2d2d2d',
      tabText: '#ffffff',
      accentColor: '#bb86fc',
    },
    background: {
      type: 'solid',
      value: '#0d0d0d',
      position: 'fill',
    },
  },
  {
    id: 'light-mode',
    name: 'Light Mode',
    isPreset: true,
    colors: {
      frame: '#f5f5f5',
      toolbar: '#ffffff',
      tabBackground: '#e8e8e8',
      tabText: '#1a1a1a',
      accentColor: '#6200ee',
    },
    background: {
      type: 'solid',
      value: '#fafafa',
      position: 'fill',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    isPreset: true,
    colors: {
      frame: '#1b4332',
      toolbar: '#2d6a4f',
      tabBackground: '#40916c',
      tabText: '#d8f3dc',
      accentColor: '#95d5b2',
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #1b4332 0%, #081c15 100%)',
      position: 'fill',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    isPreset: true,
    colors: {
      frame: '#03045e',
      toolbar: '#023e8a',
      tabBackground: '#0077b6',
      tabText: '#caf0f8',
      accentColor: '#48cae4',
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #03045e 0%, #00b4d8 100%)',
      position: 'fill',
    },
  },
  {
    id: 'meadow',
    name: 'Meadow',
    isPreset: true,
    colors: {
      frame: '#606c38',
      toolbar: '#283618',
      tabBackground: '#4a5a28',
      tabText: '#fefae0',
      accentColor: '#dda15e',
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #606c38 0%, #283618 100%)',
      position: 'fill',
    },
  },
];

export const backgroundImages = [
  {
    id: 'mountains',
    name: 'Mountains',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=60',
  },
  {
    id: 'forest-mist',
    name: 'Forest Mist',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&q=60',
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=200&q=60',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&q=60',
  },
  {
    id: 'desert-dunes',
    name: 'Desert Dunes',
    url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&q=60',
  },
  {
    id: 'starry-night',
    name: 'Starry Night',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&q=60',
  },
];
