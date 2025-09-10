// Dati prodotti (catalogo)
const productCatalog = [
  { id: 1, name: "Quaderno", price: 4, category: "Carta e cancelleria", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=180&h=120&fit=crop&crop=center" },
  { id: 2, name: "Penna", price: 1, category: "Carta e cancelleria", imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=180&h=120&fit=crop&crop=center" },
  { id: 3, name: "Zaino", price: 25, category: "Accessori", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=180&h=120&fit=crop&crop=center" },
  { id: 4, name: "Tazza", price: 5, category: "Casa", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=180&h=120&fit=crop&crop=center" },
  { id: 8, name: "Lampada", price: 22, category: "Casa", imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=180&h=120&fit=crop&crop=center" },
  { id: 9, name: "Smartphone", price: 299, category: "Elettronica", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=180&h=120&fit=crop&crop=center" },
  { id: 10, name: "Cuffie Bluetooth", price: 45, category: "Elettronica", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=180&h=120&fit=crop&crop=center" },
  { id: 12, name: "Libro Fantasy", price: 12, category: "Libri", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=180&h=120&fit=crop&crop=center" },
  { id: 14, name: "Manuale Cucina", price: 24, category: "Libri", imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=180&h=120&fit=crop&crop=center" },
  { id: 15, name: "Sci", price: 20, category: "Sport", imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=180&h=120&fit=crop&crop=center" },
  { id: 16, name: "Tappetino Yoga", price: 16, category: "Sport", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=180&h=120&fit=crop&crop=center" },
  { id: 18, name: "Pentola Antiaderente", price: 32, category: "Cucina", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=180&h=120&fit=crop&crop=center" },
  { id: 20, name: "Microonde", price: 85, category: "Cucina", imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=180&h=120&fit=crop&crop=center" },
  { id: 21, name: "T-shirt Cotone", price: 15, category: "Abbigliamento", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=180&h=120&fit=crop&crop=center" },
  { id: 22, name: "Jeans Slim", price: 39, category: "Abbigliamento", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=180&h=120&fit=crop&crop=center" },
  { id: 23, name: "Felpa con Cappuccio", price: 42, category: "Abbigliamento", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=180&h=120&fit=crop&crop=center" }
];

// Carrello inizialmente vuoto
const cart = [];

// Selettori
var catalogEl = document.getElementById('catalog');
var cartEl = document.getElementById('cart');
var totalEl = document.getElementById('total');
var searchInput = document.getElementById('search');
var clearCartBtn = document.getElementById('clear-cart-btn');
var categorySelect = document.getElementById('category-select');

// Mostra il catalogo
function showCatalog() {
  // pulisco (uso replaceChildren per evitare innerHTML)
  if (!catalogEl) return;
  catalogEl.replaceChildren();
	// ciclo i prodotti
  // applica filtro di ricerca se presente
  var filter = '';
  if (searchInput) {
    filter = searchInput.value.trim().toLowerCase();
  }
  var categoryFilter = 'all';
  if (categorySelect) {
    categoryFilter = categorySelect.value;
  }

  for (var i = 0; i < productCatalog.length; i++) {
    var p = productCatalog[i];
    if (filter !== '') {
      // confronto semplice senza usare includes (compatibile con vecchi ambienti)
      var nameLower = p.name.toLowerCase();
      if (nameLower.indexOf(filter) === -1) {
        continue;
      }
    }
    if (categoryFilter !== 'all') {
      if (p.category !== categoryFilter) {
        continue;
      }
    }
	// crea card
    var card = document.createElement('article');
    card.className = 'product-card';
	// crea immagine
    var img = document.createElement('img');
    img.src = p.imageUrl;
    img.alt = p.name;
    card.appendChild(img);
	// crea info
    var info = document.createElement('div');
    info.className = 'product-info';
    var title = document.createElement('h3');
    title.textContent = p.name;
    var price = document.createElement('p');
    price.textContent = '€ ' + p.price;
    info.appendChild(title);
    info.appendChild(price);
    card.appendChild(info);
	// crea bottone
    var btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Aggiungi al Carrello';
    btn.setAttribute('data-id', p.id);
    // evento add
    btn.addEventListener('click', function (e) {
      var id = parseInt(e.target.getAttribute('data-id'), 10);
      addToCart(id);
    });
	// aggiunge bottone alla card
    card.appendChild(btn);
	// aggiunge tutto alla riga
    catalogEl.appendChild(card);
  }
}

// Popola la select delle categorie con valori unici dal catalogo
function populateCategories() {
  if (!categorySelect) return;
  // svuota la select per evitare duplicati (ricreiamo sempre)
  while (categorySelect.firstChild) {
    categorySelect.removeChild(categorySelect.firstChild);
  }
  // opzione di default
  var allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = 'Tutte';
  categorySelect.appendChild(allOpt);

  // raccogli categorie uniche
  var seen = [];
  for (var i = 0; i < productCatalog.length; i++) {
    var c = productCatalog[i].category;
    var found = false;
    for (var j = 0; j < seen.length; j++) {
      if (seen[j] === c) { found = true; break; }
    }
    if (!found) {
      seen.push(c);
    }
  }
  // aggiungi opzioni
  for (var k = 0; k < seen.length; k++) {
    var opt = document.createElement('option');
    opt.value = seen[k];
    opt.textContent = seen[k];
    categorySelect.appendChild(opt);
  }

  // aggiorna anche il suggerimento categorie e il datalist
  updateCategoryHint(seen);
}

// Aggiorna il suggerimento delle categorie esistenti
function updateCategoryHint(categories) {
  var hintEl = document.getElementById('category-hint');
  if (hintEl) {
    hintEl.textContent = 'Categorie esistenti: ' + categories.join(', ');
  }
  // popola anche il datalist usato per l'input categoria
  var list = document.getElementById('category-list');
  if (list) {
    // svuota il datalist
    while (list.firstChild) { list.removeChild(list.firstChild); }
    for (var i = 0; i < categories.length; i++) {
      var opt = document.createElement('option');
      opt.value = categories[i];
      list.appendChild(opt);
    }
  }
}

if (categorySelect) {
  categorySelect.addEventListener('change', function () {
    showCatalog();
  });
}

// Svuota completamente il carrello
function clearCart() {
  cart.splice(0, cart.length);
  updateCart();
  updateTotal();
}

// Event listeners per ricerca e svuota
if (searchInput) {
  searchInput.addEventListener('input', function () {
    showCatalog();
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener('click', function () {
    clearCart();
  });
}

// --- Admin: aggiungi prodotto tramite form 
var addForm = document.getElementById('add-product-form');
var prodName = document.getElementById('prod-name');
var prodPrice = document.getElementById('prod-price');
var prodCategory = document.getElementById('prod-category');
var prodImageUrl = document.getElementById('prod-image-url');

if (addForm) {
  addForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = prodName.value.trim();
    var price = parseFloat(prodPrice.value);
    var category = prodCategory.value.trim();
    if (!name || isNaN(price) || !category) { return; }

    var finalize = function (imgUrl) {
      // id generico: max id + 1
      var maxId = 0;
      for (var i = 0; i < productCatalog.length; i++) { if (productCatalog[i].id > maxId) maxId = productCatalog[i].id; }
  var newProd = { id: maxId + 1, name: name, price: price, category: category, imageUrl: imgUrl };
  productCatalog.push(newProd);
      // aggiorna select categorie e mostra catalogo
      populateCategories();
      showCatalog();
      addForm.reset();
    };

    if (prodImageUrl && prodImageUrl.value.trim() !== '') {
      finalize(prodImageUrl.value.trim());
    } else {
      // immagine placeholder
      finalize('https://via.placeholder.com/180x120?text=No+Image');
    }
  });
}

// popola categorie e mostra catalogo
populateCategories();

// Aggiungi prodotto al carrello
function addToCart(productId) {
  // cerca nel carrello per verificare se esiste già
  var found = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      found = cart[i];
      break;
    }
  }

  if (found) {
    // incrementa quantità
    found.quantity = found.quantity + 1;
  } else {
    // aggiungi nuovo oggetto
    cart.push({ productId: productId, quantity: 1 });
  }

  updateCart();
  updateTotal();
}

// Aggiorna visuale carrello
function updateCart() {
  if (!cartEl) return;
  cartEl.replaceChildren();

  if (cart.length === 0) {
    var empty = document.createElement('p');
    empty.textContent = 'Carrello vuoto';
    empty.className = 'muted';
    cartEl.appendChild(empty);
    return;
  }
  // ciclo gli elementi del carrello
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    // trova prodotto corrispondente
    var product = null;
    for (var j = 0; j < productCatalog.length; j++) {
      if (productCatalog[j].id === item.productId) {
        product = productCatalog[j];
        break;
      }
    }
	// crea riga carrello
    var row = document.createElement('div');
    row.className = 'cart-item';
	// crea metadati
    var meta = document.createElement('div');
    meta.className = 'meta';
    var name = document.createElement('div');
    name.textContent = product.name + ' x ' + item.quantity;
    var subtotal = document.createElement('div');
    subtotal.textContent = '€ ' + (product.price * item.quantity);
    meta.appendChild(name);
    meta.appendChild(subtotal);
	// crea bottone rimuovi
    var removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Rimuovi';
    removeBtn.setAttribute('data-id', item.productId);
    // evento remove
    removeBtn.addEventListener('click', function (e) {
      var id = parseInt(e.target.getAttribute('data-id'), 10);
      removeFromCart(id);
    });
	// aggiunge tutto alla riga
    row.appendChild(meta);
    row.appendChild(removeBtn);
    cartEl.appendChild(row);
  }
}

// Rimuovi (decrementa o elimina)
function removeFromCart(productId) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      if (cart[i].quantity > 1) {
        cart[i].quantity = cart[i].quantity - 1;
      } else {
        // rimuovi elemento dall'array
        cart.splice(i, 1);
      }
      break;
    }
  }

  updateCart();
  updateTotal();
}

// Calcola e mostra il totale
function updateTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    // trova prodotto corrispondente	
    var product = null;
    for (var j = 0; j < productCatalog.length; j++) {
      if (productCatalog[j].id === item.productId) {
        product = productCatalog[j];
        break;
      }
    }
    total = total + (product.price * item.quantity);
  }

  totalEl.textContent = 'Totale: € ' + total;
}

// Inizializzazione al DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  showCatalog();
  updateCart();
  updateTotal();
});


