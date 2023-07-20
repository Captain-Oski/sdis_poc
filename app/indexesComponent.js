
var filterValues = {
  lessThan2: true,
  between2And3: true,
  greaterThan4: true
};


// Fonction pour créer le composant HTML
function createLegendComponent(id, text, checked, boxClass) {
    const div = document.createElement('div');
    div.classList.add('form-check');
  
    const input = document.createElement('input');
    input.classList.add('form-check-input');
    input.type = 'checkbox';
    input.value = '';
    input.id = id;
    input.checked = checked;
  
    const label = document.createElement('label');
    label.classList.add('form-check-label');
    label.htmlFor = id;
    label.textContent = text;
  
    const box = document.createElement('div');
    box.classList.add('box', boxClass);
  
    label.appendChild(box);
    div.appendChild(input);
    div.appendChild(label);
  
    return div;
  }
  
  // Fonction pour ajouter les composants au conteneur
  function renderLegendComponents() {
    const container = document.getElementById('indexesComponent');
  
    // Créer les composants en utilisant la fonction createLegendComponent
    const legend1 = createLegendComponent('legend1', 'Non vulnérable (0,1,2)', true, 'legend1');
    const legend2 = createLegendComponent('legend2', 'Vulnérable non prioritaire (3)', true, 'legend2');
    const legend3 = createLegendComponent('legend3', 'Vulnérable et prioritaire (4,5,6)', true, 'legend3');
  
    // Ajouter les composants au conteneur
    container.appendChild(legend1);
    container.appendChild(legend2);
    container.appendChild(legend3);

    // Event handlers for filter buttons
document.getElementById('legend1').addEventListener('change', function () {
  filterValues.lessThan2 = !filterValues.lessThan2;
  updateIndexesFilters();
});

document.getElementById('legend2').addEventListener('change', function () {
  filterValues.between2And3 = !filterValues.between2And3;
  updateIndexesFilters();
});

document.getElementById('legend3').addEventListener('change', function () {
  filterValues.greaterThan4 = !filterValues.greaterThan4;
  updateIndexesFilters();
});

  }


  
  // Appeler la fonction pour générer les composants
  renderLegendComponents();