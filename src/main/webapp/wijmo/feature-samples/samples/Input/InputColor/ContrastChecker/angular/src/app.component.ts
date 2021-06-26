import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { Color, Globalize } from '@grapecity/wijmo';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    fore = 'black';
    back = 'white';
    ratio = this.getRatio(this.fore, this.back);

    getRatio(fore: string, back: string): number {
        let lFore = this.getRelativeLuminance(fore);
        let lBack = this.getRelativeLuminance(back);
        return (Math.max(lFore, lBack) + .05) / (Math.min(lFore, lBack) + 0.05);
    }

    colorChanged(sender: any) {
        this.fore = sender.value;
        this.ratio = this.getRatio(this.fore, this.back);
    }

    backChanged(sender: any) {
        this.back = sender.value;
        this.ratio = this.getRatio(this.fore, this.back);
    }

    format(value: any, format: string): string {
        return Globalize.format(value, format);
    }

    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance
    getRelativeLuminance(color: string): number {
        let c = new Color(color);
        let r = this.getChannel(c.r);
        let g = this.getChannel(c.g);
        let b = this.getChannel(c.b);
        return (r * 0.2126 + g * 0.7152 + b * 0.0722);
    }
    getChannel(rgb: number): number {
        rgb /= 255;
        return rgb <= 0.03928 
            ? rgb / 12.92
            : Math.pow((rgb + 0.055) / 1.055, 2.4);
    }

}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
//
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

