import Stack from "@mui/material/Stack";
import { useAppSelector } from "app/hooks";
import TableauCardStack from "./TableauCardStack";

export default function TableauPile(props: { tableauIndex: number }) {
  const tableauPile = useAppSelector(
    (state) => state.spider.piles.tableau[props.tableauIndex]
  );
  return (
    <Stack
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
