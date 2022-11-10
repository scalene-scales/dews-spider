import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { moveStack } from "features/spider/SpiderSlice";
import { useDrop } from "react-dnd";
import { SpiderDragTypes, TableauStackMoveDragItem } from "../constants";
import TableauCardStack from "./TableauCardStack";

export default function TableauPile(props: { tableauIndex: number }) {
  const tableauPile = useAppSelector(
    (state) => state.spider.piles.tableau[props.tableauIndex]
  );
  const dispatch = useAppDispatch();
  const [, drop] = useDrop(
    () => ({
      accept: SpiderDragTypes.TABLEAU_STACK,
      drop: (item: TableauStackMoveDragItem) =>
        dispatch(
          moveStack({
            toPileIndex: props.tableauIndex,
            fromPileIndex: item.tableauPileIndex,
            pileStackIndex: item.tableauPileCardIndex,
          })
        ),
    }),
    [dispatch, props.tableauIndex]
  );

  return (
    <Stack
      ref={drop}
      direction="column"
      spacing={1}
      sx={{ justifyContent: "start" }}>
      <TableauCardStack
        tableauIndex={props.tableauIndex}
        cards={tableauPile}
      />
    </Stack>
  );
}
