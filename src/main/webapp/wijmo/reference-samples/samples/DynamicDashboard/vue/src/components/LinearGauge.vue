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
			<div class="tile-header">Linear Gauge</div>
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
			<div style="width: 100%; padding: 0 1rem;">
				<div class="flex-row">
					<h4>Sales: {{ data.items[data.items.length - 1].sales | format('c') }}</h4>
					<wj-linear-gauge
						:value="data.items[data.items.length-1].sales"
						:min="0"
						:max="1500"
						:thickness="0.15"
						:thumbSize="9"
					>
						<wj-range :wjProperty="'pointer'" :color="palette[0]"></wj-range>
					</wj-linear-gauge>
				</div>

				<div class="flex-row">
					<h4>Expenses: {{ data.items[data.items.length - 1].expenses | format('c') }}</h4>
					<wj-linear-gauge
						:value="data.items[data.items.length-1].expenses"
						:min="0"
						:max="1500"
						:thickness="0.15"
						:thumbSize="9"
						:pointer="{ color: palette[1] }"
					>
						<wj-range :wjProperty="'pointer'" :color="palette[1]"></wj-range>
					</wj-linear-gauge>
				</div>

				<div class="flex-row">
					<h4>Profit: {{ data.items[data.items.length - 1].profit | format('c') }}</h4>
					<wj-linear-gauge
						:value="data.items[data.items.length-1].expenses"
						:min="0"
						:max="1500"
						:thickness="0.15"
						:thumbSize="9"
						:pointer="{ color: palette[2] }"
					>
						<wj-range :wjProperty="'pointer'" :color="palette[2]"></wj-range>
					</wj-linear-gauge>
				</div>

				<h3>KPIs for {{ data.items[data.items.length - 1].date | format('MMMM yyyy') }}</h3>
			</div>
		</div>
	</div>
</template>

<script>
import * as wjcCore from '@grapecity/wijmo';
import '@grapecity/wijmo.vue2.gauge';

import DataService from '../services/data.service';

export default {
	name: 'LinearGauge',
	props: ['palette'],
	data: () => ({ data: DataService.getData() }),
	filters: {
		format: (value, format) => wjcCore.Globalize.format(value, format),
	},
};
</script>