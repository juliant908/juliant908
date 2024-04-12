import {type TranslationKeys, ui, defaultLang, type Meta, type Hero, type About, type Experience, type Projects } from './ui';


export function getLangFromUrl(url: URL) {
 const [, lang] = url.pathname.split('/');
 if (lang in ui) return lang as keyof typeof ui;
 return defaultLang;
}


export class Translate {


 private lang;
 constructor(lang: string) {
  this.lang = lang
 }

 public getTranslations(){
  const lang = this.lang
  return ui[lang as keyof typeof ui] || ui[defaultLang]
 }

 public get<TranslationKey extends TranslationKeys>(key: TranslationKey): TranslationKey extends 'meta' ? Meta : TranslationKey extends 'hero' ? Hero : TranslationKey extends 'experience' ? Experience : TranslationKey extends 'about' ? About : TranslationKey extends 'projects' ? Projects : never {
  // @ts-ignore
  return this.getTranslations()[key]
 }
}
