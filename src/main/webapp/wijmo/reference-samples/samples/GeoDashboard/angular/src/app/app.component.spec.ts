import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
import { AppComponent } from './app.component';
import { DashService } from './services/dash.service';
import { EsriMapComponent } from './components/esri-map.component';
import { EsriCrosshairComponent } from './components/esri-crosshair.component';
import { EsriLegendComponent } from './components/esri-legend.component';
import { GdashTileComponent } from './components/gdash-tile.component';
import { GdashSliderComponent } from './components/gdash-slider.component';
import { LongitudePipe } from './pipes/longitude.pipe';
import { LatitudePipe } from './pipes/latitude.pipe';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        WjInputModule,
        WjChartModule,
        WjGaugeModule
      ],
      providers: [DashService],
      declarations: [
        AppComponent,
        EsriMapComponent,
        EsriCrosshairComponent,
        EsriLegendComponent,
        GdashTileComponent,
        GdashSliderComponent,
        LatitudePipe,
        LongitudePipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header h3').textContent).toContain('Wijmo GeoDashboard');
  });
});
