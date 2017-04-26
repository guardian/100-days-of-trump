var request = require('sync-request');
var fs = require('fs-extra');
var marked = require('marked');

var data;

module.exports = function getData() {
    data = require('../../scripts/local.json');
    data = data.sheets;

    data.Graphics = {};

    for (var i in data.Body) {
        data.Body[i].copy = marked(data.Body[i].copy);
        data.Body[i].handle = data.Body[i].section.replace(/ /g, '-').toLowerCase();

        data.Graphics[i] = {
            type: data.Body[i].graphic !== '' ? data.Body[i].graphic : '',
            handle: data.Body[i].handle,
            title: data.Body[i].chartTitle
        }
    }

    return data;
};