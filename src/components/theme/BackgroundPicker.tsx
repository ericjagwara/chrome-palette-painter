import { useState, useRef } from 'react';
import { Upload, Image, Palette, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BackgroundSettings } from '@/types/theme';
import { backgroundImages } from '@/data/presetThemes';
import { cn } from '@/lib/utils';

interface BackgroundPickerProps {
  background: BackgroundSettings;
  onChange: (background: BackgroundSettings) => void;
}

const positionOptions: { value: BackgroundSettings['position']; label: string }[] = [
  { value: 'fill', label: 'Fill' },
  { value: 'fit', label: 'Fit' },
  { value: 'center', label: 'Center' },
  { value: 'tile', label: 'Tile' },
];

export function BackgroundPicker({ background, onChange }: BackgroundPickerProps) {
  const [activeTab, setActiveTab] = useState<'solid' | 'image' | 'gradient'>(background.type);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSolidColorChange = (color: string) => {
    onChange({ type: 'solid', value: color, position: 'fill' });
  };

  const handleImageSelect = (imageUrl: string) => {
    onChange({ type: 'image', value: imageUrl, position: background.position });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onChange({ type: 'image', value: dataUrl, position: background.position });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePositionChange = (position: BackgroundSettings['position']) => {
    onChange({ ...background, position });
  };

  const tabs = [
    { id: 'solid' as const, label: 'Solid Color', icon: Palette },
    { id: 'image' as const, label: 'Image', icon: Image },
    { id: 'gradient' as const, label: 'Gradient', icon: Grid },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Background</h3>
        <p className="text-sm text-muted-foreground">
          Set your new tab background
        </p>
      </div>

      {/* Type Tabs */}
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all",
              activeTab === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Solid Color Tab */}
      {activeTab === 'solid' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
            <input
              type="color"
              value={background.type === 'solid' ? background.value : '#0a0a0f'}
              onChange={(e) => handleSolidColorChange(e.target.value)}
              className="w-16 h-16 rounded-lg cursor-pointer"
            />
            <div className="flex-1">
              <Label className="text-sm font-medium">Background Color</Label>
              <Input
                type="text"
                value={background.type === 'solid' ? background.value.toUpperCase() : '#0A0A0F'}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    handleSolidColorChange(value);
                  }
                }}
                className="mt-2 w-32 h-8 text-xs font-mono uppercase"
                maxLength={7}
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Tab */}
      {activeTab === 'image' && (
        <div className="space-y-4 animate-fade-in">
          {/* Upload Button */}
          <Button
            variant="outline"
            className="w-full h-20 border-dashed"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload your own image</span>
            </div>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Image Gallery */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Or choose from gallery</Label>
            <div className="grid grid-cols-3 gap-2">
              {backgroundImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => handleImageSelect(img.url)}
                  className={cn(
                    "aspect-video rounded-lg overflow-hidden ring-2 ring-offset-2 ring-offset-background transition-all hover:scale-105",
                    background.type === 'image' && background.value === img.url
                      ? "ring-primary"
                      : "ring-transparent hover:ring-muted-foreground/50"
                  )}
                >
                  <img
                    src={img.thumbnail}
                    alt={img.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Position Options */}
          {background.type === 'image' && (
            <div>
              <Label className="text-sm font-medium mb-3 block">Image Position</Label>
              <RadioGroup
                value={background.position}
                onValueChange={(value) => handlePositionChange(value as BackgroundSettings['position'])}
                className="flex gap-4"
              >
                {positionOptions.map(({ value, label }) => (
                  <div key={value} className="flex items-center gap-2">
                    <RadioGroupItem value={value} id={`pos-${value}`} />
                    <Label htmlFor={`pos-${value}`} className="text-sm cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      )}

      {/* Gradient Tab */}
      {activeTab === 'gradient' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
              { name: 'Ocean', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
              { name: 'Forest', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
              { name: 'Night', value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)' },
              { name: 'Aurora', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
              { name: 'Deep Space', value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
            ].map((gradient) => (
              <button
                key={gradient.name}
                onClick={() => onChange({ type: 'gradient', value: gradient.value, position: 'fill' })}
                className={cn(
                  "h-20 rounded-lg ring-2 ring-offset-2 ring-offset-background transition-all hover:scale-105",
                  background.type === 'gradient' && background.value === gradient.value
                    ? "ring-primary"
                    : "ring-transparent hover:ring-muted-foreground/50"
                )}
                style={{ background: gradient.value }}
              >
                <span className="text-xs font-medium text-white drop-shadow-lg">{gradient.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
