<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <wj-radial-gauge
                    :min="0"
                    :max="500"
                    :value="100"
                    :start-angle="startAngle"
                    :sweep-angle="sweepAngle"
                    :show-ticks="true"
                    :show-tick-text="true"
                    :tick-spacing="tickSpacing"
                    :showText="'Value'"
                    :isReadOnly="false">
                </wj-radial-gauge>
            </div>
            <div class="col-xs-6">
                <label>
                    startAngle
                    <wj-combo-box
                        :itemsSource="startAngles"
                        :selectedValue="startAngle"
                        :selectedIndexChanged="startAngleChanged">
                    </wj-combo-box>
                </label>
                <label>
                    sweepAngle
                    <wj-combo-box
                        :itemsSource="sweepAngles"
                        :selectedValue="sweepAngle"
                        :selectedIndexChanged="sweepAngleChanged">
                    </wj-combo-box>
                </label>
                <label>
                    tickSpacing
                    <wj-combo-box
                        :itemsSource="tickSpacings"
                        :selectedValue="tickSpacing"
                        :selectedIndexChanged="tickSpacingChanged">
                    </wj-combo-box>
                </label>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6" :class="{ vertical: isVertical }">
                <wj-linear-gauge
                    :min="0"
                    :max="500"
                    :value="100"
                    :showTicks="true"
                    :show-tick-text="true"
                    :direction="direction"
                    :tickSpacing="tickSpacing"
                    :isReadOnly="false">
                </wj-linear-gauge>
            </div>
            <div class="col-xs-6">
                <label>
                    direction
                    <wj-combo-box
                        :itemsSource="directions"
                        :selectedItem="direction"
                        :selectedIndexChanged="directionChanged">
                    </wj-combo-box>
                </label>
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
    import { GaugeDirection } from '@grapecity/wijmo.gauge';
    import { Globalize, Point, addClass, toggleClass, clamp } from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function() {

            // arrays used to populate combo boxes
            let startAngles = [-90, -45, 0, 45, 90];
            let sweepAngles = [-360, -270, -180, -90, 90, 180, 270, 360];
            let tickSpacings = [25, 50, 100, 200, 250];
            let directions = ['Left', 'Right', 'Up', 'Down'];

            return {
                startAngles: startAngles,
                sweepAngles: sweepAngles,
                tickSpacings: tickSpacings,
                directions: directions,

                // app state
                startAngle: startAngles[1],
                sweepAngle: sweepAngles[6],
                tickSpacing: tickSpacings[1],
                direction: GaugeDirection.Right,
                isVertical: false
            }
        },
        methods: {
            startAngleChanged: function(s, e) {
                this.startAngle = s.selectedItem;
            },
            sweepAngleChanged: function(s, e) {
                this.sweepAngle = s.selectedItem;
            },
            tickSpacingChanged: function(s, e) {
                this.tickSpacing = s.selectedItem;
            },
            directionChanged: function(s, e) {
                this.direction = GaugeDirection[s.selectedItem];
                this.isVertical = GaugeDirection[this.direction].match(/Up|Down/) != null;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
