import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Product } from "@/types";
import ProductGrid from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Category() {
  const [, params] = useRoute("/category/:category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/src/db.json");
        const data = await response.json();
        
        if (params?.category) {
          // Filter products by category
          const filteredProducts = data.products.filter(
            (product: Product) => product.category === params.category
          );
          
          setProducts(filteredProducts);
          
          // Get category name for display
          const category = data.categories.find(
            (cat: { id: string; name: string }) => cat.id === params.category
          );
          
          if (category) {
            setCategoryName(category.name);
          } else {
            setCategoryName(params.category.charAt(0).toUpperCase() + params.category.slice(1));
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    if (params?.category) {
      fetchProducts();
    }
  }, [params?.category]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">
            We couldn't find any products in this category.
          </p>
          <Button asChild>
            <Link href="/">Browse other categories</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
