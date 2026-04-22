import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  MessageCircle, 
  Ruler, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PRODUCTS, CATEGORIES, Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
  width?: string;
  height?: string;
}

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product, w?: string, h?: string) => void; key?: string }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group glass-morphism bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-premium transition-all duration-500 flex flex-col perspective-1000"
    >
      <div className="aspect-square relative overflow-hidden bg-gray-50/50 p-8">
        {product.badge && (
          <motion.span 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-6 right-6 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full z-10 shadow-xl shadow-primary/20 tracking-widest uppercase"
          >
            {product.badge}
          </motion.span>
        )}
        <motion.img 
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 2 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
        />
        <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      
      <div className="p-8 flex-grow flex flex-col relative">
        <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase mb-3 block">{product.category}</span>
        <h3 className="text-xl font-display font-black text-secondary mb-3 line-clamp-2 leading-[1.2] group-hover:text-primary transition-colors">{product.name}</h3>
        
        {product.category === 'signboards' && (
          <motion.div 
            initial={false}
            animate={{ height: isHovered ? 'auto' : '0px', opacity: isHovered ? 1 : 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 mt-2">
              <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-secondary uppercase tracking-[0.2em]">
                <Ruler className="w-3.5 h-3.5 text-primary" /> Dimension Matrix
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  placeholder="Width" 
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full bg-white border-0 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                />
                <span className="text-gray-300 font-black">×</span>
                <input 
                  type="number" 
                  placeholder="Height" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-white border-0 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                />
              </div>
              <p className="text-[9px] text-gray-400 mt-3 font-semibold uppercase tracking-wider">Inches • Custom Cut</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-2 mb-8 flex-grow">
          {product.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              <div className="w-1 h-1 bg-primary rounded-full" /> {spec}
            </div>
          ))}
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product, width, height)}
          className="w-full bg-secondary text-white py-4.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] btn-hover flex items-center justify-center gap-3 shadow-2xl shadow-secondary/20 group/btn"
        >
          LOG TO ORDER 
          <div className="bg-primary/20 p-1 rounded-lg group-hover/btn:bg-primary transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function ProductsPage({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, w?: string, h?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.width === w && item.height === h);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.width === w && item.height === h) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, width: w, height: h }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number, w?: string, h?: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.width === w && item.height === h) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    if (confirm('Clear all items from your order?')) setCart([]);
  };

  const sendWhatsAppOrder = () => {
    const phone = '917411616167';
    let text = "*BALAJI ENTERPRISES - NEW ORDER REQUEST*\n\n";
    
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name.toUpperCase()}*\n`;
      if (item.category === 'signboards') {
        text += `   📐 Size: ${item.width || 'Std'} x ${item.height || 'Std'} inches\n`;
      }
      text += `   📦 Quantity: ${item.quantity}\n\n`;
    });

    text += "📍 _Please provide delivery details and verify sizes._";
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
      {/* Header Area */}
      <div className="container mx-auto px-6 mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Home
        </button>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-black tracking-widest text-[10px] uppercase block mb-3">Official Inventory</span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-secondary leading-none">Complete Safety Catalog</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-grow lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find equipment..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all" 
              />
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-primary text-white p-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-black text-xs tracking-widest shadow-xl shadow-primary/20 btn-hover relative"
            >
              ORDER LIST 
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Toolbar */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'bg-white text-gray-400 hover:text-secondary shadow-sm'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-[#f8fafc]">
                <div>
                  <h2 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">Your Order</h2>
                  <p className="text-[10px] font-black text-primary tracking-widest uppercase">Balaji Enterprises Checkout</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Cart is empty</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${item.width}-${item.height}`} className="flex gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100">
                      <div className="w-20 h-20 bg-white rounded-2xl p-2 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xs font-black text-secondary leading-tight mb-1">{item.name}</h4>
                        {item.category === 'signboards' && (
                          <p className="text-[10px] font-bold text-primary uppercase">Size: {item.width || 'Std'}x{item.height || 'Std'}"</p>
                        )}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full shadow-sm">
                            <button onClick={() => updateQuantity(item.id, -1, item.width, item.height)} className="text-gray-400 hover:text-primary"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-black text-secondary">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1, item.width, item.height)} className="text-gray-400 hover:text-primary"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => updateQuantity(item.id, -item.quantity, item.width, item.height)} className="text-gray-200 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-white border-t border-gray-50">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Items</span>
                  <span className="text-xl font-display font-black text-secondary">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={clearCart}
                    className="py-4 rounded-2xl bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-colors"
                  >
                    Discard All
                  </button>
                  <button 
                    disabled={cart.length === 0}
                    onClick={sendWhatsAppOrder}
                    className="py-4 rounded-2xl bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 btn-hover shadow-xl shadow-[#25D366]/20 disabled:opacity-50 disabled:scale-100"
                  >
                    SEND ORDER <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-6 text-[9px] text-center font-bold text-gray-300 uppercase tracking-wider leading-relaxed">
                  Clicking "Send Order" will open WhatsApp with your itemized list pre-formatted for Balaji Enterprises.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
