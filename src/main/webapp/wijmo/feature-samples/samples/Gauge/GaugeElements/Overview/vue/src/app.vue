<template>
    <div class="container-fluid">
        <wj-radial-gauge :isReadOnly=false :hasShadow=false showText="All" :startAngle=-30 :sweepAngle=240
            :value=50 :showRanges=true :showTicks=true :tickSpacing=10 :thumbSize=20 :initialized="setTooltips">
            <wj-range wjProperty="pointer" :thickness=0.15></wj-range>
            <wj-range :min=0 :max=30 color="red" :thickness=0.5></wj-range>
            <wj-range :min=30 :max=50 color="orange" :thickness=0.5></wj-range>
            <wj-range :min=50 :max=70 color="gold" :thickness=0.5></wj-range>
            <wj-range :min=70 :max=100 color="green" :thickness=0.5></wj-range>
        </wj-radial-gauge>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'src/app.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';

    let App = Vue.extend({
        name: 'app',
        methods: {
            setTooltips: function(s,e) {
                // add some tooltips
                let tt = new wijmo.Tooltip(),
                    host = s.hostElement;
                //
                tt.setTooltip(host.querySelector('.wj-face'), 'Face');
                tt.setTooltip(host.querySelector('.wj-pointer'), 'Pointer');
                tt.setTooltip(host.querySelector('.wj-thumb'), 'Thumb');
                tt.setTooltip(host.querySelector('.wj-ranges'), 'Ranges');
                tt.setTooltip(host.querySelector('.wj-ticks'), 'Tickmarks');
                tt.setTooltip(host.querySelector('.wj-value'), 'Text: Value');
                tt.setTooltip(host.querySelector('.wj-min'), 'Text: Min');
                tt.setTooltip(host.querySelector('.wj-max'), 'Text: Max');
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
