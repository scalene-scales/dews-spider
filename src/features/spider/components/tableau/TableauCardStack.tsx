import Stack from "@mui/material/Stack";
import TableauCard from "./TableauCard";
import {
  mapTableauPileMovability,
  TableauCard as TableauCardType,
} from "features/spider/engine/SpiderSolitaireEngine";
import { useMemo, useState } from "react";

export default function TableauCardStack(props: {
  tableauIndex?: number | undefined;
  cards: Array<TableauCardType>;
}) {
  const [movingIndex, setMovingIndex] = useState<number | null>(null);
  const draggable: Array<boolean> = useMemo(
    () => mapTableauPileMovability(props.cards),
    [props.cards]
  );

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ justifyContent: "start" }}>
      {props.cards.map((card, index) => {
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
            onMoving={(isMoving) => setMovingIndex(isMoving ? index : null)}
            style={{
              zIndex: index,
              display: movingIndex && movingIndex <= index ? "none" : undefined,
            }}
          />
        );
      })}
    </Stack>
  );
}
