const arrondissementsArray = [
  'Ahuntsic-Cartierville',
  'Anjou',
  'Côte-des-Neiges-Notre-Dame-de-Grâce',
  'Lachine',
  'LaSalle',
  'Le Plateau-Mont-Royal',
  'Le Sud-Ouest',
  "L'Île-Bizard-Sainte-Geneviève",
  'Mercier-Hochelaga-Maisonneuve',
  'Montréal-Nord',
  'Outremont',
  'Pierrefonds-Roxboro',
  'Rivière-des-Prairies-Pointe-aux-Trembles',
  'Rosemont-La Petite-Patrie',
  'Saint-Laurent',
  'Saint-Léonard',
  'Verdun',
  'Ville-Marie',
  'Villeray-Saint-Michel-Parc-Extension'
];

// Function to create the HTML component
function createFormCheckElement(text) {
  const div = document.createElement('div');
  div.classList.add('form-check');

  const input = document.createElement('input');
  input.classList.add('form-check-input');
  input.classList.add('boroughs');
  input.type = 'checkbox';
  input.value = '';
  input.id = 'flexCheck' + text.replace(/\s+/g, ''); // Generate a unique ID

  const label = document.createElement('label');
  label.classList.add('form-check-label');
  label.htmlFor = input.id;
  label.textContent = text;

  div.appendChild(input);
  div.appendChild(label);

  return div;
}

// Function to append the components to the container
function renderDynamicComponents() {
  const container = document.getElementById('dynamicComponentsContainer');

  // Clear the container before rendering
  container.innerHTML = '';

  // Loop through the array and create the components
  arrondissementsArray.forEach(text => {
    const component = createFormCheckElement(text);
    container.appendChild(component);

    // Add event listener for checkbox changes
    const checkbox = component.querySelector('.boroughs');
    checkbox.addEventListener('change', updateBoroughFilter);
  });
}

// Call the function to render the dynamic components
renderDynamicComponents();