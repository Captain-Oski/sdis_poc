var map = new maplibregl.Map({
    container: 'map',
    center: [-73.55392401446137, 45.50245825854543],
    style: 'https://api.maptiler.com/maps/dataviz-light/style.json?key=JhO9AmIPH59xnAn5GiSj',
    zoom: 9.5,
    antialias: true
});
let myLayers = [
    // 'h3_100',
    // {id: 'h3_200',
    //     min: 0,
    //     max:0
    // },
    // {id: 'h3_400',
    //     min: 0,
    //     max:0
    // },
    {id: 'h3_400m',
    min: 0,
    max:0
    }
]

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
    
    map.addSource('hex_source', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_400m_result/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'hex_data',
        'type': 'fill',
        'source': 'hex_source',
        'source-layer': 'sdis.indice_emv_hex_400m_result',
        paint: {
            'fill-color': [
                
                'step',
                ['get', 'indice_emv'],
                '#d1eeea',
                2,
                '#68abb8',
                3,
                '#2a5674'
                // #d1eeea,#a8dbd9,#85c4c9,#68abb8,#4f90a6,#3b738f,#2a5674                   
        ],
            'fill-opacity': 0.8
          },
          'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            }
    });

    map.addSource('da_source', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.test/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'da_data',
        'type': 'fill',
        'source': 'da_source',
        'source-layer': 'sdis.test',
        paint: {
            'fill-color': [
                
                    'step',
                    ['get', 'indice_emv'],
                    '#d1eeea',
                    2,
                    '#68abb8',
                    3,
                    '#2a5674'
                    // #d1eeea,#a8dbd9,#85c4c9,#68abb8,#4f90a6,#3b738f,#2a5674                   
            ],
            'fill-opacity': 0.8
          },
          'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            }
    });
    
    map.addSource('arr-source', {
        'type': 'geojson',
        'data': 'https://donnees.montreal.ca/dataset/9797a946-9da8-41ec-8815-f6b276dec7e9/resource/e18bfd07-edc8-4ce8-8a5a-3b617662a794/download/limites-administratives-agglomeration.geojson'
    });

    map.addLayer({
        'id': 'arr',
        'type': 'line',
        'source': 'arr-source',
        "paint": {
            "line-color": ["interpolate", ["linear"], ["zoom"], 16, "orange", 16.6, "#0CB097"],
            "line-width": 2,
            "line-dasharray": [2, 2]
        }
    });
   
    // myLayers.forEach( layer => {
    //     map.on('click', layer.id, function (e) {
    //         var coordinates = e.lngLat;
    //         var description = `
    //         <h5>${e.features[0].properties.arr_vll}<h5/>
    //         <div>Social :${Math.round(e.features[0].properties.acp_scl * 100) / 100}<div/>
    //         <div>Économique :${Math.round(e.features[0].properties.acp_ecn * 100) / 100}<div/>
    //         <div>Environnement:${Math.round(e.features[0].properties.acp_nvr * 100) / 100}<div/>
    //         <div>Sécurité Urbaine :${Math.round(e.features[0].properties.acp_scr * 100) / 100}<div/>
    //         <div>Ressources de proximité :${Math.round(e.features[0].properties.acp_prx * 100) / 100}<div/>
    //         <div>Culture, Sports et Loisirs :${Math.round(e.features[0].properties.acp_csl * 100) / 100}<div/>
    //         `
    //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //         }
             
    //         new maplibregl.Popup()
    //         .setLngLat(coordinates)
    //         .setHTML(description)
    //         .addTo(map);
    //         });
             
    //         // Change the cursor to a pointer when the mouse is over the places layer.
    //         map.on('mouseenter', layer.id, function () {
    //         map.getCanvas().style.cursor = 'pointer';
    //         });
    
         
    //         // Change it back to a pointer when it leaves.
    //         map.on('mouseleave',layer.id, function () {
    //         map.getCanvas().style.cursor = '';
    //         });
    // })

 
})


map.on('idle', function() {
    calculateSumAndPercentage('hex_data', 'indice_emv')
  });
