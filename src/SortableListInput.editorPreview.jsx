import { Component, createElement, Fragment } from "react";
import classNames from "classnames";
import shuffle from "shuffle-array";
import { SortableItem } from "./components/SortableItem";
import styles from "./ui/SortableListInput.scss";

/**
 * Widget preview element
 *
 * @since 1.0.0
 *
 * @param {String}  options.class                      Mendix widget class name.
 * @param {Object}  options.valueAttribute             Attribute handler for storing the input value.
 * @param {String}  options.handleType                 Type of interaction with or without drag handle.
 * @param {String}  options.randomizeObjectsType       Type of sortable object randomization.
 * @param {Boolean} options.randomizeObjectsStatic     Static sortable object randomization.
 * @param {Object}  options.randomizeObjectsAttribute  Attribute sortable object randomization.
 * @param {Object}  options.randomizeObjectsExpression Expression sortable object randomization.
 * @param {String}  options.name                       Mendix widget element name.
 */
export class preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Define state for the sorted list
            list: [1, 2, 3, 4].map(i => ({
                id: "Sortable ".concat(i),
                data: {
                    label: "Sortable ".concat(i),
                    key: i
                }
            })),
            // Define state for whether to randomize objects
            randomizeObjects: null
        };
    }

    render() {
        const {
            class: widgetClassName,
            valueAttribute,
            handleType,
            randomizeObjectsType,
            randomizeObjectsStatic,
            randomizeObjectsAttribute,
            randomizeObjectsExpression,
            name
        } = this.props;

        // Define randomizeObjects
        if (null === this.state.randomizeObjects) {
            switch (randomizeObjectsType) {
                case "static":
                    this.setState({ randomizeObjects: !!randomizeObjectsStatic });
                    break;
                case "attribute":
                    if ("available" === randomizeObjectsAttribute.status) {
                        this.setState({ randomizeObjects: !!randomizeObjectsAttribute.value });
                    }
                    break;
                case "expression":
                    if ("available" === randomizeObjectsExpression.status) {
                        this.setState({ randomizeObjects: !!randomizeObjectsExpression.value });
                    }
                    break;
                default:
                    break;
            }

            // Shuffle list
            if (this.state.randomizeObjects) {
                this.setState({ list: shuffle(this.state.list, { copy: true }) });
            }
        }

        // Define the disabled attribute
        const disabled = valueAttribute.readOnly;

        return (
            <Fragment>
                <ul
                    className={classNames(widgetClassName, "form-control sortable-list-input", {
                        "item-interaction": "onlyHandle" !== handleType,
                        "handle-interaction": "onlyHandle" === handleType
                    })}
                    name={name}
                    disabled={disabled}
                >
                    {this.state.list.map(({ id, data }, index) => (
                        <SortableItem key={id} id={id} data={data} disabled={disabled} handleType={handleType} />
                    ))}
                </ul>
            </Fragment>
        );
    }
}

/**
 * Return the widget preview styles
 *
 * @since 1.0.0
 *
 * @return {String} CSS styles
 */
export function getPreviewCss() {
    return styles;
}
