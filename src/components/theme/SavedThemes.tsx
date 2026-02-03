import { useState } from 'react';
import { Trash2, Download, Upload, Plus, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Theme } from '@/types/theme';
import { cn } from '@/lib/utils';

interface SavedThemesProps {
  savedThemes: Theme[];
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
  onDelete: (themeId: string) => void;
  onSave: (theme: Theme) => void;
  onUpdate: (themeId: string, updates: Partial<Theme>) => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function SavedThemes({
  savedThemes,
  currentTheme,
  onSelect,
  onDelete,
  onSave,
  onUpdate,
  onExport,
  onImport,
}: SavedThemesProps) {
  const [savingName, setSavingName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleSave = () => {
    if (savingName.trim()) {
      onSave({ ...currentTheme, name: savingName.trim() });
      setSavingName('');
      setIsSaving(false);
    }
  };

  const handleStartEdit = (theme: Theme) => {
    setEditingId(theme.id);
    setEditingName(theme.name);
  };

  const handleSaveEdit = (themeId: string) => {
    if (editingName.trim()) {
      onUpdate(themeId, { name: editingName.trim() });
    }
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">My Themes</h3>
        <p className="text-sm text-muted-foreground">
          Your saved custom themes
        </p>
      </div>

      {/* Save Current Theme */}
      {isSaving ? (
        <div className="flex gap-2">
          <Input
            placeholder="Theme name..."
            value={savingName}
            onChange={(e) => setSavingName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            className="flex-1"
          />
          <Button size="icon" onClick={handleSave} disabled={!savingName.trim()}>
            <Check className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsSaving(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setIsSaving(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Save Current Theme
        </Button>
      )}

      {/* Saved Themes List */}
      <div className="space-y-2">
        {savedThemes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No saved themes yet</p>
            <p className="text-xs mt-1">Click "Save Current Theme" to save your customization</p>
          </div>
        ) : (
          savedThemes.map((theme) => (
            <div
              key={theme.id}
              className={cn(
                "group flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                currentTheme.id === theme.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              )}
              onClick={() => onSelect(theme)}
            >
              {/* Color Swatches */}
              <div className="flex -space-x-1">
                {Object.values(theme.colors).slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full ring-2 ring-background"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                {editingId === theme.id ? (
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(theme.id)}
                      className="h-7 text-sm"
                      autoFocus
                    />
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleSaveEdit(theme.id)}>
                      <Check className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <span className="font-medium text-sm truncate block">{theme.name}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(theme);
                  }}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(theme.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Import/Export */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onExport}
          disabled={savedThemes.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) onImport(file);
            };
            input.click();
          }}
        >
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
      </div>
    </div>
  );
}
