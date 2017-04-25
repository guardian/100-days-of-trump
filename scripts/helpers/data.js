var request = require('sync-request');
var fs = require('fs-extra');
var marked = require('marked');

var data;

module.exports = function getData() {
    data = require('../../scripts/local.json');
    data = data.sheets;

    for (var i in data.Body) {
        data.Body[i].copy = marked(data.Body[i].copy);
    }

    return data;
};