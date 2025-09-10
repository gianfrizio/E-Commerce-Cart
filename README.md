Progetto: Catalogo Prodotti Interattivo - Esercizio

Come funziona

1) showCatalog()
- Legge l'array `productCatalog` e crea dinamicamente le card prodotto.
- Applica il filtro della barra di ricerca (se l'utente ha inserito testo) e mostra solo i prodotti che contengono la stringa cercata (case-insensitive).
- Ogni card contiene immagine, nome, prezzo e bottone "Aggiungi al Carrello".

2) addToCart(productId)
- Verifica se il prodotto esiste già nel `cart`.
- Se esiste incrementa la `quantity`, altrimenti aggiunge un nuovo oggetto `{ productId, quantity: 1 }`.
- Chiama `updateCart()` e `updateTotal()` per aggiornare la UI.

3) updateCart()
- Ricostruisce la lista del carrello a partire dall'array `cart`.
- Per ogni elemento del carrello trova il prodotto corrispondente nel `productCatalog` per mostrare nome e subtotal.
- Aggiunge un bottone "Rimuovi" che decrementa la quantità o rimuove l'elemento.
- Se il carrello è vuoto mostra "Carrello vuoto".

4) removeFromCart(productId)
- Decrementa la quantità se >1, altrimenti rimuove l'elemento dall'array `cart` con `splice()`.
- Aggiorna UI e totale.

5) updateTotal()
- Calcola il totale sommando `price * quantity` per ogni elemento del carrello e aggiorna l'area del totale.

6) clearCart()
- Svuota l'array `cart` (usa `splice`) e aggiorna la UI.

Elementi aggiuntivi
- Barra di ricerca: filtra i prodotti per nome durante la digitazione.
- Pulsante "Svuota Carrello": svuota subito il carrello.
- Styling: file `style.css` fornisce layout responsive e classi per i componenti.
 - Filtro per categoria: seleziona una categoria dal menu a tendina per mostrare solo i prodotti di quella categoria.
 - Prodotti aggiunti: la lista del catalogo è stata estesa con più prodotti e ogni prodotto ha ora una `category`.
 - Admin panel: è presente un form nella pagina che permette di aggiungere nuovi prodotti (nome, prezzo, categoria, immagine tramite URL). I prodotti aggiunti vengono mantenuti soltanto in memoria e non sono persistenti dopo il refresh.

Come provare
- Apri `index.html` in un browser oppure avvia live server su VisualStudioCode.
- Aggiungi prodotti al carrello, rimuovili o svuota tutto con il pulsante.
- Usa la barra di ricerca per filtrare il catalogo.

Note tecniche
- Implementazione in vanilla JS senza usare `map`, `filter`, `reduce`, destructuring o operatori spread.
- Evita XSS usando `createElement` / `textContent` e `replaceChildren()` per svuotare i contenitori.
