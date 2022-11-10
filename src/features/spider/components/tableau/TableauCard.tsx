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
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: SpiderDragTypes.TABLEAU_STACK,
      item: props.dragData,
      canDrag: props.canMove ?? false,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [props.dragData, props.canMove]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.onMoving(isDragging), [isDragging]);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  switch (props.card.state) {
    case "revealed":
    case "known":
      return (
        <div
          ref={drag}
          style={{
            height: 50,
            opacity: props.card.state === "known" ? 0.5 : undefined,
            ...props.style,
          }}>
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
