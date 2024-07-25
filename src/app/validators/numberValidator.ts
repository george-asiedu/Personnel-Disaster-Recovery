import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const numberValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const isValid = /^[0-9]+$/.test(value)
    return isValid ? null : { invalidPhoneNumber: true }
  }
}