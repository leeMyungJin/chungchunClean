import * as wjcCore from '@grapecity/wijmo';

export interface IValidator {
    validate(name: string, value: any): string;
}

export class RequiredValidator implements IValidator {
    validate(name: string, value: any): string {
        const message = name + ' is required';
        if (wjcCore.isUndefined(value)) {
            return message;
        }

        const str = wjcCore.changeType(value, wjcCore.DataType.String);
        if (wjcCore.isNullOrWhiteSpace(str)) {
            return message;
        }

        return '';
    }
}

export abstract class MinValueValidator<TValue> implements IValidator {
    readonly minValue: TValue;
    readonly message: string;
    readonly format: string;

    constructor(minValue: TValue, message: string = '{0} can\'t be less than {1}', format: string = null) {
        this.minValue = minValue;
        this.message = message;
        this.format = format;
    }

    validate(name: string, value: any): string {
        if (value < this.minValue) {
            return wjcCore.format(this.message, {
                0: name,
                1: this._formatValue(this.minValue)
            });
        }
        return '';
    }

    protected abstract _formatValue(value: TValue): string;
}

export abstract class MaxValueValidator<TValue> implements IValidator {
    readonly maxValue: TValue;
    readonly message: string;
    readonly format: string;

    constructor(maxValue: TValue, message: string = '{0} can\'t be greater than {1}', format: string = null) {
        this.maxValue = maxValue;
        this.message = message;
        this.format = format;
    }

    validate(name: string, value: any): string {
        if (value > this.maxValue) {
            return wjcCore.format(this.message, {
                0: name,
                1: this._formatValue(this.maxValue)
            });
        }
        return '';
    }

    protected abstract _formatValue(value: TValue): string;
}

export class MinNumberValidator extends MinValueValidator<number> {
    constructor(minValue: number, message: string = '{0} can\'t be less than {1}', format: string = 'n') {
        super(minValue, message, format);
    }

    protected _formatValue(value: number): string {
        return wjcCore.Globalize.formatNumber(value, this.format);
    }
}

export class MaxNumberValidator extends MaxValueValidator<number> {
    constructor(maxValue: number, message: string = '{0} can\'t be greater than {1}', format: string = 'n') {
        super(maxValue, message, format);
    }

    protected _formatValue(value: number): string {
        return wjcCore.Globalize.formatNumber(value, this.format);
    }
}

export class MinDateValidator extends MinValueValidator<Date> {
    constructor(minValue: Date, message: string = '{0} can\'t be less than {1}', format: string = 'MM/dd/yyyy') {
        super(minValue, message, format);
    }

    protected _formatValue(value: Date): string {
        return wjcCore.Globalize.formatDate(value, this.format);
    }
}

export class MaxDateValidator extends MaxValueValidator<Date> {
    constructor(maxValue: Date, message: string = '{0} can\'t be greater than {1}', format: string = 'MM/dd/yyyy') {
        super(maxValue, message, format);
    }

    protected _formatValue(value: Date): string {
        return wjcCore.Globalize.formatDate(value, this.format);
    }
}
