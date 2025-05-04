import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cart-item";
import { useCart } from "@shared/context/cart-context";
import { formatCurrency } from "@/lib/utils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, clearCart } = useCart();
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const shippingCost = cartItems.length > 0 ? 4.99 : 0;
  const total = subtotal + shippingCost;

  return (
    <div 
      className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white dark:bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4 text-gray-300">🛒</div>
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button className="bg-primary hover:bg-opacity-90" onClick={onClose}>
              Start Shopping
            </Button>
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="p-4 border-t dark:border-gray-700">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="font-medium">{formatCurrency(shippingCost)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <Button className="w-full bg-accent hover:bg-opacity-90">
            Checkout
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}
