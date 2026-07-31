// script.js

// State Management
let cart = [];
let toppingState = {}; 

// DOM Elements
const menuContainer = document.getElementById('menu-container');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const toastEl = document.getElementById('toast');
const checkoutModal = document.getElementById('checkout-modal');

// Format Rupiah
const formatRp = (num) => 'Rp ' + num.toLocaleString('id-ID');

// 1. Inisialisasi & Render Produk
function renderMenu() {
    menuContainer.innerHTML = '';
    
    CONFIG.categories.forEach(category => {
        const divider = document.createElement('div');
        divider.className = 'price-divider';
        divider.innerHTML = `<span>${category.name} - ${formatRp(category.price)}</span>`;
        menuContainer.appendChild(divider);

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        category.items.forEach(item => {
            toppingState[item.id] = []; 

            const card = document.createElement('div');
            card.className = 'card';
            
            const toppingsHtml = item.toppings.map(t => 
                `<button type="button" class="topping-btn" data-id="${item.id}" data-val="${t}">${t}</button>`
            ).join('');

            const levelsHtml = CONFIG.toppingLevels.map((lvl, idx) => `
                <label class="level-label">
                    <input type="radio" name="level-${item.id}" value="${lvl.id}" data-price="${lvl.price}" data-name="${lvl.name}" ${idx === 0 ? 'checked' : ''}>
                    ${lvl.name} ${lvl.price > 0 ? `(+${formatRp(lvl.price)})` : ''}
                </label>
            `).join('');

            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    
                    <div class="card-section-title">Pilih Topping (Maks 2)</div>
                    <div class="toppings-group" id="toppings-${item.id}">
                        ${toppingsHtml}
                    </div>

                    <div class="card-section-title">Level Topping</div>
                    <div class="level-group">
                        ${levelsHtml}
                    </div>

                    <button class="btn-gold full-width btn-add-cart" style="margin-top: 1.5rem;"
                        data-id="${item.id}"
                        data-name="${item.name}"
                        data-price="${category.price}"
                        data-category="${category.name}">
                        + Keranjang
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
        menuContainer.appendChild(grid);
    });

    attachToppingListeners();
    attachCartButtonListeners();
}

// 2. Logika Topping Maks 2
function attachToppingListeners() {
    document.querySelectorAll('.topping-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cardId = this.getAttribute('data-id');
            const val = this.getAttribute('data-val');
            let selections = toppingState[cardId];

            if (selections.includes(val)) {
                selections = selections.filter(t => t !== val);
                this.classList.remove('selected');
            } else {
                selections.push(val);
                this.classList.add('selected');
                
                if (selections.length > 2) {
                    const removed = selections.shift();
                    const removedBtn = document.querySelector(`.topping-btn[data-id="${cardId}"][data-val="${removed}"]`);
                    if (removedBtn) removedBtn.classList.remove('selected');
                }
            }
            toppingState[cardId] = selections;
        });
    });
}

// 3. Listener Tombol Masukkan Keranjang
function attachCartButtonListeners() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const category = this.getAttribute('data-category');
            
            addToCart(id, name, price, category);
        });
    });
}

// 4. Logika Keranjang Utama
function addToCart(id, name, basePrice, categoryName) {
    const selectedToppings = [...toppingState[id]]; 
    
    const levelRadio = document.querySelector(`input[name="level-${id}"]:checked`);
    const levelPrice = parseInt(levelRadio.getAttribute('data-price'));
    const levelName = levelRadio.getAttribute('data-name');

    const cartItemId = `${id}-${selectedToppings.join('-')}-${levelName}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            cartItemId, id, name, categoryName,
            basePrice, levelPrice, levelName,
            toppings: selectedToppings,
            qty: 1
        });
    }

    updateCartUI();
    showToast(`${name} ditambahkan!`);
}

function updateCartUI() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemTotal = (item.basePrice + item.levelPrice) * item.qty;
        total += itemTotal;
        count += item.qty;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <h4>${item.name} (${item.categoryName})</h4>
                <button class="btn-remove" onclick="removeFromCart('${item.cartItemId}')">Hapus</button>
            </div>
            <div class="cart-item-details">
                Topping: ${item.toppings.length > 0 ? item.toppings.join(', ') : 'Tanpa Topping'}<br>
                Level: ${item.levelName} (+${formatRp(item.levelPrice)})<br>
                Harga Satuan: ${formatRp(item.basePrice + item.levelPrice)}
            </div>
            <div class="cart-controls">
                <div>
                    <button class="qty-btn" onclick="updateQty('${item.cartItemId}', -1)">-</button>
                    <span style="margin: 0 10px;">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty('${item.cartItemId}', 1)">+</button>
                </div>
                <strong>${formatRp(itemTotal)}</strong>
            </div>
        `;
        cartItems.appendChild(div);
    });

    cartCount.innerText = count;
    totalPriceEl.innerText = formatRp(total);
}

window.updateQty = function(cartItemId, delta) {
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.cartItemId !== cartItemId);
        }
        updateCartUI();
    }
}

window.removeFromCart = function(cartItemId) {
    cart = cart.filter(i => i.cartItemId !== cartItemId);
    updateCartUI();
}

function showToast(msg) {
    toastEl.innerText = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2500);
}

// 5. UI Toggles & Modals
document.getElementById('cart-toggle').onclick = () => { cartSidebar.classList.add('open'); overlay.classList.add('show'); };
document.getElementById('btn-selesai').onclick = () => { cartSidebar.classList.add('open'); overlay.classList.add('show'); };

const closeCartFunc = () => { cartSidebar.classList.remove('open'); overlay.classList.remove('show'); };
document.getElementById('close-cart').onclick = closeCartFunc;
overlay.onclick = () => { closeCartFunc(); checkoutModal.classList.remove('open'); };

document.getElementById('btn-checkout-modal').onclick = () => {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    closeCartFunc();
    checkoutModal.classList.add('open');
    overlay.classList.add('show');
    
    document.getElementById('pickup-date').min = new Date().toISOString().split('T')[0];
    document.getElementById('pickup-date').value = new Date().toISOString().split('T')[0];
};

document.getElementById('close-modal').onclick = () => {
    checkoutModal.classList.remove('open');
    overlay.classList.remove('show');
};

// Logika Pergantian Opsi Pengiriman
document.getElementById('delivery-option').addEventListener('change', function() {
    const addrGroup = document.getElementById('address-group');
    const addrInput = document.getElementById('address');
    const dateLabel = document.getElementById('date-label');

    if (this.value === 'Ambil Sendiri') {
        addrGroup.style.display = 'none';
        addrInput.required = false;
        dateLabel.innerText = 'Tanggal Pengambilan *'; // Label berubah
    } else {
        addrGroup.style.display = 'block';
        addrInput.required = true;
        dateLabel.innerText = 'Tanggal Pengiriman *'; // Label berubah
    }
});

// 6. Checkout & WhatsApp Submit
document.getElementById('form-checkout').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('cust-name').value;
    const delivery = document.getElementById('delivery-option').value;
    const date = document.getElementById('pickup-date').value;
    const address = document.getElementById('address').value;
    const mapsLink = document.getElementById('maps-link').value;
    const payment = document.getElementById('payment-method').value;
    const notes = document.getElementById('notes').value || "-";

    let grandTotal = 0;
    
    let orderText = cart.map((item, index) => {
        const itemTotal = (item.basePrice + item.levelPrice) * item.qty;
        grandTotal += itemTotal;
        return `${index + 1}. ${item.qty}x ${item.name} (${item.categoryName})\n   - Topping: ${item.toppings.length ? item.toppings.join(', ') : 'Tanpa Topping'}\n   - Level: ${item.levelName} (+${formatRp(item.levelPrice)})\n   Subtotal: ${formatRp(itemTotal)}`;
    }).join('\n\n');

    let deliveryInfo = "";
    if (delivery === 'Ambil Sendiri') {
        deliveryInfo = `Tanggal Ambil: ${date}`;
    } else {
        // Tanggal, Alamat, dan Link Maps digabungkan
        deliveryInfo = `Tanggal Kirim: ${date}\nAlamat Kirim: ${address}`;
        if (mapsLink) {
            deliveryInfo += `\nLink Maps: ${mapsLink}`;
        }
    }

    const message = `*DE'ROYALE DONUTS - PESANAN BARU*
    
*Data Pemesan:*
Nama: ${name}
Opsi Pengiriman: ${delivery}
${deliveryInfo}
Metode Pembayaran: ${payment}

*Daftar Pesanan:*
${orderText}

*Catatan Tambahan:* 
${notes}

*TOTAL PEMBAYARAN: ${formatRp(grandTotal)}*`;

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});

// Start Render
renderMenu();
