import { X, User, Settings, History, Heart, MapPin, Tag, Bell, Moon, Sun, Languages, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(newTheme === 'dark');
  };
  
  return (
    <div 
      className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white dark:bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Profile</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <div className="text-center py-6 border-b dark:border-gray-700">
          <div className="w-24 h-24 mx-auto bg-neutral dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold">Akira Tanaka</h3>
          <p className="text-gray-500">akira.tanaka@example.com</p>
        </div>
        
        <div className="py-4">
          <h4 className="text-sm font-medium text-gray-500 mb-3">ACCOUNT</h4>
          <ul>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Account Settings</span>
                </div>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <History className="mr-3 h-4 w-4" />
                  <span>Order History</span>
                </div>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <Heart className="mr-3 h-4 w-4" />
                  <span>Wishlist</span>
                </div>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <MapPin className="mr-3 h-4 w-4" />
                  <span>Addresses</span>
                </div>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <Tag className="mr-3 h-4 w-4" />
                  <span>Coupons</span>
                </div>
              </Button>
            </li>
          </ul>
        </div>
        
        <Separator className="my-2" />
        
        <div className="py-4">
          <h4 className="text-sm font-medium text-gray-500 mb-3">PREFERENCES</h4>
          <ul>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <Bell className="mr-3 h-4 w-4" />
                  <span>Notifications</span>
                </div>
              </Button>
            </li>
            <li>
              <div className="flex items-center justify-between py-3 px-3">
                <div className="flex items-center">
                  {isDarkMode ? (
                    <Moon className="mr-3 h-4 w-4" />
                  ) : (
                    <Sun className="mr-3 h-4 w-4" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={toggleTheme} 
                />
              </div>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <div className="flex items-center py-1">
                  <Languages className="mr-3 h-4 w-4" />
                  <span>Language</span>
                </div>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 border-t dark:border-gray-700">
        <Button variant="outline" className="w-full flex items-center justify-center">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
