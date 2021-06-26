import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CellMaker, SparklineType, SparklineMarkers } from '@grapecity/wijmo.grid.cellmaker';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getData, getCountries } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    new FlexGrid('#theGrid', {
        showMarquee: true,
        selectionMode: 'MultiRange',
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true, width: 80 },
            { binding: 'country', header: 'Country', dataMap: getCountries() },
            // spark lines: Line
            {
                binding: 'history',
                header: 'Sparklines: Line',
                width: 175,
                cellTemplate: CellMaker.makeSparkline({
                    //maxPoints: 5,
                    markers: SparklineMarkers.High | SparklineMarkers.Low,
                    label: '${item.country} sales history line chart',
                })
            },
            // spark lines: column
            {
                binding: 'history',
                header: 'Sparklines: Column',
                width: 175,
                cellTemplate: CellMaker.makeSparkline({
                    //maxPoints: 5,
                    type: SparklineType.Column,
                    markers: SparklineMarkers.High | SparklineMarkers.Low,
                    label: '${item.country} sales history column chart'
                })
            },
            // spark lines: win/loss
            {
                binding: 'history',
                header: 'Sparklines: WinLoss',
                width: 175,
                cellTemplate: CellMaker.makeSparkline({
                    //maxPoints: 5,
                    type: SparklineType.WinLoss,
                    markers: SparklineMarkers.Negative,
                    label: '${item.country} sales history win/loss chart'
                })
            }
        ],
        itemsSource: getData(1000)
    });
}
