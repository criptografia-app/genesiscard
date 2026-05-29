import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  pt: {
    'nav.verify': 'Verificar Card',
    'hero.title1': 'THE GENESIS',
    'hero.title2': 'CARD',
    'hero.subtitle': 'Phygital Gacha. Cold Wallet de PVC. Booster Pack Lacrado.',
    'hero.feature1': 'Wallet ERC-20 universal — funciona em qualquer rede EVM (Ethereum, Base, Arbitrum, Polygon...)',
    'hero.feature2': 'PVC dual-side: QR público na frente, chave privada selada no booster pack metálico',
    'hero.feature3': 'Prêmios fundeados na Base L2 — sweep por frações de centavo em fees',
    'hero.badge.ready': '⚡ Pronta Entrega',
    'hero.badge.shipping': '📦 Edição 1/1000',
    'hero.price.shipping': '/ pack',
    'hero.price.limited': 'Rip. Scan. Sweep. Coleciona.',
    'hero.cta': 'Comprar Booster Pack',
    'specs.limited': 'Edição Única',
    'specs.wallet': 'EVM',
    'specs.compliance': 'Air-Gapped',
    'tiers.title1': 'Lucky Dip',
    'tiers.title2': 'Tiers',
    'tiers.subtitle': 'O card é ERC-20 universal (logo Ethereum nas costas) — mas os prêmios são fundeados na Base pra economizar em fees. ~28% dos packs carregam prêmios on-chain. Ninguém — nem nós — sabe qual pack tem o quê.',
    'tiers.whale.name': 'Whale',
    'tiers.whale.desc': '10 packs · $100 USD em ETH/USDC na Base',
    'tiers.runner.name': 'Runner',
    'tiers.runner.desc': '90 packs · $20 USD — recupera o preço do pack',
    'tiers.gas.name': 'Gas',
    'tiers.gas.desc': '300 packs · $5 USD em gas para começar sua jornada',
    'tiers.lore.name': 'Lore',
    'tiers.lore.desc': '600 packs · Token Genesis colecionável da comunidade',
    'flow.title1': 'Como',
    'flow.title2': 'Funciona',
    'flow.step1.title': 'Rip',
    'flow.step1.desc': 'Abra o booster pack lacrado. O selo metálico é a única camada de segurança — se está intacto, a chave privada nunca foi vista.',
    'flow.step2.title': 'Scan',
    'flow.step2.desc': 'Escaneie o QR da chave privada nas costas do card com sua wallet preferida (MetaMask, Rabby, etc).',
    'flow.step3.title': 'Sweep',
    'flow.step3.desc': 'Transfira os fundos da Base L2 para sua wallet principal. Custo: frações de centavo.',
    'flow.step4.title': 'Collect',
    'flow.step4.desc': 'O card vira colecionável permanente. A chave privada é o seu serial number criptográfico inforjável.',
    'anatomy.title1': 'Anatomia do',
    'anatomy.title2': 'Drop',
    'anatomy.subtitle': 'Três camadas, uma promessa: se o selo está intacto, ninguém tocou na chave.',
    'anatomy.pack.title': 'Booster Lacrado',
    'anatomy.pack.desc': 'Foil metálico opaco selado a quente. O card sai cego — nem nós sabemos qual tier está dentro.',
    'anatomy.front.title': 'Frente do Card',
    'anatomy.front.desc': 'QR público para checar saldo on-chain antes de quebrar o selo do tier privado.',
    'anatomy.back.title': 'PVC Físico',
    'anatomy.back.desc': 'Card real impresso em PVC magenta com arte exclusiva — cold wallet feita pra durar décadas na sua coleção.',
    'verify.cta.title': 'Já tem um Genesis Card?',
    'verify.cta.desc': 'Verifique o status on-chain — UNTOUCHED ou CLAIMED — diretamente da Base.',
    'verify.cta.button': 'Verificar agora',
    'products.title1': 'Pegue seu',
    'products.title2': 'Booster',
    'products.subtitle': '1.000 packs. Embaralhados antes do funding. Zero conhecimento interno.',
    'products.empty.title': 'Nenhum produto encontrado',
    'products.empty.description': 'Me diga qual produto você quer criar! Exemplo: "Criar produto Genesis Card por R$100"',
  },
  en: {
    'nav.verify': 'Verify Card',
    'hero.title1': 'THE GENESIS',
    'hero.title2': 'CARD',
    'hero.subtitle': 'Phygital Gacha. PVC Cold Wallet. Sealed Booster Pack.',
    'hero.feature1': 'Universal ERC-20 wallet — works on any EVM chain (Ethereum, Base, Arbitrum, Polygon...)',
    'hero.feature2': 'Dual-side PVC: public QR front, private key sealed inside metallic booster pack',
    'hero.feature3': 'Prizes funded on Base L2 — sweep for fractions of a cent in fees',
    'hero.badge.ready': '⚡ Ships Same Day',
    'hero.badge.shipping': '📦 Edition 1/1000',
    'hero.price.shipping': '/ pack',
    'hero.price.limited': 'Rip. Scan. Sweep. Collect.',
    'hero.cta': 'Buy Booster Pack',
    'specs.limited': 'One-Shot Drop',
    'specs.wallet': 'EVM',
    'specs.compliance': 'Air-Gapped',
    'tiers.title1': 'Lucky Dip',
    'tiers.title2': 'Tiers',
    'tiers.subtitle': 'The card is universal ERC-20 (Ethereum logo on the back) — but prizes are funded on Base to save on fees. ~28% of packs carry on-chain prizes. Nobody — not even us — knows which pack holds what.',
    'tiers.whale.name': 'Whale',
    'tiers.whale.desc': '10 packs · $100 USD in ETH/USDC on Base',
    'tiers.runner.name': 'Runner',
    'tiers.runner.desc': '90 packs · $20 USD — your pack price back in liquid crypto',
    'tiers.gas.name': 'Gas',
    'tiers.gas.desc': '300 packs · $5 USD gas to kickstart your journey',
    'tiers.lore.name': 'Lore',
    'tiers.lore.desc': '600 packs · Community Genesis collectible token',
    'flow.title1': 'How',
    'flow.title2': 'It Works',
    'flow.step1.title': 'Rip',
    'flow.step1.desc': 'Open the heat-sealed booster. The metallic seal is the only security layer — if intact, the private key has never been seen.',
    'flow.step2.title': 'Scan',
    'flow.step2.desc': 'Scan the private key QR on the card back with your preferred wallet (MetaMask, Rabby, etc).',
    'flow.step3.title': 'Sweep',
    'flow.step3.desc': 'Transfer funds from Base L2 to your main wallet. Cost: fractions of a cent.',
    'flow.step4.title': 'Collect',
    'flow.step4.desc': 'The card becomes a permanent collectible. The private key is its unforgeable cryptographic serial number.',
    'anatomy.title1': 'Anatomy of the',
    'anatomy.title2': 'Drop',
    'anatomy.subtitle': 'Three layers, one promise: if the seal is intact, nobody touched the key.',
    'anatomy.pack.title': 'Sealed Booster',
    'anatomy.pack.desc': 'Opaque heat-sealed Mylar foil. The card ships blind — not even we know which tier is inside.',
    'anatomy.front.title': 'Card Front',
    'anatomy.front.desc': 'Public QR to check the on-chain balance before breaking the private-tier seal.',
    'anatomy.back.title': 'Physical PVC',
    'anatomy.back.desc': 'Real magenta PVC card with exclusive artwork — cold wallet built to last decades in your collection.',
    'verify.cta.title': 'Got a Genesis Card?',
    'verify.cta.desc': 'Check on-chain status — UNTOUCHED or CLAIMED — straight from Base.',
    'verify.cta.button': 'Verify now',
    'products.title1': 'Grab Your',
    'products.title2': 'Booster',
    'products.subtitle': '1,000 packs. Shuffled before funding. Zero insider knowledge.',
    'products.empty.title': 'No products found',
    'products.empty.description': 'Tell me what product you want to create! Example: "Create Genesis Card product for $100"',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
