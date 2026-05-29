import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
import genesisCardPink from "@/assets/genesis-card-pink.jpeg";
import packWithPinkCard from "@/assets/pack-pink-card.jpg";
import packFront from "@/assets/pack-front.jpg";
import cardBlueStack from "@/assets/genesis-card-pink-real.jpeg";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { Loader2, Languages, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const tiers = [
  { key: "whale", color: "text-neon-magenta", border: "border-neon-magenta/50", bg: "bg-neon-magenta/10", count: "10", pct: "1%" },
  { key: "runner", color: "text-accent", border: "border-accent/50", bg: "bg-accent/10", count: "90", pct: "9%" },
  { key: "gas", color: "text-primary", border: "border-primary/50", bg: "bg-primary/10", count: "300", pct: "30%" },
  { key: "lore", color: "text-foreground", border: "border-foreground/30", bg: "bg-foreground/5", count: "600", pct: "60%" },
] as const;

const flowSteps = ["step1", "step2", "step3", "step4"] as const;

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyberpunk-grid animate-grid-flow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-glow-pulse" />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Criptografia Logo"
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-primary/50 object-cover"
              />
              <span className="text-xl md:text-2xl font-bold text-neon-cyan glow-cyan">CRIPTOGRAFIA</span>
            </Link>
            <div className="flex items-center gap-2 md:gap-3">
              <Button asChild variant="outline" className="border-primary/50 hover:bg-primary/10 hidden sm:inline-flex">
                <Link to="/verify">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  {t('nav.verify')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10 sm:hidden">
                <Link to="/verify"><ShieldCheck className="h-5 w-5" /></Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                className="border-primary/50 hover:bg-primary/10"
              >
                <Languages className="h-5 w-5" />
              </Button>
              <CartDrawer />
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-neon-magenta glow-magenta">{t('hero.title1')}</span>
                  <br />
                  <span className="text-neon-cyan glow-cyan">{t('hero.title2')}</span>
                </h1>
                <p className="text-2xl md:text-3xl text-foreground/90 font-light">
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className="space-y-3 text-lg text-muted-foreground">
                <p className="flex items-start gap-2"><span className="text-accent mt-1">●</span><span>{t('hero.feature1')}</span></p>
                <p className="flex items-start gap-2"><span className="text-accent mt-1">●</span><span>{t('hero.feature2')}</span></p>
                <p className="flex items-start gap-2"><span className="text-accent mt-1">●</span><span>{t('hero.feature3')}</span></p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-accent/20 text-accent border-accent/50 px-4 py-2 text-sm font-semibold">
                  {t('hero.badge.ready')}
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/50 px-4 py-2 text-sm font-semibold">
                  {t('hero.badge.shipping')}
                </Badge>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-xl p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-neon-magenta glow-magenta">R$ 100</span>
                  <span className="text-xl text-muted-foreground">{t('hero.price.shipping')}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t('hero.price.limited')}</p>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-glow-cyan text-lg px-8 py-6 font-bold uppercase tracking-wider"
                >
                  <a href="#products">{t('hero.cta')}</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative animate-float">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-2xl animate-glow-pulse" />
                <div className="relative">
                  <img
                    src={packWithPinkCard}
                    alt="The Genesis Card"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-primary/30"
                  />
                  <div className="absolute -top-8 -right-8 w-16 h-16 border-2 border-accent/50 rounded-lg rotate-12 animate-pulse" />
                  <div className="absolute -bottom-8 -left-8 w-12 h-12 border-2 border-primary/50 rounded-lg -rotate-12 animate-pulse" />
                </div>
              </div>

              <div className="absolute -bottom-12 left-8 right-8 bg-card/90 backdrop-blur-xl border border-primary/30 rounded-xl p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">1/1000</p>
                    <p className="text-xs text-muted-foreground">{t('specs.limited')}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{t('specs.wallet')}</p>
                    <p className="text-xs text-muted-foreground">Compatible</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{t('specs.compliance')}</p>
                    <p className="text-xs text-muted-foreground">Key-Gen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Tiers */}
        <section className="container mx-auto px-4 py-20 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon-magenta glow-magenta">{t('tiers.title1')}</span>{" "}
              <span className="text-neon-cyan glow-cyan">{t('tiers.title2')}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('tiers.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={`${tier.bg} backdrop-blur-sm border ${tier.border} rounded-xl p-6 hover:scale-105 transition-transform`}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className={`text-2xl font-bold ${tier.color}`}>{t(`tiers.${tier.key}.name`)}</h3>
                  <span className="text-xs text-muted-foreground font-mono">{tier.pct}</span>
                </div>
                <p className={`text-4xl font-bold ${tier.color} mb-2`}>{tier.count}</p>
                <p className="text-sm text-muted-foreground">{t(`tiers.${tier.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Anatomy gallery */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon-magenta glow-magenta">{t('anatomy.title1')}</span>{" "}
              <span className="text-neon-cyan glow-cyan">{t('anatomy.title2')}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('anatomy.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { img: packWithPinkCard, key: 'pack', border: 'border-neon-magenta/40', glow: 'group-hover:shadow-[0_0_40px_hsl(var(--neon-magenta)/0.4)]' },
              { img: packFront, key: 'front', border: 'border-accent/40', glow: 'group-hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)]' },
              { img: cardBlueStack, key: 'back', border: 'border-primary/40', glow: 'group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]' },
            ].map((item) => (
              <div
                key={item.key}
                className={`group relative bg-card/50 backdrop-blur-sm border ${item.border} rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${item.glow}`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-background/40">
                  <img
                    src={item.img}
                    alt={t(`anatomy.${item.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-neon-cyan">{t(`anatomy.${item.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`anatomy.${item.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon-magenta glow-magenta">{t('flow.title1')}</span>{" "}
              <span className="text-neon-cyan glow-cyan">{t('flow.title2')}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flowSteps.map((step, i) => (
              <div key={step} className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary mt-2">{t(`flow.${step}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`flow.${step}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verify CTA */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/40 rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neon-cyan glow-cyan">{t('verify.cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{t('verify.cta.desc')}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 font-bold uppercase tracking-wider">
              <Link to="/verify">{t('verify.cta.button')}</Link>
            </Button>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-neon-magenta glow-magenta">{t('products.title1')}</span>{" "}
              <span className="text-neon-cyan glow-cyan">{t('products.title2')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('products.subtitle')}</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-12 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-muted-foreground mb-4">{t('products.empty.title')}</h3>
                <p className="text-muted-foreground">{t('products.empty.description')}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
