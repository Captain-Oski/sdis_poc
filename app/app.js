var map = new maplibregl.Map({
    container: 'map',
    center: [ -73.64666056819226, 45.52627413546361],
    style: 'https://api.maptiler.com/maps/dataviz-light/style.json?key=JhO9AmIPH59xnAn5GiSj',
    zoom: 10.75,
    antialias: true,
    hash: true
});

var pop2021,acp_cultsportloisir, acp_, acp_econo, acp_enviro, acp_securite, acp_sociale, acp_proximite,indice_emv

var activeLayer = 'hex_data'



map.on('load', (e) => {
    
    map.addSource('hex_source', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_hex_200m_result/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'hex_data',
        'type': 'fill',
        'source': 'hex_source',
        'source-layer': 'sdis.indice_emv_hex_200m_result',
        paint: {
            "fill-color": [
                "step",
                ["get", "indice_emv"],
                "#d1eeea",  // First color when indice_emv is less than 2
                2, "#68abb8",  // Second color when indice_emv is between 2 and 4
                4, "#2a5674"
              ],
                // #d1eeea,#a8dbd9,#85c4c9,#68abb8,#4f90a6,#3b738f,#2a5674                   
            'fill-opacity': 0.8
          },
          'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            }
    });

    map.addSource('da_source', {
        'type': 'vector',
        'tiles': ['https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_data_da/{z}/{x}/{y}.pbf']
    });

    map.addLayer({
        'id': 'da_data',
        'type': 'fill',
        'source': 'da_source',
        'source-layer': 'sdis.indice_emv_data_da',
        paint: {
            'fill-outline-color': 'transparent',
            'fill-color': [
                
                "step",
                ["get", "indice_emv"],
                "#d1eeea",
                2, "#68abb8",
                4, "#2a5674"
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
   
    ['hex_data', 'da_data'].forEach((layer) => {
        map.on('click', layer, function (e) {

            var coordinates = e.lngLat;
            var description = `
            <div>Social :${Math.round(e.features[0].properties.acp_sociale * 100) / 100}<div/>
            <div>Économique :${Math.round(e.features[0].properties.acp_econo * 100) / 100}<div/>
            <div>Environnement:${Math.round(e.features[0].properties.acp_enviro * 100) / 100}<div/>
            <div>Sécurité Urbaine :${Math.round(e.features[0].properties.acp_securite * 100) / 100}<div/>
            <div>Ressources de proximité :${Math.round(e.features[0].properties.acp_proximite * 100) / 100}<div/>
            <div>Culture, Sports et Loisirs :${Math.round(e.features[0].properties.acp_cultsportloisir * 100) / 100}<div/>
            <div>Indice global : ${Math.round(e.features[0].properties.indice_emv * 100) / 100}<div/>
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


    map.on('idle', function() {
        pop2021 = calculateSumAndPercentage(activeLayer, 'pop2021')
        qty = calculatePercentageVulnerability().qty
        acp_sociale = calculatePercentage().acp_sociale
        acp_econo = calculatePercentage().acp_econo
        acp_enviro = calculatePercentage().acp_enviro
        acp_securite = calculatePercentage().acp_securite
        acp_cultsportloisir = calculatePercentage().acp_cultsportloisir
        acp_proximite = calculatePercentage().acp_proximite

        document.getElementById('pop2021').innerHTML = `Population des aires de vulnérabilités : ${pop2021[0]}`;
        document.getElementById('pop2021Pct').innerHTML = `Pourcentage de la population vivant dans ces aires : ${pop2021[1]}%`;
        document.getElementById('qty').innerHTML = `Qté d'hexagones vulnérables : ${qty}%`;

        document.getElementById('acp_sociale').innerHTML = `Social : ${acp_sociale} %`
        document.getElementById('acp_econo').innerHTML = `Économique : ${acp_econo}%`
        document.getElementById('acp_enviro').innerHTML = `Environnemental : ${acp_enviro}%`
        document.getElementById('acp_securite').innerHTML = `Sécurité : ${acp_securite}%`
        document.getElementById('acp_cultsportloisir').innerHTML = `Culture, sport et loisir : ${acp_cultsportloisir}%`
        document.getElementById('acp_proximite').innerHTML = `Proximité : ${acp_proximite}%`

    });


