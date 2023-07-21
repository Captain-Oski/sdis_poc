const MapFiltersStore = {

    'filters': {
      'acp_sociale': [],
      'acp_econo': [],
      'cp_enviro': [],
      'acp_securite': [],
      'acp_proximite': [],
      'acp_cultsportloisir': [],
      'indice_emv': [],
      'nom': [],
    },
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

        // Méthode pour mettre à jour un filtre pour un item spécifique
    clearFilter: function (filterType) {
      if (this.filters.hasOwnProperty(filterType)) {
        this.filters[filterType] = [];
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
        return [...new Set(this.filters[filterType])];
      }
      return null;
    },
   
    // Méthode pour effacer tous les filtres
    clearAllFilters: function () {
      this.filters = 
        {  
          'acp_sociale': [],
          'acp_econo': [],
          'cp_enviro': [],
          'acp_securite': [],
          'acp_proximite': [],
          'acp_cultsportloisir': [],
          'indice_emv': [],
          'nom': [],
        };
    },
   
    // Fonction pour construire le filtre Mapbox GL JS de type 'all'
    buildAllFilter : function () {
    
      // Tableau pour stocker les filtres individuels
      const individualFilters = [];
    
      // Parcourir tous les filtres dans le MapFiltersStore
      for (const filter in MapFiltersStore.filters) {
        if (MapFiltersStore.filters.hasOwnProperty(filter)) {
          // Obtenir les valeurs du filtre actuel
          const filterValues = MapFiltersStore.getFilter(filter);
          if (filterValues.length && filter == 'nom') {
            individualFilters.push(['in',["get", filter],["literal",filterValues]]); //// Jean Néchier sur celle la
          } 
          else if (filterValues.length  && filter == 'indice_emv') {
            individualFilters.push(...filterValues)
          } 
          else if (filterValues.length  && filter.includes('acp_')) {
            // TODO reprendre ici pour creer la mecanique de filtre pour les acp
            individualFilters.push(...filterValues)
          } 
          else {
            MapFiltersStore.clearFilter(filter)
          }
        }
      }
      // Construire le filtre 'all' en utilisant la syntaxe de Mapbox GL JS
      const allFilter = ['all', ...individualFilters];
      return allFilter;
    },

     executeFilter: function (layerId) {
      const finalFilter = MapFiltersStore.buildAllFilter();
      console.log(finalFilter)
      map.setFilter(layerId, finalFilter);
    }

  };

  // [
  //   'all',
  //   ['==', 'acp_sociale', null],
  //   ['==', 'acp_econo', null],
  //   ['==', 'acp_enviro', null],
  //   ['==', 'acp_securite', null],
  //   ['==', 'acp_proximite', null],
  //   ['==', 'acp_cultsportloisir', null],
  //   ['==', 'indice_emv', null],
  //   ['==', 'arr_vll', null],
  // ]


  
  // // Exemples d'utilisation du MapFiltersStore
  // MapFiltersStore.addFilter('filter1', ['==', 'property', 'value']);
  // MapFiltersStore.addFilter('filter2', ['>', 'another_property', 100]);
  // console.log(MapFiltersStore.getAllFilters());
  
  // MapFiltersStore.updateFilter('filter1', ['!=', 'property', 'new_value']);
  // console.log(MapFiltersStore.getFilter('filter1'));
  
  // MapFiltersStore.removeFilter('filter2');
  // console.log(MapFiltersStore.getAllFilters());
  
  // MapFiltersStore.clearAllFilters();
  // console.log(MapFiltersStore.getAllFilters());