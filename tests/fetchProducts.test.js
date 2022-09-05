require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // teste 1 testa se fetchProducts é uma função 
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  // teste 2 testa se ao chamar fetchproduct('computador') o fetch foi chamado
  it('Verifica se ao chamar fetchproduct("computador") o fetch foi chamado', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  })

  // teste 3 testa se ao chamar computador utiliza o endpoint 
  it('Verifica se ao chamar computador utiliza o endpoint ', ()=> {
    fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })

  // teste 4 se o retorno é uma estrutura igual a computador search
it('Verifica se o retorno é uma estrutura igual a computador search', async () => {
  const response = await fetchProducts('computador');
  expect(response).toEqual(computadorSearch);
})
  // teste 5 sem argumentos retorna erro 
  it('Verifica se sem parametro retorna erro ', async () => {
    const expected = await fetchProducts();
    expect(expected).toEqual(new Error('You must provide an url'));
  })
});
