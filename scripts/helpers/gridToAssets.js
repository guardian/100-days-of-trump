var request = require('sync-request');
var md5 = require('md5');
var imageSpecs = require('../image.json');
var keys = require('../../keys.json');

function getUrl(sourceUrl, size, retina = false, isTreatable) {
    var url = sourceUrl + '?w=' + size + '&q=40' + (retina ? '&dpr=2' : '') + (isTreatable ? '&bm=lighten&blend64=MWUzZjc0&balph=50&bri=4&con=20' : '') + '&auto=format&usm=12&fit=max';
        url = 'https://i.guim.co.uk/img/media' + url + '&s=' + md5(keys.imgixToken + url);
    return url;
}

function getUrls(sourceUrl, sizes, isTreatable) {
    var urls = {};
    for (var i = 0; i < sizes.length; i++) {
        urls[i] = {
            "url": getUrl(sourceUrl, sizes[i], false, isTreatable),
            "retinaUrl" : getUrl(sourceUrl, sizes[i], true, isTreatable),
            "minSize": ((sizes.length - 1 == i) ? '0' : parseInt(sizes[i + 1]) + 60)
        }
    }
    return urls;
}

module.exports = function gridToAssets(gridUrl, type, isTreatable, oldData) {
    if (gridUrl) {
        if (oldData && gridUrl === oldData.originalUrl) {
            return oldData;
        } else {
            console.log('getting an image...');
            var apiUrl = gridUrl.replace('https://media', 'https://api.media');
    
            var data = request('GET', apiUrl,{ headers: { 'X-Gu-Media-Key' : keys.gridApiKey}});
                data = JSON.parse(data.getBody('utf8')).data;
    
            var crop = apiUrl.split('?crop=')[1].split('_');
    
            for (var i = 0; i < data.exports.length; i++) {
                if (data.exports[i].specification.bounds.x == crop[0] &&
                    data.exports[i].specification.bounds.y == crop[1] &&
                    data.exports[i].specification.bounds.width == crop[2] &&
                    data.exports[i].specification.bounds.height == crop[3]) {
                    var sourceUrl = data.exports[i].master.file.replace('http://media.guim.co.uk', '');
                }
            }
    
            return {
                'sources': getUrls(sourceUrl, imageSpecs[type], isTreatable),
                'fallback': getUrl(sourceUrl, 900, false, isTreatable),
                'title': data.metadata.title,
                'credit': data.metadata.credit,
                'byline': data.metadata.byline,
                'originalUrl': gridUrl
            }
        }
    }
};
