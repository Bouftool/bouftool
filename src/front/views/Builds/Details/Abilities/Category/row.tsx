import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, OutlinedInput, Tooltip, Typography } from "@mui/material";
import type { MouseEvent } from "react";
import { ElectronEvents } from "src/electron/types";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { AbilitiesCategoryButtonTooltip } from "src/front/views/Builds/Details/Abilities/Category/buttonTooltip";
import { AbilitiesDefinitions } from "src/wakfu/abilities/abilities";
import type { EnumAbilities } from "src/wakfu/abilities/types";
import { useBuildDetailsContext } from "../../context";
import { AbilitiesDisplay } from "../constants";
import { useTooltipState } from "./logics";
import { abilitiesCategoryClasses } from "./styles";
import { AbilitiesCategoryTooltip } from "./tooltip";

export type TAbilitiesCategoryRowProps = {
  ability: EnumAbilities;
  availablePoints: number;
};

export const AbilitiesCategoryRow = ({ ability, availablePoints }: TAbilitiesCategoryRowProps) => {
  const build = useBuildDetailsContext();
  const abilityLevel = build.abilities[ability] ?? 0;
  const addLevelDisabled =
    availablePoints <= 0 ||
    (abilityLevel >= AbilitiesDefinitions[ability].maxLevel && AbilitiesDefinitions[ability].maxLevel > 0);
  const removeLevelDisabled = abilityLevel <= 0;
  const {
    managedRowTooltipOpen,
    removeTooltipOpen,
    addTooltipOpen,
    handleRowTooltipOpen,
    handleRowTooltipClose,
    handleRemoveTooltipOpen,
    handleRemoveTooltipClose,
    handleAddTooltipOpen,
    handleAddTooltipClose,
  } = useTooltipState({
    disableRemoveTooltip: removeLevelDisabled,
    disableAddTooltip: addLevelDisabled,
  });

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    const levels = event.altKey ? availablePoints : event.shiftKey ? 10 : 1;
    sendElectronEvent(ElectronEvents.BuildAddAbilityLevel, { buildId: build.id, ability, level: levels });
  };

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    const levels = event.altKey ? abilityLevel : event.shiftKey ? 10 : 1;
    sendElectronEvent(ElectronEvents.BuildRemoveAbilityLevel, { buildId: build.id, ability, level: levels });
  };

  return (
    <Tooltip
      open={managedRowTooltipOpen}
      title={<AbilitiesCategoryTooltip ability={ability} />}
      placement="left"
      arrow
      disableInteractive
    >
      <div
        className={abilitiesCategoryClasses.row}
        onMouseEnter={handleRowTooltipOpen}
        onMouseLeave={handleRowTooltipClose}
      >
        <div className={abilitiesCategoryClasses.rowLabel}>
          <StatsIcon>{AbilitiesDisplay[ability].icon}</StatsIcon>
          <Typography variant="caption">{AbilitiesDisplay[ability].label}</Typography>
        </div>
        <div className={abilitiesCategoryClasses.rowActions}>
          <Tooltip
            open={removeTooltipOpen}
            title={<AbilitiesCategoryButtonTooltip type="remove" />}
            placement="top"
            arrow
            disableInteractive
          >
            <span>
              <Button
                variant="push"
                size="small"
                className={abilitiesCategoryClasses.rowActionsButton}
                onClick={handleRemoveClick}
                disabled={removeLevelDisabled}
                onMouseEnter={handleRemoveTooltipOpen}
                onMouseLeave={handleRemoveTooltipClose}
              >
                <RemoveIcon fontSize="small" />
              </Button>
            </span>
          </Tooltip>
          <OutlinedInput
            value={build.abilities[ability] ?? 0}
            size="small"
            className={abilitiesCategoryClasses.rowActionsInput}
          />
          <Tooltip
            open={addTooltipOpen}
            onOpen={handleAddTooltipOpen}
            onClose={handleAddTooltipClose}
            title={<AbilitiesCategoryButtonTooltip type="add" />}
            placement="top"
            arrow
            disableInteractive
          >
            <span>
              <Button
                variant="push"
                size="small"
                className={abilitiesCategoryClasses.rowActionsButton}
                onClick={handleAddClick}
                disabled={addLevelDisabled}
                onMouseEnter={handleAddTooltipOpen}
                onMouseLeave={handleAddTooltipClose}
              >
                <AddIcon fontSize="small" />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    </Tooltip>
  );
};
