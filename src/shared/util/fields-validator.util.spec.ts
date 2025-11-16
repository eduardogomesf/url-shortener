import { plainToInstance } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { FieldsValidator } from './fields-validator.util';

class Test {
  @IsString()
  prop1: string;

  @IsNumber()
  prop2: number;

  @IsDate()
  prop3: Date;
}

describe('FieldsValidatorUtil', () => {
  it('should return valid as true', async () => {
    const test = plainToInstance(Test, {
      prop1: 'test',
      prop2: 10,
      prop3: new Date(),
    });

    const result = await FieldsValidator.validate(test);

    expect(result.valid).toBeTruthy();
    expect(result.errors.length).toBe(0);
  });

  it('should return valid as false and a list of errors', async () => {
    const test = plainToInstance(Test, {});

    const result = await FieldsValidator.validate(test);

    expect(result.valid).toBeFalsy();
    expect(result.errors.length).toBe(3);
    expect(result.errors[0]).toStrictEqual({
      errors: ['isString: prop1 must be a string'],
      field: 'prop1',
      value: undefined,
    });
    expect(result.errors[1]).toStrictEqual({
      errors: [
        'isNumber: prop2 must be a number conforming to the specified constraints',
      ],
      field: 'prop2',
      value: undefined,
    });
    expect(result.errors[2]).toStrictEqual({
      errors: ['isDate: prop3 must be a Date instance'],
      field: 'prop3',
      value: undefined,
    });
  });
});
