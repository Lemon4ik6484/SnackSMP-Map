let defaultZoom = 1

document.addEventListener('DOMContentLoaded', function() {

    // Tiles //

    const Overworld = L.tileLayer('MapTiles/Overworld/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: (512 * Math.pow(2, 0)) * 2,
        noWrap: true,
        attribution: '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0i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">Digital Agency</a>'
    });

    const Nether = L.tileLayer('MapTiles/Nether/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: (512 * Math.pow(2, 0)) * 2,
        noWrap: true,
        attribution: '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0i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">Digital Agency</a>'
    });

    const End = L.tileLayer('MapTiles/End/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: (512 * Math.pow(2, 0)) * 2,
        noWrap: true,
        attribution: '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0i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">Digital Agency</a>'
    });

    // WAYPOINT ICONS //

    const station = L.icon({
        iconUrl: './waypoints/station.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 40]
    });

    const stationSmall = L.icon({
        iconUrl: './waypoints/station_small.png',
        iconSize: [16, 16], 
        iconAnchor: [8, 8],
        popupAnchor: [0, 40]
    });

    const base = L.icon({
        iconUrl: './waypoints/base.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 0]
    });

    const baseSmall = L.icon({
        iconUrl: './waypoints/base_small.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, 0]
    });

    const ocean = L.icon({
        iconUrl: './waypoints/ocean.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 0]
    });

    const oceanSmall = L.icon({
        iconUrl: './waypoints/ocean_small.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, 0]
    });

    const memorial = L.icon({
        iconUrl: './waypoints/memorial.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 0]
    });

    const memorialSmall = L.icon({
        iconUrl: './waypoints/memorial_small.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, 0]
    });

    const other = L.icon({
        iconUrl: './waypoints/other.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 0]
    });

    const otherSmall = L.icon({
        iconUrl: './waypoints/other_small.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, 0]
    });

    // WAYPOINTS //

    const Central = L.marker([-3126.25, 2210.75], {icon: station}).bindPopup("Central Station<br><div>Owned by: <img style='height: 12px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABTCAYAAABXlA9KAAAD00lEQVR4nO3dQW7bRhQG4DeU5S7DGzQ9QXSDaBkUKOAjsAtShkxKTzfwDTQuhSCygYK9QXoDL4sCBeQbuKuuCkjbyOJkEaNBTckcIqYeOfy/pUxDA/HXzHA4fCICAAAAAACADlGH/sDjcECeOjtuczpCmXvqbT9qna2lm7IXx1FmoFaTOFrzOBxIn+sCjqNL6Q+nKyZxtGYOfMnz7RVeMQbd/pFcpctXtOuLft6FAMwX129kmtJRRr2WfPtCAGZxdCfTlI5S5l7y7YtDgFIfRVrSQdNktKHeVvTz7j194Y8//7rd/PvPD+9+/Kl5M1SHTJPRxsvNUKe/ivYADqwDKH+efpjaHDlNRhuPSNffphJNXwdoG07CwPbSi+ORfADg5VULwflQur1QA9sQcBxl0m2FmvBFxGUBmMQRxl6X2dzLYD4XXYCBmvFFuMI8oFxxIcgBPA4HuZJdYgUhPA4Hkzhalw0B0u2EGtiefL4IV9JtbQpnhgAeh4PcU7dX6fJV6cFeA1YD4eXYfvPx7S86eC+A/rsf0BPdsVIu93OizOqbT0SzSfQzmZ7MDZh8t9bvbxoVwL0B4Dg6IyI9T5ffH79J7pvF0R15pHV607wVSY7PhzZdKXw7jqPb5u0JVDsWaUkHzdPlW9r2RUNQGAIMrpGPbhZHd9TfDiX2BxR6gGky2hy7EV03X1y/keoJCgHwiLAnUIBUCIpzgJNPjF5AhkQI9l8GcuDTw3eXRAYbQ1/QPF2+tTluNol+1+lNC/ZjQiXVtq1h15KTEAJACMBu7yJC4LgqdRgQAkchBIAQAEIACAFQ9RBcSrcXalApBEkYSLcXaoAQAEIACEHnMQd+2YOuCIHjEAJACAAhgBpC4MzTwV2hdbam/nZoW9I3N0o3siw9fJsqPQGeiHZUpRAcuG+AIaDFqgwHORGe+XSVbU/w+Nj//6AHcIDW2ZoMBeVPdKlCaTwEwBH6/c3KU6akm8eTXs57bghAidwOKJsLPD0eQ4BjUCG1w8rqO3Ec3T79H/QALjG75wtgKlOYA5zU2R44DubAp10/m/9S+puPheovrQ0Ac+DT9jQgRQ0vZFm71/kDnVkVyhT+iboXw0kY2JaGhS8OPUjSujkAc+DnRmnb0rDwWPntxNt7M6h9Q8D2NLha4ORX4SnDWn/YWx+5fQHAmF/JLBn9pheHaxK3bgggQ1jOtDRLzq/04vrZLWHPlotvIubAzx9O7zEHOGyWjP4mItaL69JZf+sCQI9XAZgIFn3ZGKIy6n/KbOsOtzIAhHWAp1Z04q0OTfQAAAAAAAC++gzUEcTLpP4kFgAAAABJRU5ErkJggg==' alt='CR logo' />Central Rail</div>", {className:'station'});

    const L6Statue = L.marker([-3399, 2021.25], {icon: memorial}).bindPopup("First L6 Train<br>Statue")

    // ZONES //

    const CentralOcean = L.polygon([
        [-2423.5, 1676.25],
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
    
    const Highlands = L.polygon([
        [-2540, 2233.125],
        [-2152, 2233.5],
        [-2133.25, 1966.5],
        [-2140, 1781.5],
        [-2194.5, 1587],
        [-2189.5, 1403],
        [-2253, 1395],
        [-2241.5, 1314],
        [-2268, 1306.75],
        [-2336.998909, 1186.002117],
        [-2385.25, 1181.75],
        [-2398.875, 1208.25],
        [-2413.125, 1260.75],
        [-2462.125, 1292.125],
        [-2465, 1334.1875],
        [-2366.75, 1372.5],
        [-2412.75, 1478.875],
        [-2423.5, 1676.375],
        [-2565.25, 1929.375],
        [-2622, 1975.25],
        [-2620.75, 2093.5],
        [-2570.5, 2081.8125],
        [-2539.4375, 2127.0625]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Highlands");

    // LAYER CONTROL //

    const regions = [
        CentralOcean, 
        Westbeach, 
        CentralPlains, 
        Middlesea, 
        Highlands
    ]

    const stations = [
        Central, 
    ]

    const memorials = [
        L6Statue
    ]

    const bases = [

    ]

    const oceans = [
        
    ]

    const others = [

    ]

    // please dont edit groups below, edit arrays abowe instead!

    const stationsGroup = L.layerGroup(stations);

    const regionsGroup = L.layerGroup(regions);

    const memorialsGroup = L.layerGroup(memorials);

    const basesGroup = L.layerGroup(bases);

    const oceansGroup = L.layerGroup(oceans);

    const othersGroup = L.layerGroup(others);

    const map = L.map('map', {
        crs: L.CRS.Simple,
        layers: [Overworld, regionsGroup]
    }).setView([-3150, 2250], defaultZoom);

    const Maps = {
        "Overworld": Overworld,
        "Nether": Nether,
        "The End": End
    };
    
    const Waypoints = {
        "Regions": regionsGroup,
        "Stations": stationsGroup,
        "Memorials": memorialsGroup,
        "Bases/Towns": basesGroup,
        "Bays/Lakes": oceansGroup,
        "Other": othersGroup
    };

    const layerControl = L.control.layers(Maps, Waypoints).addTo(map);

    // EVENTS //

    map.on('zoom', function() {
        const zoom = map.getZoom();
        Overworld.options.tileSize = (512 * Math.pow(2, zoom - defaultZoom)) * 2;
        Overworld.redraw();

        Nether.options.tileSize = (512 * Math.pow(2, zoom - defaultZoom)) * 2;
        Nether.redraw();

        End.options.tileSize = (512 * Math.pow(2, zoom - defaultZoom)) * 2;
        End.redraw();
    });

    map.on('zoomend', function() {
        var zoomLevel = map.getZoom();
        
        if (zoomLevel < 1) {
            stations.forEach(stationWP => stationWP.setIcon(stationSmall));
            memorials.forEach(memorialWP => memorialWP.setIcon(memorialSmall));
        } else {
            stations.forEach(stationWP => stationWP.setIcon(station));
            memorials.forEach(memorialWP => memorialWP.setIcon(memorial));
        };
    })

    const popup = L.popup();

    map.on('click', function(e) {
        popup
            .setLatLng(e.latlng)
            .setContent(e.latlng.toString())
            .openOn(map);
    });

});
