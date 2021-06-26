<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label for="color">Color:</label>
                    <wj-input-color id="color" :value="theGauge.pointer.color" :value-changed="onInputValueChanged"></wj-input-color>
                </div>
                <div class="form-group">
                    <label for="thickness">Thickness:</label>
                    <wj-input-number id="thickness" :min=0 :max=1 :step=0.1 format="n2"
                        :value="theGauge.pointer.thickness" :value-changed="onInputValueChanged"></wj-input-number>
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="All" :startAngle=-30
                    :sweepAngle=240 :value=50>
                    <wj-range wjProperty="pointer" :color="theGauge.pointer.color" :thickness="theGauge.pointer.thickness"></wj-range>
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
                theGauge: {
                    pointer: {
                        color: '#000000',
                        thickness: 1
                    }
                }
            }
        },
        methods: {
            onInputValueChanged: function(s,e) {
                this.theGauge.pointer[s.hostElement.id] = s.value;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
