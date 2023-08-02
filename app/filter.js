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


const radioButtons = document.querySelectorAll('.repRadios');

radioButtons.forEach(button => {
  button.addEventListener('change', (event) => {
    toggleLayerVisibility('hex_data')
    toggleLayerVisibility('da_data')
  });
});

const checkboxes = document.querySelectorAll('input[type="checkbox"][role="switch"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateMapboxLayerFilter()
    });
  });

function updateMapboxLayerFilter() {
  MapFiltersStore.clearFilter('vulnerabilities')
  const checkboxes = document.querySelectorAll('input[type="checkbox"][role="switch"]');
  const filterValues = Array.from(checkboxes).filter((checkbox) => !checkbox.checked) // Get only the checked checkboxes
  .map((checkbox) => checkbox.value); // Extract the values (property names) from the checked checkboxes

  if(filterValues.length) {
    MapFiltersStore.addFilter('vulnerabilities', filterValues)
    MapFiltersStore.executeFilter('hex_data')
    MapFiltersStore.executeFilter('da_data')
  } 
  else {
    MapFiltersStore.executeFilter('hex_data')
    MapFiltersStore.executeFilter('da_data')
  }
}

