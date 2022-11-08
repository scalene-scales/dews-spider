import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../../app/hooks";
import TableauPile from "./TableauPile";

export default function Tableau(props: {}) {
  const tableauCount = useAppSelector(
    (state) => state.spider.piles.tableau.length
  );
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ justifyContent: "space-around" }}>
      {Array(tableauCount)
        .fill(0)
        .map((_, index) => {
          return (
            <TableauPile
              key={index}
              tableauIndex={index}
            />
          );
        })}
    </Stack>
  );
}
