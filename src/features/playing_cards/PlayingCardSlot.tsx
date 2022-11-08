import React from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import PlayingCardBase from "./PlayingCardBase";

export default function PlayingCardSlot(props: {
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
        card={{ rank: "A", suit: "♠" }}
        style={{ zIndex: 0 }}
      />
      <Paper
        sx={{
          zIndex: 1,
          backgroundColor: "#6c83ff",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        elevation={3}></Paper>
      <Paper
        sx={{
          zIndex: 2,
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
