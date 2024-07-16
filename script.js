let defaultZoom = 2

document.addEventListener('DOMContentLoaded', function() {

    // Tiles //

    const Overworld = L.tileLayer('MapTiles/Overworld/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: 512 * Math.pow(defaultZoom, defaultZoom),
        noWrap: true,
        attribution: '<a href="https://github.com/Lemon4ik6484" target="_blank">Lemonnik6484</a>'
    });

    const Nether = L.tileLayer('MapTiles/Nether/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: 512 * Math.pow(defaultZoom, defaultZoom),
        noWrap: true,
        attribution: '<a href="https://github.com/Lemon4ik6484" target="_blank">Lemonnik6484</a>'
    });

    const End = L.tileLayer('MapTiles/End/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: 512 * Math.pow(defaultZoom, defaultZoom),
        noWrap: true,
        attribution: '<a href="https://github.com/Lemon4ik6484" target="_blank">Lemonnik6484</a>'
    });

    // WAYPOINT ICONS //

    const aqua = L.icon({
        iconUrl: './waypoints/aqua.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const black = L.icon({
        iconUrl: './waypoints/black.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const blue = L.icon({
        iconUrl: './waypoints/blue.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const dark_aqua = L.icon({
        iconUrl: './waypoints/dark_aqua.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const dark_blue = L.icon({
        iconUrl: './waypoints/dark_blue.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const dark_gray = L.icon({
        iconUrl: './waypoints/dark_gray.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const dark_green = L.icon({
        iconUrl: './waypoints/dark_green.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const dark_purple = L.icon({
        iconUrl: './waypoints/dark_purple.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const dark_red = L.icon({
        iconUrl: './waypoints/dark_red.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const gold = L.icon({
        iconUrl: './waypoints/gold.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const gray = L.icon({
        iconUrl: './waypoints/gray.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const green = L.icon({
        iconUrl: './waypoints/green.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const light_purple = L.icon({
        iconUrl: './waypoints/light_purple.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const red = L.icon({
        iconUrl: './waypoints/red.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const white = L.icon({
        iconUrl: './waypoints/white.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    const yellow = L.icon({
        iconUrl: './waypoints/yellow.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    // WAYPOINTS //

    const Central = L.marker([-3126.25, 2210.75], {icon: white}).bindPopup("Central Station<br>Owned by: <img style='height: 12px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABTCAYAAABXlA9KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAOZSURBVHhe7Z1RbhoxEIZtoM1j6Q16g/YG5QjcoKkERCqrOkfIEbIVqVSSB3KD9AY5Ar1BjkAfkyZxZxYjJawDXmVZ7w7/J428RHkA/Hs8tseDAgAAAAAAAACwT2jX5jDfBp+U1n33EpSJtjeq/e8qTS8X7i/1wiSjGTUWtjv7nowW2SCrG2Y8PKHG+6Zh5VomAvOlS8/RaLn2KXD7FfFjMn2nHt5E/b5zAkjPzj+6R1AFVn9wT1HICYCmgD/uEVQBB4QR8U0BV64FO4ZigL+8GnAv6wNWAbu3uqwCmr8PoHU3nUyNe7URHnHa2lP3Mh513wdoGiYZHFLjHWnrRt4tvgBA+RQSwfioRy2QRqgIXIwDJGLGo2NqvB2/Mg7AqAVSCVnFGHMUdQMG7BgzHs6p8XY+G+KAJb6NoMbDS1ir426xgkhw57s53jvynxiQRmjnu+kBEGKmgMztt1rX2RHrNnQNdgNBeRRw+xj9a7x4FsDwF6t0O2rGyla07VLPzoJGPmGSwVdl23GOYO3DIv15UX8B0jq6T8ZfUm4EwV5v7IXcrmX9cOtj7xuHlWtmPLquX06gfuStVFAB6dn0s7p/G1UEvhiA1QkqJEvD69z1YuQH5DwAJ024R1ARWSJuJE+QEwC5BOQERiCWCPIxQPv2GF4gDjFE4N0HyN7Aw8EJRQP1u7rUYLKgLwCTDH+nk3Nc0JFGwdxFZC1JBCIAEAEgEQTkLq4MIhCK61hvp68bRCAUiABABAAiAAREAIqJYFnPCUijmCeoaWYReB0QAYAIAESw9/DRvLvL4O30dYMIBAIRAIgAQASAKFsEYm4H7wvZ3YHOXY9EEFTS16rWaXbHE8iiiCdw/wekUVAE3nMDTAENpsh0YLXGnU+phHoCk4xydw3gAQSQeQJrDwNudOVK40EAQuDKI1ptudqPm157gdf9s7k6SkAyAbHAMzAFCAMVUveYbfWduCYRtc+ABxDF4+YCmNoiBpBItg+QDLmyi3fkr8x3MLSxUGSd4Q+t7g/oA9moZdaiQ3M+9W4/pFAmfWfvRfxQFSs5tDQsbGkutzBH42IAHvl8xBlaGhasfqBSCzkMIrePzi8G7xCm6S9vfeQGrgL2fM4vCLn+y3Ry4XX/TAMFoLGUCYQ6P00nU1l5gRwDIADcbNTxN76jXx+NXAbyKgCBYJ5lYoieqc7tLHS5h30ACWg9pyh//lKgBwAAAAAAAAArlPoPl/0ECqML304AAAAASUVORK5CYII=' alt='CR logo' />Central Rail");

    // ZONES //

    const CentralOcean = L.polygon([
        [-2420, 1559],
        [-2423.5, 1676.25],
        [-2475.5, 1776.25],
        [-2487, 1793.5],
        [-2565.25, 1929.25],
        [-2621.75, 1975],
        [-2664.125, 1979.375],
        [-2730.5, 1934.3],
        [-2846, 1999],
        [-2846.5, 2047.0],
        [-2885.5, 2047.3],
        [-2886.25, 2170],
        [-2910.75, 2170.75],
        [-2922, 2188.5],
        [-2983.3125, 2196.0625],
        [-3080.5, 2127.5],
        [-3094, 2122.25],
        [-3151.25, 2173.75],
        [-3163, 2199.5],
        [-3222, 2200.75],
        [-3248.25, 2175.25],
        [-3282.647519, 2177.732986],
        [-3320.25, 2140.125],
        [-3316.75, 2133.125],
        [-3315.5, 2087.5],
        [-3338.625, 2064.75],
        [-3303, 2018.625],
        [-3302.5, 2004.25],
        [-3286.125, 1987.625],
        [-3257.346691, 1988.327043],
        [-3227.75, 1977.25],
        [-3200.261804, 1956.949375],
        [-3186.25, 1908.75],
        [-3173.5, 1903.25],
        [-3172.25, 1871.5],
        [-3194.5, 1846.75],
        [-3267.072372, 1860.244555],
        [-3267.024642, 1903.422119],
        [-3311.75, 1910],
        [-3343.75, 1934.75],
        [-3378.25, 1932],
        [-3386.75, 1911.25],
        [-3432, 1907],
        [-3456.75, 1876.75],
        [-3474.5, 1856.5625],
        [-3437.75, 1782],
        [-3415.5, 1774.0625],
        [-3354.49954, 1721.56398],
        [-3334.54798, 1742.00014],
        [-3253.5, 1756],
        [-3113.5, 1581.875],
        [-3050.875, 1586],
        [-3030.625, 1679.5],
        [-2915.9375, 1694.0625],
        [-2821.206101, 1665.729182],
        [-2738.062616, 1625.252124],
        [-2641.25, 1510],
        [-2596.5, 1383.125],
        [-2412.75, 1478.875]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Central Ocean");

    const Westbeach = L.polygon([
        [-3415.1875, 1774.125],
        [-3418.5, 1736],
        [-3447.5, 1679.75],
        [-3517.5, 1686],
        [-3684.5, 1633.5],
        [-3659.5, 1535],
        [-3496, 1361],
        [-3322.5, 1207],
        [-3224, 1216.5],
        [-3099.5, 1295.5],
        [-2986.5, 1311.5],
        [-2797, 1347],
        [-2746.75, 1320],
        [-2731, 1284],
        [-2618, 1279.25],
        [-2586, 1166],
        [-2542.5, 1187],
        [-2483, 1180.5],
        [-2399, 1208.25],
        [-2413.25, 1260.75],
        [-2462.25, 1292.125],
        [-2465, 1334.25],
        [-2366.75, 1372],
        [-2412.8125, 1478.875],
        [-2596.5, 1383],
        [-2641.5, 1510],
        [-2738.5, 1626.5],
        [-2822, 1666],
        [-2916, 1694],
        [-3030.5, 1679.5],
        [-3051, 1586],
        [-3113.5, 1582],
        [-3253.5, 1756],
        [-3334.5, 1742],
        [-3354.5, 1721.5]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Westbeach");

    const CentralPlains = L.polygon([
        [-2621.75, 1975],
        [-2621.363016, 2093.638975],
        [-2570.5, 2081.75],
        [-2539.5, 2127],
        [-2540, 2256.25],
        [-2581.34314, 2340.641793],
        [-2712.5, 2254],
        [-2755.25, 2247.5],
        [-2793, 2294.5],
        [-2760.5, 2387.75],
        [-2837, 2468.5],
        [-2869.25, 2408.5],
        [-2984.25, 2411.75],
        [-3081, 2368],
        [-3202, 2368],
        [-3262.25, 2372],
        [-3317.25, 2390.25],
        [-3389, 2369.25],
        [-3333.25, 2186.25],
        [-3320.125, 2140.125],
        [-3282.625, 2177.625],
        [-3248.75, 2175],
        [-3221.75, 2201],
        [-3162.9375, 2199.5],
        [-3151.25, 2173.625],
        [-3094, 2122.25],
        [-3080.4375, 2127.5],
        [-2983.25, 2196],
        [-2921.75, 2189],
        [-2911, 2170.5],
        [-2886.75, 2170],
        [-2885.75, 2047.25],
        [-2846.5, 2047.25],
        [-2845.75, 1998.75],
        [-2730.250028, 1934.250215],
        [-2664.25, 1979.25]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Central Plains");

    const Middlesea = L.polygon([
        [-3320.125, 2140.1875],
        [-3388.9375, 2369.1875],
        [-3584.5, 2309],
        [-3656, 2160.5],
        [-3605.25, 1996.25],
        [-3688.5, 1874.5],
        [-3741.5, 1866],
        [-3813.5, 1811.5],
        [-3788.25, 1736],
        [-3719.25, 1633.5],
        [-3684.5, 1633.75],
        [-3517.5, 1686],
        [-3447.5, 1679.5],
        [-3418.25, 1736],
        [-3415.5, 1774],
        [-3437.5, 1781.75],
        [-3474.5, 1856.5],
        [-3431.75, 1906.5],
        [-3387, 1911],
        [-3378.375, 1932.375],
        [-3343.875, 1934.875],
        [-3311.75, 1910],
        [-3266.875, 1903.5],
        [-3267, 1860.25],
        [-3194.5, 1847],
        [-3172.25, 1871.625],
        [-3173.5, 1903.25],
        [-3186.25, 1909],
        [-3200.125, 1957],
        [-3228, 1977.5],
        [-3257.505766, 1988.719767],
        [-3286.542532, 1987.850049],
        [-3302.5, 2004.3125],
        [-3302.75, 2018.75],
        [-3338.625, 2064.875],
        [-3315.375, 2087.625],
        [-3316.75, 2133.125]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Middlesea");

    // LAYER CONTROL //

    const stations = L.layerGroup([Central]);

    const regions = L.layerGroup([CentralOcean, Westbeach, CentralPlains, Middlesea]);

    const map = L.map('map', {
        crs: L.CRS.Simple,
        layers: [Overworld, regions]
    }).setView([-3150, 2250], defaultZoom);

    const Maps = {
        "Overworld": Overworld
    };
    
    const Waypoints = {
        "Stations": stations,
        "Regions": regions
    };

    const layerControl = L.control.layers(Maps, Waypoints).addTo(map);

    // EVENTS //

    map.on('zoom', function() {
        const zoom = map.getZoom();
        Overworld.options.tileSize = 512 * Math.pow(defaultZoom, zoom);
        Overworld.redraw();
    });

    const popup = L.popup();

    map.on('click', function(e) {
        popup
            .setLatLng(e.latlng)
            .setContent(e.latlng.toString())
            .openOn(map);
    });

});
