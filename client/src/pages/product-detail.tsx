import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@shared/context/cart-context";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/src/db.json");
        const data = await response.json();
        
        const productId = parseInt(params?.id || "0", 10);
        const foundProduct = data.products.find(
          (p: Product) => p.id === productId
        );
        
        if (foundProduct) {
          setProduct(foundProduct);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    
    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);
  
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart with quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p>Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm capitalize px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {product.category}
            </span>
            
            {product.badge && (
              <span className="ml-2 text-sm text-white px-3 py-1 bg-accent rounded-full">
                {product.badge}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <p className="text-2xl text-accent font-bold mb-4">
            {formatCurrency(product.price)}
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {product.description}
          </p>
          
          <div className="mb-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center">
              <Button 
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="mx-4 text-xl font-medium">{quantity}</span>
              
              <Button 
                variant="outline"
                size="icon"
                onClick={handleIncrease}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            className="w-full md:w-auto bg-primary hover:bg-opacity-90 text-white"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
