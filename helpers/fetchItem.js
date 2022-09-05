const fetchItem = async (id) => {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endpoint);
    const produtos = await response.json();
    // console.log(produtos);
    // appendInfo(produtos)
    return produtos; 
  } catch (error) {
    return error;
  }
};

// fetchItem('MLB1615760527')

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
