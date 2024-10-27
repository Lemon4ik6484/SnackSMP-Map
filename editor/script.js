const defaultZoom = 1
const maxZoom = 8; //max is 12
const minZoom = 0; //min is 0

const tileSize = 256; //default 1024

const trueWord = 'YasIamAllowedToUseThisSite'

const API_KEY = 'AIzaSyC7opujheDheDJagCtkg9PGJNNariKwWrE';
const SPREADSHEET_ID = '1nLXyOXjPCIKNd-l3v9IQRRu6sXxzoIuXLpyBdMQugIY';

const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHv61Lw4mBzxeJpjIY1X1J6yXysWpsDbJtkXPn0cVcMqs78fW5FisraGL1wtuJ3UgM5w/exec';

const hashedTrueWord = CryptoJS.SHA256(trueWord);

function getUrl(range) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`
}

function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

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

const Icons = {};    

Icons.station = L.icon({
    iconUrl: '../waypoints/station.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});

Icons.base = L.icon({
    iconUrl: '../waypoints/base.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});

Icons.ocean = L.icon({
    iconUrl: '../waypoints/ocean.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});

Icons.memorial = L.icon({
    iconUrl: '../waypoints/memorial.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});

Icons.other = L.icon({
    iconUrl: '../waypoints/other.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});

Icons.terrain = L.icon({
    iconUrl: '../waypoints/terrain.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});


Icons.visual = L.icon({
    iconUrl: '../waypoints/visual.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 40]
});

const resolutions = [];//
for (let i = 0; i <= 12; i++) {//
    resolutions.push((tileSize * (1024 / tileSize) * 2) / (tileSize * Math.pow(2, i))); //
}//

const wgs84 = new L.Proj.CRS('EPSG:4326',//
    '+proj=longlat +datum=WGS84 +no_defs',//
    {//
        resolutions: resolutions,//
        origin: [-6448.5, 8560.5] // X Y
    }//
);//

document.addEventListener('DOMContentLoaded', function() {//

    var Overworld = L.tileLayer('../MapTiles/Overworld/{x},{y}.png', { //
        maxZoom: maxZoom,//
        minZoom: minZoom,//
        tileSize: (512 * Math.pow(2, 0)),//
        noWrap: true,//
        attribution: "Digital Agency"//
    }); //

    let editGroup = new L.FeatureGroup();
    let polygonsGroup = [];
    let markersGroup = [];

    let regionsGroup = L.layerGroup(polygonsGroup);
    let WPsGroup = L.layerGroup(markersGroup);

    let map = L.map('map', {//
        crs: wgs84,//
        layers: [Overworld, regionsGroup, WPsGroup]//
    }).setView([0, 0], defaultZoom);

    
    function createWaypoint(name, X, Y, type, text, id) {
        let marker = L.marker([Y*-1, X], {icon: Icons[type]}).bindPopup(createPopup(name, type, text, X, Y), {className:type});
        marker.id = id;
        markersGroup.push(marker);
        editGroup.addLayer(marker);
        marker.addTo(map);
    }

    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: editGroup
        },
        draw: {
            polygon: true,
            polyline: true,
            marker: false,
            rectangle: true,
            circle: false,
            circlemarker: false
        }
    });

    map.addControl(drawControl);

    var Maps = {
        "Overworld": Overworld
    };
    
    var WaypointTypes = {
        "Polygons": regionsGroup,
        "Waypoints": WPsGroup
    };

    function mapRedraw() {
        var zoom = map.getZoom();
        Overworld.options.tileSize = (tileSize * Math.pow(2, zoom - defaultZoom));
        Overworld.redraw();
    }

    map.on('zoom', function() {
        mapRedraw();
    });

    function send(coordinates, action, id = null, type) {
        const payload = {
            action: action,
            coordinates: coordinates,
            id: id,
            type: "type",
            name: "name",
            text: "text",
            markerType: type
        };

        fetch(GOOGLE_SHEETS_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "no-cors",
            body: JSON.stringify(payload)
        })
        .then(response => {
            console.info("Request sent: " + JSON.stringify(payload));
        })
        .catch(error => console.error("Error while sending data:", error));
    }

    function load() {
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

                editGroup.addLayer(polygon);
                polygonsGroup.push(polygon);
                map.addLayer(polygon)
            });
        })
        .catch(error => console.error("Error while obtaining polygon data:", error));

        fetch(getUrl("Waypoints!B2:I500"))
        .then(response => response.json())
        .then(data => {
            console.log('Obtained waypoint data:', data);
            const rows = data.values;
            rows?.forEach(row => {
                if (row != [] && row[0]) {
                    createWaypoint(row[0], row[1], row[2], row[3], row[4], row[7]);
                }
            });
        })
        .catch(error => {
            alert('Error while obtaining waypoint data:', error);
            console.error(error);
        });
    }

    map.on('draw:created', function (event) {
        const layer = event.layer;
        regionsGroup.addLayer(layer);

        let type;
        let coordinates = layer.getLatLngs();
        if (layer instanceof L.Polyline) {
            type = "polyline";
        } else {
            type = "polygon";
        }

        const layerId = new Date().getTime();
        layer.id = layerId;

        send(coordinates, 'create', layerId, type);
        
        alert("Data sent!")
    });

    map.on('draw:edited', function (event) {
        event.layers.eachLayer(function (layer) {
            const layerId = layer.id;

            let coordinates;
            let type;
            if (layer instanceof L.Marker) {
                coordinates = layer.getLatLng();
                type = "marker";
            } else {
                coordinates = layer.getLatLngs();
                type = "polygon";
            }

            send(coordinates, 'update', layerId, type);
        });
        alert("Data sent!")
    });

    map.on('draw:deleted', function (event) {
        event.layers.eachLayer(function (layer) {
            const layerId = layer.id;

            let type;
            if (layer instanceof L.Marker) {type = "marker";} else {type = "polygon";};

            send(null, 'delete', layerId, type);
        });
        alert("Data sent!")
    });

    map.on('mousemove', function(e) {
        const coords = e.latlng;
        document.getElementById('coords').innerText = `Coordinates: ${Math.floor(e.latlng["lng"]+0.5).toString() + " " + Math.floor((e.latlng["lat"]-0.5) * -1).toString()}`;
    });

    var param = getQueryParam('pass');
    if (param) {
        if (JSON.stringify(hashedTrueWord) === JSON.stringify(CryptoJS.SHA256(param))) {
            alert("autorisation success!")

            mapRedraw();
            load();
    
            var layerControl = L.control.layers(Maps, WaypointTypes).addTo(map);
        } else {
            window.location.href = "../";
        }
    } else {
        window.location.href = "../";
    }
});
