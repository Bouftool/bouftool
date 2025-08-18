import type { HTMLProps } from "react";

export type TAppIconProps = Omit<HTMLProps<HTMLImageElement>, "src" | "alt">;

export const AppIcon = (props: TAppIconProps) => {
  return (
    <img
      src="BouftoolIcon_256.png"
      alt="Bouftool Icon"
      {...props}
      style={{
        filter:
          "drop-shadow(1px 1px 0 white) drop-shadow(-0.5px 1px 0 white) drop-shadow(1px -0.5px 0 white) drop-shadow(-0.5px -0.5px 0 white)",
      }}
    />
  );
};
