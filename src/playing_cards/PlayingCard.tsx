import React from "react";
import { StandardPlayingCard, getUnicodeCard } from "./StandardPlayingCards";
import Paper from "@mui/material/Paper";

export default function PlayingCard(props: {
  card: StandardPlayingCard;
  style?: React.CSSProperties;
}) {
  return (
    <Paper
      sx={{
        color: ["♥", "♦"].includes(props.card.suit) ? "#bd2323" : "black",
        borderRadius: 5,
        backgroundColor: "#f3f3f3",
        fontSize: "6em",
        ...props.style,
      }}
      elevation={5}>
      {getUnicodeCard(props.card)}
    </Paper>
  );
}
