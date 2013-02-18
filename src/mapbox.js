var mapbox = {};

mapbox.HTTP_URLS = [
    'http://a.tiles.mapbox.com/v3/',
    'http://b.tiles.mapbox.com/v3/',
    'http://c.tiles.mapbox.com/v3/',
    'http://d.tiles.mapbox.com/v3/'];

mapbox.HTTPS_URLS = [];

// Return the base url of a specific version of MapBox's API.
//
// `hash`, if provided must be a number and is used to distribute requests
// against multiple `CNAME`s in order to avoid connection limits in browsers
mapbox.base = function(hash) {
    // By default, use public HTTP urls
    var urls = mapbox.HTTP_URLS;

    // Support HTTPS if the user has specified HTTPS urls to use, and this
    // page is under HTTPS
    if (window.location.protocol === 'https:' && mapbox.HTTPS_URLS.length) {
        urls = mapbox.HTTPS_URLS;
    }

    if (hash === undefined || typeof hash !== 'number') {
        return urls[0];
    } else {
        return urls[hash % urls.length];
    }
};

mapbox.browser = (function() {
    var browser = {};
    browser.cors = ("withCredentials" in new XMLHttpRequest());
    return browser;
})();

// Turn off Leaflet's advertisement.
L.Control.Attribution.prototype.options.prefix = '';
