import { useState, useEffect, useCallback } from "react";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import {
  Bitcoin,
  Wallet,
  CreditCard,
  Shield,
  Globe,
  Zap,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Users,
  Code,
  ArrowRight,
  Github,
} from "lucide-react";
import "./App.css";

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

/* ─── Utility ─── */
function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/* ─── Credit Card Component ─── */
function CreditCardVisual({
  address,
  name,
}: {
  address?: string;
  name?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full max-w-sm mx-auto cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          aspectRatio: "1.586",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 60px rgba(247,147,26,0.15)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-8 h-8 text-orange-400" />
              <span className="text-white font-bold text-lg tracking-wider">
                BITCOINCARD
              </span>
            </div>
            <div className="w-10 h-7 rounded bg-yellow-400/80" />
          </div>
          <div className="space-y-4">
            <div className="text-white/90 font-mono text-lg tracking-widest">
              {address
                ? `${address.slice(0, 4)} ${address.slice(4, 8)} ${address.slice(8, 12)} ${address.slice(12, 16)}`
                : "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider">
                  Card Holder
                </div>
                <div className="text-white font-medium">
                  {name || "YOUR NAME"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/50 text-xs uppercase tracking-wider">
                  Network
                </div>
                <div className="text-orange-400 font-bold">BTC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          }}
        >
          <div className="w-full h-12 bg-gray-800 mt-6" />
          <div className="px-6 space-y-3">
            <div className="bg-gray-200 h-10 rounded flex items-center justify-end pr-4">
              <span className="text-gray-800 font-mono text-sm">***</span>
            </div>
            <div className="space-y-1">
              <p className="text-white/40 text-xs leading-relaxed">
                Track 1: %B{address?.slice(0, 16) || "0000000000000000"}
                ^BITCOINCARD^2512101000000000000000000000000?
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                Track 2: ;{address?.slice(0, 16) || "0000000000000000"}
                =2512101000000000000?
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 pb-6">
            <Bitcoin className="w-6 h-6 text-orange-400/50" />
            <span className="text-white/30 text-xs">
              Open Source Credit Card
            </span>
          </div>
        </div>
      </div>
      <p className="text-center text-white/40 text-xs mt-3">
        Click to flip card
      </p>
    </div>
  );
}

/* ─── Navigation ─── */
function Navigation({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) {
  const { login, authenticated, logout, user } = usePrivy();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "spec", label: "Specification" },
    { id: "apply", label: "Apply" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Bitcoin className="w-7 h-7 text-orange-400" />
            <span className="text-white font-bold text-lg tracking-wide">
              Bitcoincard
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? "text-orange-400 bg-orange-400/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {authenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Wallet className="w-4 h-4 inline mr-1.5" />
                  {user?.wallet?.address
                    ? shortenAddress(user.wallet.address)
                    : "Dashboard"}
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/25"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/70 hover:text-white p-2"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? "text-orange-400 bg-orange-400/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10">
              {authenticated ? (
                <>
                  <button
                    onClick={() => {
                      setCurrentPage("dashboard");
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-orange-400"
                  >
                    <Wallet className="w-4 h-4 inline mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-white/50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="block w-full px-4 py-3 bg-orange-500 text-white text-sm font-semibold rounded-lg text-center"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const { login, authenticated } = usePrivy();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #F7931A 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm">
              <Code className="w-4 h-4" />
              <span>Open Source Project</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              The Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Bitcoin
              </span>{" "}
              Payments
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
              Bitcoincard is an open-source credit card brand built on Bitcoin.
              Connect your wallet, apply for your card, and start spending
              Bitcoin anywhere credit cards are accepted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {authenticated ? (
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={login}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </button>
              )}
              <button
                onClick={() => setCurrentPage("features")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/40 text-sm">Open Source</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">BTC</div>
                <div className="text-white/40 text-sm">Native</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-white/40 text-sm">Accepted</div>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <CreditCardVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ─── */
function FeaturesSection() {
  const features = [
    {
      icon: <Bitcoin className="w-7 h-7" />,
      title: "Bitcoin Native",
      description:
        "Built from the ground up for Bitcoin. Your BTC holdings back your credit line directly.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Self-Custody",
      description:
        "Your keys, your coins. Bitcoincard never takes custody of your assets.",
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Global Acceptance",
      description:
        "Use your Bitcoincard anywhere traditional credit cards are accepted worldwide.",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Instant Settlement",
      description:
        "Lightning-fast transactions with real-time settlement on the Bitcoin network.",
    },
    {
      icon: <Code className="w-7 h-7" />,
      title: "Open Source",
      description:
        "Fully transparent and auditable. Every line of code is open for review and contribution.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Community Governed",
      description:
        "Decisions are made by the community. One token, one vote on protocol changes.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Bitcoincard?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            The first truly open-source credit card brand built on Bitcoin,
            designed for the decentralized future.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5 group-hover:bg-orange-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Track Data Specification Section ─── */
function SpecSection() {
  const trackData = [
    {
      track: "Track 1",
      format: "IATA",
      maxChars: 79,
      fields: [
        { name: "Start Sentinel", value: "%" },
        { name: "Format Code", value: "B" },
        { name: "Primary Account Number (PAN)", value: "Up to 19 digits" },
        { name: "Field Separator", value: "^" },
        { name: "Cardholder Name", value: "2-26 alphanumeric" },
        { name: "Field Separator", value: "^" },
        { name: "Expiration Date", value: "YYMM" },
        { name: "Service Code", value: "3 digits" },
        { name: "Discretionary Data", value: "Variable" },
        { name: "End Sentinel", value: "?" },
        { name: "LRC", value: "1 character" },
      ],
    },
    {
      track: "Track 2",
      format: "ABA",
      maxChars: 40,
      fields: [
        { name: "Start Sentinel", value: ";" },
        { name: "Primary Account Number (PAN)", value: "Up to 19 digits" },
        { name: "Separator", value: "=" },
        { name: "Expiration Date", value: "YYMM" },
        { name: "Service Code", value: "3 digits" },
        { name: "Discretionary Data", value: "Variable" },
        { name: "End Sentinel", value: "?" },
        { name: "LRC", value: "1 character" },
      ],
    },
    {
      track: "Track 3",
      format: "THRIFT",
      maxChars: 107,
      fields: [
        { name: "Start Sentinel", value: ";" },
        { name: "Format Code", value: "2 digits" },
        { name: "Primary Account Number", value: "Up to 19 digits" },
        { name: "Country Code / Currency", value: "Variable" },
        { name: "End Sentinel", value: "?" },
        { name: "LRC", value: "1 character" },
      ],
    },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <FileText className="w-4 h-4" />
            <span>Technical Specification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Credit Card Track Data
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Bitcoincard follows ISO/IEC 7813 magnetic stripe data standards,
            ensuring compatibility with existing payment infrastructure.
          </p>
        </div>

        <div className="space-y-8">
          {trackData.map((track) => (
            <div
              key={track.track}
              className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
            >
              <div className="p-5 sm:p-6 bg-white/[0.02] border-b border-white/5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <h3 className="text-lg font-semibold text-white">
                  {track.track}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">
                    {track.format}
                  </span>
                  <span className="text-white/40">
                    Max {track.maxChars} characters
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-5 sm:px-6 py-3 text-white/40 font-medium">
                        Field
                      </th>
                      <th className="text-left px-5 sm:px-6 py-3 text-white/40 font-medium">
                        Value / Format
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {track.fields.map((field, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/[0.03] last:border-0"
                      >
                        <td className="px-5 sm:px-6 py-3 text-white/70">
                          {field.name}
                        </td>
                        <td className="px-5 sm:px-6 py-3 font-mono text-orange-400/80">
                          {field.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-500/5 to-blue-500/5 border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-3">
            Bitcoincard Enhancement
          </h3>
          <p className="text-white/50 leading-relaxed text-sm mb-4">
            While maintaining backward compatibility with ISO 7813, Bitcoincard
            extends the discretionary data field to encode Bitcoin-specific
            information including wallet derivation paths, Lightning Network
            routing hints, and cryptographic proofs of reserves.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg">
              BIP-32 Derivation
            </span>
            <span className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg">
              Lightning Network
            </span>
            <span className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg">
              Proof of Reserves
            </span>
            <span className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg">
              Taproot Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Apply Section ─── */
function ApplySection({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const { login, authenticated } = usePrivy();
  const [formData, setFormData] = useState({
    cardType: "virtual",
    network: "lightning",
    spendingLimit: "1000",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!authenticated) {
        login();
        return;
      }
      setSubmitted(true);
    },
    [authenticated, login]
  );

  if (submitted) {
    return (
      <section className="relative py-24 sm:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Application Submitted
          </h2>
          <p className="text-white/50 mb-8">
            Your Bitcoincard application has been received. You can check the
            status in your dashboard.
          </p>
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Apply for Bitcoincard
          </h2>
          <p className="text-white/50 text-lg">
            Select your preferences and submit your application.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Card Type */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">
                Card Type
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "virtual",
                    label: "Virtual Card",
                    desc: "Instant digital card for online use",
                  },
                  {
                    id: "physical",
                    label: "Physical Card",
                    desc: "NFC-enabled metal card shipped to you",
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, cardType: option.id })
                    }
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.cardType === option.id
                        ? "border-orange-500/50 bg-orange-500/5"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`font-medium text-sm ${formData.cardType === option.id ? "text-orange-400" : "text-white"}`}
                    >
                      {option.label}
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      {option.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Network */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">
                Preferred Network
              </label>
              <select
                value={formData.network}
                onChange={(e) =>
                  setFormData({ ...formData, network: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500/50 appearance-none"
              >
                <option value="lightning" className="bg-gray-900">
                  Lightning Network
                </option>
                <option value="onchain" className="bg-gray-900">
                  On-Chain Bitcoin
                </option>
                <option value="both" className="bg-gray-900">
                  Both (Lightning + On-Chain)
                </option>
              </select>
            </div>

            {/* Spending Limit */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">
                Monthly Spending Limit (USD equivalent)
              </label>
              <select
                value={formData.spendingLimit}
                onChange={(e) =>
                  setFormData({ ...formData, spendingLimit: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500/50 appearance-none"
              >
                <option value="1000" className="bg-gray-900">
                  $1,000
                </option>
                <option value="5000" className="bg-gray-900">
                  $5,000
                </option>
                <option value="10000" className="bg-gray-900">
                  $10,000
                </option>
                <option value="50000" className="bg-gray-900">
                  $50,000
                </option>
                <option value="unlimited" className="bg-gray-900">
                  Unlimited (Based on Collateral)
                </option>
              </select>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-white/[0.02] border-t border-white/5">
            <button
              type="submit"
              className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              {authenticated ? (
                <>
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" />
                  Connect Wallet to Apply
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─── Dashboard Section ─── */
function DashboardSection({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const { user, logout, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const [copied, setCopied] = useState(false);

  const walletAddress = wallets?.[0]?.address || user?.wallet?.address;

  const copyAddress = useCallback(() => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [walletAddress]);

  if (!authenticated) {
    return (
      <section className="relative py-24 sm:py-32">
        <div className="max-w-md mx-auto px-4 text-center">
          <Wallet className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-white/50 mb-8">
            Connect your wallet to access your Bitcoincard dashboard.
          </p>
          <button
            onClick={login}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all"
          >
            Connect Wallet
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Dashboard
          </h2>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all self-start"
          >
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div className="space-y-6">
            <CreditCardVisual
              address={walletAddress}
              name={
                user?.email?.address ||
                user?.google?.name ||
                (walletAddress ? shortenAddress(walletAddress) : undefined)
              }
            />

            {/* Card Status */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4">Card Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Status</span>
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">
                    Pending Review
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Card Type</span>
                  <span className="text-white text-sm">Virtual</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Network</span>
                  <span className="text-white text-sm">Lightning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-6">
            {/* Wallet Info */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-orange-400" />
                Wallet
              </h3>
              {walletAddress && (
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                  <span className="font-mono text-white/70 text-sm flex-1 truncate">
                    {walletAddress}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/40" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Connected Accounts */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4">
                Connected Accounts
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Email",
                    value: user?.email?.address,
                    icon: "@ ",
                  },
                  {
                    label: "Google",
                    value: user?.google?.email,
                    icon: "G ",
                  },
                  {
                    label: "Twitter",
                    value: user?.twitter?.username
                      ? `@${user.twitter.username}`
                      : undefined,
                    icon: "X ",
                  },
                  {
                    label: "Discord",
                    value: user?.discord?.username,
                    icon: "D ",
                  },
                ].map((account) => (
                  <div
                    key={account.label}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-white/40 text-xs font-bold">
                        {account.icon}
                      </span>
                      <div>
                        <div className="text-white text-sm">
                          {account.label}
                        </div>
                        <div className="text-white/40 text-xs">
                          {account.value || "Not linked"}
                        </div>
                      </div>
                    </div>
                    {!account.value && (
                      <span className="text-orange-400 text-xs cursor-pointer hover:text-orange-300">
                        Link account
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrentPage("apply")}
                  className="p-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-orange-400 text-sm font-medium transition-all"
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-2" />
                  Apply for Card
                </button>
                <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 text-sm font-medium transition-all">
                  <ExternalLink className="w-5 h-5 mx-auto mb-2" />
                  View on Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bitcoin className="w-6 h-6 text-orange-400" />
              <span className="text-white font-bold">Bitcoincard</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The open-source credit card brand built on Bitcoin for the
              decentralized future.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Virtual Card
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Physical Card
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Lightning Payments
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Developers
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Documentation
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  API Reference
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Track Data Spec
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-sm hover:text-white/60 transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Discord
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm hover:text-white/60 cursor-pointer transition-colors">
                  Twitter
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; 2025 Bitcoincard. Open Source under MIT License.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-xs">Built with Bitcoin</span>
            <Bitcoin className="w-4 h-4 text-orange-400/50" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App Content (inside PrivyProvider) ─── */
function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const { authenticated: _authenticated } = usePrivy();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <HeroSection setCurrentPage={setCurrentPage} />
            <FeaturesSection />
          </>
        );
      case "features":
        return (
          <div className="pt-16">
            <FeaturesSection />
          </div>
        );
      case "spec":
        return (
          <div className="pt-16">
            <SpecSection />
          </div>
        );
      case "apply":
        return (
          <div className="pt-16">
            <ApplySection setCurrentPage={setCurrentPage} />
          </div>
        );
      case "dashboard":
        return (
          <div className="pt-16">
            <DashboardSection setCurrentPage={setCurrentPage} />
          </div>
        );
      default:
        return <HeroSection setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

/* ─── App Root with Privy Provider ─── */
function App() {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#F7931A",
        },
        loginMethods: [
          "wallet",
          "email",
          "google",
          "twitter",
          "discord",
          "telegram",
        ],
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <AppContent />
    </PrivyProvider>
  );
}

export default App;
