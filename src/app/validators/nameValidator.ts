import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const nameValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const isValid = /^[A-Za-z\s]+$/.test(value)
    return isValid ? null : { invalidName: true }
  }
}