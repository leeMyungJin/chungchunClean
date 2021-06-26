<template>
    <div class="container-fluid">
        <div class="row container">
            <div class="col-xs-6">
                <div class="form-check">
                    <label for="showRanges" class="form-check-label">Show Ranges:</label>
                    <input id="showRanges" type="checkbox" class="form-check-input" v-model="showRanges">
                </div>

                <div class="form-group">
                    <label for="ranges">Ranges:</label>
                    <wj-combo-box id="ranges" 
                        :items-source="itemsSource"
                        :selectedItem="defaultSelectedItem"
                        :selectedIndexChanged="createRanges">
                    </wj-combo-box>
                </div>
            </div>
            <div class="col-xs-6">
                <wj-radial-gauge 
                    :isReadOnly="false"
                    :hasShadow="false"
                    showText="All"
                    :startAngle="-30"
                    :sweepAngle="240"
                    :value="50"
                    :showRanges="showRanges"
                    :thumbSize="20"
                    :min="0"
                    :max="100"
                    :initialized="initGauge">
                    <wj-range wjProperty="pointer" :thickness="0.25" />
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
    import * as wijmo from '@grapecity/wijmo';
    import * as gauge from '@grapecity/wijmo.gauge';

    new Vue({
        el: '#app',
        data: {
            showRanges: true,
            itemsSource: [0, 3, 4, 20, 50],
            defaultSelectedItem: 3,
            initialized: false
        },
        methods: {
            initGauge(g){
                this.gauge = g;
                this.createRanges();
            },
            createRanges(s) {
                let g = this.gauge;
                if (g) {
                    let cnt = s ? s.selectedItem : this.defaultSelectedItem;
                    if (!isNaN(cnt)) {
                        g.ranges.clear();
                        let colorMin = new wijmo.Color('red'),
                            colorMax = new wijmo.Color('green'),
                            span = (g.max - g.min) / cnt;
                        for (let i = 0; i < cnt; i++) {
                            let rng = new gauge.Range(),
                                color = wijmo.Color.interpolate(colorMin, colorMax, cnt > 1 ? i / (cnt - 1) : 0);
                            rng.min = g.min + i * span;
                            rng.max = rng.min + span;
                            rng.color = color.toString();
                            g.ranges.push(rng);
                        }
                    }
                }
            }
        }
    });
</script>
