import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <span className="text-primary mr-1">Manga</span>
              <span className="text-accent">Dash</span>
            </h3>
            <p className="text-sm text-gray-400">
              Your one-stop destination for manga, action figures, and Japanese snacks delivered straight to your door.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/manga" className="text-gray-400 hover:text-white text-sm">
                  Manga
                </Link>
              </li>
              <li>
                <Link href="/category/figure" className="text-gray-400 hover:text-white text-sm">
                  Action Figures
                </Link>
              </li>
              <li>
                <Link href="/category/snack" className="text-gray-400 hover:text-white text-sm">
                  Japanese Snacks
                </Link>
              </li>
              <li>
                <Link href="/category/beverage" className="text-gray-400 hover:text-white text-sm">
                  Beverages
                </Link>
              </li>
              <li>
                <Link href="/category/collectible" className="text-gray-400 hover:text-white text-sm">
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
            
            <h4 className="font-bold text-lg mb-2">Newsletter</h4>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white border-0 rounded-r-none focus:ring-primary" 
              />
              <Button className="bg-primary hover:bg-opacity-90 rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MangaDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
