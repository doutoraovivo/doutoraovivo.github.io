"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewNode = void 0;
const ko = require("knockout");
class TreeViewNode {
    constructor(label) {
        this.label = ko.observable(label);
        this.nodes = ko.observableArray([]);
        this.isSelected = ko.observable(false);
        this.expanded = ko.observable(false);
        this.level = ko.observable("level-1");
        this.data = ko.observable();
        this.hasChildren = ko.pureComputed(() => {
            return this.nodes().length > 0;
        });
        this.hasActiveChild = ko.pureComputed(() => {
            return this.hasChildren() && (this.nodes().some(x => x.hasActiveChild() || x.isSelected()));
        });
    }
    select() {
        this.expanded(true);
        this.onSelect(this);
    }
    toggle() {
        if (!this.expanded()) {
            this.expanded(true);
            this.select();
        }
        else {
            this.expanded(false);
        }
    }
}
exports.TreeViewNode = TreeViewNode;
//# sourceMappingURL=treeviewNode.js.map