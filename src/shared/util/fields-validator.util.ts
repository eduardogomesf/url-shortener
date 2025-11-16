import { validate } from 'class-validator';
import { FieldValidationError } from '../type';

export class FieldsValidator {
  static async validate(
    obj: any,
    hideValuesInErrors = false,
  ): Promise<{
    valid: boolean;
    errors: FieldValidationError[];
  }> {
    const validationResult = await validate(obj, {
      forbidUnknownValues: false,
    });

    if (!validationResult?.length) {
      return {
        valid: true,
        errors: [],
      };
    }

    const errors = validationResult.map((vr) => ({
      field: vr.property,
      value: hideValuesInErrors ? '[redacted]' : vr.value,
      errors: Object.entries(vr.constraints).map(
        ([constraint, message]) => `${constraint}: ${message}`,
      ),
    }));

    return {
      valid: false,
      errors,
    };
  }

  static formatErrorMessage(validationErrors: FieldValidationError[]): string {
    return JSON.stringify(validationErrors);
  }
}
