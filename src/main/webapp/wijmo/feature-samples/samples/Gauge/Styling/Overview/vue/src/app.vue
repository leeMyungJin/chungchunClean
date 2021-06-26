<template>
    <div class="container-fluid">
        <div id="thePanel" v-bind:style="{background: theColor.toString()}"></div>

        <wj-linear-gauge id="red" :value="color.red" :initialized="initGauge" :valueChanged="updateColor">
        </wj-linear-gauge>

        <wj-linear-gauge id="green" :value="color.green" :initialized="initGauge" :valueChanged="updateColor">
        </wj-linear-gauge>

        <wj-linear-gauge id="blue" :value="color.blue" :initialized="initGauge" :valueChanged="updateColor">
        </wj-linear-gauge>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'src/app.css';

    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.gauge';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let theColor = new wijmo.Color('grey');
            return {
                theColor: theColor,
                color: {
                    red: theColor.r,
                    green: theColor.g,
                    blue: theColor.b
                }
            }
        },
        methods: {
            updateColor: function(s,e){
                let rgb = {
                    red: 'r',
                    green: 'g',
                    blue: 'b'
                }
                this.theColor[rgb[s.hostElement.id]] = s.value;
            },
            initGauge: function(s,e) {
                let g = s, color = s.hostElement.id;
                g.isReadOnly = false;
                g.thumbSize = 10;
                g.hasShadow = false;
                g.min = 0;
                g.max = 255;
                g.step = 5;
                g.showTicks = true;
                g.tickSpacing = 25;
                g.face.thickness = 0.2;
                g.pointer.thickness = 0.3;
                g.pointer.color = color;
                g.hostElement.style.color = color;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
