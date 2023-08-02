function updateBoroughFilter() {
    // TODO: arr is a data flow, so i made a const, where columns are not named well. NEED TO revise in ETL
    const arr = activeLayer == 'hex_data' ? 'nom' : 'arr_ville'
    MapFiltersStore.clearFilter(arr)
    getBoroughFilter(arr)
    MapFiltersStore.executeFilter(activeLayer)
  }

function getBoroughFilter() {
  const checkboxes = document.querySelectorAll('.boroughs:checked');
  checkboxes.forEach((checkbox) => {
    const label = checkbox.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
      MapFiltersStore.addFilter('nom',label.textContent.trim())
    }
  });
}

// Function to update filters
function updateIndexesFilters() {
  var filters = [];
  MapFiltersStore.clearFilter('indice_emv')

  if (filterValues.lessThan2) {
    // MapFiltersStore.addFilter('indice_emv',['<', ['get', 'indice_emv'], 2])
    filters.push(['<=', ['to-number',['get', 'indice_emv']], 2]);
  }

  if (filterValues.between2And3) {
    filters.push(['all', ['>', ['to-number',['get', 'indice_emv']], 2], ['<', ['to-number',['get', 'indice_emv']], 4]]);
  }

  if (filterValues.greaterThan4) {
    filters.push(['>=', ['to-number',['get', 'indice_emv']], 4]);
  }

  MapFiltersStore.addFilter('indice_emv',['any'].concat(filters))
  MapFiltersStore.executeFilter('hex_data')
  MapFiltersStore.executeFilter('da_data')
}


// Function to Update Fill Color Property
function updateVulnerabilities(variables) {

    const expressions = ["step"];
      for (const variable of variables) {
        expressions.push(["+", ["to-number", ["get", variable]]]);
      }
      expressions.push("#d1eeea", 2, "#68abb8", 3, "#2a5674");

      map.setPaintProperty('YOUR_LAYER_ID', 'fill-color', expressions);
}


const radioButtons = document.querySelectorAll('.repRadios');

radioButtons.forEach(button => {
  button.addEventListener('change', (event) => {
    toggleLayerVisibility('hex_data')
    toggleLayerVisibility('da_data')
  });
});

