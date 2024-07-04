import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const phoneNumberValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const isValid = /^\+233[0-9]{9}$/.test(value)
    return isValid ? null : { invalidPhoneNumber: true }
  }
}