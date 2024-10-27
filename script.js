const defaultZoom = 1
const maxZoom = 8; //max is 12
const minZoom = 0; //min is 0

const tileSize = 256; //default 1024

const attribution = '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0i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">Digital Agency</a>';

const resolutions = [];
for (let i = 0; i <= 12; i++) {
    resolutions.push((tileSize * (1024 / tileSize) * 2) / (tileSize * Math.pow(2, i))); 
}

const wgs84 = new L.Proj.CRS('EPSG:4326',
    '+proj=longlat +datum=WGS84 +no_defs',
    {
        resolutions: resolutions,
        origin: [-6448.5, 8560.5] // X Y
    }
);

document.addEventListener('DOMContentLoaded', function() {

    function getQueryParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function saveMapBounds() {
        var currentBounds = map.getBounds()

        var _southWestlat = currentBounds['_southWest'].lat
        var _southWestlng = currentBounds['_southWest'].lng

        var _northEastlat = currentBounds['_northEast'].lat
        var _northEastlng = currentBounds['_northEast'].lng

        localStorage.setItem("_southWestlat", _southWestlat);
        localStorage.setItem("_southWestlng", _southWestlng);
        localStorage.setItem("_northEastlat", _northEastlat);
        localStorage.setItem("_northEastlng", _northEastlng);
    }

    function loadMapBounds() {
        var _southWestlat = localStorage.getItem("_southWestlat");
        var _southWestlng = localStorage.getItem("_southWestlng");
        var _northEastlat = localStorage.getItem("_northEastlat");
        var _northEastlng = localStorage.getItem("_northEastlng");

        var _southWest = L.latLng(_southWestlat, _southWestlng);
        var _northEast = L.latLng(_northEastlat, _northEastlng);

        var boundsToLoad = L.latLngBounds(_southWest, _northEast);

        if (Object.keys(boundsToLoad).length > 0) {
            map.fitBounds(boundsToLoad);
            mapRedraw();
        } else {
            saveMapBounds();
        }
        
    }

    function loadLayers() {
        Groups.forEach(item => {
            if (localStorage.getItem(item.name) === "true") {
                map.addLayer(item.group);
            } else {
                map.removeLayer(item.group);
            }
        });
    }

    // Tiles //

    var Overworld = L.tileLayer('./MapTiles/Overworld/{x},{y}.png', {
        maxZoom: maxZoom,
        minZoom: minZoom,
        tileSize: (512 * Math.pow(2, 0)),
        noWrap: true,
        attribution: attribution
    });

    var Nether = L.tileLayer('./MapTiles/Nether/{x},{y}.png', {
        maxZoom: maxZoom,
        minZoom: minZoom,
        tileSize: tileSize,
        noWrap: true,
        attribution: attribution
    });

    var End = L.tileLayer('./MapTiles/End/{x},{y}.png', {
        maxZoom: maxZoom,
        minZoom: minZoom,
        tileSize: tileSize,
        noWrap: true,
        attribution: attribution
    });

    // WAYPOINT ICONS //

    const Icons = {};    

    Icons.station = L.icon({
        iconUrl: './waypoints/station.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.stationSmall = L.icon({
        iconUrl: './waypoints/station_small.png',
        iconSize: [16, 16], 
        iconAnchor: [8, 8],
        popupAnchor: [0, 40]
    });

    Icons.base = L.icon({
        iconUrl: './waypoints/base.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.baseSmall = L.icon({
        iconUrl: './waypoints/base_small.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, 40]
    });

    Icons.ocean = L.icon({
        iconUrl: './waypoints/ocean.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.oceanSmall = L.icon({
        iconUrl: './waypoints/ocean_small.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, 40]
    });

    Icons.memorial = L.icon({
        iconUrl: './waypoints/memorial.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.memorialSmall = L.icon({
        iconUrl: './waypoints/memorial_small.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, 40]
    });

    Icons.other = L.icon({
        iconUrl: './waypoints/other.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.otherSmall = L.icon({
        iconUrl: './waypoints/other_small.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, 40]
    });

    Icons.terrain = L.icon({
        iconUrl: './waypoints/terrain.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.terrainSmall = L.icon({
        iconUrl: './waypoints/terrain_small.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, 40]
    });

    Icons.visual = L.icon({
        iconUrl: './waypoints/visual.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    Icons.visualSmall = L.icon({
        iconUrl: './waypoints/visual_small.png',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, 40]
    });

    // WAYPOINTS //

    const Waypoints = {}

    var stations = []
    var memorials = []
    var bases = []
    var oceans = []
    var others = []
    var terrains = []
    var visuals = []

    function createPopup(Name, Type, Text, X=null, Y=null) {
        return `<div class='horizontal'>
                    <img class='wp-logo' style='height: 20px;' src='${Type === "station" ? "../CR.png" : "../waypoints/" + Type + ".png"}'/>
                    <p class='wp-title'>` + Name + `</p>
                </div>
                <div class='horizontal'>
                    ${Type === "station" ? "<p class='wp-text gray'>Lines: </p>" : ""}
                    ${Text ? "<p class='wp-text'>" + Text + "</p>" : ""}
                </div>
                ${X && Y ? `<p class='wp-text gray'>XY: ${X} ${Y}</p>` : ""}
                `
    }

    function createWaypoint(name, X, Y, type, text) {
        let id = name + "_" + type
        Waypoints[id] = L.marker([Y*-1, X], {icon: Icons[type]}).bindPopup(createPopup(name, type, text, X, Y), {className:type});
        Waypoints[id].addTo(map);

        switch (type) {
            case "station":
                stations.push(Waypoints[id]);
                break
            case "memorial":
                memorials.push(Waypoints[id]);
                break
            case "ocean":
                oceans.push(Waypoints[id]);
                break
            case "base":
                bases.push(Waypoints[id]);
                break
            case "other":
                others.push(Waypoints[id]);
                break
            case "terrain":
                terrains.push(Waypoints[id]);
                break
            case "visual":
                visuals.push(Waypoints[id]);
                break
        }
    }

    const API_KEY = 'AIzaSyC7opujheDheDJagCtkg9PGJNNariKwWrE';
    const SPREADSHEET_ID = '1nLXyOXjPCIKNd-l3v9IQRRu6sXxzoIuXLpyBdMQugIY';

    function getUrl(range) {
        return `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`
    }

    var regions = []

    fetch(getUrl("Polygons!A2:Z500"))
    .then(response => response.json())
    .then(data => {
        const rows = data.values;
        rows?.forEach(row => {
            const layerId = row[0];
            const type = row[1];
            const name = row[2];
            const text = row[3];
            const markerType = row[4];
            const coordinates = JSON.parse(row[5]);

            let polygon;
            if (markerType === 'polygon') {
                polygon = L.polygon(coordinates).bindPopup(createPopup(name, type, text), { className: type });
            } else {
                polygon = L.polyline(coordinates).bindPopup(createPopup(name, type, text), { className: type });
            }

            polygon.id = layerId;
            polygon.options.customAttributes = {
                type: type,
                name: name,
                text: text
            };

            regions.push(polygon);
            map.addLayer(polygon)
        });
    })
    .catch(error => console.error("Error while obtaining polygon data:", error));
    
    fetch(getUrl("Waypoints!B2:F500"))
    .then(response => response.json())
    .then(data => {
        console.log('Obtained waypoint data:', data);
        const rows = data.values;
        rows?.forEach(row => {
            if (row != [] && row[0]) {
                createWaypoint(row[0], row[1], row[2], row[3], row[4], row[7]);
            }
        });

        var WaypointParam = getQueryParam('waypoint');
        if (WaypointParam) {
            var Coords = Waypoints[WaypointParam].getLatLng();
            map.setView([Coords.lat, Coords.lng], 2);
            mapRedraw();
            Waypoints[WaypointParam].openPopup();
        } else {
            loadMapBounds()
            loadLayers()
        }
    })
    .catch(error => {
        alert('Error while obtaining waypoint data:', error);
        console.error(error);
    });

    // LAYER CONTROL //

    var stationsGroup = L.layerGroup(stations);

    var regionsGroup = L.layerGroup(regions);

    var memorialsGroup = L.layerGroup(memorials);

    var basesGroup = L.layerGroup(bases);

    var oceansGroup = L.layerGroup(oceans);

    var othersGroup = L.layerGroup(others);

    var terrainsGroup = L.layerGroup(terrains);

    var visualsGroup = L.layerGroup(visuals);

    var Groups = [
        { group: stationsGroup, name: 'stations' },
        { group: regionsGroup, name: 'regions' },
        { group: memorialsGroup, name: 'memorials' },
        { group: basesGroup, name: 'bases' },
        { group: oceansGroup, name: 'oceans' },
        { group: othersGroup, name: 'others' },
        { group: terrainsGroup, name: 'terrains' },
        { group: visualsGroup, name: 'Visual. ads'}
    ];

    var map = L.map('map', {
        crs: wgs84,
        layers: [Overworld, regionsGroup, stationsGroup]
    }).setView([-3150, 2250], defaultZoom);

    var Maps = {
        "Overworld": Overworld,
        "Nether": Nether,
        "The End": End
    };
    
    var WaypointTypes = {
        "Regions": regionsGroup,
        "Stations": stationsGroup,
        "Memorials": memorialsGroup,
        "Bases/Towns": basesGroup,
        "Bays/Lakes": oceansGroup,
        "Terrain": terrainsGroup,
        "Visual. ads": visualsGroup,
        "Other": othersGroup
    };

    var layerControl = L.control.layers(Maps, WaypointTypes).addTo(map);

    // EVENTS/FUNCTIONS //

    function mapRedraw() {
        var zoom = map.getZoom();
        Overworld.options.tileSize = (tileSize * Math.pow(2, zoom - defaultZoom));
        Overworld.redraw();
    }

    map.on('zoom', function() {
        mapRedraw();
    });

    map.on('zoomend', function() {
        var zoomLevel = map.getZoom();
        
        if (zoomLevel < 1) {
            stations?.forEach(waypoint => waypoint.setIcon(Icons.stationSmall));
            memorials?.forEach(waypoint => waypoint.setIcon(Icons.memorialSmall));
            bases?.forEach(waypoint => waypoint.setIcon(Icons.baseSmall));
            oceans?.forEach(waypoint => waypoint.setIcon(Icons.oceanSmall));
            terrains?.forEach(waypoint => waypoint.setIcon(Icons.terrainSmall));
            visuals?.forEach(waypoint => waypoint.setIcon(Icons.visualSmall));
            others?.forEach(waypoint => waypoint.setIcon(Icons.otherSmall));
        } else {
            stations?.forEach(waypoint => waypoint.setIcon(Icons.station));
            memorials?.forEach(waypoint => waypoint.setIcon(Icons.memorial));
            bases?.forEach(waypoint => waypoint.setIcon(Icons.base));
            oceans?.forEach(waypoint => waypoint.setIcon(Icons.ocean));
            terrains?.forEach(waypoint => waypoint.setIcon(Icons.terrain));
            visuals?.forEach(waypoint => waypoint.setIcon(Icons.visual));
            others?.forEach(waypoint => waypoint.setIcon(Icons.other));
        };

        saveMapBounds()
    });

    map.on('moveend', function() {
        saveMapBounds()
    });

    map.on('click', function(e) {
        L.popup()
            .setLatLng(e.latlng)
            .setContent(Math.floor(e.latlng["lng"]+0.5).toString() + " " + Math.floor((e.latlng["lat"]-0.5) * -1).toString())
            .openOn(map)
    });

    map.on('mousemove', function(e) {
        const coords = e.latlng;
        document.getElementById('coords').innerText = `Coordinates: ${Math.floor(e.latlng["lng"]+0.5).toString() + " " + Math.floor((e.latlng["lat"]-0.5) * -1).toString()}`;
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === "Backspace") {
            map.closePopup();
        }    
    });

    // Layer Groups Events

    Groups.forEach(item => item.group.on('add', function(){
        localStorage.setItem(item.name, true);
    }));

    Groups.forEach(item => item.group.on('remove', function(){
        localStorage.setItem(item.name, false);
    }));
});
