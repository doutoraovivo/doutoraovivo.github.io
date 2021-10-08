"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTraceEntry = exports.ConsoleTrace = void 0;
const moment = require("moment");
class ConsoleTrace {
    constructor(trace) {
        this.totalExecutionTime = 0;
        if (trace.traceEntries.inbound) {
            this.inbound = new Array();
            this.inboundExecutionTime = 0;
            for (let entry of trace.traceEntries.inbound) {
                let elapsed = this.parseElapsedTime(entry.elapsed);
                let consoleEntry = new ConsoleTraceEntry();
                consoleEntry.source = entry.source;
                consoleEntry.data = entry.data;
                consoleEntry.executionTime = elapsed - this.totalExecutionTime;
                this.inboundExecutionTime += consoleEntry.executionTime;
                this.inbound.push(consoleEntry);
                this.totalExecutionTime = elapsed;
            }
        }
        if (trace.traceEntries.backend) {
            this.backend = new Array();
            this.backendExecutionTime = 0;
            for (let entry of trace.traceEntries.backend) {
                let elapsed = this.parseElapsedTime(entry.elapsed);
                let consoleEntry = new ConsoleTraceEntry();
                consoleEntry.source = entry.source;
                consoleEntry.data = entry.data;
                consoleEntry.executionTime = elapsed - this.totalExecutionTime;
                this.backendExecutionTime += consoleEntry.executionTime;
                this.backend.push(consoleEntry);
                this.totalExecutionTime = elapsed;
            }
        }
        if (trace.traceEntries.outbound) {
            this.outbound = new Array();
            this.outboundExecutionTime = 0;
            for (let entry of trace.traceEntries.outbound) {
                let elapsed = this.parseElapsedTime(entry.elapsed);
                let consoleEntry = new ConsoleTraceEntry();
                consoleEntry.source = entry.source;
                consoleEntry.data = entry.data;
                consoleEntry.executionTime = elapsed - this.totalExecutionTime;
                this.outboundExecutionTime += consoleEntry.executionTime;
                this.outbound.push(consoleEntry);
                this.totalExecutionTime = elapsed;
            }
        }
    }
    parseElapsedTime(time) {
        moment.duration();
        let match = time.match(/(\d\d?):(\d\d?):(\d\d?)(\.\d+)/);
        return match ? +(1000 * (60 * (60 * +match[1] + +match[2]) + +match[3] + +match[4])) : null;
    }
}
exports.ConsoleTrace = ConsoleTrace;
class ConsoleTraceEntry {
}
exports.ConsoleTraceEntry = ConsoleTraceEntry;
//# sourceMappingURL=consoleTrace.js.map