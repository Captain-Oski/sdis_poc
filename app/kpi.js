
var popFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
var percTFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

  function calculateSumAndPercentage(layerId, propertyName) {
    var features = map.queryRenderedFeatures({ layers: [layerId] });
    var sum = 0;
  
    // Calculer la somme de la propriété numérique
    features.filter(function(feature) {
        return feature.properties['indice_emv'] > 4;
      }).forEach(function(feature) {
      sum += feature.properties[propertyName];
    });

    return [popFormatter.format(sum),percTFormatter.format((sum/ 1765932) * 100)]
  }

  
  function calculatePercentage() {
    var features = map.queryRenderedFeatures({ layers: [activeLayer] });
    var acp_sociale= 0
    var acp_econo= 0
    var acp_enviro = 0
    var acp_securite= 0
    var acp_cultsportloisir = 0
    var acp_proximite = 0
    
    features.filter(function(feature) {
        return feature.properties['indice_emv'] > 4;
      })
    .forEach(function(feature) {
        acp_sociale += feature.properties['acp_sociale'];
        acp_econo += feature.properties['acp_econo'];
        acp_enviro += feature.properties['acp_enviro'];
        acp_securite += feature.properties['acp_securite'];
        acp_cultsportloisir += feature.properties['acp_cultsportloisir'];
        acp_proximite += feature.properties['acp_proximite'];
    });

    var percTFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

    return {
        acp_sociale: percTFormatter.format((acp_sociale/ 5152) * 100),
        acp_econo: percTFormatter.format((acp_econo/ 5152) * 100),
        acp_enviro: percTFormatter.format((acp_enviro/ 5152) * 100),
        acp_securite: percTFormatter.format((acp_securite/ 5152) * 100),
        acp_cultsportloisir: percTFormatter.format((acp_cultsportloisir/ 5152) * 100),
        acp_proximite: percTFormatter.format((acp_proximite/ 5152) * 100)
      };
  }

  function calculatePercentageVulnerability() {
    var features = map.queryRenderedFeatures({ layers: [activeLayer] });

    var qty = 0
    
    features.filter(function(feature) {
        return feature.properties['indice_emv'] > 4;
      })
    .forEach(function(feature) {
        qty += 1;
    });

    var percTFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

    return {
        qty: percTFormatter.format((qty/ 5152) * 100),
      };
  }