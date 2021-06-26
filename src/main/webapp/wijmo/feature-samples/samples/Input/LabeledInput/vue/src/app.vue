<template>
    <div class="container-fluid wj-popup">
        <form id="theForm" class="wj-dialog" @submit="submit" @reset="reset">
            <div class="wj-dialog-header" tabindex="-1">
                Labeled Input
            </div>
            <div class="wj-dialog-body">
                <div>
                    Styled Input Controls
                </div>

                <!-- personal information -->
                <div class="wj-labeled-input">
                    <wj-combo-box id="name" autocomplete="name" required />
                    <label for="name">Name</label>
                    <div class="wj-error" tabindex="-1">We do need your name...</div>
                </div>
                <div class="wj-labeled-input wide">
                    <wj-combo-box id="email" autocomplete="email" required pattern="\\S+@\\S+\\.\\S+" />
                    <label for="email">E-mail</label>
                    <div class="wj-error" tabindex="-1">We need a valid e-mail...</div>
                </div>
                <div class="wj-labeled-input">
                    <wj-combo-box id="country" 
                        :itemsSource="countries"
                        :isRequired="false"
                        :isEditable="true"
                        :text="''" />
                    <label for="country">Country</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-input-mask id="card" autocomplete="cc-number" pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                        :mask="'9999 9999 9999 9999'"
                        :isRequired="false"
                        :value="null">
                    </wj-input-mask>
                    <label for="card">Credit Card #</label>
                    <div class="wj-error" tabindex="-1">Four groups of four digits...</div>
                </div>

                <!-- transaction information -->
                <br/>
                <div class="wj-labeled-input">
                    <wj-input-date id="date"
                        :isRequired="false"
                        :value="null">
                    </wj-input-date>
                    <label for="date">Date</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-input-time id="time"
                        :isRequired="false"
                        :min="'8:00'"
                        :max="'18:00'"
                        :value="null">
                    </wj-input-time>
                    <label for="time">Time</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-input-number id="qty"
                        :isRequired="false"
                        :format="'n0'"
                        :step="1"
                        :value="null">
                    </wj-input-number>
                    <label for="quantity">Quantity</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-input-number id="discount"
                        :isRequired="false"
                        :format="'p0'"
                        :step=".05"
                        :min="0"
                        :max=".2"
                        :value="null">
                    </wj-input-number>
                    <label for="discount">Discount</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-multi-select id="colors"
                        :itemsSource="colors"
                        :headerFormat="'{count:n0} favorite colors'">
                    </wj-multi-select>
                    <label for="colors">Favorite Colors</label>
                </div>

                <div>
                    Styled Checkboxes, Radio Buttons, and Switches
                </div>
                <div class="wj-labeled-input">
                    <input id="theCheckboxForm" type="checkbox" checked />
                    <label for="theCheckboxForm">Checkbox</label>
                </div>
                <div class="wj-labeled-input switch">
                    <input id="theSwitchForm" type="checkbox" />
                    <label for="theSwitchForm">Switch</label>
                </div>
                <br/>
                <div class="wj-labeled-input">
                    <input id="btnRed" type="radio" name="color" checked />
                    <label for="btnRed">Red</label>
                </div>
                <div class="wj-labeled-input">
                    <input id="btnGreen" type="radio" name="color" />
                    <label for="btnGreen">Green</label>
                </div>
                <div class="wj-labeled-input">
                    <input id="btnBlue" type="radio" name="color" />
                    <label for="btnBlue">Blue</label>
                </div>
            </div>
            <div class="wj-dialog-footer">
                <button class="btn btn-primary" type="submit">OK</button>
                <button class="btn btn-default wj-hide-cancel" type="reset">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.input";
    import { Control, isUndefined } from "@grapecity/wijmo";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                countries: 'US,UK,Japan,Germany,France,Italy,Russia,China'.split(','),
                colors: 'Black,White,Grey,Red,Green,Blue'.split(','),
            };
        },
        methods: {

            // handle form submit and reset events
            submit: function(e) {
                e.preventDefault();
                e.target.reset();
                alert('The form has been submitted.');
            },
            reset: function(e) {
                let ctls = e.target.querySelectorAll('.wj-control');
                for (let i = 0; i < ctls.length; i++) {
                    let ctl = Control.getControl(ctls[i]);
                    if (!isUndefined(ctl.selectedIndex) && ctl.itemSource != null) {
                        ctl.selectedIndex = -1;
                    }
                    if (!isUndefined(ctl.checkedItems)) {
                        ctl.checkedItems = [];
                    }
                }
            }
        }
    });

    let vm = new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>
