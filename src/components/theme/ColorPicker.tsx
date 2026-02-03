import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ThemeColors } from '@/types/theme';

interface ColorPickerProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}

const colorLabels: { key: keyof ThemeColors; label: string; description: string }[] = [
  { key: 'frame', label: 'Frame', description: 'Window border color' },
  { key: 'toolbar', label: 'Toolbar', description: 'Main toolbar background' },
  { key: 'tabBackground', label: 'Tab Background', description: 'Inactive tab color' },
  { key: 'tabText', label: 'Tab Text', description: 'Text on tabs' },
  { key: 'accentColor', label: 'Accent', description: 'Highlights and buttons' },
];

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Browser Colors</h3>
        <p className="text-sm text-muted-foreground">
          Customize your browser's color scheme
        </p>
      </div>

      <div className="grid gap-4">
        {colorLabels.map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
          >
            <div className="relative">
              <input
                type="color"
                value={colors[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <div
                className="absolute inset-0 rounded-lg ring-1 ring-border pointer-events-none"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            
            <div className="flex-1">
              <Label className="text-sm font-medium">{label}</Label>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            
            <Input
              type="text"
              value={colors[key].toUpperCase()}
              onChange={(e) => {
                const value = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                  handleColorChange(key, value);
                }
              }}
              className="w-24 h-8 text-xs font-mono uppercase bg-background"
              maxLength={7}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
