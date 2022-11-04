import React from "react";
import { StandardPlayingCard, getUnicodeCard } from "./StandardPlayingCards";

export default function PlayingCard(props: {
  card: StandardPlayingCard;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        color: ["♥", "♦"].includes(props.card.suit) ? "#bd2323" : "black",
        borderRadius: 25,
        backgroundColor: "#f3f3f3",
        fontSize: "6em",
        paddingTop: 6,
        paddingBottom: 16,
        width: "fit-content",
        ...props.style,
      }}>
      {getUnicodeCard(props.card)}
    </div>
  );
}
