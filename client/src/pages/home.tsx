import { useState, useEffect } from "react";
import { Product, Category } from "@/types";
import ProductGrid from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Flame, Package2, Dessert } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [figures, setFigures] = useState<Product[]>([]);
  const [snacks, setSnacks] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Fetch products and categories from db.json
    const fetchData = async () => {
      try {
        const response = await fetch("/src/db.json");
        const data = await response.json();
        
        // Set trending products
        const trending = data.products.filter(
          (product: Product) => product.trending
        );
        setTrendingProducts(trending);
        
        // Set figures
        const figureProducts = data.products.filter(
          (product: Product) => product.category === "figure"
        );
        setFigures(figureProducts);
        
        // Set snacks
        const snackProducts = data.products.filter(
          (product: Product) => product.category === "snack"
        );
        setSnacks(snackProducts);
        
        // Set categories
        setCategories(data.categories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-70 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 py-16 md:py-24 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Japan's Finest, Delivered</h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl">
            Discover the best manga, figures, and authentic Japanese snacks delivered straight to your door.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6"
              asChild
            >
              <a href="#trending">Explore Trending</a>
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-white hover:bg-opacity-90 text-secondary border-white font-semibold py-2 px-6"
            >
              View Categories
            </Button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Japanese cityscape" 
          className="absolute inset-0 object-cover w-full h-full"
        />
      </section>

      {/* Category Navigation */}
      <section className="bg-white dark:bg-secondary py-6 sticky top-16 z-40 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 hide-scrollbar space-x-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-neutral dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleCategoryChange(category.id)}
                asChild
              >
                <Link href={category.id === "all" ? "/" : `/category/${category.id}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Section */}
      <section id="trending" className="py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <ProductGrid 
                products={trendingProducts} 
                title="Trending Now" 
                icon={<Flame />} 
              />
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  View More
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Popular Action Figures */}
      <section className="py-10 bg-neutral dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <p>Loading action figures...</p>
            </div>
          ) : (
            <ProductGrid 
              products={figures} 
              title="Popular Action Figures" 
              icon={<Package2 />} 
            />
          )}
        </div>
      </section>
      
      {/* Japanese Snacks */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <p>Loading snacks...</p>
            </div>
          ) : (
            <ProductGrid 
              products={snacks} 
              title="Authentic Japanese Snacks" 
              icon={<Dessert />} 
            />
          )}
        </div>
      </section>
    </>
  );
}
