import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Stock from "features/spider/components/Stock";
import Foundations from "features/spider/components/Foundations";
import Tableau from "features/spider/components/tableau/Tableau";
import { HotKeys } from "react-hotkeys";
import { useAppDispatch } from "app/hooks";
import { useCallback } from "react";
import { redoMove, undoMove } from "features/spider/SpiderSlice";

const keyMap = {
  REDO_MOVE: ["ctrl+r", "ctrl+shift+z"],
  UNDO_MOVE: ["ctrl+z"],
};

export default function SpiderSolitaireGame(props: {}) {
  const dispatch = useAppDispatch();

  const redo = useCallback(
    (e: KeyboardEvent | undefined) => {
      dispatch(redoMove());
      if (e) {
        // Don't refresh the page and reset progress.
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [dispatch]
  );
  const undo = useCallback(() => {
    dispatch(undoMove());
  }, [dispatch]);

  return (
    <HotKeys
      keyMap={keyMap}
      handlers={{
        REDO_MOVE: redo,
        UNDO_MOVE: undo,
      }}>
      <Container
        sx={{ margin: 5 }}
        disableGutters>
        <Stack
          direction="column"
          spacing={2}
          sx={{ justifyContent: "start" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}>
            <Stock />
            <Foundations />
          </Stack>
          <Container>
            <Tableau />
          </Container>
        </Stack>
      </Container>
    </HotKeys>
  );
}
