import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../../app/hooks";
import PlayingCardBack from "../../playing_cards/PlayingCardBack";
import PlayingCard from "../../playing_cards/PlayingCard";

export default function TableauPile(props: { tableauIndex: number }) {
  const tableauPile = useAppSelector(
    (state) => state.spider.piles.tableau[props.tableauIndex]
  );
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ justifyContent: "space-around" }}>
      {tableauPile.map((card, index) => {
        switch (card.state) {
          case "revealed":
            return (
              <div
                key={index}
                style={{ height: 10 }}>
                <PlayingCard
                  card={card}
                  style={{ zIndex: index }}
                />
              </div>
            );
          default:
            return (
              <div
                key={index}
                style={{ height: 10 }}>
                <PlayingCardBack style={{ zIndex: index }} />
              </div>
            );
        }
      })}
    </Stack>
  );
}
