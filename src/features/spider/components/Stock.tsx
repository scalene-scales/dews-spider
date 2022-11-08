import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../../app/hooks";
import PlayingCardBack from "../../playing_cards/PlayingCardBack";

export default function Stock(props: {}) {
  const stock = useAppSelector((state) => state.spider.piles.stock);
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "space-around" }}>
      {stock.map((_, index) => {
        return (
          <div
            key={index}
            style={{ width: 20 }}>
            <PlayingCardBack style={{ zIndex: index }} />
          </div>
        );
      })}
    </Stack>
  );
}
