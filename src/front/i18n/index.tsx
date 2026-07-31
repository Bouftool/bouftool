import { I18nHelperTooltip } from "./helperTooltip";

const I18nLibrary = {
  HelperTooltip: I18nHelperTooltip,
} as const;

export type I18nProps<Message extends keyof typeof I18nHelperTooltip> = {
  library: keyof typeof I18nLibrary;
  message: Message;
};

export const I18n = <Message extends keyof typeof I18nHelperTooltip>({ library, message }: I18nProps<Message>) => {
  // To-do : Get lang from context and get right language based on it

  return I18nLibrary[library][message]();
};
