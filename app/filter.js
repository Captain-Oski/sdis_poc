function filtrerParArrondissement() {
    const t = lireLabelsCheckboxChecked()
    const arr = activeLayer == 'hex_data' ? 'nom' : 'arr_ville'
    console.log(t)
    if (t.includes("Tous les arrondissements")) {
      map.setFilter(activeLayer, null);
    } else {
      map.setFilter(activeLayer,['in', arr , ...t]);
    }
  }

  function lireLabelsCheckboxChecked() {
    const checkboxes = document.querySelectorAll('#flexCheckChecked:checked');
    const labels = [];
      checkboxes.forEach((checkbox) => {
      const label = checkbox.nextElementSibling;
      if (label && label.tagName === 'LABEL') {
        labels.push(label.textContent.trim());
      }
    });
    return labels;
  }

  function toggleLayerVisibility(layerId) {
    var layer = map.getLayer(layerId);
    activeLayer = layerId
    console.log(activeLayer)
    if (layer) {
      var visibility = map.getLayoutProperty(layerId, 'visibility');
      
      if (visibility === 'visible') {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      } else {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
      }
    }
  }

var filterValues = {
  lessThan2: true,
  between2And3: true,
  greaterThan4: true
};

// Function to update filters
function updateFilters() {
  var filters = [];

  if (filterValues.lessThan2) {
    filters.push(['<', ['get', 'indice_emv'], 2]);
  }

  if (filterValues.between2And3) {
    filters.push(['all', ['>', ['get', 'indice_emv'], 2], ['<', ['get', 'indice_emv'], 4]]);
  }

  if (filterValues.greaterThan4) {
    filters.push(['>', ['get', 'indice_emv'], 4]);
  }
//   // Get the filter of a layer
// var filter = map.getFilter(activeLayer);

// // Log the filter to the console
// console.log(filter,filters);

  map.setFilter(activeLayer, ['any'].concat(filters));
}


// Event handlers for filter buttons
document.getElementById('legend1').addEventListener('change', function () {
  filterValues.lessThan2 = !filterValues.lessThan2;
  updateFilters();
});

document.getElementById('legend2').addEventListener('change', function () {
  filterValues.between2And3 = !filterValues.between2And3;
  updateFilters();
});

document.getElementById('legend3').addEventListener('change', function () {
  filterValues.greaterThan4 = !filterValues.greaterThan4;
  updateFilters();
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// document.getElementById('switchDA').addEventListener('change', function () {
//   if (activeLayer == 'hex_data') {
//     activeLayer = 'da_data'
//   }
// });

// document.getElementById('switchHEX').addEventListener('change', function () {
//   if (activeLayer == 'da_data') {
//     activeLayer = 'hex_data'
//   }
// });

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////