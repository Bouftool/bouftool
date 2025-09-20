import { DefaultWakfuI18n } from "../utils/constants";
import type { EnumWakfuLang, TWakfuI18n } from "../utils/types";

export class WakfuRecipeCategory {
  private id: number;
  private title: TWakfuI18n;

  constructor(data: { id: number; title?: TWakfuI18n }) {
    this.id = data.id;
    this.title = data.title ?? DefaultWakfuI18n;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(lang: EnumWakfuLang): string {
    return this.title[lang];
  }

  public toObject() {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
