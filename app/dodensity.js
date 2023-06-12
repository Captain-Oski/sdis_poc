var map = new maplibregl.Map({
    container: 'map',
    center: [-73.55392401446137, 45.50245825854543],
    style: 'https://api.maptiler.com/maps/dataviz-light/style.json?key=JhO9AmIPH59xnAn5GiSj',
    zoom: 9.5,
    antialias: true
});
const myLayers = ['h3_100', 'h3_200', 'h3_400', 'h3_800', 'h3_1000']

map.on('load', (e) => {
   map.addSource('pip_source', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_pip/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'pip',
        'type': 'circle',
        'source': 'pip_source',
        'source-layer': 'sdis.indice_emv_pip',
        'paint': {
            'circle-color': {
                'property': 'acp_scl',
                'stops': [[-2.2, '#009392'], [4.15, '#cf597e']],
                // 'stops': [[-0.9151, '#009B9E'], [-0.0704, '#42B7B9'], [0.7773, '#A7D3D4'], [1.8236, '#E4C1D9'], [4.1329, '#D691C1']]
            },
            'circle-opacity': 0.66,
            'circle-radius': {
                'base': 0.3,
                'stops': [
                [12, 0.5],
                [14, 0.7],
                [18, 4]
                ]
                },
            // #009392,#39b185,#9ccb86,#e9e29c,#eeb479,#e88471,#cf597e 
        }
    });
});