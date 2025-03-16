import { createElement, useState } from "react";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import classNames from "classnames";
import shuffle from "shuffle-array";
import { Alert } from "./components/Alert";
import { SortableItem } from "./components/SortableItem";
import "./ui/SortableListInput.scss";

/**
 * SortableListInput element
 *
 * @since 1.0.0
 *
 * @param {String}  options.class                      Mendix widget class name.
 * @param {Object}  options.valueAttribute             Attribute handler for storing the input value.
 * @param {String}  options.listSeparator              Character for separting the stored values.
 * @param {String}  options.handleType                 Type of interaction with or without drag handle.
 * @param {Object}  options.dataSource                 Data source details for sortable objects.
 * @param {Object}  options.displayValue               Attribute handler for label attribute.
 * @param {Object}  options.displayExpression          Widget label expression attribute.
 * @param {Object}  options.displayContent             Content handler for label content.
 * @param {Object}  options.sortValue                  Attribute handler for key attribute.
 * @param {Object}  options.sortExpression             Widget key expression attribute.
 * @param {String}  options.randomizeObjectsType       Type of sortable object randomization.
 * @param {Boolean} options.randomizeObjectsStatic     Static sortable object randomization.
 * @param {Object}  options.randomizeObjectsAttribute  Attribute sortable object randomization.
 * @param {Object}  options.randomizeObjectsExpression Expression sortable object randomization.
 * @param {Object}  options.onChange                   OnChange action definition.
 * @param {String}  options.name                       Mendix widget element name.
 * @param {Number}  options.tabIndex                   Mendix widget element tabindex.
 */
export function SortableListInput({
    class: widgetClassName,
    valueAttribute,
    listSeparator,
    handleType,
    dataSource,
    displayValue,
    displayExpression,
    displayContent,
    sortValue,
    sortExpression,
    randomizeObjectsType,
    randomizeObjectsStatic,
    randomizeObjectsAttribute,
    randomizeObjectsExpression,
    onChange,
    name,
    tabIndex
}) {
    // Define state for the sorted list
    const [list, setList] = useState([]);

    // Define state for whether to randomize objects
    const [randomizeObjects, setRandomizeObjects] = useState(null);

    // Define the list separator
    const separator = listSeparator || "/";

    // Define the disabled attribute
    const disabled = valueAttribute.readOnly;

    // Define whether the data source is available
    const isDataSourceAvailable =
        !(!dataSource || "available" !== dataSource.status || !dataSource.items) &&
        null !== randomizeObjects &&
        "available" === valueAttribute.status;

    /**
     * Return the index of the item with the provided id
     *
     * @param  {String} id Item identifier
     * @return {Number}    Item index
     */
    const getIndex = id => list.findIndex(i => i.id === id);

    // Define input sensors for pointer (mouse + touch) and keyboard
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    // Handle list change
    const onDragEnd = event => {
        const { active, over } = event;
        let newList, sortedList;

        // When the list changed
        if (active.id !== over.id) {
            // Define new list
            newList = arrayMove(list, getIndex(active.id), getIndex(over.id));

            // Update list state
            setList(newList);

            // Create sorted list
            sortedList = newList.map(i => i.data.key).join(separator);

            // Update data attribute
            valueAttribute.setValue(sortedList);

            // Trigger onChange event
            if (onChange && onChange.canExecute && !onChange.isExecuting) {
                onChange.execute();
            }
        }
    };

    // Define randomizeObjects
    if (null === randomizeObjects) {
        switch (randomizeObjectsType) {
            case "static":
                setRandomizeObjects(!!randomizeObjectsStatic);
                break;
            case "attribute":
                if ("available" === randomizeObjectsAttribute.status) {
                    setRandomizeObjects(!!randomizeObjectsAttribute.value);
                }
                break;
            case "expression":
                if ("available" === randomizeObjectsExpression.status) {
                    setRandomizeObjects(!!randomizeObjectsExpression.value);
                }
                break;
            default:
                break;
        }
    }

    // Bail when the datasource is not available
    if (!isDataSourceAvailable) {
        return null;
    }

    // Define the initial list
    let initialList;

    // When doing the initial load
    if (!list.length && isDataSourceAvailable && dataSource.items.length) {
        // Create initial list
        initialList = dataSource.items.map(i => {
            // Get label and key from attributes
            const label = displayValue?.get(i).displayValue || displayExpression?.get(i).value || "";
            const key = sortValue?.get(i).displayValue || sortExpression?.get(i).value || label;

            return {
                id: key,
                data: {
                    label: label,
                    key: key,
                    content: displayContent?.get(i)
                }
            };
        });

        // Sort according to stored list
        if (valueAttribute.displayValue) {
            // Get chunks from string
            valueAttribute.displayValue.split(separator).forEach((item, index) => {
                // Move each item to their index
                initialList = arrayMove(
                    initialList,
                    initialList.findIndex(i => i.data.key === item),
                    index
                );
            });

            // Maybe randomize
        } else if (randomizeObjects) {
            shuffle(initialList);
        }

        // Set the initial list
        setList(initialList);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <ul
                className={classNames(widgetClassName, "form-control sortable-list-input", {
                    "item-interaction": "onlyHandle" !== handleType,
                    "handle-interaction": "onlyHandle" === handleType
                })}
                name={name}
                disabled={disabled}
                tabIndex={disabled ? -1 : tabIndex}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {list.map((props, index) => (
                        <SortableItem key={props.id} disabled={disabled} handleType={handleType} {...props} />
                    ))}
                </SortableContext>
            </ul>
            <Alert>{valueAttribute.validation}</Alert>
        </DndContext>
    );
}
