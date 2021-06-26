<template>
	<div
		class="tile"
		draggable="true"
		@dragstart="$emit('drag-start', $event)"
		@dragover="$emit('drag-over', $event)"
		@drop="$emit('drag-finish', $event)"
		@dragend="$emit('drag-end', $event)"
	>
		<!-- caption -->
		<div class="tile-container">
			<div class="tile-header">Radial Gauge</div>
			<div class="buttons">
				<div class="button" title="Close Tile" @click="$emit('remove-tile')">
					<svg width="24" height="24" viewBox="0 0 24 24">
						<path
							d="M12.71,12l4.64-4.65a.49.49,0,1,0-.7-.7L12,11.29,7.35,6.65a.49.49,0,0,0-.7.7L11.29,12,6.65,16.65a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0L12,12.71l4.65,4.64a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z"
						/>
					</svg>
				</div>
			</div>
		</div>
		<!-- content -->
		<div class="tile-content">
			<wj-radial-gauge :value="data.items[data.items.length-1].profit" :min="0" :max="1000" :format="'c0'">
				<wj-range :wjProperty="'pointer'"></wj-range>
			</wj-radial-gauge>
            <h3>Profit for {{ data.items[data.items.length - 1].date | format('MMMM yyyy') }}</h3>
		</div>
	</div>
</template>

<script>
import * as wjcCore from '@grapecity/wijmo';
import '@grapecity/wijmo.vue2.gauge';

import DataService from '../services/data.service';

export default {
	name: 'RadialGauge',
    props: ['palette'],
    data: () => ({ data: DataService.getData() }),
	filters: {
		format: (value, format) => wjcCore.Globalize.format(value, format),
	},
};
</script>