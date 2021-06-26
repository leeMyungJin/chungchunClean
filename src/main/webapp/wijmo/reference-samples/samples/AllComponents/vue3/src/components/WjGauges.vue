<template>
    <div>
        <h3>
            Gauge Controls
        </h3>
        <p>
            This section shows Gauge controls: LinearGauge,RadialGauge and BulletGraph.
        </p>

        <table class="table table-condensed">
            <tbody>
            <tr>
                <td><label htmlFor="n">LinearGauge</label></td>
                <td>
                    <wj-linear-gauge
                            :value="value"
                            :min="min"
                            :max="max"
                            :format="format"
                            :is-read-only="false"
                            :thumb-size="30"
                            :value-changed="valueChanged" />
                    <p/>
                </td>
            </tr>
            <tr>
                <td><label htmlFor="n">RadialGauge</label></td>
                <td>
                    <wj-radial-gauge
                            :value="value"
                            :min="min"
                            :max="max"
                            :format="format"
                            :is-read-only="false"
                            :value-changed="valueChanged" />
                </td>
            </tr>
            <tr>
                <td><label htmlFor="n">BulletGraph</label></td>
                <td>
                    <wj-bullet-graph
                            :value="value"
                            :min="min"
                            :bad="40"
                            :target="60"
                            :good="60"
                            :max="max"/>
                    <p/>
                </td>
            </tr>
            <tr>
                <td><label htmlFor="n">Value:</label></td>
                <td>
                    <div class="detail">
                        <wj-input-number
                                :value="value"
                                :value-changed="valueChanged"
                                :min="min"
                                :max="max"
                                :step="step"
                                :format="format"/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>


<script>
export default {
    data: function () {
        return {
            value: 50,
            min: 0,
            max: 100,
            format: 'n0',
            step: 10     
        }
    },
    methods: {
        valueChanged: function(s) {
            this.value = s.value;
        }
    },

};
</script>
