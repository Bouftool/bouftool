import { EnumWakfuLang, type TWakfuI18n } from "../utils/types";
import type { EnumWakfuEquipmentPosition, EnumWakfuItemType, TWakfuItemType } from "./types";

export class WakfuItemType {
  private id: EnumWakfuItemType;
  private parentId: EnumWakfuItemType | null;
  private equipmentPositions: EnumWakfuEquipmentPosition[];
  private equipmentDisabledPositions: EnumWakfuEquipmentPosition[];
  private title: TWakfuI18n;

  constructor(itemType: TWakfuItemType) {
    this.id = itemType.id;
    this.parentId = itemType.parentId ?? null;
    this.equipmentPositions = itemType.equipmentPositions;
    this.equipmentDisabledPositions = itemType.equipmentDisabledPositions;
    this.title = itemType.title ?? {
      [EnumWakfuLang.French]: "Undefined",
      [EnumWakfuLang.English]: "Undefined",
      [EnumWakfuLang.Spanish]: "Undefined",
      [EnumWakfuLang.Portuguese]: "Undefined",
    };
  }

  public getId(): EnumWakfuItemType {
    return this.id;
  }

  public getParentId(): EnumWakfuItemType | null {
    return this.parentId;
  }

  public getEquipmentPositions(): EnumWakfuEquipmentPosition[] {
    return this.equipmentPositions;
  }

  public getEquipmentDisabledPositions(): EnumWakfuEquipmentPosition[] {
    return this.equipmentDisabledPositions;
  }

  public getTitle(lang: EnumWakfuLang = EnumWakfuLang.French): string {
    return this.title?.[lang] ?? "Undefined";
  }

  public haveParent(): boolean {
    return this.parentId !== null;
  }

  public isPositionEnabled(position: EnumWakfuEquipmentPosition): boolean {
    return this.equipmentPositions.includes(position);
  }

  public isPositionDisabled(position: EnumWakfuEquipmentPosition): boolean {
    return this.equipmentDisabledPositions.includes(position);
  }

  public toObject() {
    return {
      id: this.id,
      parentId: this.parentId,
      equipmentPositions: this.equipmentPositions,
      equipmentDisabledPositions: this.equipmentDisabledPositions,
      title: this.title,
    };
  }
}
