import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Search as SearchIcon } from 'lucide-react';
import ProductGrid from '@/components/product/product-grid';
import { Product } from '@/types';
import data from '@/db.json';

export default function Search() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Extract search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
    
    // Filter products based on search term
    if (query.trim() !== '') {
      const filteredProducts = data.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [location]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Risultati di Ricerca</h1>
        {searchTerm && (
          <p className="text-gray-600 dark:text-gray-400">
            {searchResults.length} risultati per "{searchTerm}"
          </p>
        )}
      </div>
      
      {searchResults.length > 0 ? (
        <ProductGrid
          products={searchResults}
          title="Prodotti trovati"
          icon={<SearchIcon className="h-5 w-5" />}
        />
      ) : (
        <div className="text-center py-10">
          <SearchIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nessun prodotto trovato</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Prova a cercare con un altro termine o sfoglia le nostre categorie di prodotti.
          </p>
        </div>
      )}
    </div>
  );
}