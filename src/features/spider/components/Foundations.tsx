import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../../app/hooks";
import PlayingCard from "../../playing_cards/PlayingCard";
import PlayingCardSlot from "../../playing_cards/PlayingCardSlot";

export default function Foundations(props: {}) {
  const foundations = useAppSelector((state) => state.spider.piles.foundations);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "space-around" }}>
      {foundations.map((foundation, index) => {
        switch (foundation) {
          case "none":
            return <PlayingCardSlot key={index} />;
          default:
            return (
              <PlayingCard
                key={index}
                card={{ suit: foundation, rank: "K" }}
              />
            );
        }
      })}
    </Stack>
  );
}
