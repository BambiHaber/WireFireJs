(function (rootObject) {
    rootObject.WF = rootObject.WF || {};
    WF.template = function (args) {
        return new Template(args);
    };
}(window));