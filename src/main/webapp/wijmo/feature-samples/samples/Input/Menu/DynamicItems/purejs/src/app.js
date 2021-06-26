import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { getMusicians, getPalettes } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    const template = '<div style="min-width: 160px">' +
        '{itemIndex}. <b>{name}</b>' +
        '</div>';
    const photoTemplate = '<div style="min-width: 160px">' +
        '{itemIndex}. <b>{name}</b>' +
        '<div><img src="{photo}" height="50" /></div>' +
        '</div>';
    // create file and edit menus
    const templateMenu = createTemplateMenu('templateMenu');
    const paletteMenu = createPaletteMenu('paletteMenu');
    templateMenu.itemClicked.addHandler(menuItemClicked);
    // handle menu clicks: this method gets invoked when the menu's itemClicked event fires
    function menuItemClicked(menu) {
        alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
    }
    //
    // create menu from markup
    function createTemplateMenu(elementId) {
        // get host element
        const host = document.getElementById(elementId), items = getMusicians(), menuItems = [];
        //
        for (let i = 0; i < items.length; i++) {
            let item = {
                id: i,
                name: items[i],
                photo: '|Paul|John|George|Ringo|'
                    .indexOf('|' + items[i] + '|') >= 0
                    ? 'resources/' + items[i] + '.png'
                    : null
            };
            menuItems.push(item);
        }
        //
        // clear host and instantiate menu
        host.innerHTML = '';
        const menu = new input.Menu(host, {
            header: 'Artists',
            itemsSource: menuItems,
            formatItem: (sender, e) => {
                const tpl = e.data.photo ? photoTemplate : template;
                e.data.itemIndex = e.index + 1;
                const html = wijmo.format(tpl, e.data, (data, name, fmt, val) => {
                    return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
                });
                e.item.innerHTML = html;
            }
        });
        //
        // done, return menu
        return menu;
    }
    function createPaletteMenu(elementId) {
        // get host element
        const host = document.getElementById(elementId);
        //
        const palettes = getPalettes();
        // clear host and instantiate menu
        host.innerHTML = '';
        const palettesSource = [];
        palettes.forEach((palette) => {
            let colors = '';
            palette.colors.forEach((color) => {
                colors += `<div style="background-color: ${color};` +
                    'display:inline;padding:2px;height:10px;width:3px"></div>';
            });
            palettesSource.push(`<div>${palette.name}<span style="float:right">` +
                `${colors}</span></div>`);
        });
        const menu = new input.Menu(host, {
            header: `Palette: <b>${palettesSource[0]}</b>`,
            itemsSource: palettesSource,
            selectedIndex: 0,
            selectedIndexChanged: (sender) => {
                if (sender.selectedIndex > -1) {
                    sender.header = `Palette: <b>${sender.selectedItem}</b>`;
                }
            },
        });
        //
        // done, return menu
        return menu;
    }
}
