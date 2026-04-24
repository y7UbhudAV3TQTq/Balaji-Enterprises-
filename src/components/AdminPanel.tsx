import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  Package, 
  ShieldCheck, 
  LayoutGrid,
  Search,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { Product, CATEGORIES } from '../data/products';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { products, addProduct, removeProduct, updateProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'extinguishers',
    specs: []
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid mission credentials.');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setNewProduct(p);
  };

  const saveProduct = () => {
    if (editingId === 'new') {
      const id = `manual-${Date.now()}`;
      addProduct({ ...newProduct, id } as Product);
    } else {
      updateProduct(newProduct as Product);
    }
    setEditingId(null);
    setNewProduct({ category: 'extinguishers', specs: [] });
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[200] bg-secondary flex items-center justify-center p-6 backdrop-blur-3xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-12 rounded-[3rem] w-full max-w-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-display font-black text-white tracking-tighter">CENTRAL COMMAND</h2>
            <p className="text-white/40 font-mono text-[10px] mt-2 uppercase tracking-[0.2em]">Restricted Access Area</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="OPERATOR ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono placeholder:text-white/10 focus:border-primary outline-none transition-colors"
                autoFocus
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="ACCESS KEY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono placeholder:text-white/10 focus:border-primary outline-none transition-colors"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-primary text-xs font-bold justify-center bg-primary/10 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}
            <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
              AUTHORIZE ACCESS
            </button>
          </form>

          <button onClick={onClose} className="mt-8 w-full text-white/20 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            ABORT MISSION
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-secondary p-8 flex flex-col text-white">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl leading-none">COMMAND</h3>
            <p className="text-[10px] text-white/40 font-mono">PANEL V1.0</p>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          <button className="w-full flex items-center gap-4 bg-white/10 p-4 rounded-2xl text-primary font-bold">
            <Package className="w-5 h-5" /> Inventory Management
          </button>
          <button onClick={() => setEditingId('new')} className="w-full flex items-center gap-4 hover:bg-white/5 p-4 rounded-2xl text-white/60 hover:text-white transition-all font-bold">
            <Plus className="w-5 h-5" /> Deploy New Asset
          </button>
        </nav>

        <button 
          onClick={onClose}
          className="mt-8 flex items-center gap-4 bg-red-500/10 text-red-500 p-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" /> TERMINATE SESSION
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-12 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-5xl font-display font-black text-secondary tracking-tighter">Inventory Core</h2>
              <p className="text-gray-400 font-medium">Real-time control over all Balaji safety deployments.</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-2 border-gray-100 rounded-2xl pl-14 pr-10 py-5 w-full lg:w-96 focus:border-primary outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {editingId && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-10 rounded-[3rem] border-2 border-primary/20 shadow-2xl relative mb-12"
                >
                  <button onClick={() => setEditingId(null)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                  <h3 className="text-2xl font-display font-black text-secondary mb-8">
                    {editingId === 'new' ? 'Deploy New Asset' : 'Modify Existing Asset'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Asset Designation</label>
                        <input 
                          value={newProduct.name || ''}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Asset Visual (Upload PNG/JPG)</label>
                        <div className="flex flex-col gap-4">
                          {newProduct.image && (
                            <div className="relative w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100">
                              <img src={newProduct.image} className="w-full h-full object-contain" alt="Preview" />
                              <button 
                                onClick={() => setNewProduct({...newProduct, image: ''})}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Plus className="w-8 h-8 text-gray-300 mb-2" />
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Select Image File</p>
                            </div>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/png, image/jpeg"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setNewProduct({...newProduct, image: reader.result as string});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Classification</label>
                        <select 
                          value={newProduct.category || ''}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value as any})}
                          className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                        >
                          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Operational Brief</label>
                        <textarea 
                          value={newProduct.description || ''}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          rows={4}
                          className="w-full bg-gray-50 border-2 border-transparent px-6 py-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <button 
                        onClick={saveProduct}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-4 hover:translate-y-[-2px] transition-all"
                      >
                        <Save className="w-5 h-5" /> RE-WRITE SYSTEM CORE
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Asset</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Classification</th>
                    <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 object-contain bg-gray-50 rounded-xl p-2" />
                          <span className="font-bold text-secondary">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-full text-gray-500">{p.category}</span>
                      </td>
                      <td className="px-8 py-6 text-right space-x-2">
                        <button onClick={() => startEdit(p)} className="p-3 text-gray-400 hover:text-primary transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => removeProduct(p.id)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
