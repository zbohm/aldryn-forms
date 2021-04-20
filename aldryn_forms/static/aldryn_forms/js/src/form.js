/* global gettext */

// Prevent a situation when the translation is not implemented.
if (typeof gettext !== "function") {
    window.gettext = text => text
}

function populate(text, obj) {
    // Map values to the text. E.g. "Text %(value)s."
    for (const [key, value] of Object.entries(obj)) {
        const pattern = new RegExp(`%\\(${key}\\)s`, 'g')
        text = text.replace(pattern, value)
    }
    return text
}


export function handleFormRequiredCheckbox(event) {
    // The event.target is a checkbox - this is the result of selector: .form-required input[type=checkbox]
    const form = event.target.closest("form")
    if (form) {
        // Remove error messages if there are any.
        for (const element of form.querySelectorAll(".aldryn-forms-required-msg, .aldryn-forms-submit-msg")) {
            element.parentNode.removeChild(element)
        }
        // Enable submit button.
        for (const button of form.querySelectorAll('[type=submit]')) {
            button.disabled = false
            button.readOnly = false
        }
    }
}

export function disableButtonSubmit(event, display_message) {
    // Disable button submit to prevent user click more than once.
    event.target.blur()
    for (const button of event.target.querySelectorAll('[type=submit]')) {
        button.disabled = true
        button.readOnly = true
        if (display_message) {
            button.insertAdjacentHTML(
                'afterend',
                '<div class="text-danger aldryn-forms aldryn-forms-submit-msg">'
                + gettext("Please wait. Submitting form...")
                + '</div>')
        }
    }
}

export function handleRequiredFields(event) {
    // Handle required fields.
    let requiredFieldsFulfilled = true
    for (const checkboxset of this.getElementsByClassName("form-required")) {
        const chosen = checkboxset.querySelectorAll("input[type=checkbox]:checked").length
        if (chosen < parseInt(checkboxset.dataset.required_min)) {
            requiredFieldsFulfilled = false
            checkboxset.insertAdjacentHTML(
                'afterend',
                '<div class="text-danger aldryn-forms aldryn-forms-required-msg">'
                + populate(gettext("You have to choose at least %(value)s options (chosen %(chosen)s)."), {
                    value: checkboxset.dataset.required_min, chosen: chosen})
                + '</div>')
        }
    }
    // Do not submit the form if any required fields are missing.
    if (requiredFieldsFulfilled) {
        // Display a message to inform the user that the form has been submitted.
        for (const button of this.querySelectorAll('[type=submit]')) {
            button.insertAdjacentHTML(
                'afterend',
                '<div class="text-danger aldryn-forms aldryn-forms-submit-msg">'
                + gettext("Please wait. Submitting form...")
                + '</div>')
        }
    } else {
        // Some required value is not set.
        event.preventDefault()
        for (const button of this.querySelectorAll('[type=submit]')) {
            button.insertAdjacentHTML(
                'afterend', '<div class="text-danger aldryn-forms aldryn-forms-submit-msg">'
                + gettext("Correct the errors first, please.") + '</div>')
        }
    }
}
