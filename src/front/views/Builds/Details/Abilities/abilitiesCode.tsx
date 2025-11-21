import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Button, buttonClasses, svgIconClasses, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { BoufField } from "src/front/components/Input/BoufField";
import { StackRow } from "src/front/components/Layout/StackRow";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuAbilities } from "src/wakfu/abilities";
import { useBuildDetailsContext } from "../context";

export const BuildAbilitiesCode = () => {
  const build = useBuildDetailsContext();
  const [code, setCode] = useState(WakfuAbilities.toAbilitiesCode(build.abilities));

  const handleChangeAbilitiesCode = (newCode: string) => {
    setCode(newCode);
    console.log(/^(-?\d+:\d+)*$/.test(newCode));
    if (/^(-?\d+:\d+)*$/.test(newCode)) {
      sendElectronEvent(ElectronEvents.BuildSetAbilitiesFromCode, {
        buildId: build.id,
        abilitiesCode: newCode,
      });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const handlePasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    handleChangeAbilitiesCode(text);
  };

  useEffect(() => {
    setCode(WakfuAbilities.toAbilitiesCode(build.abilities));
  }, [build.abilities]);

  return (
    <StackRow
      sx={{
        "&&": { alignItems: "end" },
        [`& .${buttonClasses.root}`]: { height: 36, width: 36, [`& .${svgIconClasses.root}`]: { fontSize: 20 } },
      }}
    >
      <BoufField label="Code aptitudes" value={code} onChange={(evt) => handleChangeAbilitiesCode(evt.target.value)} />
      <Tooltip title="Copier dans le presse-papiers" enterDelay={500} arrow>
        <Button variant="push" onClick={handleCopyToClipboard}>
          <ContentCopyIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Coller depuis le presse-papiers" enterDelay={500} arrow>
        <Button variant="push" onClick={handlePasteFromClipboard}>
          <ContentPasteIcon />
        </Button>
      </Tooltip>
    </StackRow>
  );
};
