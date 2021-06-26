<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-5">
        <label for="cmbLevels">Levels:</label>
        <wj-combo-box
          :items-source="levels"
          :selected-value="level" 
          :text-changed="levelChanged" />
        <br>
        <label for="cmbLevels">Nodes/Level:</label>
        <wj-combo-box
          :items-source="nodesPerLevel"
          :selected-value="nodes"
          :text-changed="nodesChanged" />
        <br />
        <label></label>
        <button class="btn btn-primary" id="bind" @click="refresh">
          Bind Tree
        </button>
        <div id="bindingMsg" v-html="bindingMsg"></div>
      </div>
      <div class="col-xs-7">
        <wj-tree-view
          display-member-path="header"
          child-items-path="items"
          :items-source="treeData" 
          :initialized="initTree" />
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.nav";
import { format } from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",

    data: function() {
        return {
            levels: [1, 2, 3],
            level: 2,
            nodesPerLevel: [5, 10, 20, 40],
            nodes: 5,
            treeData: this.getData(5, 2),
            bindingMsg: null,
            treeView: null
        };
    },

    methods: {

        levelChanged: function(s) {
            this.level = s.selectedValue;
        },
        nodesChanged: function(s) {
            this.nodes = s.selectedValue;
        },
        initTree: function(s) {
            this.treeView = s;
        },

        // get an array with hierarchical data for the tree
        getData: function(cnt, levels) {
            var nodes = [];
            for (var i = 0; i < cnt; i++) {
                nodes.push(this.getNode(0, i, cnt, levels))
            }
            return nodes;
        },
        getNode: function(level, id, cnt, levels) {

            // create parent node
            var node = {
                header: 'Node ' + (level + 1) + '.' + (id + 1),
            };

            // create child nodes
            if (level < levels - 1) {
                node.items = [];
                for (var i = 0; i < cnt; i++) {
                    node.items.push(this.getNode(level + 1, i, cnt, levels))
                }
            }

            // done
            return node;
        },

        // bind the tree to a new data source and measure how long it took
        refresh: function() {
            var start = Date.now();
            this.treeView.itemsSource = this.getData(this.nodes, this.level);
            this.treeView.loadTree(); // force immediate refresh
            this.bindingMsg = format('Bound to <b>{cnt:no}</b> nodes in <b>{ms:n0}</b> ms.', {
                cnt: this.treeView.totalItemCount,
                ms: Date.now() - start
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .wj-treeview {
        height: 350px;
        font-size: 120%;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    .container-fluid .wj-combobox {
        width: 120px;
    }
    .container-fluid label {
        width: 120px;
        text-align: right;
        margin-bottom: 12px;
    }
    body {
        margin-bottom: 24pt;
    }
</style>
