import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { Category } from "@shared/schema";

interface CategoryGridProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryGrid({
  selectedCategory,
  onCategorySelect,
}: CategoryGridProps) {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const filteredCategories = selectedCategory === "all" 
    ? categories || []
    : (categories || []).filter(cat => cat.slug === selectedCategory);

  return (
    <section className="py-12 bg-background" id="categories-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onCategorySelect(category.slug)}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Golden Mandala Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id={`mandala-${category._id}`} x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
                          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
                          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
                          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
                          {[...Array(8)].map((_, i) => (
                            <line
                              key={i}
                              x1="100"
                              y1="100"
                              x2={100 + 80 * Math.cos((i * Math.PI) / 4)}
                              y2={100 + 80 * Math.sin((i * Math.PI) / 4)}
                              stroke="currentColor"
                              strokeWidth="0.5"
                              className="text-primary"
                            />
                          ))}
                        </pattern>
                      </defs>
                      <rect width="200" height="200" fill={`url(#mandala-${category._id})`} />
                    </svg>
                  </div>
                </div>

                {/* Category Image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {category.icon ? (
                    <div className="text-8xl opacity-90 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  ) : (
                    <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl font-serif font-bold text-primary">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Gold Border */}
                <div className="absolute inset-0 border-4 border-primary/30 rounded-lg pointer-events-none" />
                
                {/* Decorative Corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />

                {/* Category Name Banner */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary via-yellow-600 to-primary py-4 px-6">
                  <div className="relative">
                    <h3 className="text-2xl font-serif font-bold text-white text-center tracking-wide">
                      {category.name}
                    </h3>
                    {/* Banner Decorative Lines */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-white/50" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No categories found</p>
          </div>
        )}
      </div>
    </section>
  );
}
