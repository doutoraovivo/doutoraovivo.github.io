"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = exports.LogItemType = void 0;
var LogItemType;
(function (LogItemType) {
    LogItemType["Connection"] = "Connection";
    LogItemType["SendData"] = "SendData";
    LogItemType["GetData"] = "GetData";
    LogItemType["Error"] = "Error";
})(LogItemType = exports.LogItemType || (exports.LogItemType = {}));
;
class WebsocketClient {
    constructor(websocketUrl) {
        this.websocketUrl = websocketUrl;
        this.onOpenConnection = this.onOpenConnection.bind(this);
        this.onCloseConnection = this.onCloseConnection.bind(this);
        this.onErrorConnection = this.onErrorConnection.bind(this);
        this.onMessageConnection = this.onMessageConnection.bind(this);
        this.logs = [];
    }
    get logItems() {
        return this.logs;
    }
    connect(websocketUrl) {
        this.websocketUrl = websocketUrl || this.websocketUrl;
        this.logDataItem(`Connecting to ${this.websocketUrl}`, LogItemType.Connection);
        this.websocket = new WebSocket(this.websocketUrl);
        this.websocket.onopen = this.onOpenConnection;
        this.websocket.onclose = this.onCloseConnection;
        this.websocket.onerror = this.onErrorConnection;
        this.websocket.onmessage = this.onMessageConnection;
    }
    disconnect() {
        this.logDataItem(`Disconnecting from ${this.websocketUrl}`, LogItemType.Connection);
        if (this.websocket) {
            this.websocket.close();
        }
    }
    clearLogs() {
        this.logs = [];
        if (this.onLogItem) {
            this.onLogItem(null);
        }
    }
    send(data) {
        this.logDataItem(data.toString(), LogItemType.SendData);
        if (this.websocket) {
            this.websocket.send(data);
        }
    }
    onOpenConnection(event) {
        this.logDataItem("Connected", LogItemType.Connection);
        this.isConnected = true;
        if (this.onOpen) {
            this.onOpen("Connected");
        }
    }
    onCloseConnection(event) {
        this.logDataItem("Disconnected", LogItemType.Connection);
        this.isConnected = false;
        if (this.onClose) {
            this.onClose(event);
        }
    }
    onErrorConnection(event) {
        this.logDataItem(event.data || "Error", LogItemType.Error);
        if (this.onError) {
            this.onError(event.data);
        }
    }
    logDataItem(data, logType) {
        const item = {
            logTime: this.getTime(),
            logData: data,
            logType: logType
        };
        this.logs.unshift(item);
        if (this.onLogItem) {
            this.onLogItem(item);
        }
    }
    onMessageConnection(event) {
        this.logDataItem(event.data, LogItemType.GetData);
        if (this.onMessage) {
            this.onMessage(event);
        }
    }
    getTime() {
        const now = new Date();
        let hour = now.getHours().toString();
        let minute = now.getMinutes().toString();
        let second = now.getSeconds().toString();
        let mSecond = now.getMilliseconds().toString();
        if (hour.length == 1) {
            hour = '0' + hour;
        }
        if (minute.length == 1) {
            minute = '0' + minute;
        }
        if (second.length == 1) {
            second = '0' + second;
        }
        return `${hour}:${minute}:${second}.${mSecond}`;
    }
}
exports.WebsocketClient = WebsocketClient;
//# sourceMappingURL=websocketClient.js.map