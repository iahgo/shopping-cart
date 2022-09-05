// adicionar ao script.js
// const appendInfo = (info) => {
//     const infoToAppend = info.results;
//     const resultsTextArea = document.getElementsByClassName('items')[0];
//     resultsTextArea.innerHTML = infoToAppend;
// };

const fetchProducts = async (produto) => {
    try {
      const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
      const response = await fetch(endpoint);
      const produtos = await response.json();
      // console.log(produtos);
      // appendInfo(produtos)
      return produtos; 
    } catch (error) {
      return error;
    }
};
// refazer e usar try catch

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
