
  function calculateSumAndPercentage(layerId, propertyName) {
    var features = map.queryRenderedFeatures({ layers: [layerId] });

    var sum = 0;
    var percentage = 0;
  
    // Calculer la somme de la propriété numérique
    features.forEach(function(feature) {
      console.log(feature.properties[propertyName])  
      sum += feature.properties[propertyName];
    });
  
    // // Calculer le pourcentage de chaque entité
    features.forEach(function(feature) {
      percentage = (feature.properties[propertyName] / sum) * 100;
    });

    return [sum.toFixed(),percentage.toFixed(2) + '%']
  }