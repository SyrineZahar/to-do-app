import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const enteredDate = new Date(control.value);
    const currentDate = new Date();
    
    console.log('Entered Date:', enteredDate);
    console.log('Current Date:', currentDate);

    if (enteredDate <= currentDate) {
      return { futureDate: true };
    }

    return null;
  };
}
