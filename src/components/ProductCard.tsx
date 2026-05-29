import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const navigate = useNavigate();
  
  const price = product.node.priceRange.minVariantPrice;
  const image = product.node.images.edges[0]?.node;
  const variant = product.node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!variant) {
      toast.error("Produto indisponível");
      return;
    }

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });
    
    toast.success("Adicionado ao carrinho!", {
      description: product.node.title,
      position: "top-center"
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.node.handle}`);
  };

  return (
    <Card 
      className="overflow-hidden bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="aspect-square overflow-hidden bg-background/50 relative">
        {image ? (
          <>
            <img
              src={image.url}
              alt={image.altText || product.node.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            {product.node.title}
          </h3>
          {product.node.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {product.node.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </span>
          
          <Button 
            onClick={handleAddToCart}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled={!variant?.availableForSale || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : variant?.availableForSale ? "Adicionar" : "Indisponível"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
