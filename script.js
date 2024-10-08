let defaultZoom = 1

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

    var Overworld = L.tileLayer('MapTiles/Overworld/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: (512 * Math.pow(2, 0)) * 2,
        noWrap: true,
        attribution: '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0i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">Digital Agency</a>'
    });

    var Nether = L.tileLayer('MapTiles/Nether/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: (512 * Math.pow(2, 0)) * 2,
        noWrap: true,
        attribution: '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NzBhZjdmYS05MTg5LTUxNDktODA2OS1hZGM1NWE3MjE1MDMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NzBhZjdmYS05MTg5LTUxNDktODA2OS1hZGM1NWE3MjE1MDMiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ii8vIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSIvLyIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTcwYWY3ZmEtOTE4OS01MTQ5LTgwNjktYWRjNTVhNzIxNTAzIiBzdEV2dDp3aGVuPSIyMDI0LTA3LTE1VDEyOjQzOjM3KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuNyAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+o1NaOAAAEadJREFUeJzt3XlwnPddBvDn3V3d0lry6tiVjyi2tavQI3FskjhthzTTFgg+2kJMuErbKaVuC8VOJ2QcW5ddk0JIWlrqAgUCBRoixhNs0U5DJy2d4NSmjkkpuEltR760q2N1rK6VVrsvf1hO5EOW3j2+7/v+fs9nJjOJ7eT7xo/30Svp3d/XQA5M07zqn+/Elk1eeO8xYd4P4C4AXgCBXGYQaS5uAnEDeAVAFwCcMA535es/buTyL5umiTuxZZMHnt0A3gmgOi9XRUSL6QLQlWsZZF0AG8ytDwI4CH6EJ7Lb9myLwHIB8IVP5FiWi2DJBXC3+cGVs5g9CGCz5csiIindPvh2HDMOXVzKL15SAaw3N2/ywHME/KhP5AoZZO49aXS/tNiv8yz2Czaa23Z64DkKvviJXMMDz9GN5radi/26m94B3GluedKAseh/hIicyYT51MvGkV0L/fyCdwAbzW07+eIncjcDxs6b3Qnc8A5g7nP+o4W7LCKStNDXBK4rgLmv9l+QuSwiEhL3wXfHtd8duO5TgLlv9RGRWgI3em1fVQBzD/nw+/xEato89xp/w7V3AM8KXgwRybvqLuCNAri2GYhISYH5r/X5dwD86E+khzfuAjwAP/oTaSaw3ty8CXjzDoAFQKSRuTM8WABEmnonABhzt//8/J9IMxlk7l303YBEpCYvvPd4wNt/Ii2ZMO/3mMDtdl8IEdniLo/Bgz6IdOX1gAVApKsAvwhIpDEWAJHGWABEGmMBEGmMBUCkMRYAkcZYAEQaYwEQaYwFQKQxFgCRxlgARBpjARBpjAVApDEWAJHGWABEGmMBEGmMBUCkMRYAkcZYAEQaYwEQaYwFQKQxFgCRxlgARBpjARBpjAVApDEWAJHGWABEGmMBEGmMBUCkMRYAkcZYAEQaYwEQaYwFQKQxFgCRxnx2XwC9KRVN4tTb/gOp+HTBZ3lKvXjLqXejuKm84LNUolpGvANwkP4vvy7yBwsAgnua+eLPgmoZsQAcInlqHLEDPxWZVdJYhrpPNInMUomKGbEAnMAEYn8s8wcLAIKdEfgCxWLzlKBoRiwABxg/OoT40xdEZpXf4cfyX1shMkslqmbEArCZOWsi2vmq2LxQRws85V6xeSpQOSMWgM1Gv9mHxPMDIrP8P1+PZb/UIDJLJSpnxAKwUWYijejen4jNC7WGYXgNsXkqUD0jFoCNhv7pIiZ/lBCZFfjIalTeu1xklkpUz4gFYJPZwRnE2l8Tmxd8dJ3YLFXokBELwCYDB3sw3TslMiu0J4zScKXILJXokBELwAbTZyfFHigpCpSg7lO3isxSiS4ZsQBs0PfEaWSSaZFZwfYwioIlIrNUoktGLABhkz8cwcDBHpFZZZFKBH57lcgsleiUEQtAUsZEdL/cF5VC+1rgreIbPi3RLCMWgKDEvw9g5F9jIrOq7gug+v1BkVkq0S0jFoAQczqD3lbJB0oiMIoYrxU6ZsQ/IUKGnu3FxPERkVnLH1qBqvtqRWapRMeMWAAC0iMpxAQ/sgR3NwN84tcSXTNiAQgY/KtzSPZMisxqeHgtyt7mF5mlEl0zYgEU2MyFKcT2nxaZ5fMXo/4za0RmqUTnjFgABdb/hbOYTcyIzAruWYfiVWUis1Sic0YsgAKa+p8E+p48IzKrtKkctb9zi8gsleieEQugUEyIPUsOAMHOFniri8TmKYEZsQAKZex7gxh65pLIrIq7qrF8e6PILJUwIxZAQZipjOgZco2dLTBKGKUVzOgy512RAkaei2Hse3GRWdXbgvC/t05klkqY0WUsgDxLj83KniG3Jwx4HPBEiYswozexAPIs/ncXMPXquMisuh1NKN9YLTJLJczoTSyAPErFpsXOkPOUetHwWZ7zZxUzuhoLII8G/lxwceTuZpSs4XJPq5jR1VgAeZJ8bVzsIImSxjLU7WgSmaUSZnQ9FkCexB6XeZYcuHyGnK+Wyz2tYkbXYwHkwfjRIcT/9rzIrPK3+7H811eKzFIJM7oxFkCOzLSJaKfsGXKeCi73tIIZLYwFkKPRf+tD4tv9IrP876vDsge43NMqZrQwFkAOMpNpRNuEz5DzOfOBEqdiRjfHAsjB0DcuYfK/hRZHfngVl3tmgRndHAsgS7PxGcRa5d5MEnzEGWfIuQkzWhwLIEsDX5VbHBnc3YzS27jc0ypmtDgWQBZmeiYR2y+3OLL+01zuaRUzWhoWQBZifyK4OLItjKJQqcgslTCjpWEBWDT58igGvtIjMqssUonAh7nc0ypmtHQsACtMILpP7otKoQ4u97SMGVnCArAg8Xw/Rp6TWRxZ+a4Aqj/A5Z5WMSNrWABLZE5n0NsmeIZcewRGMeOxghlZ5+6rFzT8L72YODYsMqtmeyOq3m3/4ki3YUbWsQCWID2aQlTwgZLQY2HXPVBiN2aUHRbAEgz+9Xkkz06IzGrYuRZlb3fG4kg3YUbZYQEsInUpiViHzAMlPn8x6v/AOYsj3YIZZY8FsIi+L5wRWxzZ8Ng6FK92zuJIt2BG2WMB3MTUj8fQ94TQ4sjV5ahz2OJIN2BGuWEBLMQEYgfkTpEJdkbgrXHW4kjHY0Y5YwEsYOz7cQx9Q2hx5MZq1PzqCpFZKmFGuWMB3ICZMhHtEPyWUmcLPKWMwgpmlB/q/R/lwcjhGMa+Oygya9nmBvjf58zFkU7GjPKDBXCNzLjw4sjWCAyvAk+UCGJG+cMCuEb86xcxdWpMZFbdx29Bxc9Wi8xSCTPKHxbAPKm+aUT3yn1e2fCIsxdHOhEzyi8WwDySiyMbO1pQsrZCZJZKmFF+sQDmTP90AtF9Mt9TLg6Woe4Taj1QIoEZ5R8LYE7scZlnyQEg2N4MX32J2DxVMKP8YwEAmDg2jMG/EVoc+VY/Ar/p3jPk7MKMCkP7AjDTJnpFHyiJuGZxpFMwo8LRvgAS3+pH4lsyiyOr3lOHZVvcfYacHZhR4WhdAJmpNHpb5R4oaWxz1+JIJ2BGhaV1AQw/cwmTJ0dFZgU+tAqV73DX4kgnYEaFpW0BzA7NILpHcHHko+uUOENOEjMqPG0LYPAvzsktjny0GaW3VYnMUgkzKjwtC2Dm3CSinTIPlBRVl6D+99y5ONJOzEiGlgXQ96dn5BZHtjejqNGdiyPtxIxkaFcAkydH0f+l10VmlYUrEfjIapFZKmFGcvQqABOI7Rc8Q649Aq/fvYsjbcGMRGlVAInvDGD4UFRkVuU7lqPml0Mis1TCjGRpUwDmTAbRdsm10e5fHCmNGcnT5v9+uKsX40eHRGbVfDAE//1qniFXSMxInhYFkB5NyX5kaY1o90BJrpiRPbQogPjTF5A8LbM4sv7316DsdjUWR0piRvZQvgBSvUlEW2W+quwp9aJh11qRWSphRvZRvgD6/+ys2OLIUHsExbeoszhSCjOyj9IFkPy/McQ+f1pkVsnKctR+XP0z5PKNGdlL3QIwgegfyZ0hF9oXhk+xxZEFx4xsp2wBjL8Yx9A/XBSZVbFhGWoeWikySyXMyH5KFoA5a6JX9IESNRdHFhIzcgYlf0dGD8cw9oLQ4sgHGuD/hXqRWSphRs6gXAFkJmTPkAu1hpVdHFkozMg5lCuA+NcvYOp/ZRZH1n7sFlTcXSMySyXMyDmUKoDZ/mnE2gTfSvqHai+OLARm5CxKFUD/V3ow058UmRVqi6BkndqLIwuBGTmLMgUwfXoCUaHtMcX1paj/ZJPILJUwI+dRpgCkniYDgGBHWIvFkfnGjJxHiQKYOD6Cwa+dE5lV9pYqBH5Lj8WR+cSMnMn1BWCmTbHbSmDugRJNFkfmCzNyLtcXQOLb/Rj9Zp/IrKr7a1G9TZ/FkfnCjJzL1QWQSWYQbZP7yKLb4sh8YEbO5uoCGH7mIiZ+OCIya/lvrETluwIis1TCjJzNtQUwO5wSfaAktLuZZ8hZxIycz7UFMPiX55A8PykyK/jIOpT+jH6LI3PFjJzPlQUwc24KsX0yB0n4/MWo/8wakVkqYUbu4MoC6HvqDNITKZFZOi+OzAUzcgfXFcDUKwn0f/GsyKzSNRWo/ai+iyOzxYzcw10FYALRzwl+UakzAu8yniFnCTNyFVcVwNgLgxju6hWZVbGpBjUPNorMUgkzchfXFIA5k0Fvm9wpMo0dLdovjrSKGbmPa373hg9FMf6fMosjqz8Qgv89XBxpFTNyH1cUQDoxi5jg46ShvWE+UGIRM3InVxRA/OnzmHptXGRW/advRfn6ZSKzVMKM3MnxBZDqTSLWJvNAiafUi4aHuTjSKmbkXo4vgP4vv47UyLTIrFBrGMVN5SKzVMKM3MvRBZA8NY6Y0O64ksYyLo7MAjNyN+cWgAnEHhdcHLk/Al+gWGyeEpiR6zm2AMaPDiH+9xdEZpWvX4aah1aIzFIJM3I/RxaA9OLIxo4IPGU8Q84KZqQGRxbAaHcfxr4zIDLL/4v18D/QIDJLJcxIDY4rgMxEGtG9go+Ttka4ONIiZqQOxxXA0D9exOSPEyKzaj+6GhX3cHGkVcxIHY4qgNmBGUQFz5Br4OJIy5iRWhxVAAMHezATmxKZFdobRmm4UmSWSpiRWhxTANNnJsQeKCkKlKDuU7eKzFIJM1KPYwqg74kzyCTTIrNCnREUNXBxpFXMSD2OKICJ/xrBwFd7RGaV3VaFwIdWisxSCTNSk+0FYKZNxPbLniHnqfSJzVMBM1KX7QWQeH4AI4djIrOq7gugeltIZJZKmJG6bC2ATDKDaLvcAyWhthYYRXygxApmpDZbC2D42UuYOD4iMmv5QytQ9XNcHGkVM1KbbQWQHk6JniEXfIxnyFnFjNRnWwEMfO0ckj0yiyMbHl6LsrdycaRVzEh9thTAzPkp9O0/LTLL5y9Gw06eIWcVM9KDLQXQ/8WzmE3MiMwKtjajaAUXR1rFjPQgXgBTP0qg78kzIrNKm8pR+zEujrSKGelDtgBMIHpA8gy5Fi6OtIoZaUW0AMa+O4jhf74kMqvi7hrU/AoXR1rFjPQiVgDmTAa9HbJnyBkltj/o6CrMSD9iv/sjz8Uw/v24yKzq9wfhfy8XR1rFjPQjUgDpsVlEWwUfJ90TBjx8osQKZqQnkQKIP30BU6/KLI6s+2QTyjdUi8xSCTPSU8ELIBWbRqxD5q2knlIvGj7LM+SsYkb6KngB9H/pLFJxmcWRwT3NKLmViyOtYkb6KmgBJH8yjpjQ95RLGstQ97tNIrNUwoz0VtACiH1e7oGSYEcYvloujrSKGenN2GBuNe2+CCKyB5/CINIYC4BIYywAIo2xAIg0xgIg0hgLgEhjLAAijbEAiDTGAiDSGAuASGMsACKNsQCINMYCINIYC4BIYywAIo2xAIg0xgIg0hgLgEhjLAAijbEAiDTGAiDSGAuASGMsACKNsQCINMYCINIYC4BIYywAIo2xAIg0xgIg0hgLgEhjLAAijXkAxO2+CCKyRdwDIG33VRCRPHOuAI7bfSFEJM8AXvEYMF6w+0KIyBZdnjTSP7D7KojIHgYAbDC3DgOotvdSiEjSCeOwceXbgC/aeiVEJK0LmHsOIIPMAXuvhYiEdQFznwIAwAZz6yCAgG2XQ0RiThiHDeDqJwF32HQtRCRr+5W/Meb/KO8CiNR35aM/cP17AXgXQKS27fP/wbj2ZzeYW48A2Cx2OUQkpfuEcXjL/B+47t2APvh2gG8QIlLO3Gv7KtcVwDHj0MUMMluu/XEicq8MMvceMw5dvPbHb3gewEmj+yUDxq7CXxYRFZoBY9dJo/ulG//cTdxpbnnSgLGzMJdFRIVmwnzqZePIgh/Mb3oi0MvGkV28EyByJwPGrpu9+C//miVYb27e5IHnaH4ui4gKLJ5BZstCt/3zLelMwJNG90s++FYB6M750oiokLp98N2xlBc/sMQ7gPk2mFsfBPCs5csiokKKA9hxwjjcZeVfslwAV7AIiBwhqxf+FVkXwBVzRXDlLyIqvBEAL2aQObDUW/2F5FwA882VAQA8aAK3G5ffWMQ3FxFlL47LJ3cfN2C8kEb6B7m+6OfjYhAijf0/45s2pq3tCqsAAAAASUVORK5CYII=">Digital Agency</a>'
    });

    var End = L.tileLayer('MapTiles/End/{x},{y}.png', {
        maxZoom: 4,
        minZoom: -2,
        tileSize: (512 * Math.pow(2, 0)) * 2,
        noWrap: true,
        attribution: '<a class="attribution-agency" href="https://lemon4ik6484.github.io/Digital-Agency/" target="_blank"><img style="height: 12px;" class="agency-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFbmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhMywgMjAyMy8xMi8xMy0wNTowNjo0OSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNy0xNVQxMjo0MzozNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDctMTVUMTI6NTA6MjErMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MGFmN2ZhLTkxODktNTE0OS04MDY5LWFkYzU1YTcyMTUwMyIgeG1wTU06RG9jdW1lbnRJRD0i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">Digital Agency</a>'
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

    function popupStation(Name, Lines) {
        return "<div class='horizontal'><img class='station-logo' style='height: 20px;' src='" + "./logos/CR.png" + "'/><p class='station-title'>" + Name + "</p></div><div class='horizontal'><p class='station-lines gray'>Lines: </p><p class='station-lines'>" + Lines + "</p></div>"
    }

    function createWaypoint(name, X, Y, type, text) {
        if (type === "station") {
            let parts = text.match(/"([^"]+)"/g);
            let stationName = parts[0].replace(/"/g, '');
            let stationLines = parts[1].replace(/"/g, '');
            Waypoints[name] = L.marker([X, Y], {icon:Icons[type]}).bindPopup(popupStation(stationName, stationLines), {className:type});
        } else {
            Waypoints[name] = L.marker([X, Y], {icon:type}).bindPopup(text, {className:type});
        }

        Waypoints[name].addTo(map);

        switch (type) {
            case "station":
                stations.push(Waypoints[name]);
                break
            case "memorial":
                memorials.push(Waypoints[name]);
                break
            case "ocean":
                oceans.push(Waypoints[name]);
                break
            case "base":
                bases.push(Waypoints[name]);
                break
            case "other":
                others.push(Waypoints[name]);
                break
            case "terrain":
                terrains.push(Waypoints[name]);
                break
            case "visual":
                visuals.push(Waypoints[name]);
                break
        }
    }

    const API_KEY = 'AIzaSyC7opujheDheDJagCtkg9PGJNNariKwWrE';
    const SPREADSHEET_ID = '1nLXyOXjPCIKNd-l3v9IQRRu6sXxzoIuXLpyBdMQugIY';
    const RANGE = 'Waypoints!B2:F150';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Obtained waypoint data:', data);
        const rows = data.values;
        rows.forEach(row => {
            createWaypoint(row[0], row[1], row[2], row[3], row[4]);
        });
    })
    .catch(error => {
        console.error('Error while obtaining waypoint data:', error);
    });

    // ZONES //

    var CentralOcean = L.polygon([
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
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Central Ocean", {className: 'ocean'});

    var Westbeach = L.polygon([
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
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Westbeach", {className:'terrain'});

    var CentralPlains = L.polygon([
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
        [-3304, 2311.5],
        [-3297.5, 2252.875],
        [-3333, 2219],
        [-3333.1875, 2158],
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
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Central Plains", {className:'terrain'});

    var Middlesea = L.polygon([
        [-3320.125, 2140.1875],
        [-3333.375, 2157.875],
        [-3333.0625, 2219],
        [-3425.941827, 2347.236379],
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
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Middlesea", {className:'terrain'});
    
    var Highlands = L.polygon([
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
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Highlands", {className:'terrain'});

    var Heights = L.polygon([
        [-2152.064792, 2233.500109],
        [-2078, 2398],
        [-2075.125, 2583.75],
        [-2202.5, 2716],
        [-2201.5, 2884],
        [-2348.5, 2979],
        [-2466, 3103.5],
        [-2528, 3105.25],
        [-2512.5, 2931.5],
        [-2581.5, 2887],
        [-2571, 2805.5],
        [-2520.5, 2786.5],
        [-2540, 2729],
        [-2486, 2661],
        [-2499, 2483],
        [-2587, 2479],
        [-2630, 2527.5],
        [-2689.75, 2487.25],
        [-2785.5, 2492],
        [-2837.25, 2468.5],
        [-2760.5, 2387.75],
        [-2793.125, 2294.75],
        [-2755.3125, 2247.5625],
        [-2712.375, 2254.25],
        [-2581.125, 2340.625],
        [-2540, 2256.25],
        [-2539.9375, 2233.1875]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Heights", {className:'terrain'});

    var SouthernOcean = L.polygon([
        [-3813.5, 1811.5],
        [-3860, 1769],
        [-3943.5, 1791],
        [-3978, 1787.5],
        [-4029.25, 1824.75],
        [-4090, 1837],
        [-4150, 1837],
        [-4165.5, 1856.375],
        [-4069.75, 1935],
        [-4059.25, 1979],
        [-4087.875, 2004.125],
        [-4065.125, 2029.625],
        [-4015.999911, 2011.250021],
        [-3986.25, 2036],
        [-3989.625, 2095.375],
        [-3872.5, 2059.5],
        [-3830.125, 2129.25],
        [-3777.75, 2170.5],
        [-3801.5, 2220.5],
        [-3848, 2262],
        [-3887.25, 2264],
        [-3922.625, 2313],
        [-3914, 2328.125],
        [-3823.25, 2325.5],
        [-3733, 2247.5],
        [-3634.5, 2293.25],
        [-3606, 2330.75],
        [-3592.25, 2462],
        [-3656.25, 2476.75],
        [-3676, 2525],
        [-3674.25, 2569],
        [-3645, 2573.5],
        [-3621.125, 2627.875],
        [-3651.5, 2648.5],
        [-3632.25, 2670.5],
        [-3596.75, 2651.75],
        [-3549, 2664],
        [-3496, 2651],
        [-3437, 2594],
        [-3443, 2491.75],
        [-3389, 2369.25],
        [-3304, 2311.5],
        [-3297.5, 2252.875],
        [-3333, 2219],
        [-3333.0625, 2219], 
        [-3425.941827, 2347.236379],
        [-3584.5, 2309],
        [-3656, 2160.5],
        [-3605.25, 1996.25],
        [-3688.5, 1874.5],
        [-3741.5, 1866],
        [-3813.5, 1811.5]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Southern Ocean", {className:'ocean'});

    var Woodsdale = L.polygon([
        [-2729.5, 3259.5],
        [-2528, 3105.25],
        [-2512.5, 2931.5],
        [-2581.5, 2887],
        [-2571, 2805.5],
        [-2520.5, 2786.5],
        [-2540, 2729],
        [-2486, 2661],
        [-2499, 2483],
        [-2587, 2479],
        [-2630, 2527.5],
        [-2689.75, 2487.25],
        [-2785.5, 2492],
        [-2837.25, 2468.375],
        [-2837, 2468.5],
        [-2869.25, 2408.5],
        [-2984.25, 2411.75],
        [-3081, 2368],
        [-3202, 2368],
        [-3262.25, 2372],
        [-3317.25, 2390.25],
        [-3389, 2369.25],
        [-3389, 2369.25],
        [-3443, 2491.75],
        [-3437, 2594],
        [-3496, 2651],
        [-3519.125, 2656.75],
        [-3461.5, 2934.375],
        [-3475.25, 3038],
        [-3519.5, 3047],
        [-3533.75, 3223],
        [-3396.75, 3208.75],
        [-3284, 2861],
        [-3171, 2806],
        [-2936, 2905]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Woodsdale", {className:'terrain'});

    var PolarHills = L.polygon([
        [-3396.75, 3208.75],
        [-3284, 2861],
        [-3171, 2806],
        [-2936, 2905],
        [-2729.5, 3259.5],
        [-2718.5, 3339.25],
        [-2723.75, 3378],
        [-2793.75, 3492],
        [-2897, 3582.5],
        [-2998, 3788.5],
        [-2889, 3864.5],
        [-2996.25, 3963.75],
        [-3091, 3987],
        [-3316, 3981],
        [-3574, 4081],
        [-3667.5, 4003],
        [-3768, 3775],
        [-3740, 3678],
        [-3580, 3629.5],
        [-3514, 3573.5],
        [-3453, 3422]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Polar Hills", {className:'terrain'});

    var Shoreden = L.polygon([
        [-3719.25, 1633.5],
        [-3814.25, 1617.5],
        [-3853.75, 1576.75],
        [-3874.5, 1517.5],
        [-3880.75, 1409.25],
        [-3947.25, 1362.75],
        [-4030.5, 1364],
        [-4125, 1398.5],
        [-4207, 1407.5],
        [-4257, 1438.25],
        [-4300, 1510],
        [-4436, 1514.5],
        [-4423.5, 1662],
        [-4246, 1842],
        [-4353.5, 2035],
        [-4146, 2291],
        [-4141.75, 2353],
        [-4063, 2416],
        [-3922.625, 2313],
        [-3914, 2328.125],
        [-3823.25, 2325.5],
        [-3733, 2247.5],
        [-3634.5, 2293.25],
        [-3606, 2330.75],
        [-3592.25, 2462],
        [-3656.25, 2476.75],
        [-3676, 2525],
        [-3674.25, 2569],
        [-3645, 2573.5],
        [-3621.125, 2627.875],
        [-3651.5, 2648.5],
        [-3632.25, 2670.5],
        [-3596.75, 2651.75],
        [-3549, 2664],
        [-3496, 2651],
        [-3437, 2594],
        [-3443, 2491.75],
        [-3389, 2369.25],
        [-3304, 2311.5],
        [-3297.5, 2252.875],
        [-3333, 2219],
        [-3333.0625, 2219], 
        [-3425.941827, 2347.236379],
        [-3584.5, 2309],
        [-3656, 2160.5],
        [-3605.25, 1996.25],
        [-3688.5, 1874.5],
        [-3741.5, 1866],
        [-3813.5, 1811.5],
        [-3788.375, 1736]
    ], {color: '#D3FFCE', fillColor: '#065535'})//.bindPopup("Shoreden", {className:'terrain'});

    // LAYER CONTROL //

    var regions = [
        CentralOcean, 
        Westbeach, 
        CentralPlains, 
        Middlesea, 
        Highlands,
        Heights,
        SouthernOcean,
        Woodsdale,
        PolarHills,
        Shoreden
    ]

    // please dont edit groups below, edit arrays abowe instead!

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
        crs: L.CRS.Simple,
        layers: [Overworld, regionsGroup, stationsGroup],
        center: [-3125, 2234.5],
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

    // EVENTS/FUNCTIONS //

    function mapRedraw() {
        var zoom = map.getZoom();
        Overworld.options.tileSize = (512 * Math.pow(2, zoom - defaultZoom)) * 2;
        Overworld.redraw();

        Nether.options.tileSize = (512 * Math.pow(2, zoom - defaultZoom)) * 2;
        Nether.redraw();

        End.options.tileSize = (512 * Math.pow(2, zoom - defaultZoom)) * 2;
        End.redraw();
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
            .setContent(e.latlng.toString())
            .openOn(map)
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
