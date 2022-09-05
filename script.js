// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchProducts } = require("./helpers/fetchProducts");
const buttonEsvaziar = document.querySelector('.empty-cart');
const carrinho = document.querySelector('.cart__items');
const items = carrinho.children;
const sec = document.querySelector('.items');
const quadrados = sec.children;

let total = 0; 
const totalDiv = document.querySelector('.total-price');

const loadingClass = document.querySelector('.loading');
const loading = () => { loadingClass.innerText = 'carregando...'; };
// const NoLoading = () => { loadingClass.remove(); };
const NoLoading = () => { loadingClass.innerText = ''; };
// usar apos passar no requisito 

const input = document.querySelector('.input');
const button = document.querySelector('.button');
// let search = 'computador';
let search = '';

function zeroResults() {
  sec.innerText = ' sem resultados';
}

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const renderProducts = (produt) => {
  sec.appendChild(produt);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const cartItemClickListener = async (event) => {
  const liElement = event.path[0];
  let produtoID = '';
  for (let i = 5; i < 18; i += 1) { produtoID += liElement.innerText[i]; }
  loading();
  const produto = await fetchItem(produtoID);
  NoLoading();
  liElement.remove();
  console.log('-----------------');
  console.log('removeu produto: ', produtoID);
  console.log(`subtraiu: R$ ${produto.price} `);
  total -= produto.price;
  console.log(`total do carrinho: R$ ${Math.round(total * 100) / 100}`);
  totalDiv.innerText = `${Math.round(total * 100) / 100}`;
  if (items.length === 0) {
    console.clear();
    console.log('carrinho vazio');
  }
};
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const startCart = async (num) => {
  loading();
  const produto = await fetchItem(num);
  NoLoading();
  const olCart = document.querySelector('.cart__items');
  const para2 = { sku: produto.id, name: produto.title, salePrice: produto.price };
  const li = createCartItemElement(para2);
  console.log('-----------------');
  console.log('adicionou produto: ', produto.id);
  total += produto.price;
  console.log(`somou: R$ ${produto.price}`);
  console.log(`total do carrinho: R$ ${Math.round(total * 100) / 100}`);
  totalDiv.innerText = `${Math.round(total * 100) / 100}`;
  olCart.appendChild(li);
  localStorage.o = olCart.innerHTML;
  // console.log(localStorage);
  // console.log(olCart.innerText);
};
const startProducts = async (busca) => {
  loading();
  const produtos = await fetchProducts(busca);
  NoLoading();
  const produtosResults = produtos.results;
  if (produtosResults.length === 0) { zeroResults(); } else { sec.innerHTML = '' }
  console.log(`encontrou ${produtosResults.length} resultados`);
  produtosResults.forEach(({ id, title, thumbnail }) => {
    para = { sku: id, name: title, image: thumbnail };
    renderProducts(createProductItemElement(para));
  });
  for (let i = 0; i < produtosResults.length; i += 1) {
    const target = document.querySelectorAll('.item__add')[i];
    target.addEventListener('click', () => {
      startCart(produtosResults[i].id);
    });
  }
};
const esvaziar = () => {
  console.clear();
  for (let i = items.length; i > 0; i -= 1) {
    items[i - 1].remove();
  }
  total = 0;
  totalDiv.innerText = `${total}`;
  console.log('esvaziou o carrinho'); 
  localStorage.clear()
};

button.addEventListener('click', () => {
  search = input.value;
  console.clear();
  console.log(`nova busca: ${search}`);
  for (let i = quadrados.length; i > 0; i -= 1) {
    quadrados[i - 1].remove();
  }
  startProducts(search);
});
input.addEventListener('keyup', function (e) {
  const key = e.which || e.keyCode;
  if (key === 13) { // codigo da tecla enter
    search = input.value;
    console.clear();
    console.log(`nova busca: ${search}`);
    for (let i = quadrados.length; i > 0; i -= 1) {
      quadrados[i - 1].remove();
    }
    startProducts(search);
  }
});

window.onload = () => { 
  startProducts(search);
  if (localStorage.length !== 0) {
    loading();
    carrinho.innerHTML = localStorage.o;
    NoLoading();
    const item = document.querySelectorAll('.cart__item');
    for (let i = 0; i < item.length; i += 1) {
      item[i].addEventListener('click', () => {
        loading();
        item[i].remove();
        NoLoading();
      });
    }
  }
};

buttonEsvaziar.addEventListener('click', esvaziar);
