import React from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import PlayingCardBase from "./PlayingCardBase";
import { StandardPlayingCard } from "./StandardPlayingCards";

export default function PlayingCard(props: {
  card: StandardPlayingCard;
  style?: React.CSSProperties;
}) {
  return (
    <Box
      sx={{
        borderRadius: 5,
        position: "relative",
        ...props.style,
      }}>
      <PlayingCardBase
        card={props.card}
        style={{ zIndex: 0 }}
      />
      <Paper
        sx={{
          zIndex: 1,
          background: "transparent",
          border: "5px solid #b3bfff",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        elevation={10}></Paper>
    </Box>
  );
}
