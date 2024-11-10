import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const currentDate = new Date();
    const enteredDate = new Date(control.value);

    if (enteredDate <= currentDate) {
      return { futureDate: true };
    }

    return null;
  };
}
