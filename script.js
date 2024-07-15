let defaultZoom = 2

document.addEventListener('DOMContentLoaded', function() {

    const Overworld = L.tileLayer('MapTiles/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: 512 * Math.pow(defaultZoom, defaultZoom),
        noWrap: true,
        attribution: '<a href="https://github.com/Lemon4ik6484" target="_blank">Lemonnik6484</a>'
    });

    const MarkerIcon = L.icon({
        iconUrl: './marker.png',
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [0.5, 1]
    });

    // BUILDINGS //

    const Central = L.marker([-3126.25, 2210.75], {icon: MarkerIcon}).bindPopup("Central Station<br>Owned by: <img style='height: 12px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABTCAYAAABXlA9KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAOZSURBVHhe7Z1RbhoxEIZtoM1j6Q16g/YG5QjcoKkERCqrOkfIEbIVqVSSB3KD9AY5Ar1BjkAfkyZxZxYjJawDXmVZ7w7/J428RHkA/Hs8tseDAgAAAAAAAACwT2jX5jDfBp+U1n33EpSJtjeq/e8qTS8X7i/1wiSjGTUWtjv7nowW2SCrG2Y8PKHG+6Zh5VomAvOlS8/RaLn2KXD7FfFjMn2nHt5E/b5zAkjPzj+6R1AFVn9wT1HICYCmgD/uEVQBB4QR8U0BV64FO4ZigL+8GnAv6wNWAbu3uqwCmr8PoHU3nUyNe7URHnHa2lP3Mh513wdoGiYZHFLjHWnrRt4tvgBA+RQSwfioRy2QRqgIXIwDJGLGo2NqvB2/Mg7AqAVSCVnFGHMUdQMG7BgzHs6p8XY+G+KAJb6NoMbDS1ir426xgkhw57s53jvynxiQRmjnu+kBEGKmgMztt1rX2RHrNnQNdgNBeRRw+xj9a7x4FsDwF6t0O2rGyla07VLPzoJGPmGSwVdl23GOYO3DIv15UX8B0jq6T8ZfUm4EwV5v7IXcrmX9cOtj7xuHlWtmPLquX06gfuStVFAB6dn0s7p/G1UEvhiA1QkqJEvD69z1YuQH5DwAJ024R1ARWSJuJE+QEwC5BOQERiCWCPIxQPv2GF4gDjFE4N0HyN7Aw8EJRQP1u7rUYLKgLwCTDH+nk3Nc0JFGwdxFZC1JBCIAEAEgEQTkLq4MIhCK61hvp68bRCAUiABABAAiAAREAIqJYFnPCUijmCeoaWYReB0QAYAIAESw9/DRvLvL4O30dYMIBAIRAIgAQASAKFsEYm4H7wvZ3YHOXY9EEFTS16rWaXbHE8iiiCdw/wekUVAE3nMDTAENpsh0YLXGnU+phHoCk4xydw3gAQSQeQJrDwNudOVK40EAQuDKI1ptudqPm157gdf9s7k6SkAyAbHAMzAFCAMVUveYbfWduCYRtc+ABxDF4+YCmNoiBpBItg+QDLmyi3fkr8x3MLSxUGSd4Q+t7g/oA9moZdaiQ3M+9W4/pFAmfWfvRfxQFSs5tDQsbGkutzBH42IAHvl8xBlaGhasfqBSCzkMIrePzi8G7xCm6S9vfeQGrgL2fM4vCLn+y3Ry4XX/TAMFoLGUCYQ6P00nU1l5gRwDIADcbNTxN76jXx+NXAbyKgCBYJ5lYoieqc7tLHS5h30ACWg9pyh//lKgBwAAAAAAAAArlPoPl/0ECqML304AAAAASUVORK5CYII=' alt='CR logo' />Central Rail");

    // MAIN ZONES //

    const CentralOcean = L.polygon([
        [-2420, 1559],
        [-2423.5, 1676.25],
        [-2475.5, 1776.25],
        [-2487, 1793.5],
        [-2565.25, 1929.25],
        [-2621.75, 1975],
        [-2649.5, 1976],
        [-2659, 1983],
        [-2667.5, 1976.5],
        [-2730.5, 1934.3],
        [-2846, 1999],
        [-2846.5, 2047.0],
        [-2885.5, 2047.3],
        [-2886.25, 2170],
        [-2910.75, 2170.75],
        [-3170.75, 1886.25],
        [-3194.25, 1848],
        [-3268.75, 1860.75],
        [-3269, 1902],
        [-3361, 1938.5],
        [-3439.5, 1885.5],
        [-3467, 1855],
        [-3419, 1776.5],
        [-3282, 1758.5],
        [-3233.5, 1759.5],
        [-3175.75, 1653.25],
        [-3059.5, 1596],
        [-3026, 1700.5],
        [-2918, 1700.75],
        [-2723.75, 1615],
        [-2645, 1523],
        [-2596, 1385],
        [-2438.25, 1476.25]
    ], {color: '#D3FFCE', fillColor: '#065535'}).bindPopup("Central Ocean");

    // LAYER CONTROL //

    const stations = L.layerGroup([Central]);

    const regions = L.layerGroup([CentralOcean]);

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

    

});
