import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.jpeg";

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  const product = { node: productData };
  const price = product.node.priceRange.minVariantPrice;
  const images = product.node.images.edges;
  const variants = product.node.variants.edges;
  const selectedVariant = variants.find(v => v.node.id === selectedVariantId)?.node || variants[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Produto indisponível");
      return;
    }

    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success("Adicionado ao carrinho!", {
      description: product.node.title,
      position: "top-center"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 cyberpunk-grid animate-grid-flow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Criptografia Logo" 
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-primary/50 object-cover cursor-pointer"
                onClick={() => navigate('/')}
              />
              <span className="text-xl md:text-2xl font-bold text-neon-cyan glow-cyan">CRIPTOGRAFIA</span>
            </div>
            <CartDrawer />
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-sm">
                {images[0] ? (
                  <img
                    src={images[0].node.url}
                    alt={images[0].node.altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  <span className="text-neon-magenta glow-magenta">{product.node.title}</span>
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </span>
                  <Badge className="bg-accent/20 text-accent border-accent/50">
                    ⚡ Pronta Entrega
                  </Badge>
                </div>

                {product.node.description && (
                  <p className="text-lg text-muted-foreground mb-6">
                    {product.node.description}
                  </p>
                )}
              </div>

              {variants.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Variante:</label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantId === variant.node.id ? "default" : "outline"}
                        onClick={() => setSelectedVariantId(variant.node.id)}
                        className={selectedVariantId === variant.node.id ? "bg-primary" : "border-primary/30"}
                      >
                        {variant.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4">
                <Button 
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-glow-cyan text-lg py-6"
                  disabled={!selectedVariant?.availableForSale}
                >
                  {selectedVariant?.availableForSale ? "Adicionar ao Carrinho" : "Indisponível"}
                </Button>

                <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 text-primary">Especificações:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-accent">●</span>
                      <span>Cold Storage ERC20 em PVC</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">●</span>
                      <span>Durabilidade Valid</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">●</span>
                      <span>Conformidade GDPR</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">●</span>
                      <span>Enviado no Mesmo Dia</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;
