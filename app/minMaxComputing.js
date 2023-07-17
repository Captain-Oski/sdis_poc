function minMaxForStyle(acp) {
    let minValue = Infinity;
    let maxValue = -Infinity;
    map.on('data', () => {
        myLayers.forEach((layer) => {
        
        var features = map.querySourceFeatures(`${layer.id}_source`, {
            sourceLayer: [`sdis.${layer.id}`]
            });
        // console.log(features)   

        features.forEach((feature) => {
   
            const acp_var = feature.properties[acp]; // Supposons que "acp_scl" est la propriété contenant les valeurs à interpoler
            if (acp_var < minValue) {
                minValue = acp_var;
            }
            if (acp_var > maxValue) {
                maxValue = acp_var;
            }
            
        });    
    });
    return[minValue,maxValue]
    })
}
