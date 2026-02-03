import { Check } from 'lucide-react';
import { Theme } from '@/types/theme';
import { presetThemes } from '@/data/presetThemes';
import { cn } from '@/lib/utils';

interface TemplateGalleryProps {
  currentThemeId: string;
  onSelect: (theme: Theme) => void;
  onPreview: (theme: Theme | null) => void;
}

export function TemplateGallery({ currentThemeId, onSelect, onPreview }: TemplateGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Theme Templates</h3>
        <p className="text-sm text-muted-foreground">
          One-click beautiful themes
        </p>
      </div>

      <div className="grid gap-3">
        {presetThemes.map((theme) => {
          const isActive = currentThemeId === theme.id;
          
          return (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              onMouseEnter={() => onPreview(theme)}
              onMouseLeave={() => onPreview(null)}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all text-left hover:scale-[1.02]",
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              )}
            >
              {isActive && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <div className="flex items-center gap-4">
                {/* Color Preview */}
                <div className="flex -space-x-1">
                  {Object.values(theme.colors).slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full ring-2 ring-background"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Theme Info */}
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{theme.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {theme.background.type === 'gradient' ? 'Gradient background' : 
                     theme.background.type === 'image' ? 'Image background' : 'Solid background'}
                  </p>
                </div>
              </div>

              {/* Mini Preview */}
              <div
                className="mt-3 h-12 rounded-lg overflow-hidden"
                style={{
                  background: theme.background.type === 'gradient' 
                    ? theme.background.value 
                    : theme.background.value,
                }}
              >
                <div
                  className="h-3 flex items-center px-2 gap-1"
                  style={{ backgroundColor: theme.colors.toolbar }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-70" />
                </div>
                <div
                  className="h-2"
                  style={{ backgroundColor: theme.colors.tabBackground }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
