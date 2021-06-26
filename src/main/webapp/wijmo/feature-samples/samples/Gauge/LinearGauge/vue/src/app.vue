<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="value">value:</label>
                    <wj-input-number id="value"
                        :min="0" 
                        :max="100"
                        :step="5"
                        :value="value"
                        :value-changed="onValueChanged" />
                </div>

                <div class="form-group">
                    <label for="direction">direction:</label>
                    <wj-combo-box id="direction"
                        :itemsSource="directionSource"
                        text="Right"
                        :selectedIndexChanged="setDirection" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="gauge-holder">
                    <wj-linear-gauge 
                        :isReadOnly="false"
                        :min="0"
                        :max="100"
                        :step="5"
                        :value="value"
                        :showRanges="false"
                        :direction="direction" 
                        :value-changed="onValueChanged"
                        :initialized="initGauge">
                        <wj-range :min="0" :max="33" color="red" />
                        <wj-range :min="33" :max="66" color="yellow" />
                        <wj-range :min="66" :max="100" color="green" />
                    </wj-linear-gauge>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'src/app.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                value: 75,
                direction: 0,
                directionSource: ['Left', 'Right', 'Up', 'Down'],
                gauge: null
            }
        },
        methods:{
            initGauge: function(s) {
                this.gauge = s;
            },
            onValueChanged: function(s, e) {
                this.value = s.value;
            },
            setDirection: function(s, e) {
                if (this.gauge) {

                    // update gauge direction
                    this.gauge.direction = s.text;

                    // update gauge style
                    let style = this.gauge.hostElement.style;
                    switch (s.text) {
                        case 'Left':
                        case 'Right':
                            style.height = '2em';
                            style.width = '100%';
                            break;
                        case 'Up':
                        case 'Down':
                            style.height = '100%';
                            style.width = '2em';
                            break;
                    }
                }
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
