<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="value">value:</label>
                    <wj-input-number id="value"
                        :min="state.min"
                        :max="state.max"
                        :step="state.step"
                        :value="state.value"
                        :value-changed="valueChanged">
                    </wj-input-number>
                </div>

                <div class="form-group">
                    <label for="startAngle">startAngle:</label>
                    <wj-input-number id="startAngle"
                        :step=10 
                        :min=-360 
                        :max=360 
                        :value="state.startAngle" 
                        :value-changed="startAngleChanged">
                    </wj-input-number>
                </div>

                <div class="form-group">
                    <label for="sweepAngle">sweepAngle:</label>
                    <wj-input-number id="sweepAngle"
                        :step=10 
                        :min=-360 
                        :max=360 
                        :value="state.sweepAngle" 
                        :value-changed="sweepAngleChanged">
                    </wj-input-number>
                </div>

                <div class="form-check">
                    <label for="autoScale" class="form-check-label">autoScale:</label>
                    <input id="autoScale" type="checkbox" class="form-check-input" v-model="state.autoScale">
                </div>
            </div>
            <div class="col-xs-6">
                <div class="gauge-holder">
                    <wj-radial-gauge 
                        :isReadOnly=false 
                        :min="state.min"
                        :max="state.max"
                        :step="state.step"
                        :value="state.value"
                        :startAngle="state.startAngle" 
                        :sweepAngle="state.sweepAngle"
                        :autoScale="state.autoScale"
                        :value-changed="gaugeValueChanged"
                        :showRanges=false>
                        <wj-range :min=0 :max=33 color="red"></wj-range>
                        <wj-range :min=33 :max=66 color="yellow"></wj-range>
                        <wj-range :min=66 :max=100 color="green"></wj-range>
                    </wj-radial-gauge>
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
                state: {
                    min: 0,
                    max: 100,
                    step: 5,
                    value: 75,
                    startAngle: 0,
                    sweepAngle: 180,
                    autoScale: true
                }
            }
        },

        methods: {
            valueChanged: function(s) {
                this.state.value = s.value;
            },
            startAngleChanged: function(s) {
                this.state.startAngle = s.value;
            },
            sweepAngleChanged: function(s) {
                this.state.sweepAngle = s.value;
            },
            gaugeValueChanged: function(s) {
                this.state.value = s.value;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
