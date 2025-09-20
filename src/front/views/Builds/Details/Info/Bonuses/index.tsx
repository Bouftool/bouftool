import { Tooltip } from "@mui/material";
import clsx from "clsx";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { sendElectronEvent } from "src/front/hooks/electron";
import { EnumWakfuStatsBonuses } from "src/wakfu/builds/bonus";
import { useBuildDetailsContext } from "../../context";
import { BonusButton, bonusButtonClasses } from "./styles";
import { BonusTooltip } from "./tooltip";

export const BuildDetailsInfoBonuses = () => {
  const build = useBuildDetailsContext();

  return (
    <StackRow>
      <Tooltip
        title={<BonusTooltip bonus={EnumWakfuStatsBonuses.HavenWorld} />}
        placement="right-start"
        arrow
        disableInteractive
      >
        <BonusButton
          variant="push"
          className={clsx(bonusButtonClasses.root, {
            [bonusButtonClasses.selected]: build.bonuses[EnumWakfuStatsBonuses.HavenWorld],
          })}
          onClick={() =>
            sendElectronEvent(ElectronEvents.BuildSetBonuses, {
              buildId: build.id,
              bonuses: {
                ...build.bonuses,
                [EnumWakfuStatsBonuses.HavenWorld]: !build.bonuses[EnumWakfuStatsBonuses.HavenWorld],
              },
            })
          }
        >
          <img width={38} src="wakfu/HavenWorldIcon2.png" alt="Haven World" />
        </BonusButton>
      </Tooltip>
      <Tooltip
        title={<BonusTooltip bonus={EnumWakfuStatsBonuses.Guild} />}
        placement="right-start"
        arrow
        disableInteractive
      >
        <BonusButton
          variant="push"
          className={clsx(bonusButtonClasses.root, {
            [bonusButtonClasses.selected]: build.bonuses[EnumWakfuStatsBonuses.Guild],
          })}
          onClick={() =>
            sendElectronEvent(ElectronEvents.BuildSetBonuses, {
              buildId: build.id,
              bonuses: { ...build.bonuses, [EnumWakfuStatsBonuses.Guild]: !build.bonuses[EnumWakfuStatsBonuses.Guild] },
            })
          }
        >
          <img width={38} src="wakfu/GuildIcon.png" alt="Haven World" />
        </BonusButton>
      </Tooltip>
    </StackRow>
  );
};
