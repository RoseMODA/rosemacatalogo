// Product Database
const products = [
  {
    id: 1,
    name: "Remera Princesa",
    category: "mujer",
    price: 12000,
    originalPrice: null,
    discount: null,
    sku: "M-REMP01",
    images: ["assets/img/IMG_1319.jpg", "assets/img/IMG_1287.JPG"],
    colors: ["Verde militar", "Gris", "Negro", "Blanco"],
    sizes: ["S", "M", "L", "XL"],
    description: "Remera de algodón suave y cómoda, perfecta para uso diario.",
    stock: 15,
    featured: true,
    onSale: false
  },
  {
    id: 2,
    name: "Remera Combinada",
    category: "mujer",
    price: 6000,
    originalPrice: 8000,
    discount: 25,
    sku: "M-REMP02",
    images: ["assets/img/IMG_1294.JPG", "assets/img/IMG_1298.JPG"],
    colors: ["Verde militar", "Negro", "Violeta", "Gris", "Rosa", "Blanco", "Morado", "Bordo"],
    sizes: ["S", "M", "L", "XL"],
    description: "Remera combinada con diseño moderno y colores vibrantes.",
    stock: 8,
    featured: true,
    onSale: true
  },
  {
    id: 3,
    name: "Chaleco Engomado",
    category: "mujer",
    price: 40000,
    originalPrice: 50000,
    discount: 20,
    sku: "M-CHAL01",
    images: ["assets/img/IMG_1313.jpg", "assets/img/IMG_1308.JPG"],
    colors: ["Marrón", "Negro", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    description: "Chaleco engomado resistente al agua, ideal para el invierno.",
    stock: 5,
    featured: true,
    onSale: true
  },
  {
    id: 4,
    name: "Sueter Lana",
    category: "mujer",
    price: 30000,
    originalPrice: 35000,
    discount: 15,
    sku: "M-SUET01",
    images: ["assets/img/IMG_1300.JPG", "assets/img/IMG_1301.JPG"],
    colors: ["Beige", "Rojo", "Negro", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Suéter de lana natural, suave y abrigado.",
    stock: 12,
    featured: true,
    onSale: true
  },
  {
    id: 5,
    name: "Pantalón Cargo",
    category: "hombre",
    price: 25000,
    originalPrice: null,
    discount: null,
    sku: "H-PANT01",
    images: ["assets/img/IMG_1302.JPG"],
    colors: ["Verde militar", "Negro", "Beige"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Pantalón cargo resistente con múltiples bolsillos.",
    stock: 10,
    featured: false,
    onSale: false
  },
  {
    id: 6,
    name: "Campera Deportiva",
    category: "hombre",
    price: 35000,
    originalPrice: null,
    discount: null,
    sku: "H-CAMP01",
    images: ["assets/img/IMG_1309.JPG"],
    colors: ["Negro", "Azul marino", "Gris"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Campera deportiva con capucha, ideal para actividades al aire libre.",
    stock: 7,
    featured: false,
    onSale: false
  },
  {
    id: 7,
    name: "Vestido Infantil",
    category: "ninos",
    price: 15000,
    originalPrice: null,
    discount: null,
    sku: "N-VEST01",
    images: ["assets/img/IMG_1310.JPG"],
    colors: ["Rosa", "Celeste", "Amarillo"],
    sizes: ["2", "4", "6", "8", "10"],
    description: "Vestido infantil cómodo y colorido para niñas.",
    stock: 20,
    featured: false,
    onSale: false
  },
  {
    id: 8,
    name: "Zapatillas Deportivas",
    category: "calzado",
    price: 45000,
    originalPrice: null,
    discount: null,
    sku: "C-ZAP01",
    images: ["assets/img/IMG_1311.JPG"],
    colors: ["Blanco", "Negro", "Azul"],
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    description: "Zapatillas deportivas cómodas para uso diario.",
    stock: 15,
    featured: false,
    onSale: false
  }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('rosema-cart')) || [];

// Current filters
let currentFilters = {
  category: 'all',
  search: '',
  onSale: false
};

// View mode state
let isFullCatalogView = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  renderProducts();
  updateCartUI();
  setupCarousel();
  setupMobileMenu();
}

function setupEventListeners() {
  // Search functionality
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  // Mobile search
  const mobileSearchBtn = document.querySelector('.sm\\:hidden button[aria-label="Buscar"]');
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', toggleMobileSearch);
  }
  
  // Category navigation
  const categoryLinks = document.querySelectorAll('.category-nav a, #mobile-menu a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', handleCategoryClick);
  });
  
  // Cart button
  const cartBtn = document.querySelector('button[aria-label="Carrito"]');
  if (cartBtn) {
    cartBtn.addEventListener('click', toggleCart);
  }
  
  // Ver todo button
  const verTodoBtn = document.querySelector('.btn-ver-todo');
  if (verTodoBtn) {
    verTodoBtn.addEventListener('click', showAllProducts);
  }
}

function handleSearch(e) {
  currentFilters.search = e.target.value.toLowerCase();
  renderProducts();
}

function toggleMobileSearch() {
  const searchContainer = document.createElement('div');
  searchContainer.className = 'fixed top-0 left-0 w-full bg-[#d63629] p-4 z-50';
  searchContainer.innerHTML = `
    <div class="flex items-center space-x-2">
      <input type="search" placeholder="Buscar productos..." 
             class="flex-1 rounded-full py-2 px-4 text-gray-900 focus:outline-none" 
             id="mobile-search-input">
      <button onclick="closeMobileSearch()" class="text-white text-xl">✕</button>
    </div>
  `;
  
  document.body.appendChild(searchContainer);
  document.getElementById('mobile-search-input').focus();
  
  document.getElementById('mobile-search-input').addEventListener('input', handleSearch);
}

function closeMobileSearch() {
  const searchContainer = document.querySelector('.fixed.top-0');
  if (searchContainer) {
    searchContainer.remove();
  }
}

function handleCategoryClick(e) {
  e.preventDefault();
  const category = e.target.textContent.toLowerCase();
  
  // Map category names
  const categoryMap = {
    'mujer': 'mujer',
    'hombre': 'hombre',
    'niños/bebes': 'ninos',
    'calzado': 'calzado',
    'ropa interior': 'ropa-interior',
    'accesorios': 'accesorios',
    'ver todo': 'all'
  };
  
  currentFilters.category = categoryMap[category] || 'all';
  isFullCatalogView = false; // Reset to carousel view when filtering by category
  renderProducts();
  
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
}

function showAllProducts() {
  currentFilters.category = 'all';
  currentFilters.search = '';
  currentFilters.onSale = false;
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) searchInput.value = '';
  
  // Toggle to full catalog view
  isFullCatalogView = true;
  renderProducts();
}

function renderProducts() {
  let filteredProducts = products.filter(product => {
    const matchesCategory = currentFilters.category === 'all' || product.category === currentFilters.category;
    const matchesSearch = currentFilters.search === '' || 
                         product.name.toLowerCase().includes(currentFilters.search) ||
                         product.description.toLowerCase().includes(currentFilters.search);
    const matchesSale = !currentFilters.onSale || product.onSale;
    
    return matchesCategory && matchesSearch && matchesSale;
  });
  
  if (isFullCatalogView) {
    showFullCatalog(filteredProducts);
  } else {
    showCarouselView(filteredProducts);
  }
}

function showCarouselView(filteredProducts) {
  // Show carousel sections
  const carouselSections = document.getElementById('carousel-sections');
  const fullCatalog = document.getElementById('full-catalog');
  
  if (carouselSections) carouselSections.classList.remove('hidden');
  if (fullCatalog) fullCatalog.classList.add('hidden');
  
  // Update carousel tracks
  updateCarouselTrack('carousel-track', filteredProducts.filter(p => p.featured));
  updateCarouselTrack('carousel-track-ofertas', filteredProducts.filter(p => p.onSale));
}

function showFullCatalog(filteredProducts) {
  // Hide carousel sections
  const carouselSections = document.getElementById('carousel-sections');
  const fullCatalog = document.getElementById('full-catalog');
  
  if (carouselSections) carouselSections.classList.add('hidden');
  if (fullCatalog) fullCatalog.classList.remove('hidden');
  
  // Render all products in grid without duplicates
  const catalogGrid = document.getElementById('catalog-grid');
  if (catalogGrid) {
    catalogGrid.innerHTML = filteredProducts.map(product => createCatalogProductCard(product)).join('');
    
    // Add click listeners to product cards
    catalogGrid.querySelectorAll('.catalog-product-card').forEach((item, index) => {
      item.addEventListener('click', () => openProductModal(filteredProducts[index]));
    });
  }
}

function updateCarouselTrack(trackId, products) {
  const track = document.getElementById(trackId);
  if (!track) return;
  
  track.innerHTML = products.map(product => createProductCard(product)).join('');
  
  // Add click listeners to product cards
  track.querySelectorAll('.carousel-item').forEach((item, index) => {
    item.addEventListener('click', () => openProductModal(products[index]));
  });
}

function createProductCard(product) {
  const discountBadge = product.discount ? 
    `<div class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">-${product.discount}%</div>` : '';
  
  const priceHTML = product.originalPrice ? 
    `<p class="product-price line-through text-gray-500">$ ${product.originalPrice.toLocaleString()}</p>
     <p class="product-price text-red-600 font-bold">$ ${product.price.toLocaleString()}</p>` :
    `<p class="product-price">$ ${product.price.toLocaleString()}</p>`;
  
  return `
    <article class="carousel-item relative cursor-pointer hover:transform hover:scale-105 transition-transform" 
             role="group" aria-label="${product.name}, precio ${product.price} pesos argentinos">
      ${discountBadge}
      <img src="${product.images[0]}" loading="lazy" alt="${product.name}"
           onerror="this.style.display='none';" class="product-image"/>
      <h3 class="product-title">${product.name}</h3>
      ${priceHTML}
      <p class="product-sku">${product.sku}</p>
      <div class="mt-2">
        <span class="text-xs text-gray-500">Stock: ${product.stock}</span>
      </div>
    </article>
  `;
}

function createCatalogProductCard(product) {
  const discountBadge = product.discount ? 
    `<div class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">-${product.discount}%</div>` : '';
  
  const priceHTML = product.originalPrice ? 
    `<p class="text-sm line-through text-gray-500">$ ${product.originalPrice.toLocaleString()}</p>
     <p class="text-lg font-bold text-red-600">$ ${product.price.toLocaleString()}</p>` :
    `<p class="text-lg font-bold">$ ${product.price.toLocaleString()}</p>`;
  
  return `
    <div class="catalog-product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative">
      ${discountBadge}
      <div class="aspect-square overflow-hidden">
        <img src="${product.images[0]}" loading="lazy" alt="${product.name}"
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
             onerror="this.style.display='none';"/>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 mb-2">${product.name}</h3>
        <div class="mb-2">
          ${priceHTML}
        </div>
        <p class="text-xs text-gray-500 mb-2">SKU: ${product.sku}</p>
        <p class="text-xs text-gray-600 mb-2">${product.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-500">Stock: ${product.stock}</span>
          <span class="text-xs bg-gray-100 px-2 py-1 rounded">${product.category.toUpperCase()}</span>
        </div>
      </div>
    </div>
  `;
}

function openProductModal(product) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = createProductModalHTML(product);
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Setup modal event listeners
  setupProductModalListeners(modal, product);
}

function createProductModalHTML(product) {
  const discountBadge = product.discount ? 
    `<span class="bg-black text-white px-2 py-1 text-sm font-bold rounded ml-2">-${product.discount}%</span>` : '';
  
  const priceHTML = product.originalPrice ? 
    `<p class="text-lg line-through text-gray-500">$ ${product.originalPrice.toLocaleString()}</p>
     <p class="text-2xl font-bold text-red-600">$ ${product.price.toLocaleString()}</p>` :
    `<p class="text-2xl font-bold">$ ${product.price.toLocaleString()}</p>`;
  
  const colorOptions = product.colors.map(color => 
    `<button class="color-option w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-600" 
             data-color="${color}" title="${color}" style="background-color: ${getColorCode(color)}"></button>`
  ).join('');
  
  const sizeOptions = product.sizes.map(size => 
    `<button class="size-option px-3 py-2 border border-gray-300 hover:border-gray-600 hover:bg-gray-100" 
             data-size="${size}">${size}</button>`
  ).join('');
  
  return `
    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-bold">${product.name}${discountBadge}</h2>
        <button class="close-modal text-2xl text-gray-500 hover:text-gray-700">×</button>
      </div>
      
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Product Images -->
        <div>
          <div class="main-image mb-4">
            <img src="${product.images[0]}" alt="${product.name}" 
                 class="w-full h-96 object-cover rounded-lg" id="main-product-image">
          </div>
          ${product.images.length > 1 ? `
            <div class="flex space-x-2">
              ${product.images.map((img, index) => 
                `<img src="${img}" alt="${product.name}" 
                      class="w-16 h-16 object-cover rounded cursor-pointer border-2 ${index === 0 ? 'border-gray-600' : 'border-gray-300'}" 
                      onclick="changeMainImage('${img}', this)">`
              ).join('')}
            </div>
          ` : ''}
        </div>
        
        <!-- Product Details -->
        <div>
          <div class="mb-4">
            ${priceHTML}
            <p class="text-sm text-gray-500 mt-1">SKU: ${product.sku}</p>
            <p class="text-sm text-gray-600 mt-2">${product.description}</p>
          </div>
          
          <!-- Color Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Color:</label>
            <div class="flex space-x-2 flex-wrap">
              ${colorOptions}
            </div>
            <p class="text-sm text-gray-600 mt-1" id="selected-color">Selecciona un color</p>
          </div>
          
          <!-- Size Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Talla:</label>
            <div class="flex space-x-2 flex-wrap">
              ${sizeOptions}
            </div>
            <p class="text-sm text-gray-600 mt-1" id="selected-size">Selecciona una talla</p>
          </div>
          
          <!-- Quantity -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Cantidad:</label>
            <div class="flex items-center space-x-3">
              <button class="quantity-btn px-3 py-1 border border-gray-300 hover:bg-gray-100" data-action="decrease">-</button>
              <span class="quantity-display px-4 py-1 border border-gray-300 min-w-[3rem] text-center">1</span>
              <button class="quantity-btn px-3 py-1 border border-gray-300 hover:bg-gray-100" data-action="increase">+</button>
            </div>
            <p class="text-sm text-gray-600 mt-1">Stock disponible: ${product.stock}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="space-y-3">
            <button class="add-to-cart w-full bg-[#d63629] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b22a26] transition-colors">
              AÑADIR AL CARRITO
            </button>
            <button class="whatsapp-inquiry w-full bg-[#25D366] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors">
              CONSULTAR STOCK POR WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getColorCode(colorName) {
  const colorMap = {
    'Verde militar': '#4a5d23',
    'Negro': '#000000',
    'Gris': '#808080',
    'Blanco': '#ffffff',
    'Violeta': '#8a2be2',
    'Rosa': '#ffc0cb',
    'Morado': '#800080',
    'Bordo': '#800020',
    'Marrón': '#8b4513',
    'Beige': '#f5f5dc',
    'Rojo': '#ff0000',
    'Azul marino': '#000080',
    'Celeste': '#87ceeb',
    'Amarillo': '#ffff00',
    'Azul': '#0000ff'
  };
  
  return colorMap[colorName] || '#cccccc';
}

function setupProductModalListeners(modal, product) {
  let selectedColor = '';
  let selectedSize = '';
  let quantity = 1;
  
  // Close modal
  modal.querySelector('.close-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Color selection
  modal.querySelectorAll('.color-option').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.color-option').forEach(b => b.classList.remove('ring-2', 'ring-gray-600'));
      btn.classList.add('ring-2', 'ring-gray-600');
      selectedColor = btn.dataset.color;
      modal.querySelector('#selected-color').textContent = `Color seleccionado: ${selectedColor}`;
    });
  });
  
  // Size selection
  modal.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.size-option').forEach(b => b.classList.remove('bg-gray-200', 'border-gray-600'));
      btn.classList.add('bg-gray-200', 'border-gray-600');
      selectedSize = btn.dataset.size;
      modal.querySelector('#selected-size').textContent = `Talla seleccionada: ${selectedSize}`;
    });
  });
  
  // Quantity controls
  modal.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const display = modal.querySelector('.quantity-display');
      
      if (action === 'increase' && quantity < product.stock) {
        quantity++;
      } else if (action === 'decrease' && quantity > 1) {
        quantity--;
      }
      
      display.textContent = quantity;
    });
  });
  
  // Add to cart
  modal.querySelector('.add-to-cart').addEventListener('click', () => {
    if (!selectedColor || !selectedSize) {
      alert('Por favor selecciona color y talla');
      return;
    }
    
    addToCart(product, selectedColor, selectedSize, quantity);
    closeModal();
  });
  
  // WhatsApp inquiry
  modal.querySelector('.whatsapp-inquiry').addEventListener('click', () => {
    const message = `Hola! Me interesa consultar sobre el producto:
    
📦 *${product.name}*
💰 Precio: $${product.price.toLocaleString()}
🏷️ SKU: ${product.sku}
${selectedColor ? `🎨 Color: ${selectedColor}` : ''}
${selectedSize ? `📏 Talla: ${selectedSize}` : ''}

¿Tienen stock disponible?`;
    
    const whatsappUrl = `https://wa.me/5492604381502?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
  
  function closeModal() {
    document.body.removeChild(modal);
    document.body.style.overflow = 'auto';
  }
}

function changeMainImage(src, thumbnail) {
  document.getElementById('main-product-image').src = src;
  
  // Update thumbnail borders
  const thumbnails = thumbnail.parentElement.querySelectorAll('img');
  thumbnails.forEach(thumb => thumb.classList.remove('border-gray-600'));
  thumbnails.forEach(thumb => thumb.classList.add('border-gray-300'));
  thumbnail.classList.remove('border-gray-300');
  thumbnail.classList.add('border-gray-600');
}

function addToCart(product, color, size, quantity) {
  const cartItem = {
    id: Date.now(),
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    color: color,
    size: size,
    quantity: quantity,
    sku: product.sku
  };
  
  cart.push(cartItem);
  localStorage.setItem('rosema-cart', JSON.stringify(cart));
  updateCartUI();
  
  // Show success message
  showNotification('Producto agregado al carrito');
}

function updateCartUI() {
  const cartButton = document.querySelector('button[aria-label="Carrito"]');
  if (cartButton && cart.length > 0) {
    let badge = cartButton.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center';
      cartButton.style.position = 'relative';
      cartButton.appendChild(badge);
    }
    badge.textContent = cart.length;
  }
}

function toggleCart() {
  const existingCart = document.getElementById('cart-sidebar');
  if (existingCart) {
    document.body.removeChild(existingCart);
    document.body.style.overflow = 'auto';
    return;
  }
  
  const cartSidebar = document.createElement('div');
  cartSidebar.id = 'cart-sidebar';
  cartSidebar.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
  cartSidebar.innerHTML = createCartHTML();
  
  document.body.appendChild(cartSidebar);
  document.body.style.overflow = 'hidden';
  
  setupCartListeners(cartSidebar);
}

function createCartHTML() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const cartItems = cart.map(item => `
    <div class="flex items-center space-x-3 p-3 border-b">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
      <div class="flex-1">
        <h4 class="font-semibold">${item.name}</h4>
        <p class="text-sm text-gray-600">${item.color} - ${item.size}</p>
        <p class="text-sm font-semibold">$${item.price.toLocaleString()}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button class="cart-quantity-btn px-2 py-1 border" data-action="decrease" data-id="${item.id}">-</button>
        <span class="px-2">${item.quantity}</span>
        <button class="cart-quantity-btn px-2 py-1 border" data-action="increase" data-id="${item.id}">+</button>
      </div>
      <button class="remove-item text-red-600 hover:text-red-800" data-id="${item.id}">🗑️</button>
    </div>
  `).join('');
  
  return `
    <div class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-bold">Carrito de Compras</h2>
        <button class="close-cart text-2xl text-gray-500 hover:text-gray-700">×</button>
      </div>
      
      <div class="flex-1 overflow-y-auto max-h-[60vh]">
        ${cart.length === 0 ? 
          '<div class="p-8 text-center text-gray-500">Tu carrito está vacío</div>' : 
          cartItems
        }
      </div>
      
      ${cart.length > 0 ? `
        <div class="border-t p-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold">Total: $${total.toLocaleString()}</span>
          </div>
          <button class="checkout-whatsapp w-full bg-[#25D366] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors">
            REALIZAR PEDIDO POR WHATSAPP
          </button>
          <p class="text-xs text-gray-500 mt-2 text-center">
            El pedido se enviará por WhatsApp para coordinar retiro en tienda
          </p>
        </div>
      ` : ''}
    </div>
  `;
}

function setupCartListeners(cartSidebar) {
  // Close cart
  cartSidebar.querySelector('.close-cart').addEventListener('click', () => {
    document.body.
removeChild(cartSidebar);
    document.body.style.overflow = 'auto';
  });
  
  // Click outside to close
  cartSidebar.addEventListener('click', (e) => {
    if (e.target === cartSidebar) {
      document.body.removeChild(cartSidebar);
      document.body.style.overflow = 'auto';
    }
  });
  
  // Quantity controls
  cartSidebar.querySelectorAll('.cart-quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const itemId = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === itemId);
      
      if (action === 'increase') {
        item.quantity++;
      } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity--;
      }
      
      localStorage.setItem('rosema-cart', JSON.stringify(cart));
      updateCartDisplay(cartSidebar);
    });
  });
  
  // Remove items
  cartSidebar.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = parseInt(btn.dataset.id);
      cart = cart.filter(item => item.id !== itemId);
      localStorage.setItem('rosema-cart', JSON.stringify(cart));
      updateCartUI();
      updateCartDisplay(cartSidebar);
    });
  });
  
  // WhatsApp checkout
  const checkoutBtn = cartSidebar.querySelector('.checkout-whatsapp');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const orderMessage = createWhatsAppOrderMessage();
      const whatsappUrl = `https://wa.me/5492604381502?text=${encodeURIComponent(orderMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
}

function updateCartDisplay(cartSidebar) {
  const newCartHTML = createCartHTML();
  cartSidebar.innerHTML = newCartHTML;
  setupCartListeners(cartSidebar);
}

function createWhatsAppOrderMessage() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let message = `🛍️ *NUEVO PEDIDO - ROSEMA*\n\n`;
  message += `📋 *DETALLE DEL PEDIDO:*\n`;
  
  cart.forEach((item, index) => {
    message += `\n${index + 1}. *${item.name}*\n`;
    message += `   • Color: ${item.color}\n`;
    message += `   • Talla: ${item.size}\n`;
    message += `   • Cantidad: ${item.quantity}\n`;
    message += `   • Precio: $${item.price.toLocaleString()}\n`;
    message += `   • SKU: ${item.sku}\n`;
  });
  
  message += `\n💰 *TOTAL: $${total.toLocaleString()}*\n\n`;
  message += `📍 *RETIRO EN TIENDA*\n`;
  message += `📍 Salto de las Rosas, Mendoza AR\n`;
  message += `⏰ Horarios: Lunes a Sábado\n`;
  message += `   • Mañana: 9:00am a 1:00pm\n`;
  message += `   • Tarde: 5:00pm a 9:00pm\n\n`;
  message += `Por favor confirmen disponibilidad y coordinen horario de retiro. ¡Gracias!`;
  
  return message;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// Carousel functionality
function setupCarousel() {
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach((carousel, carouselIndex) => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const items = track.children;
    const totalItems = items.length;
    let currentIndex = 0;

    // Number of visible items depends on screen width
    function getVisibleCount() {
      let w = window.innerWidth;
      if(w < 400) return 1;
      if(w < 640) return 2;
      if(w < 1024) return 3;
      return 4;
    }

    // Update carousel position
    function updateCarousel() {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, totalItems - visibleCount);
      if(currentIndex < 0) currentIndex = 0;
      if(currentIndex > maxIndex) currentIndex = maxIndex;

      const translateX = -(currentIndex * (100 / visibleCount));
      track.style.transform = `translateX(${translateX}%)`;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
    });

    // Update on resize to reset position if necessary
    window.addEventListener('resize', () => {
      updateCarousel();
    });

    // Initialize carousel
    updateCarousel();
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}
