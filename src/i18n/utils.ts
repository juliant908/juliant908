import { type TranslationKeys, type TranslationType, ui, defaultLang } from './ui';


export function getLangFromUrl(url: URL) {
 const [, lang] = url.pathname.split('/');
 if (lang in ui) return lang as keyof typeof ui;
 return defaultLang;
}


export class Translate {
 private lang: keyof typeof ui

 constructor(lang: string) {
  this.lang = lang in ui ? lang as keyof typeof ui : defaultLang;
 }

 public getTranslations() {
  return ui[this.lang]
 }

 public get<TranslationKey extends TranslationKeys>(key: TranslationKey): TranslationType<TranslationKey> {
  const translation = this.getTranslations()[key];
  if (!translation) {
   throw new Error(`Translation for key "${key}" not found.`);
  }
  return translation as TranslationType<TranslationKey>;
 }
}
