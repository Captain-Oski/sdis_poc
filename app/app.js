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
        "tiles": ["https://bug-free-eureka-q574rw9r67hxpw9-8801.app.github.dev/sdis.sdis_results/{z}/{x}/{y}.pbf"]
    });

    map.addLayer({
        "id": "hex_data",
        "type": "fill",
        "source": "hex_source",
        "source-layer": "sdis.sdis_results",
        // "filter": ['>=', ['get', 'indice_emv'], 4],
        "paint": {
          "fill-outline-color": "transparent",
          "fill-color": 
            {
              'property': 'indice_emv',
              'stops': [
                [0, '#d1eeea'],
                [1, '#d1eeea'], 
                [2, '#d1eeea'], 
                [3, '#68abb8'],
                [4, '#4f90a6'],
                [5, '#3b738f'],
                [6, '#2a5674']
              ]
            },
                        
            "fill-opacity": 1
          },
        "layout": {
          // Make the layer visible by default.
          "visibility": "visible"
          }
    });

    map.addSource("da_source", {
        "type": "vector",
        "tiles": ["https://bug-free-eureka-q574rw9r67hxpw9-8801.app.github.dev/sdis.indice_emv_data_da/{z}/{x}/{y}.pbf"]
    });

    map.addLayer({
        "id": "da_data",
        "type": "fill",
        "source": "da_source",
        "source-layer": "sdis.indice_emv_data_da",
        paint: {
            "fill-outline-color": "transparent",
            "fill-color": 
            {
              'property': 'indice_emv',
              'stops': [
                [0, '#d1eeea'],
                [1, '#d1eeea'], 
                [2, '#d1eeea'], 
                [3, '#68abb8'],
                [4, '#4f90a6'],
                [5, '#3b738f'],
                [6, '#2a5674']
              ]
            },   
            "fill-opacity": 1
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

      const opacitySlider = document.getElementById('opacitySlider');
      opacitySlider.addEventListener('input', function() {
        const opacity = this.value;
        map.setPaintProperty(layer, 'fill-opacity', parseFloat(opacity));
      });


        map.on("click", layer, function (e) {

            var coordinates = e.lngLat;
            var description = `
            <div class='h5'>Indice global : ${Math.round(e.features[0].properties.indice_emv * 100) / 100}</div>
            <div>Social :${Math.round(e.features[0].properties.acp_sociale * 100) / 100}</div>
            <div>Économique :${Math.round(e.features[0].properties.acp_econo * 100) / 100}</div>
            <div>Environnement:${Math.round(e.features[0].properties.acp_enviro * 100) / 100}</div>
            <div>Sécurité Urbaine :${Math.round(e.features[0].properties.acp_securite * 100) / 100}</div>
            <div>Ressources de proximité :${Math.round(e.features[0].properties.acp_proximite * 100) / 100}</div>
            <div>Culture, Sports et Loisirs :${Math.round(e.features[0].properties.acp_cultsportloisir * 100) / 100}</div>
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
        map.on("mouseenter", layer, function () {
        map.getCanvas().style.cursor = "pointer";
        });

        
        // Change it back to a pointer when it leaves.
        map.on("mouseleave",layer, function () {
        map.getCanvas().style.cursor = "";
        });
    }) 
   
    // read the filters after is loaded
    updateIndexesFilters();
})

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
  
async function fetchPopData() {
  const arr = MapFiltersStore.getFilter('nom') ? MapFiltersStore.getFilter('nom') : null
  try {
    const data = await getPopData(arr); // Remplacez 'Anjou,Lachine' par votre liste de mots
    document.getElementById("pop2021").innerHTML = `Population estimée des zones vulnérables :  <b>${data[0].total_population}</b>`;
    document.getElementById("pop2021Pct").innerHTML = `Pourcentage de la population estimée vivant dans ces zones :  <b>${Math.round(data[0].percentage_of_total_population)}%</b>`;
    document.getElementById("qty").innerHTML = `Qté d'hexagones vulnérables :  <b>${data[0].total_entries_with_indice_emv_gte_4}</b>`;
    // Faites quelque chose avec les données ici
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    // Gérez l'erreur ici
  }
  }
async function fetchIndexData() {
  const index = [];

  if (filterValues.lessThan2) {
    index.push(0,1,2);
  }
  if (filterValues.between2And3) {
    index.push(3);
  }
  if (filterValues.greaterThan4) {
    index.push(4, 5, 6);
  }

  const arr = MapFiltersStore.getFilter('nom') ? MapFiltersStore.getFilter('nom') : null

  try {
    const data = await getIndexPct(arr,index);
    document.getElementById("acp_sociale").innerHTML = `Sociale : <b>${Math.round(data[0].percentage_of_total_acp_sociale)} % </b>`
    document.getElementById("acp_econo").innerHTML = `Économique : <b>${Math.round(data[0].percentage_of_total_acp_econo)}% </b>`
    document.getElementById("acp_enviro").innerHTML = `Environnementale : <b>${Math.round(data[0].percentage_of_total_acp_enviro)}% </b>`
    document.getElementById("acp_securite").innerHTML = `Sécurité : <b>${Math.round(data[0].percentage_of_total_acp_securite)}% </b>`
    document.getElementById("acp_cultsportloisir").innerHTML = `Culture, sport et loisir : <b>${Math.round(data[0].percentage_of_total_acp_cultsportloisir)}% </b>`
    document.getElementById("acp_proximite").innerHTML = `Proximité : <b>${Math.round(data[0].percentage_of_total_acp_proximite)}% </b>`
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    // Gérez l'erreur ici
  }
  }


