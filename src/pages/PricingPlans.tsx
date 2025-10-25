import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPlans: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();

  const pricing = useMemo(
    () => ({
      monthly: {
        pro: 499,
        researcher: 999,
        enterprise: 'Custom',
      },
      yearly: {
        pro: 4999,
        researcher: 9999,
        enterprise: 'Custom',
      },
    }),
    []
  );

  const features = {
    free: [
      'All Basic Crypto Tools (AES, RSA, Classical Ciphers)',
      'Basic Steganography (Image, Audio, Video)',
      'Data Processing Tools (Base64, URL, Binary, Hash)',
      '5 MB file size limit',
      'Guardian Layer: 3 free trials',
      '5-10 second processing delay',
      'Community support',
    ],
    pro: [
      'Everything in Free, plus:',
      'Guardian Layer: Unlimited access',
      '50 MB file size limit',
      'Instant processing (no delays)',
      'Advanced encryption algorithms',
      'Batch processing support',
      'Priority email support',
      'Ad-free experience',
    ],
    researcher: [
      'Everything in Pro, plus:',
      'API access for automation',
      'Steganography analyzer tools',
      'Advanced hash verification (SHA-256, SHA-512, MD5)',
      'File integrity checking',
      'Export in multiple formats',
      'Beta features early access',
      'Priority support with 24h response',
    ],
    enterprise: [
      'Everything in Researcher, plus:',
      'Multi-user team licenses',
      'Private dedicated API endpoints',
      'Custom branding options',
      'Cloud-based encrypted storage',
      'SSO integration',
      'Dedicated account manager',
      '24/7 premium support',
    ],
  } as const;

  const priceFor = (tier: 'pro' | 'researcher' | 'enterprise') => pricing[billing][tier];

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="text-center mb-10 space-y-3">
        <Badge variant="secondary" className="px-3 py-1">Choose the plan that fits your security needs</Badge>
        <h1 className="text-4xl font-bold text-gradient">Premium Plans</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Unlock advanced, multi-layered protection and professional tooling.</p>
        <div className="inline-flex items-center gap-2 mt-4 p-1 rounded-full bg-muted">
          <button
            className={`px-4 py-1 rounded-full text-sm transition ${
              billing === 'monthly' ? 'bg-background shadow' : 'opacity-70'
            }`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm transition ${
              billing === 'yearly' ? 'bg-background shadow' : 'opacity-70'
            }`}
            onClick={() => setBilling('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="card-glow border-primary/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Free</span>
              <Badge variant="outline">Starter</Badge>
            </CardTitle>
            <CardDescription>Get started with core tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-1">
            <div className="text-3xl font-bold">₹0</div>
            <ul className="space-y-2 text-sm flex-1">
              {features.free.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto" variant="outline" onClick={() => navigate(-1)}>Get Started</Button>
          </CardContent>
        </Card>

        <Card className="relative card-glow border-primary/30 bg-gradient-to-b from-primary/5 via-transparent to-transparent flex flex-col">
          <div className="absolute -top-2 right-4 text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">Recommended</div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">Pro <Sparkles className="h-4 w-4 text-yellow-500" /></span>
              <Badge variant="outline">Advanced Security Layer</Badge>
            </CardTitle>
            <CardDescription>Powerful multi-layer protection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-1">
            <div className="text-3xl font-bold">
              {typeof priceFor('pro') === 'number' ? `₹${priceFor('pro')}` : priceFor('pro')}<span className="text-sm text-muted-foreground">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <ul className="space-y-2 text-sm flex-1">
              {features.pro.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto" variant="outline" onClick={() => navigate('/checkout?plan=pro&billing=' + billing)}>Go Premium</Button>
          </CardContent>
        </Card>

        <Card className="card-glow border-primary/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Researcher</span>
              <Badge variant="outline">Developer Tier</Badge>
            </CardTitle>
            <CardDescription>Advanced tooling and automation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-1">
            <div className="text-3xl font-bold">
              {typeof priceFor('researcher') === 'number' ? `₹${priceFor('researcher')}` : priceFor('researcher')}<span className="text-sm text-muted-foreground">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <ul className="space-y-2 text-sm flex-1">
              {features.researcher.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto" variant="outline" onClick={() => navigate('/checkout?plan=researcher&billing=' + billing)}>Upgrade</Button>
          </CardContent>
        </Card>

        <Card className="card-glow border-primary/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Enterprise</span>
              <Badge variant="outline">Custom</Badge>
            </CardTitle>
            <CardDescription>Scale with dedicated support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-1">
            <div className="text-3xl font-bold">
              {typeof priceFor('enterprise') === 'number' ? `₹${priceFor('enterprise')}` : priceFor('enterprise')}<span className="text-sm text-muted-foreground">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <ul className="space-y-2 text-sm flex-1">
              {features.enterprise.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto" variant="outline" onClick={() => navigate('/contact-sales')}>Contact Sales</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Lock className="h-4 w-4" />
        <span>All payments are secured with industry-standard encryption.</span>
      </div>
    </div>
  );
};

export default PricingPlans;
