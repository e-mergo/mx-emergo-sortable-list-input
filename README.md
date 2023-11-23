# Sortable List Input

Mendix custom widget for using an input field that enables sorting values

**Sortable List Input** is a Mendix widget created by [E-mergo](https://www.e-mergo.nl). Use this widget to include a field as a sortable list input in your form in Mendix. The field will provide a list of labels that can be vertically sorted by the user. The result of the sorted list will be stored in the selected attribute, like any other input widget. The widget uses the [Dnd Kit library](https://dndkit.com/) for creating the interactive sortable list, which supports keyboard interaction. The widget supports RTL layouts.

This widget is [hosted on GitHub](https://github.com/e-mergo/mx-emergo-sortable-list-input). You can report bugs and discuss features on the [issues page](https://github.com/e-mergo/mx-emergo-sortable-list-input/issues).

## Disclaimer

This widget is created free of charge for Mendix developers, personal or professional. E-mergo developers aim to maintain the functionality of this widget with each new release of Mendix. However, this product does not ship with any warranty of support. If you require any updates to the widget or would like to request additional features, please inquire for E-mergo's commercial plans for supporting your widget needs at support@e-mergo.nl.

## Features

Below is a detailed description of the available features of this widget.

### Value attribute

Set the attribute which will hold the result of the sorted list. The result will be stored in a string attribute, concatenating the corresponding values, using the separator parameter as glue. As an example, an alphabetically sorted list of A through D will be stored in the attribute as 'A/B/C/D'.

### Separator

Set the character used for separating the sorted list values.

### Sorting handle

Select how the sorting interaction is provided to the user: item without handle, both item and handle, or handle only.

### Label, Editability, Visibility

Set the label, editability, and visibility of the input like any other input widget.

### Events: On change

Set the action to trigger when the input value is changed.

### Sortable objects

Set the items for the sortable list. Choose from any data source type that returns an entity. Set the Label attribute as the entity's attribute that will be used for the display label of the sortable items. Optionally set the Value attribute to use a different entity attribute for setting up the result of the sorted list. Use this to differentiate between a label and the corresponding value (numeric or otherwise) that will be saved.

### Randomize objects

Set whether the initial load of the sortable list items should be randomized.

## Usage

Follow these steps to add the widget to your Mendix project:

1. Download the Widget from the Mendix Marketplace in Studio Pro.
2. Insert the Widget in a page.
3. Configure the Widget. The Value attribute and Sortable objects are required.
4. Run the app and interact with the sortable list.
5. Perhaps setup microflow handling of the value attribute to parse the sorted values.

## Styling

The widget is styled to blend in with the default styling of other input widgets in Mendix' Atlas UI. The widget can be styled through CSS in your project's theme styles.

-   'sortable-list-input' is the class name of the widget parent element.
-   'sortable-list-input-item' is the class name of each sortable list item.
-   'sortable-list-input-item-content' is the class name of the label of the sortable list item.
-   'drag-handle' is the class name of the drag handle in the sortable list item.

## FAQ

### Can I get support for this widget?

E-mergo provides paid support through standard support contracts. For other scenarios, you can post your bugs or questions in the widget's GitHub repository.

### Can you add feature X?

Requests for additional features can be posted in the widget's GitHub repository. Depending on your own code samples and the availability of E-mergo developers your request may be considered and included.

## Changelog

#### 1.0.1 - 20231123

-   Fixed styling for RTL layouts.
-   Fixed documentation.

#### 1.0.0 - 20231027 - Mendix 9.24.3

Initial release.
