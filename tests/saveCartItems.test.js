const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // teste 1 teste se ao executar savecartitems com argumento o metodo é chamado
  it('executar savecartitems com argumento o metodo é chamado', async () => {
    await saveCartItems('ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalledWith();
  });

  // teste  teste se ao executar savecartitems com argumento o metodo é chamado com 2 parametros 
  // sendo o primeiro cartitems e o segundo um valor 
  it('ao executar savecartitems com argumento o metodo é chamado com 2 parametros sendo o primeiro cartitems e o segundo um valor', async () => {
    await saveCartItems('ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalledWith('cartItems', 'ol><li>Item</li></ol>')
  });
});
