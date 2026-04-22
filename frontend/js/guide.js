export const openButtonId = "guide-button-open";
export const closeButtonId = "guide-button-close";
const panelId = "guide-panel";
const ariaExpanded = "aria-expanded";

/**
 * Toggles the guide panel visibility
 * @param {*} setVisible if true, then show the panel, else hide
 */
export function toggleGuidePanel(setVisible) {
    const panel = document.getElementById(panelId);
    const openButton = document.getElementById(openButtonId);

    if (setVisible) {
        // Make panel visible
        panel.hidden = false;
        openButton.setAttribute(ariaExpanded, "true");
    } else {
        // Hide panel
        panel.hidden = true;
        openButton.setAttribute(ariaExpanded, "false");
        openButton.focus();
    }
}