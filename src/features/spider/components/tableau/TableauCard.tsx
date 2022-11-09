import PlayingCardBack from "features/playing_cards/PlayingCardBack";
import PlayingCard from "features/playing_cards/PlayingCard";
import { TableauCard as TableauCardType } from "features/spider/engine/SpiderSolitaireEngine";
import { useDrag } from "react-dnd";
import {
  SpiderDragTypes,
  TableauStackMoveDragItem,
} from "features/spider/components/constants";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function TableauCard(props: {
  dragData: TableauStackMoveDragItem | undefined;
  card: TableauCardType;
  canMove?: boolean;
  onMoving: (isMoving: boolean) => void;
  style?: React.CSSProperties;
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: SpiderDragTypes.TABLEAU_STACK,
    item: props.dragData,
    canDrag: props.canMove ?? false,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => props.onMoving(isDragging), [props, isDragging]);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  switch (props.card.state) {
    case "revealed":
      return (
        <div
          ref={drag}
          style={{ height: 10, ...props.style }}>
          <PlayingCard card={props.card} />
        </div>
      );
    default:
      return (
        <div style={{ height: 10, ...props.style }}>
          <PlayingCardBack />
        </div>
      );
  }
}
