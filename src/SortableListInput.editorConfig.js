import { hidePropertiesIn } from "@mendix/pluggable-widgets-tools";
import StructurePreviewSvg from "./assets/structure-preview.svg";
import StructurePreviewSvgDark from "./assets/structure-preview-dark.svg";

// Define conditional properties for randomizeObjectsType
const keysToHideByRandomizeObjectsType = {
    static: ["randomizeObjectsAttribute", "randomizeObjectsExpression"],
    attribute: ["randomizeObjectsStatic", "randomizeObjectsExpression"],
    expression: ["randomizeObjectsStatic", "randomizeObjectsAttribute"]
};

/**
 * Control visibility of properties in Studio Pro
 *
 * @param {Object}     values
 * @param {Properties} defaultProperties
 * @param {String}     target
 * @returns {Properties} Widget properties
 */
export function getProperties(values, defaultProperties, target) {
    // Conditional properties
    hidePropertiesIn(defaultProperties, values, [...keysToHideByRandomizeObjectsType[values.randomizeObjectsType]]);

    // Display type
    hidePropertiesIn(
        defaultProperties,
        values,
        ["displayValue", "displayExpression", "displayContent"].filter(i => i !== values.displayType)
    );

    return defaultProperties;
}

/**
 * Return the widget appearance definition
 *
 * @param {Object}  values
 * @param {Boolean} isDarkMode
 * @param {Array}   version
 * @returns {Object} Preview definition
 */
export function getPreview(values, isDarkMode, version) {
    // return {
    //     type: "Image",
    //     document: decodeURIComponent(
    //         (isDarkMode ? StructurePreviewSvgDark : StructurePreviewSvg).replace("data:image/svg+xml,", "")
    //     ),
    //     height: 57,
    //     width: 250
    // };
}

/**
 * Return the custom widget caption
 *
 * @param {Object} values
 * @param {String} platform
 * @returns {String} Custom caption
 */
export function getCustomCaption(values, platform) {
    return "Sortable List";
}
