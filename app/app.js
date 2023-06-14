var map = new maplibregl.Map({
    container: 'map',
    center: [-73.55392401446137, 45.50245825854543],
    style: 'https://api.maptiler.com/maps/dataviz-light/style.json?key=JhO9AmIPH59xnAn5GiSj',
    zoom: 9.5,
    antialias: true
});
const myLayers = ['h3_100', 'h3_200', 'h3_400', 'h3_800', 'h3_1000']



map.on('load', (e) => {

    map.addSource('h3-source_100', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_100m_acp_avg/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'h3_100',
        'type': 'fill',
        'source': 'h3-source_100',
        'source-layer': 'sdis.indice_emv_hex_100m_acp_avg',
        'paint': {
            'fill-color': {
                'property': 'acp_scl',
                'stops': [[-0.60842997, '#009392'], [3.0420635, '#cf597e']]
                // 'stops': [[-0.9151, '#009B9E'], [-0.0704, '#42B7B9'], [0.7773, '#A7D3D4'], [1.8236, '#E4C1D9'], [4.1329, '#D691C1']]
            },
            'fill-opacity': 0.66,

            // #009B9E,#42B7B9,#A7D3D4,#F1F1F1,#E4C1D9,#D691C1,#C75DAB
        },
        minzoom: 14
    });


    map.addSource('h3-source_200', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_200m_acp_avg/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'h3_200',
        'type': 'fill',
        'source': 'h3-source_200',
        'source-layer': 'sdis.indice_emv_hex_200m_acp_avg',
        'paint': {
            'fill-color': {
                'property': 'acp_scl',
                'stops': [[-0.60842997, '#009392'], [3.0420635, '#cf597e']]
                // 'stops': [[-0.9151, '#009B9E'], [-0.0704, '#42B7B9'], [0.7773, '#A7D3D4'], [1.8236, '#E4C1D9'], [4.1329, '#D691C1']]
            },
            'fill-opacity': 0.66,

            // #009B9E,#42B7B9,#A7D3D4,#F1F1F1,#E4C1D9,#D691C1,#C75DAB
        },
        minzoom: 12,
        maxzoom: 14
    });

    map.addSource('h3-source_400', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_400m_acp_avg/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'h3_400',
        'type': 'fill',
        'source': 'h3-source_400',
        'source-layer': 'sdis.indice_emv_hex_400m_acp_avg',
        'paint': {
            'fill-color': {
                'property': 'acp_scl',
                'stops': [[-2.1030998, '#009392'], [2.9797132, '#cf597e']]
                // 'stops': [[-0.9151, '#009B9E'], [-0.0704, '#42B7B9'], [0.7773, '#A7D3D4'], [1.8236, '#E4C1D9'], [4.1329, '#D691C1']]
            },
            'fill-opacity': 0.66,
        },
        minzoom: 10,
        maxzoom: 12,
    });

    map.addSource('h3-source_800', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_800m_acp_avg/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'h3_800',
        'type': 'fill',
        'source': 'h3-source_800',
        'source-layer': 'sdis.indice_emv_hex_800m_acp_avg',
        'paint': {
            'fill-color': {
                'property': 'acp_scl',
                'stops': [[-1.8012564, '#009392'], [2.6153345, '#cf597e']]
                // 'stops': [[-0.9151, '#009B9E'], [-0.0704, '#42B7B9'], [0.7773, '#A7D3D4'], [1.8236, '#E4C1D9'], [4.1329, '#D691C1']]
            },
            'fill-opacity': 0.66,
            // #009B9E,#42B7B9,#A7D3D4,#F1F1F1,#E4C1D9,#D691C1,#C75DAB
        },
        minzoom: 8,
        maxzoom: 10,
    });

    map.addSource('h3-source_1000', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_1000m_acp_avg/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'h3_1000',
        'type': 'fill',
        'source': 'h3-source_1000',
        'source-layer': 'sdis.indice_emv_hex_1000m_acp_avg',
        'paint': {
            'fill-color': {
                'property': 'acp_scl',
                'stops': [[-1.8012564, '#009392'], [2.6153345, '#cf597e']]
                // 'stops': [[-0.9151, '#009B9E'], [-0.0704, '#42B7B9'], [0.7773, '#A7D3D4'], [1.8236, '#E4C1D9'], [4.1329, '#D691C1']]
            },
            'fill-opacity': 0.66,
            // #009B9E,#42B7B9,#A7D3D4,#F1F1F1,#E4C1D9,#D691C1,#C75DAB
            // #009392,#39b185,#9ccb86,#e9e29c,#eeb479,#e88471,#cf597e 
        },
        maxzoom: 8,
    });

    
    // map.addControl(new MaplibreLegendControl({}), "bottom-left");

    myLayers.forEach( layer => {
        map.on('click', layer, function (e) {
            var coordinates = e.lngLat;
            var description = `
            <h5>${e.features[0].properties.arr_vll}<h5/>
            <h5>ACP CSL:${Math.round(e.features[0].properties.acp_scl * 100) / 100}<h5/>
            <h5>ACP CSL:${Math.round(e.features[0].properties.acp_ecn * 100) / 100}<h5/>
            <h5>ACP CSL:${Math.round(e.features[0].properties.acp_nvr * 100) / 100}<h5/>
            <h5>ACP CSL:${Math.round(e.features[0].properties.acp_scr * 100) / 100}<h5/>
            <h5>ACP CSL:${Math.round(e.features[0].properties.acp_prx * 100) / 100}<h5/>
            <h5>ACP CSL:${Math.round(e.features[0].properties.acp_csl * 100) / 100}<h5/>
            `
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
             
            new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
            });
             
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', layer, function () {
            map.getCanvas().style.cursor = 'pointer';
            });
    
         
            // Change it back to a pointer when it leaves.
            map.on('mouseleave',layer, function () {
            map.getCanvas().style.cursor = '';
            });
    })
})


