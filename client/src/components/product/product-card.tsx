import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Product } from "@/types";
import { useCart } from "@shared/context/cart-context";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'best seller':
        return 'bg-primary';
      case 'new':
        return 'bg-accent';
      case 'limited':
        return 'bg-warning text-black';
      case 'top rated':
        return 'bg-primary';
      default:
        return 'bg-primary';
    }
  };
  
  return (
    <Card className="overflow-hidden shadow-md transition duration-300 card-hover">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {product.badge && (
          <div className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-xs py-1 px-2 rounded`}>
            {product.badge}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-lg hover:text-primary">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
          </div>
          <span className="font-bold text-accent">{formatCurrency(product.price)}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <Button 
          className="w-full bg-primary hover:bg-opacity-90 text-white"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
