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
      imageUrl: "/attached_assets/image_1759340062815.png"
    },
    ...(categories || []),
  ];

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-8 overflow-x-auto hide-scrollbar pb-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-52 bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/50 py-10 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-8 overflow-x-auto hide-scrollbar category-scroll pb-4 snap-x snap-mandatory">
          {allCategories.map((category, index) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => onCategorySelect(category.slug)}
                className="flex-shrink-0 cursor-pointer snap-center flex flex-col items-center"
                data-testid={`button-category-scroll-${category.slug}`}
              >
                {/* Decorative Mandala Frame Container */}
                <div className="relative w-40 h-40">
                  {/* Ornate Mandala SVG Frame */}
                  <svg
                    viewBox="0 0 200 200"
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                      isSelected ? "scale-110 drop-shadow-2xl" : "scale-100 drop-shadow-lg"
                    }`}
                  >
                    <defs>
                      <linearGradient id={`gold-gradient-${category._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#D4AF37", stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#B8860B", stopOpacity: 1 }} />
                      </linearGradient>
                      <filter id={`shadow-${category._id}`}>
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Outer Decorative Petals */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * (Math.PI / 180);
                      const x = 100 + Math.cos(angle) * 85;
                      const y = 100 + Math.sin(angle) * 85;
                      return (
                        <ellipse
                          key={`petal-${i}`}
                          cx={x}
                          cy={y}
                          rx="18"
                          ry="28"
                          fill={`url(#gold-gradient-${category._id})`}
                          opacity="0.9"
                          transform={`rotate(${i * 45} ${x} ${y})`}
                          filter={`url(#shadow-${category._id})`}
                        />
                      );
                    })}
                    
                    {/* Middle Decorative Ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={`url(#gold-gradient-${category._id})`}
                      strokeWidth="3"
                      opacity="0.8"
                    />
                    
                    {/* Inner Decorative Details */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30) * (Math.PI / 180);
                      const x1 = 100 + Math.cos(angle) * 60;
                      const y1 = 100 + Math.sin(angle) * 60;
                      const x2 = 100 + Math.cos(angle) * 70;
                      const y2 = 100 + Math.sin(angle) * 70;
                      return (
                        <line
                          key={`spoke-${i}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={`url(#gold-gradient-${category._id})`}
                          strokeWidth="2"
                          opacity="0.6"
                        />
                      );
                    })}
                    
                    {/* Center Circle for Image */}
                    <circle
                      cx="100"
                      cy="100"
                      r="55"
                      fill="white"
                      stroke={`url(#gold-gradient-${category._id})`}
                      strokeWidth="4"
                      filter={`url(#shadow-${category._id})`}
                    />
                  </svg>
                  
                  {/* Product Image in Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`relative w-24 h-24 rounded-full overflow-hidden transition-all duration-300 ${
                      isSelected ? "ring-4 ring-primary/50" : "ring-2 ring-primary/20"
                    }`}>
                      <img
                        src={category.imageUrl || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop"}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                      )}
                    </div>
                  </div>
                  
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                
                {/* Category Name */}
                <div className="mt-3 text-center">
                  <p className={`font-serif text-sm font-semibold tracking-wide transition-all ${
                    isSelected 
                      ? "text-primary text-base" 
                      : "text-gray-700 hover:text-primary"
                  }`}>
                    {category.name}
                  </p>
                  {isSelected && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-1"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
