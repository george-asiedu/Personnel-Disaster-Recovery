import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms"

export function confirmPasswordValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordControlName)?.value
      const confirmPassword = control.get(confirmPasswordControlName)?.value
      return password === confirmPassword ? null : { passwordsDoNotMatch: true }
    }
}  