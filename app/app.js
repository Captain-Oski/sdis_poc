var map = new maplibregl.Map({
    container: 'map',
    center: [-73.55392401446137, 45.50245825854543],
    style: 'https://api.maptiler.com/maps/dataviz-light/style.json?key=JhO9AmIPH59xnAn5GiSj',
    zoom: 9.5,
    antialias: true
});
const myLayers = ['h3_100', 'h3_200', 'h3_400', 'h3_800', 'h3_1000']
const arrondissements = [
    'Ahuntsic-Cartierville',
    'Anjou',
    'Côte-des-Neiges–Notre-Dame-de-Grâce',
    'Lachine',
    'LaSalle',
    'Le Plateau-Mont-Royal',
    'Le Sud-Ouest',
    "L'Île-Bizard–Sainte-Geneviève",
    'Mercier–Hochelaga-Maisonneuve',
    'Montréal-Nord',
    'Outremont',
   'Pierrefonds-Roxboro',
    'Rivière-des-Prairies–Pointe-aux-Trembles',
    'Rosemont–La Petite-Patrie',
   'Saint-Laurent',
   'Saint-Léonard',
   'Verdun',
   'Ville-Marie',
   'Villeray–Saint-Michel–Parc-Extension',
   "Baie-D'Urfé",
    'Beaconsfield',
    'Côte-Saint-Luc',
    'Dollard-Des Ormeaux',
    'Dorval',
    'Hampstead',
    "L'Île-Dorval",
    'Kirkland',
    'Montréal-Est',
    'Montréal-Ouest',
    'Mont-Royal',
    'Pointe-Claire',
    'Sainte-Anne-de-Bellevue',
    'Senneville',
    'Westmount']


map.on('load', (e) => {
    map.addSource('arr-source', {
        'type': 'geojson',
        'data': 'https://montreal-prod.storage.googleapis.com/resources/e9b0f927-8f75-458c-8fda-b5da65cc8b73/limadmin.geojson?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=test-datapusher-delete%40amplus-data.iam.gserviceaccount.com%2F20230614%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230614T201209Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&x-goog-signature=5da1f49edb284fa79cf7eaef478a827342daef8a7e28073fd776efbfdc0045fe52c4afdc7cba7a5b4a91ea4273d822d50c81ba57f29c92825f5f9e3352f3169b4e6ab01253fa26c618d637ccdde5125b7c6419a28dd2c9a3a0739aea56262ed6a40212146feb76ef9d69cda05c41df08f27d4caf9c030576f890d6a6357301464d198e2f7829fc0aa63938923ee221188886d7ab8dc9e477da2a28f05d5953d51160b1cd4cd0bda1b797982fd5236a4f09e7aa6a3d825327159d7a5c7008a2ee1033a61d712d25e0388dd5fff67f3aaaa4603d8795715533cb1d4d727f5622f7a0e1eef5beb33821f7006f0f2a9ccb94aee0c1aa9fd8e66d9b08e424d0178de6'
    });

    map.addLayer({
        'id': 'arr',
        'type': 'fill',
        'source': 'arr-source',
        'paint': {
            'fill-color': 'red'
            }
    });
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


