
// Minimal cart + utils (localStorage-based)
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const CART_KEY = 'otaku_cart_v1';
const fmt = n => '$' + (Math.round(n*100)/100).toFixed(2);

function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[] }catch(e){ return [] } }
function setCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartBadge(); }
function addToCart(item){
  const cart = getCart();
  const ix = cart.findIndex(x => x.id === item.id);
  if(ix>=0){ cart[ix].qty += item.qty || 1; }
  else { cart.push({...item, qty: item.qty||1}); }
  setCart(cart);
  alert('Added to cart.');
}
function removeFromCart(id){
  setCart(getCart().filter(x=>x.id!==id));
  renderCart();
}
function updateQty(id, qty){
  const cart = getCart();
  const it = cart.find(x=>x.id===id);
  if(!it) return;
  it.qty = Math.max(1, parseInt(qty||1,10));
  setCart(cart);
  renderCart();
}
function cartTotal(){
  return getCart().reduce((s,x)=>s + x.price*x.qty, 0);
}
function updateCartBadge(){
  const badge = $('#cart-badge');
  if(!badge) return;
  const count = getCart().reduce((s,x)=>s+x.qty,0);
  badge.textContent = count>0? String(count): '';
  badge.style.display = count>0? 'inline-flex':'none';
}

// Shared header events
function initMenu(){
  const btn = $('#menuBtn'); const nav = $('#nav');
  btn?.addEventListener('click', ()=>{
    const open = btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.style.display = open? 'none':'flex';
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initMenu();
  updateCartBadge();
});
