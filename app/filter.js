function filtrerParArrondissement() {
    const t = lireLabelsCheckboxChecked()
    if (t.includes("Tous les arrondissements")) {
        myLayers.forEach((layer) => {
          map.setFilter(layer, null);
        })
    } else {
        myLayers.forEach((layer) => {
          map.setFilter(layer,['in', 'arr_vll', ...t]);
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

