import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const nameValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const isValid = /^[a-zA-Z ]*$/.test(value)
    return isValid ? null : { invalidName: true }
  }
}