import { createElement } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

/**
 * Sortable item element
 *
 * @since 1.0.0
 *
 * @param {String}  options.id         Sortable item identifier.
 * @param {Object}  options.data       Sortable item details.
 * @param {Boolean} options.disabled   Optional. Whether interaction is disabled..
 * @param {String}  options.handleType Type of interaction with or without drag handle.
 */
export function SortableItem({ id, data, disabled, handleType }) {
    // Define sortable parameters
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, isSorting } =
        useSortable({
            id: id,
            data: data,
            disabled: disabled,
            animateLayoutChanges: () => false // Resolve jump effect on drag end
        });

    // Define transition styles
    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    };

    // Define handle parameters
    const showHandle = "itemWithoutHandle" !== handleType;
    const withHandle = "onlyHandle" !== handleType;
    const onlyHandle = "onlyHandle" === handleType;

    return (
        <li
            ref={setNodeRef}
            className={classNames("sortable-list-input-item", {
                "is-sorting": isSorting,
                "is-dragging": isDragging
            })}
            style={style}
            {...(withHandle && listeners)}
            {...(withHandle && attributes)}
        >
            {showHandle && (
                <button
                    ref={onlyHandle ? setActivatorNodeRef : null}
                    type="button"
                    className="drag-handle"
                    tabIndex={onlyHandle || -1}
                    {...(onlyHandle && listeners)}
                    {...(onlyHandle && attributes)}
                    disabled={disabled}
                >
                    ::
                </button>
            )}
            {data.content || <span className="sortable-list-input-item-content">{data.label}</span>}
        </li>
    );
}
