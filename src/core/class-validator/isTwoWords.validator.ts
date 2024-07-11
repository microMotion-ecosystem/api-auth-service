import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTwoWords', async: false })
export class IsTwoWordsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'string' && value.trim().split(' ').length >= 2;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is not two words!';
  }
}

export function IsTwoWords(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTwoWordsConstraint,
    });
  };
}
