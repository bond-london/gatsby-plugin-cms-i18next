const { onCreateNode } = require("./dist/plugin/onCreateNode");
const { onCreatePage } = require("./dist/plugin/onCreatePage");
const { pluginOptionsSchema } = require("./dist/plugin/pluginOptionsSchema");

exports.onCreateNode = onCreateNode;
exports.onCreatePage = onCreatePage;
exports.pluginOptionsSchema = pluginOptionsSchema;
