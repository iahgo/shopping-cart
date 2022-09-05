require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
    // teste 1 testa se fetchItem é uma função 
    it('Verifica se fetchItem é uma função', () => {
      expect(typeof fetchItem).toBe('function');
    });
  
    // teste 2 testa se ao chamar fetchproduct('MLB1615760527') o fetch foi chamado
    it('Verifica se ao chamar fetchItem("MLB1615760527") o fetch foi chamado', () => {
      fetchItem('computador');
      expect(fetch).toBeCalled();
    })
  
    // teste 3 testa se ao chamar MLB1615760527 utiliza o endpoint 
    it('Verifica se ao chamar MLB1615760527 utiliza o endpoint ', ()=> {
      fetchItem('MLB1615760527');
      expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
    })
  
    // teste 4 se o retorno é uma estrutura igual ao item
  it('Verifica se o retorno é uma estrutura igual ao item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  })
    // teste 5 sem argumentos retorna erro 
    it('Verifica se sem parametro retorna erro ', async () => {
      const expected = await fetchItem();
      expect(expected).toEqual(new Error('You must provide an url'));
    })
});
