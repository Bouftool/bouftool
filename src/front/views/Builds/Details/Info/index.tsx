import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { useBuildDetailsContext } from "../context";
import { ModalBuildDetailsInfoEdit } from "./ModalEdit";
import { BuildDetailsInfoRoot, buildDetailsInfoClasses } from "./styles";

export const BuildDetailsInfo = () => {
  const build = useBuildDetailsContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <BuildDetailsInfoRoot className={buildDetailsInfoClasses.root} onClick={() => setOpen(true)}>
        <BreedFaceIcon className={buildDetailsInfoClasses.breed} width={44}>
          {build.breed}
        </BreedFaceIcon>
        <Stack sx={{ flex: 1, alignItems: "start", overflow: "hidden" }}>
          <Typography variant="subtitle2" sx={{ maxWidth: "100%" }} noWrap>
            {build.name}
          </Typography>
          <Typography variant="caption">Niv. {build.level}</Typography>
        </Stack>
      </BuildDetailsInfoRoot>
      <ModalBuildDetailsInfoEdit open={open} onClose={() => setOpen(false)} />
    </>
  );
};
