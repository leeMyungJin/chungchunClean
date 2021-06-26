<template>
    <div class="container-fluid app">
        <p>
            Select one of the built-in needle shapes using the <b>needleShape</b> property:
        </p>
        <div class="row">
            <div class="col-xs-4">
                <label for="needle-shape">needleShape</label>
                <wj-combo-box
                    :itemsSource=this.needleShapes
                    :text=this.needleShape
                    :textChanged="optionChanged.bind(this, 'needleShape', 'text')" />
                <br/>
                <label for="needle-length">needleLength</label>
                <wj-combo-box
                    :itemsSource=this.needleLengths
                    :text=this.needleLength
                    :textChanged="optionChanged.bind(this, 'needleLength', 'text')" />
                <br/>
                <br/>
                <label for="start">startAngle</label>
                <wj-combo-box
                    :itemsSource=this.startAngles
                    :selectedItem=this.startAngle
                    :textChanged="optionChanged.bind(this, 'startAngle', 'selectedValue')" />
                <br/>
                <label for="sweep">sweepAngle</label>
                <wj-combo-box
                    :itemsSource=this.sweepAngles
                    :selectedItem=this.sweepAngle
                    :textChanged="optionChanged.bind(this, 'sweepAngle', 'selectedValue')" />
                <br/>
                <label for="spacing">tickSpacing</label>
                <wj-combo-box
                    :itemsSource=this.tickSpacings
                    :selectedItem=this.tickSpacing
                    :textChanged="optionChanged.bind(this, 'tickSpacing', 'selectedValue')" />
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge
                    :min=0
                    :max=500
                    :value=100
                    :showText="this.needleShape == 'Outer' || this.needleShape == 'None' ? 'Value' : 'None'"
                    :startAngle=this.startAngle
                    :sweepAngle=this.sweepAngle
                    :tickSpacing=this.tickSpacing
                    :needleShape=this.needleShape
                    :needleLength=this.needleLength
                    :showTicks=true
                    :showTickText=true
                    :thickness=.2
                    :isReadOnly=false />
            </div>
        </div>

        <p>
            Or create custom needle shapes with the <b>createNeedleElement</b> method:
        </p>
        <div class="row">
            <div class="col-xs-4">
                <wj-radial-gauge
                    :thickness=.2
                    showText="None"
                    :min=0
                    :max=500
                    :value=100
                    :startAngle=-45
                    :sweepAngle=270
                    :showTicks=true
                    :showTickText=true
                    :tickSpacing=50
                    :isReadOnly=false
                    needleLength="Inner" 
                    :needleElement="createNeedleElement([{ x: -35, y: 0 }, { x: -35, y: 35 }, { x: -30, y: 35 }, { x: -20, y: 5 }, { x: 60, y: 5 }, { x: 100, y: 0 } ], 15)" />
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge
                    :thickness=.2
                    showText="None"
                    :min=0
                    :max=500
                    :value=100
                    :startAngle=-45
                    :sweepAngle=270
                    :showTicks=true
                    :showTickText=true
                    :tickSpacing=50
                    :isReadOnly=false
                    needleLength="Inner" 
                    :needleElement="createNeedleElement([ { x: -10, y: 0 }, { x: -10, y: 12 }, { x: 0, y: 20 }, { x: 35, y: 20 }, { x: 50, y: 12 }, { x: 10, y: 12 }, { x: 10, y: 5 }, { x: 80, y: 5 }, { x: 100, y: 0 } ])" />
            </div>
            <div class="col-xs-4">
                <wj-radial-gauge
                    :thickness=.2
                    showText="Value"
                    :min=0
                    :max=500
                    :value=100
                    :startAngle=-45
                    :sweepAngle=270
                    :showTicks=true
                    :showTickText=true
                    :tickSpacing=50
                    :isReadOnly=false
                    needleLength="Inner"
                    :needleElement="createNeedleElement([ { x: 40, y: 15 }, { x: 90, y: 0 } ])" />
            </div>
        </div>
    </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import 'src/app.css';

import Vue from "vue";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.gauge";
import { RadialGauge } from "@grapecity/wijmo.gauge";

let App = Vue.extend({
  name: "app",
  data: function() {
    return {
        startAngles: [-90, -45, 0, 45, 90],
        startAngle: -45,
        sweepAngles: [-360, -270, -180, -90, 90, 180, 270, 360],
        sweepAngle: 270,
        tickSpacings: [20, 50, 100, 200, 250],
        tickSpacing: 50,
        needleShapes: 'None,Triangle,Diamond,Hexagon,Rectangle,Arrow,WideArrow,Pointer,WidePointer,Outer'.split(','),
        needleShape: 'Pointer',
        needleLengths: 'Outer,Middle,Inner'.split(','),
        needleLength: 'Middle'
    };
  },
  methods: {
    optionChanged: function(option, comboProp, s) {
        this[option] = s[comboProp];
    },
    createNeedleElement: function(arr, innerRadius, outerRadius) {
        return RadialGauge.createNeedleElement(arr, innerRadius, outerRadius);
    }
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>
