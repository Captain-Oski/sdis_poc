// Function to update the borough filter based on active layer
function updateBoroughFilter() {
  const arr = activeLayer == 'hex_data' ? 'nom' : 'arr_ville';

  // Clear existing filter
  MapFiltersStore.clearFilter(arr);

  // Get selected borough filter
  getBoroughFilter(arr);

  // Apply filter to the active layer
  MapFiltersStore.executeFilter(activeLayer);
}

// Function to get selected borough filters and add them to MapFiltersStore
function getBoroughFilter() {
  const checkboxes = document.querySelectorAll('.boroughs:checked');
  checkboxes.forEach((checkbox) => {
    const label = checkbox.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
      MapFiltersStore.addFilter('nom', label.textContent.trim());
    }
  });
}

// Function to update index filters and apply them to hex_data and da_data layers
function updateIndexesFilters() {
  var filters = [];
  MapFiltersStore.clearFilter('indice_emv');

  if (filterValues.lessThan2) {
    filters.push(['<=', ['to-number', ['get', 'indice_emv']], 2]);
  }

  if (filterValues.between2And3) {
    filters.push(['all', ['>', ['to-number', ['get', 'indice_emv']], 2], ['<', ['to-number', ['get', 'indice_emv']], 4]]);
  }

  if (filterValues.greaterThan4) {
    filters.push(['>=', ['to-number', ['get', 'indice_emv']], 4]);
  }

  // Apply index filters to hex_data and da_data layers
  MapFiltersStore.addFilter('indice_emv', ['any'].concat(filters));
  MapFiltersStore.executeFilter('hex_data');
  MapFiltersStore.executeFilter('da_data');
}

// Event listeners for radio button changes
const radioButtons = document.querySelectorAll('.repRadios');
radioButtons.forEach(button => {
  button.addEventListener('change', (event) => {
    // Toggle visibility of hex_data and da_data layers
    toggleLayerVisibility('hex_data');
    toggleLayerVisibility('da_data');
  });
});

// Event listeners for checkbox changes
const checkboxes = document.querySelectorAll('input[type="checkbox"][role="switch"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // Update mapbox layer filter based on selected vulnerabilities
    updateMapboxLayerFilter();
  });
});

// Function to update mapbox layer filter based on selected vulnerabilities
function updateMapboxLayerFilter() {
  MapFiltersStore.clearFilter('vulnerabilities');
  
  // Get selected vulnerability filters
  const filterValues = Array.from(checkboxes)
    .filter((checkbox) => !checkbox.checked) // Get only the unchecked checkboxes
    .map((checkbox) => checkbox.value); // Extract the values (property names) from the unchecked checkboxes
  
  // Apply vulnerability filters to hex_data and da_data layers
  if (filterValues.length) {
    MapFiltersStore.addFilter('vulnerabilities', filterValues);
  }

  MapFiltersStore.executeFilter('hex_data');
  MapFiltersStore.executeFilter('da_data');
}
