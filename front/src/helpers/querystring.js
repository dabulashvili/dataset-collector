export default function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).filter(function(key) {
            return json[key] !== undefined
        }).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}
