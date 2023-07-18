function filtrerParArrondissement() {
    const t = lireLabelsCheckboxChecked()
    if (t.includes("Tous les arrondissements")) {
        myLayers.forEach((layer) => {
          map.setFilter(layer.id, null);
        })
    } else {
        myLayers.forEach((layer) => {
          map.setFilter(layer.id,['in', 'arr_vll', ...t]);
        })
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
    if (layer) {
      var visibility = map.getLayoutProperty(layerId, 'visibility');
      
      if (visibility === 'visible') {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      } else {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
      }
    }
  }