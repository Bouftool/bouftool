import { isNumber } from "src/types/utils";

export enum WakfuBreed {
  Feca = 1,
  Osamodas = 2,
  Enutrof = 3,
  Sram = 4,
  Xelor = 5,
  Ecaflip = 6,
  Eniripsa = 7,
  Iop = 8,
  Cra = 9,
  Sadida = 10,
  Sacrieur = 11,
  Pandawa = 12,
  Roublard = 13,
  Zobal = 14,
  Ouginak = 15,
  Steamer = 16,
  Eliotrop = 18,
  Huppermage = 19,
}

export const isWakfuBreed = (value: unknown): value is WakfuBreed => {
  return isNumber(value) && value in WakfuBreed;
};
