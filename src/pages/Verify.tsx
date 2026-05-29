import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Languages, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.jpeg";

const BASE_RPC = "https://mainnet.base.org";
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

// Genesis whitelist — to be populated post air-gapped key generation.
// Empty array = whitelist check skipped (any valid address queries on-chain).
const GENESIS_WHITELIST: string[] = [];

type CardStatus = {
  address: string;
  balanceWei: bigint;
  txCount: number;
  whitelisted: boolean;
};

async function rpcCall<T>(method: string, params: unknown[]): Promise<T> {
  const res = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "RPC error");
  return data.result as T;
}

function formatEth(wei: bigint): string {
  const whole = wei / 10n ** 18n;
  const frac = wei % 10n ** 18n;
  const fracStr = frac.toString().padStart(18, "0").slice(0, 6).replace(/0+$/, "");
  return fracStr ? `${whole}.${fracStr}` : `${whole}`;
}

const Verify = () => {
  const { language, setLanguage } = useLanguage();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CardStatus | null>(null);

  const labels = {
    pt: {
      title: "Verificação Genesis",
      subtitle: "Consulte o status on-chain do seu Genesis Card direto da Base L2.",
      placeholder: "Cole o endereço público (0x...)",
      button: "Verificar",
      checking: "Consultando Base...",
      untouched: "UNTOUCHED · MINT",
      claimed: "CLAIMED · SPENT",
      untouchedDesc: "Esta wallet nunca assinou uma transação. O booster pack estava genuinamente fresco.",
      claimedDesc: "Esta wallet já assinou transações. O prêmio foi resgatado.",
      whitelistOk: "Confirmado na whitelist Genesis",
      whitelistOff: "Whitelist ainda não publicada — verificação puramente on-chain",
      notWhitelisted: "Endereço não consta na whitelist Genesis",
      balance: "Saldo",
      txCount: "Transações",
      explorer: "Ver no BaseScan",
      invalid: "Endereço inválido — deve começar com 0x e ter 42 caracteres.",
      back: "Voltar à loja",
    },
    en: {
      title: "Genesis Verification",
      subtitle: "Check your Genesis Card on-chain status directly from Base L2.",
      placeholder: "Paste the public address (0x...)",
      button: "Verify",
      checking: "Querying Base...",
      untouched: "UNTOUCHED · MINT",
      claimed: "CLAIMED · SPENT",
      untouchedDesc: "This wallet has never signed a transaction. The booster pack was genuinely fresh.",
      claimedDesc: "This wallet has signed transactions. The prize has been swept.",
      whitelistOk: "Confirmed in Genesis whitelist",
      whitelistOff: "Whitelist not yet published — pure on-chain verification",
      notWhitelisted: "Address not in Genesis whitelist",
      balance: "Balance",
      txCount: "Transactions",
      explorer: "View on BaseScan",
      invalid: "Invalid address — must start with 0x and be 42 characters long.",
      back: "Back to store",
    },
  }[language];

  const handleVerify = async () => {
    const addr = input.trim();
    if (!ADDRESS_REGEX.test(addr)) {
      toast.error(labels.invalid);
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const [balanceHex, txCountHex] = await Promise.all([
        rpcCall<string>("eth_getBalance", [addr, "latest"]),
        rpcCall<string>("eth_getTransactionCount", [addr, "latest"]),
      ]);
      const whitelisted =
        GENESIS_WHITELIST.length === 0
          ? true
          : GENESIS_WHITELIST.some((w) => w.toLowerCase() === addr.toLowerCase());
      setResult({
        address: addr,
        balanceWei: BigInt(balanceHex),
        txCount: parseInt(txCountHex, 16),
        whitelisted,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "RPC error");
    } finally {
      setLoading(false);
    }
  };

  const isUntouched = result && result.txCount === 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyberpunk-grid animate-grid-flow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-glow-pulse" />

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
              <Button
                variant="outline"
                size="icon"
                onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
                className="border-primary/50 hover:bg-primary/10"
              >
                <Languages className="h-5 w-5" />
              </Button>
              <CartDrawer />
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
          <div className="text-center mb-10">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon-magenta glow-magenta">{labels.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{labels.subtitle}</p>
          </div>

          <div className="bg-card/60 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 md:p-8 space-y-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder={labels.placeholder}
              className="font-mono text-base h-12 border-primary/30 bg-background/50"
              maxLength={42}
            />
            <Button
              onClick={handleVerify}
              disabled={loading}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 font-bold uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {labels.checking}
                </>
              ) : (
                labels.button
              )}
            </Button>
          </div>

          {result && (
            <div className="mt-8 space-y-4">
              {!result.whitelisted && GENESIS_WHITELIST.length > 0 ? (
                <div className="bg-destructive/10 border border-destructive/40 rounded-xl p-6 text-center">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-destructive" />
                  <p className="font-bold text-destructive">{labels.notWhitelisted}</p>
                </div>
              ) : (
                <div
                  className={`rounded-2xl p-8 text-center border-2 ${
                    isUntouched
                      ? "bg-accent/10 border-accent shadow-[0_0_40px_hsl(var(--accent)/0.4)]"
                      : "bg-destructive/10 border-destructive/60"
                  }`}
                >
                  {isUntouched ? (
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-accent" />
                  ) : (
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                  )}
                  <h2
                    className={`text-3xl md:text-4xl font-bold mb-3 tracking-wider ${
                      isUntouched ? "text-accent glow-cyan" : "text-destructive"
                    }`}
                  >
                    {isUntouched ? labels.untouched : labels.claimed}
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {isUntouched ? labels.untouchedDesc : labels.claimedDesc}
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{labels.balance}</p>
                  <p className="text-2xl font-bold text-primary">{formatEth(result.balanceWei)} ETH</p>
                </div>
                <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{labels.txCount}</p>
                  <p className="text-2xl font-bold text-primary">{result.txCount}</p>
                </div>
              </div>

              <div className="bg-card/40 backdrop-blur-sm border border-primary/20 rounded-xl p-5 space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Address</p>
                <p className="font-mono text-sm break-all text-foreground">{result.address}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {GENESIS_WHITELIST.length === 0 ? (
                    <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                      {labels.whitelistOff}
                    </Badge>
                  ) : result.whitelisted ? (
                    <Badge className="bg-accent/20 text-accent border-accent/40">{labels.whitelistOk}</Badge>
                  ) : null}
                  <Button asChild variant="outline" size="sm" className="border-primary/30">
                    <a
                      href={`https://basescan.org/address/${result.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {labels.explorer}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild variant="ghost" className="text-muted-foreground">
              <Link to="/">← {labels.back}</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Verify;
