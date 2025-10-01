import { useQuery } from "@tanstack/react-query";
import { X, Gem, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Category, ShopInfo } from "@shared/schema";

interface SideDrawerProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onCategorySelect: (category: string) => void;
}

export default function SideDrawer({
  isMenuOpen,
  toggleMenu,
  onCategorySelect,
}: SideDrawerProps) {
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: shopInfo, isLoading: shopInfoLoading } = useQuery<ShopInfo>({
    queryKey: ["/api/shop-info"],
  });

  const handleCategoryClick = (slug: string) => {
    onCategorySelect(slug);
    toggleMenu();
    const categoriesSection = document.querySelector("#categories-section");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-80 bg-background shadow-2xl transform transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      data-testid="drawer-side-menu"
    >
      <div className="h-full flex flex-col">
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-primary" data-testid="text-menu-title">
            Menu
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close menu"
            data-testid="button-close-menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {/* Categories Section */}
            <div className="mb-8">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Categories
              </h3>
              {categoriesLoading ? (
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-muted animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              ) : categories && categories.length > 0 ? (
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryClick(category.slug)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-3 group"
                      data-testid={`button-category-${category.slug}`}
                    >
                      <Gem className="text-primary group-hover:scale-110 transition-transform h-5 w-5" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </nav>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No categories available. Please add categories to your MongoDB database.
                </p>
              )}
            </div>

            <Separator className="my-6" />

            {/* Shop Information */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Shop Information
              </h3>
              {shopInfoLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 bg-muted animate-pulse rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                        <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : shopInfo ? (
                <div className="space-y-4">
                  <div className="flex gap-3" data-testid="info-address">
                    <MapPin className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {shopInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3" data-testid="info-phone">
                    <Phone className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {shopInfo.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3" data-testid="info-email">
                    <Mail className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {shopInfo.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3" data-testid="info-hours">
                    <Clock className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {shopInfo.hours}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No shop information available. Please add shop info to your MongoDB database.
                </p>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Drawer Footer */}
        {shopInfo && (
          <div className="p-6 border-t border-border">
            <div className="flex gap-4 justify-center">
              {shopInfo.facebookUrl && (
                <a
                  href={shopInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                  data-testid="link-facebook"
                >
                  <i className="fab fa-facebook text-xl" />
                </a>
              )}
              {shopInfo.instagramUrl && (
                <a
                  href={shopInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                  data-testid="link-instagram"
                >
                  <i className="fab fa-instagram text-xl" />
                </a>
              )}
              {shopInfo.twitterUrl && (
                <a
                  href={shopInfo.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                  data-testid="link-twitter"
                >
                  <i className="fab fa-twitter text-xl" />
                </a>
              )}
              {shopInfo.pinterestUrl && (
                <a
                  href={shopInfo.pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Pinterest"
                  data-testid="link-pinterest"
                >
                  <i className="fab fa-pinterest text-xl" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
