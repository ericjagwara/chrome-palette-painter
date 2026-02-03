import { Theme } from '@/types/theme';

interface ThemePreviewProps {
  theme: Theme;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const { colors, background } = theme;

  const getBackgroundStyle = () => {
    switch (background.type) {
      case 'image':
        return {
          backgroundImage: `url(${background.value})`,
          backgroundSize: background.position === 'tile' ? 'auto' : 
                         background.position === 'fit' ? 'contain' : 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: background.position === 'tile' ? 'repeat' : 'no-repeat',
        };
      case 'gradient':
        return { background: background.value };
      case 'solid':
      default:
        return { backgroundColor: background.value };
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-border">
      {/* Browser Chrome */}
      <div 
        className="h-8 flex items-center px-3 gap-1.5"
        style={{ backgroundColor: colors.frame }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
      </div>

      {/* Tab Bar */}
      <div 
        className="h-10 flex items-end px-2 gap-1"
        style={{ backgroundColor: colors.toolbar }}
      >
        {/* Active Tab */}
        <div
          className="px-4 py-2 rounded-t-lg text-xs font-medium flex items-center gap-2"
          style={{ 
            backgroundColor: colors.tabBackground,
            color: colors.tabText,
          }}
        >
          <div 
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: colors.accentColor }}
          />
          New Tab
        </div>
        {/* Inactive Tab */}
        <div
          className="px-4 py-2 rounded-t-lg text-xs font-medium opacity-60 flex items-center gap-2"
          style={{ 
            backgroundColor: colors.toolbar,
            color: colors.tabText,
          }}
        >
          <div className="w-3 h-3 rounded-sm bg-gray-500/50" />
          Tab 2
        </div>
        {/* New Tab Button */}
        <div
          className="w-6 h-6 flex items-center justify-center rounded opacity-50 hover:opacity-100 transition-opacity mb-1"
          style={{ color: colors.tabText }}
        >
          <span className="text-lg leading-none">+</span>
        </div>
      </div>

      {/* Address Bar */}
      <div 
        className="h-10 flex items-center px-3 gap-2"
        style={{ backgroundColor: colors.toolbar }}
      >
        <div className="flex gap-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center opacity-50" style={{ color: colors.tabText }}>
            ←
          </div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center opacity-50" style={{ color: colors.tabText }}>
            →
          </div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center opacity-50" style={{ color: colors.tabText }}>
            ↻
          </div>
        </div>
        <div 
          className="flex-1 h-7 rounded-full px-3 flex items-center text-xs"
          style={{ 
            backgroundColor: `${colors.tabBackground}80`,
            color: colors.tabText,
          }}
        >
          <span className="opacity-60">chrome://newtab</span>
        </div>
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: colors.accentColor,
            color: '#fff',
          }}
        >
          <span className="text-xs font-bold">G</span>
        </div>
      </div>

      {/* New Tab Page Content */}
      <div 
        className="h-48 flex flex-col items-center justify-center"
        style={getBackgroundStyle()}
      >
        {/* Search Bar */}
        <div 
          className="w-3/4 max-w-md h-10 rounded-full shadow-lg flex items-center px-4 gap-3"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.95)',
          }}
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm text-gray-400">Search Google or type a URL</span>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
            >
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: colors.accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
