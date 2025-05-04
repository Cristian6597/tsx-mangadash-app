import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartSidebar from "@/components/layout/cart-sidebar";
import ProfileSidebar from "@/components/layout/profile-sidebar";
import { useState } from "react";
import ProductDetail from "@/pages/product-detail";
import Category from "@/pages/category";
import Search from "@/pages/search";
import { CartProvider } from "@shared/context/cart-context";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header 
          toggleCart={() => setIsCartOpen(!isCartOpen)} 
          toggleProfile={() => setIsProfileOpen(!isProfileOpen)}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/category/:category" component={Category} />
            <Route path="/search" component={Search} />
            <Route component={NotFound} />
          </Switch>
        </main>
        
        <Footer />
        
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
      <Toaster />
    </CartProvider>
  );
}

export default App;
