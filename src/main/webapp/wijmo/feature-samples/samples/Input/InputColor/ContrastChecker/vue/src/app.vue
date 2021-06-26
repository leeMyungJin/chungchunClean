<template>
    <div class="container-fluid">
        <h1>
            Contrast Checker
        </h1>
        <div class="row">
            <div class="col-md-4">
                <h3>
                    Foreground Color
                </h3>
                <wj-input-color 
                    :value="fore" 
                    :value-changed="foreChanged"/>
                <h3>
                    Background Color
                </h3>
                <wj-input-color
                    :value="back"
                    :value-changed="backChanged"/>
            </div>
            <div class="col-md-4">
                <h3>
                    Contrast Ratio
                </h3>
                <div id="ratio" v-bind:style="{ borderColor: ratio < 7 ? 'whitesmoke' : 'darkgreen' }">
                    <b>{{ format(ratio, 'g1') }}</b>:1
                </div>
                <h3>
                    Result
                </h3>
                <p class="sample" v-bind:style="{ color: fore, background: back }">
                    Normal Text
                </p>
                <p>
                    WCAG AA:
                    <span id="aa-normal" class="result" v-bind:class="{ fail: ratio < 4.5 }">
                        {{ ratio < 4.5 ? 'Fail' : 'Pass' }}
                    </span>
                    WCAG AAA:
                    <span id="aaa-normal" class="result" v-bind:class="{ fail: ratio < 7 }">
                        {{ ratio < 7 ? 'Fail' : 'Pass' }}
                    </span>
                </p>
                <p class="sample large" v-bind:style="{ color: fore, background: back }">
                    Large Text
                </p>
                <p>
                    WCAG AA:
                    <span id="aa-large" class="result" v-bind:class="{ fail: ratio < 3 }">
                        {{ ratio < 3 ? 'Fail' : 'Pass' }}
                    </span>
                    WCAG AAA:
                    <span id="aaa-large" class="result" v-bind:class="{ fail: ratio < 4.5 }">
                        {{ ratio < 4.5 ? 'Fail' : 'Pass' }}
                    </span>
                </p>
            </div>
        </div>
        <h3>
            Explanation
        </h3>
        <p>
            WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and
            3:1 for large text.
        </p>
        <p>
            WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and user interface
            components (such as form input borders).
        </p>
        <p>
            WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 
            for large text.
        </p>
        <p>
            For more details, please see
            <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance" target="_blank">
                The Science of Color Contrast
            </a>.
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { Color, Globalize } from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            let fore = 'black';
            let back = 'white';
            return {
                fore: fore,
                back: back,
                ratio: this.getRatio(fore, back)
            }
        },
        methods: {
            getRatio: function(fore, back) {
                let lFore = this.getRelativeLuminance(fore);
                let lBack = this.getRelativeLuminance(back);
                return (Math.max(lFore, lBack) + .05) / (Math.min(lFore, lBack) + 0.05);
            },
            foreChanged: function(sender) {
                this.fore = sender.value;
                this.ratio = this.getRatio(this.fore, this.back);
            },
            backChanged: function(sender) {
                this.back = sender.value;
                this.ratio = this.getRatio(this.fore, this.back);
            },
            format: function(value, format) {
                return Globalize.format(value, format);
            },

            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance
            getRelativeLuminance(color) {
                let c = new Color(color);
                let r = this.getChannel(c.r);
                let g = this.getChannel(c.g);
                let b = this.getChannel(c.b);
                return (r * 0.2126 + g * 0.7152 + b * 0.0722);
            },
            getChannel(rgb) {
                rgb /= 255;
                return rgb <= 0.03928 
                    ? rgb / 12.92
                    : Math.pow((rgb + 0.055) / 1.055, 2.4);
            }
        },
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    #sample {
        padding: 12px;
        font-style: bold;
    }

    #ratio {
        font-size: 200%;
        padding: 12px;
        font-style: bold;
        text-align: center;
        border-radius: 4px;
        border: 2px solid whitesmoke;
    }

    .sample {
        padding: 6px;
        margin: 6px 0;
        border: 2px solid whitesmoke;
    }

    .large {
        font-size: 14pt;
        font-weight: bold;
    }

    .result {
        font-weight: bold;
        margin-right: 2em;
        padding: 3px 6px;
        border-radius: 6px;
        color: white;
        background: darkgreen;
    }
    .result.fail {
        background: darkred;
    }
</style>
