<template>
    <div class="container-fluid">
        <wj-tab-panel ref="tabPanel" :isAnimated="isAnimated">
            <wj-tab>
                <a>Africa</a>
                <div>
                    <ul>
                        <li>Algeria</li>
                        <li>Angola</li>
                        <li>Benin</li>
                        <li>Botswana</li>
                    </ul>
                </div>
            </wj-tab>
            <wj-tab>
                <a>
                    America
                </a>
                <div>
                    <ul>
                        <li>Canada</li>
                        <li>Chile</li>
                        <li>Mexico</li>
                        <li>United States</li>
                    </ul>
                </div>
            </wj-tab>
            <wj-tab>
                <a>Asia</a>
                <div>
                    <ul>
                        <li>China</li>
                        <li>Korea</li>
                        <li>India</li>
                        <li>Japan</li>
                    </ul>
                </div>
            </wj-tab>
            <wj-tab>
                <a>Europe</a>
                <div>
                    <ul>
                        <li>Austria</li>
                        <li>England</li>
                        <li>France</li>
                        <li>Germany</li>
                        <li>Netherlands</li>
                        <li>Switzerland</li>
                    </ul>
                </div>
            </wj-tab>
            <wj-tab>
                <a>Oceania</a>
                <div>
                    <ul>
                        <li>Australia</li>
                        <li>Fiji</li>
                        <li>New Zealand</li>
                        <li>Samoa</li>
                    </ul>
                </div>
            </wj-tab>
        </wj-tab-panel>
        <h4>
            Options
        </h4>
        <div>
            <label for="tabPosition">Tab Position</label>
            <wj-combo-box id="tabPosition" :itemsSource="tabPositions" 
                :selectedIndex="2" :selectedIndexChanged="positionSelected"></wj-combo-box>
        </div>
        <div>
            <label for="tabAlign">Tab Alignment</label>
            <wj-combo-box id="tabAlign" :itemsSource="tabAligns" 
                :selectedIndexChanged="alignChanged"></wj-combo-box>
        </div>
        <div>
            <label for="isAnimated">isAnimated</label>
            <input id="isAnimated" type="checkbox" v-model="isAnimated" />
        </div>
        <div>
            <label for="customHeaders">Custom Headers</label>
            <input id="customHeaders" type="checkbox" @change="customHeaders" />
        </div>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from "vue";
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: "app",
        data: function () {
            return {
                isAnimated: true,
                tabAligns: 'Left,Center,Right'.split(','),
                tabPositions: 'Left,Right,Above,Below'.split(','),
            };
        },
        methods: {
            positionSelected(e) {
                const selectedIndex = e.selectedIndex;
                const host = this.$refs.tabPanel.$el;
                this.tabPositions.forEach((pos, index) => {
                    wjCore.toggleClass(host, `tabs-${pos.toLowerCase()}`, index == selectedIndex);
                });
            },
            alignChanged(e) {
                this.$refs.tabPanel.$el.querySelector('.wj-tabheaders').style.textAlign = e.selectedItem
            },
            customHeaders(e) {
                wjCore.toggleClass(this.$refs.tabPanel.$el, 'custom-headers', e.target.checked);
            }
        },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-tabpanel {
        padding: 0 12px;
    }
    .wj-tabpane {
        padding: 12px;
    }
    .wj-tabheader:hover {
        outline: 2px solid rgba(90, 160, 215, .5);
    }

    /* custom-headers */
    .wj-tabpanel.custom-headers .wj-tabpanes {
        border: none;
    }
    .wj-tabpanel.custom-headers > div > .wj-tabheaders {
        background: black;
        color: white;
        border: none;
    }
    .wj-tabpanel.custom-headers .wj-tabheaders .wj-tabheader.wj-state-active {
        background: white;
        color: black;
    }
    .wj-tabpanel.custom-headers .wj-tabheaders .wj-tabheader:not(.wj-state-active) {
        font-weight: normal;
    }
    .wj-tabpanel.custom-headers .wj-tabheaders .wj-tabheader.wj-state-active:after {
        display: none; /* hide underline */
    }

    /* tabs on the left */
    .wj-tabpanel.tabs-left > div {
        display: flex;
        align-items: center;
    }
    .wj-tabpanel.tabs-left .wj-tabheaders {
        display: flex;
        flex-direction: column;
        min-width: 8em;
        border-right: 1px solid #ddd;
    }
    .wj-tabpanel.tabs-left .wj-tabheaders .wj-tabheader {
        text-align: right;
    }
    .wj-tabpanel.tabs-left .wj-tabpanes {
        display: flex;
        flex-grow: 1;
        border-top: none;
        overflow-x: hidden;
    }

    /* tabs on the right */
    .wj-tabpanel.tabs-right > div {
        display: flex;
        align-items: center;
    }
    .wj-tabpanel.tabs-right .wj-tabheaders {
        display: flex;
        flex-direction: column;
        min-width: 8em;
        border-left: 1px solid #ddd;
        order: 1;
    }
    .wj-tabpanel.tabs-right .wj-tabheaders .wj-tabheader {
        text-align: left;
    } 
    .wj-tabpanel.tabs-right .wj-tabpanes {
        display: flex;
        flex-grow: 1;
        border-top: none;
        overflow-x: hidden;
        order: 0;
    }

    /* tabs below */
    .wj-tabpanel.tabs-below > div {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .wj-tabpanel.tabs-below .wj-tabheaders {
        order: 1; /* headers after panes */
    }
    .wj-tabpanel.tabs-below .wj-tabpanes {
        order: 0;
    }
    .wj-tabpanel.tabs-below .wj-tabheaders .wj-tabheader.wj-state-active:after {
        top: 0;
        bottom: unset;
    }

    label {
        width: 8em;
        text-align: right;
        margin-right: 6px;
    }
</style>
