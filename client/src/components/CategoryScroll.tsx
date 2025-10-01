import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { Category } from "@shared/schema";

interface CategoryScrollProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryScroll({
  selectedCategory,
  onCategorySelect,
}: CategoryScrollProps) {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const allCategories = [
    { 
      _id: "all", 
      name: "All Jewelry", 
      slug: "all",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
    },
    ...(categories || []),
  ];

  if (isLoading) {
    return (
      <section className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar pb-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-32 bg-muted animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 py-8 border-y-2 border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar category-scroll pb-2 snap-x snap-mandatory">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <motion.div
                key={category._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategorySelect(category.slug)}
                className={`flex-shrink-0 cursor-pointer snap-center transition-all duration-300 ${
                  isSelected ? "scale-110" : ""
                }`}
                data-testid={`button-category-scroll-${category.slug}`}
              >
                <div className={`relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${
                  isSelected ? "ring-4 ring-primary shadow-2xl" : "ring-2 ring-primary/30"
                }`}>
                  {/* Category Image */}
                  <img
                    src={category.imageUrl || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Golden Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent ${
                    isSelected ? "opacity-100" : "opacity-60 hover:opacity-80"
                  } transition-opacity`} />
                  
                  {/* Decorative Border */}
                  <div className="absolute inset-0 border-2 border-primary/50 rounded-2xl pointer-events-none" />
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {/* Category Name Overlay - Small subtle text */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
                    <p className="text-white text-xs font-semibold text-center tracking-wide truncate">
                      {category.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
