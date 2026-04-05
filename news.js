
        // --- 1. Data (Products from all your images) ---
        const products = [
           { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'T-Shirts', isNew: true, colors: ['#000', '#3b82f6'], image: 'https://images.unsplash.com/photo-1583531434835-a89cd594fab3?q=80&w=400&h=550&fit=crop', desc: 'A wardrobe essential made from 100% premium cotton.' },
            { id: 2, name: 'Premium White Shirt', price: 49.99, category: 'Shirts', isNew: true, colors: ['#fff', '#93c5fd', '#f9a8d4'], image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?q=80&w=400&h=550&fit=crop', desc: 'Crisp, clean, and professional. Perfect for any formal occasion.' },
            { id: 3, name: 'Elegant Evening Dress', price: 129.99, category: 'Dresses', isNew: true, colors: ['#701a75', '#000'], image: 'https://images.unsplash.com/photo-1765229276796-c93c73cc3f3b?q=80&w=400&h=550&fit=crop', desc: 'Make a statement at your next event with this stunning floor-length dress.' },
            { id: 4, name: 'Professional Blazer', price: 99.99, category: 'Blazers', isNew: true, colors: ['#000'], image: 'https://images.unsplash.com/photo-1761710560511-a50cd7aaf98a?q=80&w=400&h=550&fit=crop', desc: 'Sharp tailoring meets modern style. An essential for the modern professional.' }
         ];

        // --- 2. State Management ---
        let view = 'shop'; 
        let selectedProductId = null;
        let filters = { category: 'All Products', price: 300, sort: 'newest' };

        const container = document.getElementById('new');

        // --- 3. Core Functions ---

        function render() {
            if (view === 'shop') renderShop();
            else renderProduct(selectedProductId);
            lucide.createIcons();
            window.scrollTo(0, 0);
        }

        function renderShop() {
            const filtered = products.filter(p => {
                const catMatch = filters.category === 'All Products' || p.category === filters.category;
                const priceMatch = p.price <= filters.price;
                return catMatch && priceMatch;
            });

            container.innerHTML = `
                <div class="flex flex-col lg:flex-row gap-12"> 
                    <div class="flex-1">
                        <div class="product-grid">
                            ${filtered.map(p => `
                                <div class="group cursor-pointer flex flex-col" onclick="goToProduct(${p.id})">
                                    <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                                        <img src="${p.image}" class="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out">
                                        ${p.isNew ? `<span class="absolute top-4 left-4 bg-black text-white text-[9px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter">New</span>` : ''}
                                        ${p.discount ? `<span class="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter">${p.discount}</span>` : ''}
                                        <button class="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-sm">
                                            <i data-lucide="heart" class="w-4 h-4"></i>
                                        </button>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest">${p.category}</p>
                                        <h3 class="font-semibold text-gray-900 group-hover:underline decoration-1 underline-offset-4">${p.name}</h3>
                                        <div class="flex items-center gap-2 pt-1">
                                            <span class="font-bold text-sm">$${p.price}</span>
                                            ${p.oldPrice ? `<span class="text-xs text-gray-400 line-through">$${p.oldPrice}</span>` : ''}
                                        </div>
                                        <button class="w-full mt-4 bg-black text-white text-[11px] py-3 rounded-xl font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Add to Cart</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        function renderProduct(id) {
            const p = products.find(prod => prod.id === id);
            container.innerHTML = `
                <button onclick="goToShop()" class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-10 hover:text-black transition">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Shop
                </button>
                
                <div class="flex flex-col lg:flex-row gap-16">
                    <div class="lg:w-1/2 rounded-3xl overflow-hidden bg-gray-50 shadow-2xl shadow-gray-200/50">
                        <img src="${p.image}" class="w-full h-[650px] object-cover">
                    </div>
                    
                    <div class="lg:w-1/2 space-y-8 py-4">
                        <div class="space-y-4">
                            <p class="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">${p.category}</p>
                            <h1 class="text-5xl font-bold tracking-tight">${p.name}</h1>
                            <div class="flex items-center gap-4">
                                <span class="text-3xl font-medium">$${p.price}</span>
                                ${p.isNew ? '<span class="bg-black text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-widest">New Arrival</span>' : ''}
                            </div>
                        </div>

                        <p class="text-gray-500 leading-relaxed text-lg font-light">${p.desc}</p>
                        
                        <div class="space-y-4">
                            <p class="font-bold text-xs uppercase tracking-widest">Color</p>
                            <div class="flex gap-3">
                                ${ (p.colors || ['#000', '#eee']).map((c, i) => `
                                    <div class="w-8 h-8 rounded-full cursor-pointer border border-gray-200 ${i===0 ? 'active-dot' : ''}" style="background-color: ${c}"></div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <p class="font-bold text-xs uppercase tracking-widest">Select Size</p>
                                <button class="text-xs underline text-gray-400">Size Guide</button>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                ${['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => `<button class="w-14 h-14 border border-gray-200 rounded-2xl hover:border-black transition text-sm font-medium uppercase">${s}</button>`).join('')}
                            </div>
                        </div>

                        <div class="space-y-4">
                            <p class="font-bold text-xs uppercase tracking-widest">Quantity</p>
                            <div class="flex items-center border border-gray-200 w-fit rounded-xl px-2 py-1">
                                <button class="p-2 hover:text-gray-400"><i data-lucide="minus" class="w-4 h-4"></i></button>
                                <span class="px-6 font-bold">1</span>
                                <button class="p-2 hover:text-gray-400"><i data-lucide="plus" class="w-4 h-4"></i></button>
                            </div>
                        </div>

                        <div class="pt-6 flex gap-4">
                            <button class="flex-1 bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all transform active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center gap-3">
                                <i data-lucide="shopping-bag" class="w-5 h-5"></i> Add to Cart
                            </button>
                            <button class="p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition shadow-sm">
                                <i data-lucide="heart" class="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div class="pt-10 border-t border-gray-100 space-y-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            <p>SKU: <span class="text-black ml-2">ELG-${p.id}092</span></p>
                            <p>Category: <span class="text-black ml-2">${p.category}</span></p>
                            <p>Shipping: <span class="text-green-600 ml-2">Free Worldwide</span></p>
                        </div>
                    </div>
                </div>
            `;
        }

        // --- 4. Navigation & Logic ---

        function setFilter(key, val) {
            filters[key] = val;
            render();
        }

        function goToProduct(id) {
            selectedProductId = id;
            view = 'product';
            render();
        }

        function goToShop() {
            view = 'shop';
            render();
        }

        // Initial Boot
        render();
 


  