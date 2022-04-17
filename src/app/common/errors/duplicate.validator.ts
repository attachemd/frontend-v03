import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DuplicateService } from './duplicate.service';

export class DuplicateValidator {
  public static createValidator(
    duplicateService: DuplicateService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return duplicateService.checkIfUsernameExists(control.value).pipe(
        map((result: boolean) => {
          console.log('result');
          console.log(result);

          return result ? { usernameAlreadyExists: true } : null;
        })
      );
    };
  }
}
