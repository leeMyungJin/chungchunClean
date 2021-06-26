import { Pipe, NgModule } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';

// SafeCurrency pipe
@Pipe({
    name: 'safeCurrency'
})
export class SafeCurrencyPipe {
    transform(value: any, args: string[]): any {
        if (wjcCore.isNumber(value)) {
            return wjcCore.Globalize.formatNumber(value, 'c');
        }
        if (!wjcCore.isUndefined(value) && value !== null) {
            return wjcCore.changeType(value, wjcCore.DataType.String);
        }
        return '';
    }
}

//exports
@NgModule({
    //imports: [Pipe],
    declarations: [SafeCurrencyPipe],
    exports: [SafeCurrencyPipe],
})

export class AppPipesModule {
}