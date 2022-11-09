import { useAppSelector } from "app/hooks";
import { XYCoord } from "react-dnd";
import { TableauStackMoveDragItem } from "../constants";
import TableauCardStack from "./TableauCardStack";

export function TableauCardDragPreview(props: {
  currentOffset: XYCoord | null;
  dragData: TableauStackMoveDragItem;
}) {
  const top = props.currentOffset?.y ?? 0;
  const left = props.currentOffset?.x ?? 0;
  const tableauStack = useAppSelector((state) =>
    state.spider.piles.tableau[props.dragData.tableauPileIndex].slice(
      props.dragData.tableauPileCardIndex
    )
  );

  return (
    <div
      style={{
        position: "relative",
        top,
        left,
        width: "fit-content",
        height: "fit-content",
      }}>
      <TableauCardStack cards={tableauStack} />
    </div>
  );
}
