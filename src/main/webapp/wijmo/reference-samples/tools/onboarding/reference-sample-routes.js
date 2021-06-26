var path = require("path")
var express = require('express');
var CWD = process.cwd();
function registerRoute(app, demoRootPath){
    app.use(path.posix.join(demoRootPath, "reference-samples"), express.static(path.join(CWD, "source", "demos", "en", "reference-samples")))
}

module.exports = {
    registerRoute: registerRoute
} 