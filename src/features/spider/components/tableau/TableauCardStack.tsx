import Stack from "@mui/material/Stack";
import TableauCard from "./TableauCard";
import {
  mapTableauPileMovability,
  TableauCard as TableauCardType,
} from "features/spider/engine/SpiderSolitaireEngine";
import { useMemo, useState } from "react";
import PlayingCardSlot from "features/playing_cards/PlayingCardSlot";
import { OmniOscillator, Synth } from "tone";

export default function TableauCardStack(props: {
  tableauIndex?: number | undefined;
  cards: Array<TableauCardType>;
}) {
  const [movingIndex, setMovingIndex] = useState<number | null>(null);
  const draggable: Array<boolean> = useMemo(
    () =>
      props.tableauIndex != null
        ? mapTableauPileMovability(props.cards)
        : Array(props.cards.length).fill(undefined),
    [props.cards, props.tableauIndex]
  );

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ justifyContent: "start" }}>
      {props.cards.length > 0 &&
        props.cards.map((card, index) => {
          return (
            <TableauCard
              key={index}
              dragData={
                props.tableauIndex != null
                  ? {
                      tableauPileCardIndex: index,
                      tableauPileIndex: props.tableauIndex,
                    }
                  : undefined
              }
              card={card}
              canMove={draggable.at(index)}
              onMoving={(isMoving) => {
                if (isMoving) {
                  const synth = new Synth().toDestination();
                  synth.triggerAttackRelease("B1", "8n", "+0.01");
                }

                setMovingIndex(isMoving ? index : null);
              }}
              style={{
                zIndex: index,
                display:
                  movingIndex && movingIndex <= index ? "none" : undefined,
              }}
            />
          );
        })}
      {props.cards.length <= 0 && <PlayingCardSlot />}
    </Stack>
  );
}
