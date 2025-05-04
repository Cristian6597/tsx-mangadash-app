import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import MobileMenu from "./mobile-menu";
import { SearchDialog } from "./search-dialog";
import { useCart } from "@shared/context/cart-context";

interface HeaderProps {
  toggleCart: () => void;
  toggleProfile: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export default function Header({ 
  toggleCart, 
  toggleProfile, 
  toggleMobileMenu, 
  isMobileMenuOpen 
}: HeaderProps) {
  const isMobile = useMobile();
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, setLocation] = useLocation();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-secondary shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-primary text-2xl font-bold mr-1">Manga</span>
            <span className="text-accent text-2xl font-bold">Dash</span>
          </Link>
        </div>
        
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-secondary dark:text-white hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/category/manga" className="text-secondary dark:text-white hover:text-primary font-medium">
              Manga
            </Link>
            <Link href="/category/figure" className="text-secondary dark:text-white hover:text-primary font-medium">
              Figures
            </Link>
            <Link href="/category/snack" className="text-secondary dark:text-white hover:text-primary font-medium">
              Snacks
            </Link>
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cerca prodotti..."
              className="pl-10 py-2 pr-3 border dark:border-gray-700 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm.trim()) {
                  setLocation(`/search?q=${encodeURIComponent(searchTerm)}`);
                }
              }}
            />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleProfile}>
            <User className="h-5 w-5" />
          </Button>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} />
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
