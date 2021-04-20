import {handleFormSubmit, handleFormRequiredCheckbox} from './form'


document.addEventListener('DOMContentLoaded', () => {
    // Disable button submit to prevent user click more than once.
    // Do not submit the form if any required fields are missing.
    for (const form of document.getElementsByTagName("form")) {
        // Skip forms with class skip-disable-submit.
        if (!form.classList.contains("skip-disable-submit")) {
            form.addEventListener('submit', handleFormSubmit)
        }
    }
    // Enable submit button if required were set.
    for (const element of document.querySelectorAll(".form-required input[type=checkbox]")) {
        element.addEventListener('click', handleFormRequiredCheckbox)
    }
})
