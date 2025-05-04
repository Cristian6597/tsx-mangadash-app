import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@shared/context/cart-context";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  return (
    <div className="flex border-b dark:border-gray-700 pb-4">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{product.name}</h4>
          <Button variant="ghost" size="icon" onClick={handleRemove}>
            <Trash className="h-4 w-4 text-gray-400 hover:text-red-500" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 p-0" 
              onClick={handleDecrease}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="px-2 py-1">{quantity}</span>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 p-0" 
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <span className="font-bold text-accent">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
