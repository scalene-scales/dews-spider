import { useDragLayer } from "react-dnd";
import { SpiderDragTypes, TableauStackMoveDragItem } from "../constants";
import { TableauCardDragPreview } from "./TableauCardDragPreview";

export function TableauDragLayer(props: {}) {
  const {
    itemType,
    isDragging,
    item,
    initialOffset: _,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  function renderItem() {
    switch (itemType) {
      case SpiderDragTypes.TABLEAU_STACK:
        return (
          <TableauCardDragPreview
            currentOffset={currentOffset}
            dragData={item as TableauStackMoveDragItem}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9000,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}>
      {renderItem()}
    </div>
  );
}
