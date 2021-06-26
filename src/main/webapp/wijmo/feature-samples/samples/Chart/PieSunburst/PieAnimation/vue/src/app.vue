<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-xs-12">
                <wj-menu :value="animationMode" :header="'Animation Mode'"
                     :itemClicked="animationModeChanged">
                    <wj-menu-item :value="'Point'">Point</wj-menu-item>
                    <wj-menu-item :value="'Series'">Series</wj-menu-item>
                    <wj-menu-item :value="'All'">All</wj-menu-item>
                </wj-menu>
                <wj-menu :value="easing" :header="'Easing'"
                     :itemClicked="easingChanged">
                    <wj-menu-item :value="'Linear'">Linear</wj-menu-item>
                    <wj-menu-item :value="'Swing'">Swing</wj-menu-item>
                    <wj-menu-item :value="'EaseOutQuad'">EaseOutQuad</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutQuad'">EaseInOutQuad</wj-menu-item>
                    <wj-menu-item :value="'EaseInCubic'">EaseInCubic</wj-menu-item>
                    <wj-menu-item :value="'EaseOutCubic'">EaseOutCubic</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutCubic'">EaseInOutCubic</wj-menu-item>
                    <wj-menu-item :value="'EaseInQuart'">EaseInQuart</wj-menu-item>
                    <wj-menu-item :value="'EaseOutQuart'">EaseOutQuart</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutQuart'">EaseInOutQuart</wj-menu-item>
                    <wj-menu-item :value="'EaseInQuint'">EaseInQuint</wj-menu-item>
                    <wj-menu-item :value="'EaseOutQuint'"> EaseOutQuint</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutQuint'">EaseInOutQuint</wj-menu-item>
                    <wj-menu-item :value="'EaseInSine'">EaseInSine</wj-menu-item>
                    <wj-menu-item :value="'EaseOutSine'">EaseOutSine</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutSine'">EaseInOutSine</wj-menu-item>
                    <wj-menu-item :value="'EaseInExpo'">EaseInExpo</wj-menu-item>
                    <wj-menu-item :value="'EaseOutExpo'">EaseOutExpo</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutExpo'">EaseInOutExpo</wj-menu-item>
                    <wj-menu-item :value="'EaseInCirc'">EaseInCirc</wj-menu-item>
                    <wj-menu-item :value="'EaseOutCirc'">EaseOutCirc</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutCirc'">EaseInOutCirc</wj-menu-item>
                    <wj-menu-item :value="'EaseInBack'">EaseInBack</wj-menu-item>
                    <wj-menu-item :value="'EaseOutBack'">EaseOutBack</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutBack'">EaseInOutBack</wj-menu-item>
                    <wj-menu-item :value="'EaseInBounce'">EaseInBounce</wj-menu-item>
                    <wj-menu-item :value="'EaseOutBounce'">EaseOutBounce</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutBounce'">EaseInOutBounce</wj-menu-item>
                    <wj-menu-item :value="'EaseInElastic'">EaseInElastic</wj-menu-item>
                    <wj-menu-item :value="'EaseOutElastic'">EaseOutElastic</wj-menu-item>
                    <wj-menu-item :value="'EaseInOutElastic'">EaseInOutElastic</wj-menu-item>
                </wj-menu>
                <label for="pieDuration">Duration:</label>
                <wj-input-number id="pieDuration" :value="duration" :min=200 :max=5000 :step=200 format="n0"
                    :valueChanged="durationChanged">
                </wj-input-number>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-xs-12">
                <label for="pieInnerRadius">Inner Radius:</label>
                <wj-input-number id="pieInnerRadius" :value="innerRadius" :min=0 :max=1 :step=0.1 format="n1"
                    :valueChanged="innerRadiusChanged">
                </wj-input-number>
                <button type="button" class="btn btn-default" @click="resetData">reset data</button>
                <button type="button" class="btn btn-default" @click="addSlice">add slice</button>
                <button type="button" class="btn btn-default" @click="removeSlice">remove slice</button>
            </div>
        </div>
        <wj-flex-pie bindingName="id" binding="y0" :innerRadius="innerRadius" :palette="palette" :itemsSource="data">
            <wj-flex-chart-animation :animationMode="animationMode" :easing="easing" :duration="duration" :initialized="animationInitialized">
            </wj-flex-chart-animation>
        </wj-flex-pie>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import { isArray } from '@grapecity/wijmo';
    import { Palettes } from '@grapecity/wijmo.chart';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData, getRandomData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: null,
            animationMode: 'All',
            easing: 'Swing',
            duration: 400,
            innerRadius: 0
        },
        methods: {
            animationInitialized(ctrl) {
                this.animation = ctrl;
            },
            animationModeChanged(e) {
                if (e.selectedValue) {
                    this.animationMode = e.selectedValue;
                    this.animation.animate();
                }
            },
            easingChanged(e) {
                if (e.selectedValue) {
                    this.easing = e.selectedValue;
                    this.animation.animate();
                }
            },
            durationChanged(e) {
               this.duration = e.value;
               if (this.animation) {
                    this.animation.animate();
               }
            },
            innerRadiusChanged(e) {
               if(e.value < e.min || e.value > e.max) {
                   return;
               }
               this.innerRadius = e.value;
            },
            //
            resetData() {
                this.data = getData();
                this._insertPieIdx = 1;
            },
            addSlice() {
                this.data.push(getRandomData('added' + this._insertPieIdx));
                this._insertPieIdx++;
            },
            removeSlice() {
                if (this.data.length) {
                    this.data.pop();
                    this._insertPieIdx = this._insertPieIdx <= 1 ? 1 : this._insertPieIdx--;
                }
            },
            //
            _getRandomPalette() {
                let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return Palettes[palettes[rand]];
            }
        },
        created() {
            this.palette = this._getRandomPalette();
            this._insertPieIdx = 1;
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .row {
        margin: 10px -15px;
    }

    #pieAnimationMode {
        width: 220px;
    }

    #pieEasing {
        width: 220px;
    }

    #pieDuration, #pieInnerRadius {
        width: 180px;
    }
</style>
