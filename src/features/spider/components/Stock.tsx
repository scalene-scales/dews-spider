import Stack from "@mui/material/Stack";
import PlayingCardSlot from "features/playing_cards/PlayingCardSlot";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import PlayingCardBack from "../../playing_cards/PlayingCardBack";
import { dealStock } from "../SpiderSlice";

export default function Stock(props: {}) {
  const stock = useAppSelector((state) => state.spider.piles.stock);
  const dispatch = useAppDispatch();

  return (
    <Stack
      direction="row"
      spacing={1}
      onClick={(_) => dispatch(dealStock())}
      sx={{ justifyContent: "space-around" }}>
      {stock.length > 0 &&
        stock.map((_, index) => {
          return (
            <div
              key={index}
              style={{ width: 20 }}>
              <PlayingCardBack style={{ zIndex: index }} />
            </div>
          );
        })}
      {stock.length <= 0 && <PlayingCardSlot />}
    </Stack>
  );
}
