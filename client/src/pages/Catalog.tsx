import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SideDrawer from "@/components/SideDrawer";
import ImageCarousel from "@/components/ImageCarousel";
import SearchBar from "@/components/SearchBar";
import FilterDrawer from "@/components/FilterDrawer";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Catalog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SideDrawer
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onCategorySelect={handleCategorySelect}
      />

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
          data-testid="overlay-menu"
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-background"
      >
        {/* Spacer for fixed header */}
        <div className="h-[73px]" />

        <ImageCarousel />
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilterDialog={showFilterDialog}
          onToggleFilter={() => setShowFilterDialog(!showFilterDialog)}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
        <FilterBar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <ProductGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          priceRange={priceRange}
        />
        <Footer />
      </motion.div>
      
      <FilterDrawer
        isOpen={showFilterDialog}
        onClose={() => setShowFilterDialog(false)}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />
    </>
  );
}
