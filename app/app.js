var map = new maplibregl.Map({
    container: "map",
    center: [ -73.64666056819226, 45.52627413546361],
    style: "https://api.maptiler.com/maps/dataviz-light/style.json?key=JhO9AmIPH59xnAn5GiSj",
    zoom: 10.75,
    antialias: true,
    hash: true
});

var pop2021,acp_cultsportloisir, acp_, acp_econo, acp_enviro, acp_securite, acp_sociale, acp_proximite,indice_emv

var activeLayer = "hex_data"



map.on("load", (e) => {

    map.addSource("hex_source", {
        "type": "vector",
        "tiles": ["https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.sdis_results/{z}/{x}/{y}.pbf"]
    });

    map.addLayer({
        "id": "hex_data",
        "type": "fill",
        "source": "hex_source",
        "source-layer": "sdis.sdis_results",
        "paint": {
          "fill-outline-color": "transparent",
            "fill-color": {
                'property': 'indice_emv',
                'stops': [[0, '#d1eeea'], [6, '#2a5674']]
                // "step",
                //   ["to-number", ["get","indice_emv"]],
                // "#d1eeea",  // First color when the sum is less than 2
                // 2, "#68abb8",  // Second color when the sum is between 2 and 3
                // 4, "#2a5674"  // Third color when the sum is 3.99 or greater
            },
              //#009B9E,#42B7B9,#A7D3D4,#F1F1F1,#E4C1D9,#D691C1,#C75DAB

            //   "step",
            //   [
            //     "+",
            //     ["to-number", ["get","acp_sociale"]],
            //     ["to-number", ["get", "acp_econo"]],
            //     ["to-number", ["get", "cp_enviro"]],
            //     ["to-number", ["get", "acp_securite"]],
            //     ["to-number", ["get", "acp_proximite"]],
            //     ["to-number", ["get", "acp_cultsportloisir"]]
            //   ],
            //   "#d1eeea",  // First color when the sum is less than 2
            //   2, "#68abb8",  // Second color when the sum is between 2 and 3
            //   3, "#2a5674"  // Third color when the sum is 3.99 or greater
            // ],
            // "fill-color": [
            //     "case",
            //     ["<", ["+", 
            //             ["to-number", ["get", "acp_sociale"]],
            //             ["to-number", ["get", "acp_econo"]],
            //             ["to-number", ["get", "cp_enviro"]],
            //             ["to-number", ["get", "acp_securite"]],
            //             ["to-number", ["get", "acp_proximite"]],
            //             ["to-number", ["get", "acp_cultsportloisir"]]
            //           ], 2],
            //     "#d1eeea",  // First color when the sum is less than 2
            //     ["<", ["+", 
            //             ["to-number", ["get", "acp_sociale"]],
            //             ["to-number", ["get", "acp_econo"]],
            //             ["to-number", ["get", "cp_enviro"]],
            //             ["to-number", ["get", "acp_securite"]],
            //             ["to-number", ["get", "acp_proximite"]],
            //             ["to-number", ["get", "acp_cultsportloisir"]]
            //           ], 3.99],
            //     "#68abb8",  // Second color when the sum is between 2 (inclusive) and 4 (exclusive)
            //     "#2a5674"   // Third color when the sum is 4 or greater
            //   ],
            // "fill-color": [
            //     "case",
            //     ["<", ["+", ["to-number", ["get", "acp_sociale"]], ["to-number", ["get", "acp_econo"]], ["to-number", ["get", "cp_enviro"]], ["to-number", ["get", "acp_securite"]], ["to-number", ["get", "acp_proximite"]], ["to-number", ["get", "acp_cultsportloisir"]]], 2],
            //     "#d1eeea",  // First color when the sum is less than 2
            //     ["all", [">=", ["+", ["to-number", ["get", "acp_sociale"]], ["to-number", ["get", "acp_econo"]], ["to-number", ["get", "cp_enviro"]], ["to-number", ["get", "acp_securite"]], ["to-number", ["get", "acp_proximite"]], ["to-number", ["get", "acp_cultsportloisir"]]], 2], ["<", ["+", ["to-number", ["get", "acp_sociale"]], ["to-number", ["get", "acp_econo"]], ["to-number", ["get", "cp_enviro"]], ["to-number", ["get", "acp_securite"]], ["to-number", ["get", "acp_proximite"]], ["to-number", ["get", "acp_cultsportloisir"]]], 3.99]],
            //     "#68abb8",  // Second color when the sum is between 2 and 3.99
            //     "#2a5674"  // Third color when the sum is 3.99 or greater
            //   ],
                // #d1eeea,#a8dbd9,#85c4c9,#68abb8,#4f90a6,#3b738f,#2a5674                   
            "fill-opacity": 0.8
          },
          "layout": {
            // Make the layer visible by default.
            "visibility": "visible"
            }
    });

    map.addSource("da_source", {
        "type": "vector",
        "tiles": ["https://captain-oski-verbose-space-guacamole-57gr6w464427vq5-8801.preview.app.github.dev/sdis.indice_emv_data_da/{z}/{x}/{y}.pbf"]
    });

    map.addLayer({
        "id": "da_data",
        "type": "fill",
        "source": "da_source",
        "source-layer": "sdis.indice_emv_data_da",
        paint: {
            "fill-outline-color": "grey",
            "fill-color": [
              "step",
              ["to-number", ["get","indice_emv"]],
              "#d1eeea",  // First color when the sum is less than 2
              2, "#68abb8",  // Second color when the sum is between 2 and 3
              4, "#2a5674"  // Third color when the sum is 3.99 or greater
            ],
            "fill-opacity": 0.8
          },
          "layout": {
            // Make the layer visible by default.
            "visibility": "none"
            }
    });
    
    map.addSource("arr-source", {
        "type": "geojson",
        "data": "https://donnees.montreal.ca/dataset/9797a946-9da8-41ec-8815-f6b276dec7e9/resource/e18bfd07-edc8-4ce8-8a5a-3b617662a794/download/limites-administratives-agglomeration.geojson"
    });

    map.addLayer({
        "id": "arr",
        "type": "line",
        "source": "arr-source",
        "paint": {
            "line-color": ["interpolate", ["linear"], ["zoom"], 16, "orange", 16.6, "#0CB097"],
            "line-width": 2,
            "line-dasharray": [2, 2]
        }
    });
   
    ["hex_data", "da_data"].forEach((layer) => {
        map.on("click", layer, function (e) {

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

            // var description = `
            // <div>Social :${e.features[0].properties.acp_sociale}<div/>
            // <div>Économique :${e.features[0].properties.acp_econo}<div/>
            // <div>Environnement:${e.features[0].properties.acp_enviro}<div/>
            // <div>Sécurité Urbaine :${e.features[0].properties.acp_securite}<div/>
            // <div>Ressources de proximité :${e.features[0].properties.acp_proximite}<div/>
            // <div>Culture, Sports et Loisirs :${e.features[0].properties.acp_cultsportloisir}<div/>
            // <div>Indice global : ${e.features[0].properties.indice_emv}<div/>
            // `

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
                
            new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
            });
                
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", layer, function () {
            map.getCanvas().style.cursor = "pointer";
            });
    
            
            // Change it back to a pointer when it leaves.
            map.on("mouseleave",layer, function () {
            map.getCanvas().style.cursor = "";
            });
    }) 
   
})

async function fetchPopData() {
  const arr = MapFiltersStore.getFilter('nom') ? MapFiltersStore.getFilter('nom') : null
  try {
    const data = await getPopData(arr); // Remplacez 'Anjou,Lachine' par votre liste de mots
    document.getElementById("pop2021").innerHTML = `Population estimées des aires de vulnérabilités : ${data[0].total_population}`;
    document.getElementById("pop2021Pct").innerHTML = `Pourcentage de la population estimées vivant dans ces aires : ${Math.round(data[0].percentage_of_total_population)}%`;
    document.getElementById("qty").innerHTML = `Qté d'hexagones vulnérables : ${data[0].total_entries_with_indice_emv_gte_4}`;
    // Faites quelque chose avec les données ici
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    // Gérez l'erreur ici
  }
}

async function fetchIndexData() {
  
  const arr = MapFiltersStore.getFilter('nom') ? MapFiltersStore.getFilter('nom') : null
  try {
    const data = await getIndexPct(arr); // Remplacez 'Anjou,Lachine' par votre liste de mots
    document.getElementById("acp_sociale").innerHTML = `Social : ${Math.round(data[0].percentage_of_total_acp_sociale)} %`
    document.getElementById("acp_econo").innerHTML = `Économique : ${Math.round(data[0].percentage_of_total_acp_econo)}%`
    document.getElementById("acp_enviro").innerHTML = `Environnemental : ${Math.round(data[0].percentage_of_total_acp_enviro)}%`
    document.getElementById("acp_securite").innerHTML = `Sécurité : ${Math.round(data[0].percentage_of_total_acp_securite)}%`
    document.getElementById("acp_cultsportloisir").innerHTML = `Culture, sport et loisir : ${Math.round(data[0].percentage_of_total_acp_cultsportloisir)}%`
    document.getElementById("acp_proximite").innerHTML = `Proximité : ${Math.round(data[0].percentage_of_total_acp_proximite)}%`
    // Faites quelque chose avec les données ici
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    // Gérez l'erreur ici
  }
}


map.on("idle", function() {
    fetchPopData();
    fetchIndexData()

});


function toggleLayerVisibility(layerId) {
    var layer = map.getLayer(layerId);
    activeLayer = layerId
    if (layer) {
      var visibility = map.getLayoutProperty(layerId, "visibility");
      
      if (visibility === "visible") {
        map.setLayoutProperty(layerId, "visibility", "none");
      } else {
        map.setLayoutProperty(layerId, "visibility", "visible");
      }
    }
  }

