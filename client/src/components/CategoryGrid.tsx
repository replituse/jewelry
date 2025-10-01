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
      <section className="py-8 bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-80 bg-muted animate-pulse rounded-xl"
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
    <section className="py-8 bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30" id="categories-section">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onCategorySelect(category.slug)}
              className="flex-shrink-0 w-64 cursor-pointer snap-center"
            >
              <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-primary/20">
                {/* Decorative Mandala Frame */}
                <div className="relative h-64 flex items-center justify-center p-8">
                  {/* SVG Mandala Frame */}
                  <svg
                    viewBox="0 0 300 300"
                    className="absolute inset-0 w-full h-full"
                  >
                    <defs>
                      <linearGradient id={`gold-${category._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#D4AF37", stopOpacity: 0.8 }} />
                        <stop offset="50%" style={{ stopColor: "#FFD700", stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: "#B8860B", stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Outer Decorative Petals - 8 petals like lotus */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * (Math.PI / 180);
                      const x = 150 + Math.cos(angle) * 120;
                      const y = 150 + Math.sin(angle) * 120;
                      return (
                        <ellipse
                          key={`outer-petal-${i}`}
                          cx={x}
                          cy={y}
                          rx="30"
                          ry="45"
                          fill={`url(#gold-${category._id})`}
                          transform={`rotate(${i * 45} ${x} ${y})`}
                          opacity="0.9"
                        />
                      );
                    })}
                    
                    {/* Middle ring of petals */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45 + 22.5) * (Math.PI / 180);
                      const x = 150 + Math.cos(angle) * 95;
                      const y = 150 + Math.sin(angle) * 95;
                      return (
                        <ellipse
                          key={`mid-petal-${i}`}
                          cx={x}
                          cy={y}
                          rx="20"
                          ry="35"
                          fill={`url(#gold-${category._id})`}
                          transform={`rotate(${i * 45 + 22.5} ${x} ${y})`}
                          opacity="0.7"
                        />
                      );
                    })}
                    
                    {/* Decorative circles */}
                    <circle cx="150" cy="150" r="100" fill="none" stroke={`url(#gold-${category._id})`} strokeWidth="2" opacity="0.6" />
                    <circle cx="150" cy="150" r="80" fill="none" stroke={`url(#gold-${category._id})`} strokeWidth="1.5" opacity="0.5" />
                    
                    {/* Center white circle for image */}
                    <circle cx="150" cy="150" r="70" fill="white" stroke={`url(#gold-${category._id})`} strokeWidth="3" />
                  </svg>
                  
                  {/* Jewelry Image in Center */}
                  <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden shadow-xl ring-2 ring-primary/30">
                    <img
                      src={category.imageUrl || `https://via.placeholder.com/200x200?text=${category.name.charAt(0)}`}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
