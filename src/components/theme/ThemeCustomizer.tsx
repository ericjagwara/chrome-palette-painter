import { useState } from 'react';
import { Palette, Image, Layout, Bookmark, Check, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useThemeStorage } from '@/hooks/useThemeStorage';
import { ColorPicker } from './ColorPicker';
import { BackgroundPicker } from './BackgroundPicker';
import { TemplateGallery } from './TemplateGallery';
import { SavedThemes } from './SavedThemes';
import { ThemePreview } from './ThemePreview';
import { Theme, ThemeColors, BackgroundSettings, DEFAULT_COLORS, DEFAULT_BACKGROUND } from '@/types/theme';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type TabId = 'colors' | 'background' | 'templates' | 'saved';

const tabs: { id: TabId; label: string; icon: typeof Palette }[] = [
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'background', label: 'Background', icon: Image },
  { id: 'templates', label: 'Templates', icon: Layout },
  { id: 'saved', label: 'My Themes', icon: Bookmark },
];

export function ThemeCustomizer() {
  const [activeTab, setActiveTab] = useState<TabId>('colors');
  const [showPreview, setShowPreview] = useState(true);
  const [workingTheme, setWorkingTheme] = useState<Theme | null>(null);
  
  const {
    currentTheme,
    savedThemes,
    activeTheme,
    presetThemes,
    applyTheme,
    previewThemeTemporarily,
    saveTheme,
    deleteTheme,
    updateTheme,
    exportThemes,
    importThemes,
    setCurrentTheme,
  } = useThemeStorage();

  // Initialize working theme from current theme
  const effectiveWorkingTheme = workingTheme || currentTheme;

  const handleColorsChange = (colors: ThemeColors) => {
    const updated = { ...effectiveWorkingTheme, colors };
    setWorkingTheme(updated);
    previewThemeTemporarily(updated);
  };

  const handleBackgroundChange = (background: BackgroundSettings) => {
    const updated = { ...effectiveWorkingTheme, background };
    setWorkingTheme(updated);
    previewThemeTemporarily(updated);
  };

  const handleApplyTheme = () => {
    if (workingTheme) {
      applyTheme(workingTheme);
      setWorkingTheme(null);
      toast.success('Theme applied!');
    }
  };

  const handleResetTheme = () => {
    const defaultTheme: Theme = {
      id: 'default',
      name: 'Default',
      colors: DEFAULT_COLORS,
      background: DEFAULT_BACKGROUND,
    };
    setWorkingTheme(defaultTheme);
    previewThemeTemporarily(defaultTheme);
    toast.info('Theme reset to default');
  };

  const handleSelectPreset = (theme: Theme) => {
    setWorkingTheme(theme);
    previewThemeTemporarily(null);
    applyTheme(theme);
    toast.success(`Applied "${theme.name}" theme`);
  };

  const handleSelectSaved = (theme: Theme) => {
    setWorkingTheme(theme);
    previewThemeTemporarily(null);
    applyTheme(theme);
    toast.success(`Applied "${theme.name}" theme`);
  };

  const handleSaveTheme = (theme: Theme) => {
    saveTheme(theme);
    toast.success('Theme saved!');
  };

  const handleDeleteTheme = (themeId: string) => {
    deleteTheme(themeId);
    toast.success('Theme deleted');
  };

  const handleImportThemes = async (file: File) => {
    try {
      await importThemes(file);
      toast.success('Themes imported successfully!');
    } catch (error) {
      toast.error('Failed to import themes');
    }
  };

  const displayTheme = workingTheme || activeTheme;
  const hasChanges = workingTheme !== null;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Chrome Theme Customizer</h1>
            <p className="text-xs text-muted-foreground">Make it yours</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="text-muted-foreground"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all",
                activeTab === id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              title={label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Settings Panel */}
          <div className="flex-1 lg:w-80 lg:min-w-[320px] lg:max-w-md border-r border-border">
            <ScrollArea className="h-full">
              <div className="p-4">
                {activeTab === 'colors' && (
                  <ColorPicker
                    colors={effectiveWorkingTheme.colors}
                    onChange={handleColorsChange}
                  />
                )}
                {activeTab === 'background' && (
                  <BackgroundPicker
                    background={effectiveWorkingTheme.background}
                    onChange={handleBackgroundChange}
                  />
                )}
                {activeTab === 'templates' && (
                  <TemplateGallery
                    currentThemeId={currentTheme.id}
                    onSelect={handleSelectPreset}
                    onPreview={previewThemeTemporarily}
                  />
                )}
                {activeTab === 'saved' && (
                  <SavedThemes
                    savedThemes={savedThemes}
                    currentTheme={effectiveWorkingTheme}
                    onSelect={handleSelectSaved}
                    onDelete={handleDeleteTheme}
                    onSave={handleSaveTheme}
                    onUpdate={updateTheme}
                    onExport={exportThemes}
                    onImport={handleImportThemes}
                  />
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="flex-1 bg-muted/30 p-4 lg:p-8 flex flex-col">
              <div className="text-center mb-4">
                <h2 className="text-sm font-medium text-foreground">Live Preview</h2>
                <p className="text-xs text-muted-foreground">
                  {hasChanges ? 'Preview of your changes' : 'Current theme'}
                </p>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                  <ThemePreview theme={displayTheme} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetTheme}
          className="text-muted-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-xs text-muted-foreground mr-2">
              Unsaved changes
            </span>
          )}
          <Button
            size="sm"
            onClick={handleApplyTheme}
            disabled={!hasChanges}
            className="bg-primary hover:bg-primary/90"
          >
            <Check className="w-4 h-4 mr-2" />
            Apply Theme
          </Button>
        </div>
      </footer>
    </div>
  );
}
