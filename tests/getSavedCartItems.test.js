const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // teste 1 teste se ao executar getsaveditems com argumento o metodo é chamado
it('ao executar getsaveditems com argumento o metodo é chamado', () => {
  getSavedCartItems();
expect(localStorage.getItem).toBeCalled();
});

  // teste  teste se ao executar get saveditems com argumento o metodo é chamado com parametro
it('ao executar get saveditems com argumento o metodo é chamado com parametro', () => {
  getSavedCartItems();
expect(localStorage.getItem).toBeCalledWith('cartItems')  
});

});
