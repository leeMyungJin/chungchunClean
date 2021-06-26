<template>
	<div id="app">
		<div class="container">
			<div class="menu" v-bind:class="{ 'menu--open': isWideMenu }">
				<div class="menu-toggle" v-on:click="toggleMenu">
					<svg width="30" height="20" viewBox="0 0 30 20" fill="#1c7cdc">
						<rect x="10" y="5" width="11" height="1" />
						<rect x="10" y="15" width="11" height="1" />
						<polygon
							points="29.48 10.27 24.23 5.03 23.52 5.73 27.79 10 10 10 10 11 27.79 11 23.52 15.27 24.23 15.97 29.48 10.73 29.7 10.5 29.48 10.27"
						/>
					</svg>
				</div>
				<div
					v-for="{ id, icon, title } in widgets"
					class="menu-item"
					:key="id"
					:title="title"
					v-on:click="addTile(id)"
				>
					<svg width="64" height="64" viewBox="0 0 64 64" v-html="icon" />
					<div class="menu-item-name">{{title}}</div>
				</div>
			</div>

			<div class="hr"></div>

			<div class="content">
				<div class="dashboard">
					<component
						v-for="tile in tiles"
						:key="tile.id"
						:is="tile.type"
						:palette="palette"
						@remove-tile="removeTile(tile.id)"
						@drag-start="dragStart($event, tile.id)"
						@drag-over="dragOver($event, tile.id)"
						@drag-finish="dragFinish($event, tile.id)"
						@drag-end="dragEnd($event, tile.id)"
					></component>
					<div class="blank" v-if="!tiles.length">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="#819cce">
							<path
								d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,4V16H8.83L12,19.17L15.17,16H20V4H4M11,6H13V9H16V11H13V14H11V11H8V9H11V6Z"
							/>
						</svg>
						<div>Click on an item on the menu bar to add the new tile to the dashboard.</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as wjcCore from '@grapecity/wijmo';
import '@grapecity/wijmo.vue2.input';

import BarChart from './components/BarChart.vue';
import Blank from './components/Blank.vue';
import BubbleChart from './components/BubbleChart.vue';
import BulletGraph from './components/BulletGraph.vue';
import ColumnChart from './components/ColumnChart.vue';
import Grid from './components/Grid.vue';
import LinearGauge from './components/LinearGauge.vue';
import LineChart from './components/LineChart.vue';
import RadialGauge from './components/RadialGauge.vue';

export default {
	name: 'app',
	components: {
		BarChart,
		Blank,
		BubbleChart,
		BulletGraph,
		ColumnChart,
		Grid,
		LinearGauge,
		LineChart,
		RadialGauge,
	},
	data: function() {
		let tilesCount = 0;
    let isWideMenu = false;
		// Color palette
		const palette = ['#8e99f3', '#ffca28', '#5c6bc0', '#bbdefb'];
		// Icons assets
		const icons = {
			grid: `
        <path fill="${palette[3]}" d="M57,5H7A2,2,0,0,0,5,7v7H59V7A2,2,0,0,0,57,5Zm1,19V23H46V15H45v8H33V15H32v8H19V15H18v8H6v1H18v7H6v1H18v8H6v1H18v8H6v1H18v8h1V50H32v8h1V50H45v8h1V50H58V49H46V41H58V40H46V32H58V31H46V24ZM19,24H32v7H19Zm0,8H32v8H19Zm0,17V41H32v8Zm26,0H33V41H45Zm0-9H33V32H45Zm0-9H33V24H45Z" />
        <path fill="${palette[0]}" d="M57,5H7A2,2,0,0,0,5,7V57a2,2,0,0,0,2,2H57a2,2,0,0,0,2-2V7A2,2,0,0,0,57,5ZM7,6H57a1,1,0,0,1,1,1v7H6V7A1,1,0,0,1,7,6ZM57,58H7a1,1,0,0,1-1-1V15H58V57A1,1,0,0,1,57,58Z" />
      `,
          barChart: `
        <rect fill="${palette[1]}" x="12" y="34" width="40" height="7" />
        <rect fill="${palette[2]}" x="12" y="46" width="33" height="7" />
        <rect fill="${palette[3]}" x="12" y="11" width="32" height="7" />
        <path fill="${palette[0]}" d="M36,22v7H12V22ZM10,14H8v1h2Zm0,11H8v1h2Zm0,12H8v1h2Zm0,12H8v1h2Zm49,9H7a.94.94,0,0,1-1-1V5H5V57a2,2,0,0,0,2,2H59Z" />
      `,
          columnChart: `
        <rect fill="${palette[1]}" x="23" y="12.02" width="7" height="40" />
        <rect fill="${palette[2]}" x="11" y="19.02" width="7" height="33" />
        <rect fill="${palette[3]}" x="46" y="20.02" width="7" height="32" />
        <path fill="${palette[0]}" d="M41,52H34V26h7Zm8,2v2h1V54ZM37,54v2h1V54ZM26,54v2h1V54ZM14,54v2h1V54ZM5,5V57a2,2,0,0,0,2,2H58V58H7a1,1,0,0,1-1-1V5Z" />
      `,
          bubbleChart: `
        <path fill="${palette[0]}" d="M59,58H7a.94.94,0,0,1-1-1V5H5V57a2,2,0,0,0,2,2H59Z" />
        <path fill="${palette[2]}" d="M36,23a2,2,0,1,1,2,2A2,2,0,0,1,36,23ZM13.63,29.07a2,2,0,1,0-2-2A2,2,0,0,0,13.63,29.07Zm9,12a2,2,0,1,0-2-2A2,2,0,0,0,22.63,41.07Zm24-5a2,2,0,1,0-2-2A2,2,0,0,0,46.63,36.07Zm-2.5,17a1.5,1.5,0,1,0-1.5-1.5A1.5,1.5,0,0,0,44.13,53.07Z" />
        <path fill="${palette[3]}" d="M19,12a4,4,0,1,1,4,4A4,4,0,0,1,19,12Zm6.63,16.07a3,3,0,1,0-3-3A3,3,0,0,0,25.63,28.07Zm11.5,8a3.5,3.5,0,1,0-3.5-3.5A3.5,3.5,0,0,0,37.13,36.07Zm-1,10a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,36.13,46.07Zm14,0a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,50.13,46.07Z" />
      `,
          lineChart: `
        <path fill="${palette[0]}" d="M6,5V57a1,1,0,0,0,1,1H58v1H7a2,2,0,0,1-2-2V5Z" />,
        <polygon fill="${palette[3]}" points="51 20.41 49.59 19 32.5 36.97 27.5 31.97 11 48.48 12.5 49.98 27.5 34.97 32.5 39.97 51 20.41" />,
        <polygon fill="${palette[2]}" points="34.92 30.42 27.5 23 11 39.51 12.5 41.01 27.5 26 33.42 31.92 34.92 30.42"  />,
        <polygon fill="${palette[2]}" points="40.58 36.08 39.08 37.58 45.97 44.47 47.38 42.88 40.58 36.08"  />,
      `,
          radialGauge: `
        <circle fill="${palette[1]}" cx="32" cy="32" r="4" />,
        <path fill="${palette[0]}" d="M32,6A26,26,0,1,1,6,32,26,26,0,0,1,32,6m0-1A27,27,0,1,0,59,32,27,27,0,0,0,32,5ZM43.37,20.63a1.49,1.49,0,0,0-2.12,0l-6.84,6.84a6.51,6.51,0,0,1,2.12,2.12l6.84-6.84A1.49,1.49,0,0,0,43.37,20.63Z" />
        <path fill="${palette[3]}" d="M34,11a2,2,0,1,1-2-2A2,2,0,0,1,34,11ZM17,15a2,2,0,1,0,2,2A2,2,0,0,0,17,15Zm30,0a2,2,0,1,0,2,2A2,2,0,0,0,47,15ZM11,28a2,2,0,1,0,2,2A2,2,0,0,0,11,28Zm42,.91a2,2,0,1,0,2,2A2,2,0,0,0,53,28.91ZM32,40.76A25.87,25.87,0,0,0,14.09,48a23.95,23.95,0,0,0,35.83,0A25.88,25.88,0,0,0,32,40.76Z" />
      `,
          linearGauge: `
        <path fill="${palette[2]}" d="M29.5,19A4.5,4.5,0,1,1,34,23.5,4.49,4.49,0,0,1,29.5,19Zm-1.15-2H11a2,2,0,0,0-1.9,2.65,2,2,0,0,0,2,1.35H28.21A5.72,5.72,0,0,1,28,19.5c0-.08,0-.15,0-.23s0-.18,0-.27A6,6,0,0,1,28.35,17ZM54.9,18.35a2,2,0,0,0-2-1.35H39.65a5.89,5.89,0,0,1,0,4H53A2,2,0,0,0,54.9,18.35Z" />
        <path fill="${palette[3]}" d="M53,36H29.05a6,6,0,0,0,.29-1.85,6.13,6.13,0,0,0-.4-2.15h24a2,2,0,0,1,2,1.35A2,2,0,0,1,53,36ZM17.74,32H11a2,2,0,0,0-1.9,2.65,2,2,0,0,0,2,1.35h6.55a6.28,6.28,0,0,1-.29-1.85A6.13,6.13,0,0,1,17.74,32Zm5.6,6.65a4.5,4.5,0,1,0-4.5-4.5A4.5,4.5,0,0,0,23.34,38.65Z" />
        <path fill="${palette[1]}" d="M38.34,49.15A6.28,6.28,0,0,0,38.63,51H11.08a2,2,0,0,1-2-1.35A2,2,0,0,1,11,47H38.74A6.13,6.13,0,0,0,38.34,49.15Zm16.56-.8a2,2,0,0,0-2-1.35h-3a6.13,6.13,0,0,1,.4,2.15A6,6,0,0,1,50.05,51h3A2,2,0,0,0,54.9,48.35Zm-10.56,5.3a4.5,4.5,0,1,0-4.5-4.5A4.5,4.5,0,0,0,44.34,53.65Z" />
      `,
          bulletGraph: `
        <rect fill="${palette[2]}" x="41" y="17" width="14" height="11" />
        <rect fill="${palette[2]}" x="40.89" y="33.96" width="14" height="11" />
        <rect fill="${palette[3]}" x="9" y="26" width="14" height="2" />
        <rect fill="${palette[3]}" x="9" y="17" width="14" height="2" />
        <rect fill="${palette[3]}" x="9" y="34" width="14" height="2" />
        <rect fill="${palette[3]}" x="9" y="43" width="14" height="2" />
        <path fill="${palette[0]}" d="M49,53v2h1V53ZM37,53v2h1V53ZM26,53v2h1V53ZM14,53v2h1V53ZM31,24H9V21H31ZM26,41H9V38H26ZM60,58H6V57H60Z" />
        <polygon fill="${palette[1]}" points="25 17 25 19 34 19 34 26 25 26 25 28 39 28 39 17 25 17" />
        <polygon fill="${palette[1]}" points="25 36 29 36 29 43 25 43 25 45 39 45 39 34 25 34 25 36" />
      `,
          blank: `
        <path fill="${palette[0]}" d="M40,5V6H33V5ZM24,6h7V5H24ZM15,6h7V5H15Zm7,53V58H15v1Zm9-1H24v1h7ZM6,49V42H5v7ZM5,22H6V15H5ZM51,6h6a1,1,0,0,1,1,1v6h1V7a2,2,0,0,0-2-2H51ZM6,31V24H5v7Zm0,9V33H5v7ZM58,15v7h1V15ZM6,13V7A1,1,0,0,1,7,6h6V5H7A2,2,0,0,0,5,7v6ZM58,51v6a1,1,0,0,1-1,1H51v1h6a2,2,0,0,0,2-2V51ZM13,58H7a1,1,0,0,1-1-1V51H5v6a2,2,0,0,0,2,2h6ZM58,24v7h1V24Zm1,18H58v7h1ZM49,58H42v1h7ZM42,5V6h7V5ZM40,58H33v1h7ZM58,33v7h1V33Z" />
      `,
		};
		const widgets = [
			{ id: 'Grid', title: 'Grid', icon: icons.grid },
			{ id: 'RadialGauge', title: 'Radial Gauge', icon: icons.radialGauge },
			{ id: 'LinearGauge', title: 'Linear Gauge', icon: icons.linearGauge },
			{ id: 'BarChart', title: 'Bar Chart', icon: icons.barChart },
			{ id: 'ColumnChart', title: 'Column Chart', icon: icons.columnChart },
			{ id: 'LineChart', title: 'Line Chart', icon: icons.lineChart },
			{ id: 'BubbleChart', title: 'Bubble Chart', icon: icons.bubbleChart },
			{ id: 'BulletGraph', title: 'Bullet Graph', icon: icons.bulletGraph },
			{ id: 'Blank', title: 'Blank', icon: icons.blank },
		];
		const tiles = [
			{ id: tilesCount++, type: widgets[1].id }, // Radial Gauge
			{ id: tilesCount++, type: widgets[2].id }, // Linear Gauge
			{ id: tilesCount++, type: widgets[5].id }, // Line Chart
			{ id: tilesCount++, type: widgets[7].id }, // Bullet Graph
			{ id: tilesCount++, type: widgets[0].id }, // Grid
		];
		return {
      isWideMenu,
      palette,
			tiles,
			tilesCount,
			widgets,
			title: 'Dynamic Dashboard',
		};
	},
	methods: {
		addTile: function(id) {
			this.tiles = [{ id: this.tilesCount++, type: id }, ...this.tiles];
		},
		removeTile: function(tileId) {
			const tileIndex = this.tiles.findIndex(t => t.id === tileId);
			this.tiles.splice(tileIndex, 1);
		},
		toggleMenu: function() {
			this.isWideMenu = !this.isWideMenu;
		},
		dragStart: function(e, tileId) {
			const info = {
				sourceTileId: tileId,
			};
			e.dataTransfer.setData('text', JSON.stringify(info));
			e.dataTransfer.effectAllowed = 'move';
			const tile = wjcCore.closest(e.target, '.tile');
			wjcCore.addClass(tile, 'drag-source');
		},
		dragOver: function(e) {
			const tile = wjcCore.closest(e.target, '.tile');
			const dragTarget = document.querySelector('.tile.drag-over');
			if (tile !== dragTarget) {
				wjcCore.removeClass(dragTarget, 'drag-over');
			}
			const dragSource = document.querySelector('.tile.drag-source');
			if (dragSource && tile !== dragSource) {
				e.preventDefault();
				e.dataTransfer.dropEffect = 'move';
				wjcCore.addClass(tile, 'drag-over');
			}
		},
		dragFinish: function(e, tileId) {
			const dragSource = document.querySelector('.tile.drag-source');
			const dragTarget = document.querySelector('.tile.drag-over');
			if (dragSource && dragTarget) {
				e.preventDefault();
				const data = e.dataTransfer.getData('text');
				const info = JSON.parse(data);
				const sourceIndex = this.tiles.findIndex(t => t.id === info.sourceTileId);
				const sourceTile = this.tiles[sourceIndex];
				const targetIndex = this.tiles.findIndex(t => t.id === tileId);
				const targetTile = this.tiles[targetIndex];
				this.tiles.splice(sourceIndex, 1, targetTile);
				this.tiles.splice(targetIndex, 1, sourceTile);
				// invalidate Wijmo controls after layout updates
				wjcCore.Control.invalidateAll();
			}
		},
		dragEnd: function() {
			const dragSource = document.querySelector('.tile.drag-source');
			wjcCore.removeClass(dragSource, 'drag-source');
			const dragTarget = document.querySelector('.tile.drag-over');
			wjcCore.removeClass(dragTarget, 'drag-over');
		},
	},
};
</script>

<style>
/* Wijmo and Material Design Lite */
@import '../node_modules/@grapecity/wijmo.styles/themes/material/wijmo.theme.material.indigo-amber.css';

/* app */
*, *::before, *::after {
    box-sizing: border-box;
}

/* customize the browser's scrollbar: */
*::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
*::-webkit-scrollbar-track {
	border-radius: 0.25rem;
	background: rgba(0, 0, 0, 0.1);
}
*::-webkit-scrollbar-thumb {
	border-radius: 0.25rem;
	background: rgba(0, 0, 0, 0.2);
}
*::-webkit-scrollbar-thumb:hover {
	background: rgba(0, 0, 0, 0.4);
}
*::-webkit-scrollbar-thumb:active {
	background: rgba(0, 0, 0, 0.9);
}

html,
body {
	height: 100%;
}

body {
	background-color: #f7faff;
	font-size: 0.875rem;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
}

h3 {
	font-size: 0.875rem;
	font-weight: 500;
	text-align: center;
}

h4 {
	font-size: 0.875rem;
	font-size: 0.75rem;
	font-weight: 400;
	min-width: 7rem;
}

.flex-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 1rem;
}

.button {
	cursor: pointer;
}

#app {
	flex: 1 1 auto;
	overflow: hidden;
}

.container {
	display: flex;
	flex-direction: row;
	height: 100%;
	background: #f2f6fe;
}

.hr {
	width: 1px;
	height: 100%;
	position: relative;
	background: #e4ecfb;
	z-index: 1;
}
.hr::before {
	content: '';
	display: block;
	width: 1px;
	height: 100%;
	background-color: #f6f9fe;
}

.blank {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	justify-content: center;
	text-align: center;
}

.blank svg {
	width: 3rem;
	height: 3rem;
	margin-bottom: 1rem;
}

.content {
	flex: 1 1 auto;
	overflow: auto;
	background-color: #f7faff;
	width: 100%;
	padding: 2rem;
	box-sizing: border-box;
}
@media only screen and (max-width: 811px) {
	.content {
		padding: 0.25rem;
	}
}

.menu {
	display: flex;
	flex-direction: column;
	font-size: 0.85rem;
	justify-content: flex-start;
	flex: 0 0 auto;
	padding: 0;
}
@media only screen and (max-width: 840px), (max-height: 840px) {
	.menu {
		overflow: auto;
		font: 0.75rem;
	}
}
.menu.menu--open .menu-item-name {
	display: block;
}

.menu-toggle {
	transition: all 500ms;
	padding: 1rem;
	text-align: center;
	border-bottom: 1px solid #e6ecf1;
	cursor: pointer;
}
.menu-toggle svg {
    transition: all 250ms ease-out 50ms;
    transform-origin: center center;
    transform: scaleX(1);
}
.menu.menu--open .menu-toggle svg {
    transform: scaleX(-1);
}

.menu-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.5rem 1rem;
	cursor: pointer;
	user-select: none;
	position: relative;
	text-align: left;
}
.menu-item:hover {
	background: #f7faff;
}
.menu-item:hover:before {
	content: '';
	display: inline-block;
	width: 1rem;
	height: 1rem;
	bottom: 2rem;
	left: 2.5rem;
	position: absolute;
	background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), #0085c7;
	background-position: center;
	background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
	background-repeat: no-repeat;
	border-radius: 50%;
	box-shadow: 0 1px 2px rgba(55, 63, 66, 0.07), 0 2px 4px rgba(55, 63, 66, 0.07), 0 4px 8px rgba(55, 63, 66, 0.07),
		0 8px 16px rgba(55, 63, 66, 0.07), 0 16px 24px rgba(55, 63, 66, 0.07), 0 24px 32px rgba(55, 63, 66, 0.07);
}
.menu-item-name {
	margin: 0 0.5rem 0 1rem;
	white-space: nowrap;
	display: none;
}
@media only screen and (max-width: 840px), (max-height: 840px) {
	.menu-toggle {
		padding: 1rem 0;
	}
	.menu-item {
		padding: 0.5rem;
	}
	.menu-item:hover:before {
		bottom: 1rem;
		left: 1rem;
	}
	.menu-item svg {
		width: 32px;
		height: 32px;
	}
}

/* dashboard and tiles */
.dashboard {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: auto;
	height: 100%;
}

.table {
	margin: 0;
	table-layout: fixed;
	width: 100%;
}

.table td {
	padding: 0.15rem 0.5rem;
	font-size: 0.75rem;
	white-space: nowrap;
	width: 1.5rem;
}

.table td:first-child {
	width: 4rem;
}

.table td:last-child {
	width: auto;
}

.tile {
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	width: calc(25% - 1rem);
	margin: 0.5rem;
	height: 50vh;
	max-height: calc(50% - 1rem);
	overflow: hidden;
	background: white;
	page-break-inside: avoid; /* important when printing the dashboard */
	transition: all 250ms;
	border-radius: 0.5rem;
	box-sizing: border-box;
	box-shadow: 0 1px 2px rgba(55, 63, 66, 0.07), 0 2px 4px rgba(55, 63, 66, 0.07), 0 4px 8px rgba(55, 63, 66, 0.07),
		0 8px 16px rgba(55, 63, 66, 0.07), 0 16px 24px rgba(55, 63, 66, 0.07), 0 24px 32px rgba(55, 63, 66, 0.07);
}
@media only screen and (max-width: 1599px) {
	.tile {
		width: calc(33.33% - 1rem);
	}
}
@media only screen and (max-width: 1079px) {
	.tile {
		width: calc(50% - 1rem);
	}
}
@media only screen and (max-width: 1023px) {
	.tile {
		width: calc(100% - 1rem);
	}
}
@media only screen and (max-height: 800px) {
	.tile {
		max-height: 400px;
	}
}
.tile:last-child {
	flex: 1 1 auto;
}
.tile:hover {
	border-color: #adb7bd;
}
.tile.drag-over {
	border: 2px dashed #000;
}

.tile .buttons {
	transition: all 250ms;
	opacity: 0;
}
@media (hover: none) and (pointer: coarse) {
	.tile .buttons {
		opacity: 1;
	}
}
.tile:hover .buttons {
	opacity: 1;
}
.tile .buttons > span {
	padding: 0 0.5rem;
	cursor: pointer;
}
.tile.drag-over {
	border: 2px dashed #000;
	background-color: rgba(0, 0, 0, 0.1);
	transition: all 250ms;
}
.tile.drag-source {
	opacity: 0.4;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	background-color: rgba(145, 200, 248, 0.75);
	transform: scale(0.9);
	transition: all 250ms;
}

.tile .tile-container {
	border-bottom: 1px solid #e0e0e0;
	padding: 0.75rem 1rem;
	display: flex;
	cursor: move;
}

.tile .tile-header {
	flex-grow: 1;
	font-size: 1rem;
	font-weight: 400;
	padding: 0.125rem;
	opacity: 0.75;
}

.tile .tile-content {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex: 1 1 auto;
	overflow: auto;
	height: 100%;
}

.tile .blank-tile {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

/* tile content */

.wj-flexgrid {
	border: none;
	height: 100%;
}

.wj-flexgrid .wj-cell {
	border-right: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding: 0.35rem 1rem;
	font-size: 0.8125rem;
}

.wj-flexchart {
	background: transparent;
	height: calc(100%);
	width: 100%;
	border: none;
	padding: 1rem;
	margin: 0;
	overflow: hidden;
}
.wj-radialgauge {
	width: 60%;
	max-width: 300px;
	padding: 1rem;
	overflow: hidden;
}
.wj-radialgauge .wj-value {
	font-size: 0.75rem;
	font-weight: 500;
}

.wj-lineargauge {
	max-height: 1rem;
	width: 100%;
	overflow: hidden;
}

.wj-gauge .wj-face path {
	stroke: none;
}

.wj-ranges {
	opacity: 0.15;
}

</style>
