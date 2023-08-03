  const api= `https://glowing-space-goggles-57gr6w46vpf45rq-3000.preview.app.github.dev`

  async function getIndexPct (arr,index) {
    let apiUrl = `${api}/index_pct`;
  
    if (arr) {
      apiUrl += `?arr=${arr}`;
    }

    if (index) {
      apiUrl += `&index=${index.join(',')}`;
    }
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      // Traitez les données de la réponse ici si nécessaire
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'appel de l\'API', error);
      throw error; // Vous pouvez choisir de rejeter l'erreur ou de la gérer ici
    }
  }

  async function getPopData(arr) {
    let apiUrl = `${api}/pop_data`;
  
    if (arr) {
      apiUrl += `?arr=${arr}`;
    }
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      // Traitez les données de la réponse ici si nécessaire
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'appel de l\'API', error);
      throw error; // Vous pouvez choisir de rejeter l'erreur ou de la gérer ici
    }
  }
