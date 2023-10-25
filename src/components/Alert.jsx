import { createElement } from "react";

/**
 * Alert element
 *
 * Displays the input validation message.
 *
 * @since 1.0.0
 *
 * @param {String} options.alertType Type of alert. Accepts 'default', 'primary', 'success', 'info', 'warning', 'danger'.
 * @param {Array}  options.children  Child components. Expected input validation message.
 */
export function Alert({ alertType, children }) {
    // Default to danger type
    if (-1 === ["default", "primary", "success", "info", "warning", "danger"].indexOf(alertType)) {
        alertType = "danger";
    }

    return children ? (
        <div className={`alert alert-${alertType} mx-validation-message`} role="alert">
            {children}
        </div>
    ) : null;
}
