const MapFiltersStore = {
    filters: {
      'indexes': [],
      'vulnerabilities': [],
      'boroughs': [],
      'comparison': [],
      'geography': []
    }, // Objet pour stocker les filtres
  
    addFilter: function (filterType, filterValue) {
      if (this.filters.hasOwnProperty(filterType)) {
        this.filters[filterType].push(filterValue);
      }
    },
  
    // Méthode pour mettre à jour un filtre pour un item spécifique
    updateFilter: function (filterType, filterValue) {
      if (this.filters.hasOwnProperty(filterType)) {
        this.filters[filterType] = filterValue;
      }
    },
  
    // Méthode pour supprimer un filtre pour un item spécifique
    removeFilter: function (filterType, filterValue) {
      if (this.filters.hasOwnProperty(filterType)) {
        this.filters[filterType] = this.filters[filterType].filter(value => value !== filterValue);
      }
    },
  
    // Méthode pour obtenir tous les filtres actuels pour un item spécifique
    getAllFilters: function (filterType) {
      if (this.filters.hasOwnProperty(filterType)) {
        return this.filters[filterType];
      }
      return [];
    },
  
    // Méthode pour obtenir le filtre actuel pour un item spécifique
    getFilter: function (filterType) {
      if (this.filters.hasOwnProperty(filterType)) {
        return this.filters[filterType];
      }
      return null;
    },
   
    // Méthode pour effacer tous les filtres
    clearAllFilters: function () {
      this.filters = 
        {  
            'indexes': [],
            'vulnerabilities': [],
            'boroughs': [],
            'comparison': [],
            'geography': []
        };
    },
  };
  
  // Exemples d'utilisation du MapFiltersStore
  MapFiltersStore.addFilter('filter1', ['==', 'property', 'value']);
  MapFiltersStore.addFilter('filter2', ['>', 'another_property', 100]);
  console.log(MapFiltersStore.getAllFilters());
  
  MapFiltersStore.updateFilter('filter1', ['!=', 'property', 'new_value']);
  console.log(MapFiltersStore.getFilter('filter1'));
  
  MapFiltersStore.removeFilter('filter2');
  console.log(MapFiltersStore.getAllFilters());
  
  MapFiltersStore.clearAllFilters();
  console.log(MapFiltersStore.getAllFilters());