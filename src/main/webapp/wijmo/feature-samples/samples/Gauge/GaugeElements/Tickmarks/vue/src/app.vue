<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-check">
                    <label class="form-check-label" for="showTicks">
                        Tickmarks:
                    </label>
                    <input id="showTicks" type="checkbox" v-model="showTicks" class="form-check-input" />
                </div>

                <div class="form-group">
                    <label for="tickSpacing">Spacing</label>
                    <wj-input-number id="tickSpacing" 
                        :min="0"
                        :max="100"
                        :step="5"
                        format="n0"
                        :value="tickSpacing"
                        :valueChanged="changeTickSpacing" />
                </div>

                <div class="form-group">
                    <label for="tickWidth">Width:</label>
                    <wj-input-number id="tickWidth"
                        :min="0"
                        :max="5"
                        :step="0.25"
                        format="n1"
                        :value="tickWidth"
                        :valueChanged="changeTickWidth" />
                </div>

                <div class="form-group">
                    <label for="tickColor">
                        Color:
                    </label>
                    <wj-input-color id="tickColor"
                        :value="tickColor"
                        :valueChanged="changeTickColor" />
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge
                    :isReadOnly="false"
                    :hasShadow="false"
                    showText="All"
                    :tickColor="tickColor"
                    :showTicks="showTicks"
                    :tickSpacing="tickSpacing"
                    :startAngle="-30"
                    :sweepAngle="240"
                    :value="50" >
                    <wj-range wjProperty="pointer" :thickness=0.5 />
                </wj-radial-gauge>
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
                tickWidth: 2,
                tickSpacing: 10,
                showTicks: true,
                tickColor: 'white'
            }
        },
        methods: {
            changeTickSpacing: function(s,e) {
                this.tickSpacing = s.value;
            },
            changeTickWidth: function(s,e) {
                let el = document.querySelector('.wj-ticks');
                if (el) {
                    el.style.strokeWidth = s.value + 'px';
                }
            },
            changeTickColor: function(s,e) {
                let el = document.querySelector('.wj-ticks');
                if (el) {
                    el.style.stroke = s.value;
                }
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
