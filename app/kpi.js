
var popFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
var percTFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

  function calculateSumAndPercentage(layerId, propertyName) {
    var features = map.queryRenderedFeatures({ layers: [layerId] });
    var sum = 0;
  
    // Calculer la somme de la propriété numérique
    features.forEach(function(feature) {
      sum += feature.properties[propertyName];
    });

    return [popFormatter.format(sum),percTFormatter.format((sum/ 1767582) * 100)]
  }

  
  function calculatePercentage() {
    var features = map.queryRenderedFeatures({ layers: ['hex_data'] });
    var sum = 0;
    var acp_sociale,    acp_econo,    acp_enviro,    acp_securite,    acp_cultsportloisir,    acp_proximite
    
    features.forEach(function(feature) {
        acp_sociale += feature.properties['acp_sociale'];
        acp_econo += feature.properties['acp_econo'];
        acp_enviro += feature.properties['acp_enviro'];
        acp_securite += feature.properties['acp_securite'];
        acp_cultsportloisir += feature.properties['acp_cultsportloisir'];
        acp_proximite += feature.properties['acp_proximite'];
    });

    var percTFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
    return {
        acp_sociale: percTFormatter.format((acp_sociale/ 1767582) * 100),
        acp_econo: percTFormatter.format((acp_econo/ 1767582) * 100),
        acp_enviro: percTFormatter.format((acp_enviro/ 1767582) * 100),
        acp_securite: percTFormatter.format((acp_securite/ 1767582) * 100),
        acp_cultsportloisir: percTFormatter.format((acp_cultsportloisir/ 1767582) * 100),
        acp_proximite: percTFormatter.format((acp_proximite/ 1767582) * 100)
      };
  }