
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'he';

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
