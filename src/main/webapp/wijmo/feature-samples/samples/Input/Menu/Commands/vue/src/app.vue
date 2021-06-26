<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="currentTax">Current Tax</label>
            <wj-input-number
                id="currentTax"
                :format="'p2'"
                :min="0"
                :max="1"
                :step="0.025"
                :value="tax"
                :valueChanged="valueChanged">
            </wj-input-number>
        </div>
        <div class="form-group">
            <label for="changeTax">Change Tax</label>
            <wj-menu id="changeTax" :header="'Tax Commands'">
                <wj-menu-item :cmd="command" :cmdParam="0.50">Increment by 50%</wj-menu-item>
                <wj-menu-item :cmd="command" :cmdParam="0.25">Increment by 25%</wj-menu-item>
                <wj-menu-item :cmd="command" :cmdParam="0.05">Increment by 5%</wj-menu-item>
                <wj-menu-separator></wj-menu-separator>
                <wj-menu-item :cmd="command" :cmdParam="-0.05">Decrement by 5%</wj-menu-item>
                <wj-menu-item :cmd="command" :cmdParam="-0.25">Decrement by 25%</wj-menu-item>
                <wj-menu-item :cmd="command" :cmdParam="-0.50">Decrement by 50%</wj-menu-item>
            </wj-menu>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                tax: 0.0825,
                command: {
                    // execute the command
                    executeCommand: (arg) => {
                        arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
                        if (wijmo.isNumber(arg)) {
                            this.tax += arg;
                        }
                    },
                    // check if a command can be executed
                    canExecuteCommand: (arg) => {
                        arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
                        if (wijmo.isNumber(arg)) {
                            let val = this.tax + arg;
                            return val >= 0 && val <= 1;
                        }
                        return false;
                    }
                }
            }
        },
        methods: {
            valueChanged(sender) {
                this.tax = sender.value;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 120px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
