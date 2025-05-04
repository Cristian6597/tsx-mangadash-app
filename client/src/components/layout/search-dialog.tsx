import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Product } from '@/types';
import data from '@/db.json';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [, setLocation] = useLocation();

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredProducts = data.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredProducts);
  }, [searchTerm]);

  const handleProductClick = (productId: number) => {
    setLocation(`/product/${productId}`);
    onClose();
    setSearchTerm('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products..."
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              <ul className="space-y-2">
                {searchResults.map((product) => (
                  <li 
                    key={product.id}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer flex items-center gap-3"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="h-10 w-10 rounded bg-gray-200 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchTerm.trim() !== '' ? (
            <p className="text-center text-gray-500 py-4">No products found</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}