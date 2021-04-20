import {disableButtonSubmit, handleRequiredFields, handleFormRequiredCheckbox} from './form'


document.addEventListener('DOMContentLoaded', () => {
    // Disable button submit to prevent user click more than once.
    // Do not submit the form if any required fields are missing.
    for (const form of document.getElementsByTagName("form")) {
        if (form.getAttribute("novalidate")) {
            // Skip forms with class skip-disable-submit.
            if (!form.classList.contains("skip-disable-submit")) {
                form.addEventListener('submit', (event) => disableButtonSubmit(event, true))
            }
        } else {
            // Skip forms with class skip-disable-submit.
            if (!form.classList.contains("skip-disable-submit")) {
                form.addEventListener('submit', (event) => disableButtonSubmit(event, false))
            }
            form.addEventListener('submit', handleRequiredFields)
            // Enable submit button if required were set.
            for (const element of form.querySelectorAll(".form-required input[type=checkbox]")) {
                element.addEventListener('click', handleFormRequiredCheckbox)
            }
        }
    }
})
