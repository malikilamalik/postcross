// src/lib/types/postal.ts
export type LettersRates = {
  weight_up_to_20g: number;
  weight_21g_to_50g: number;
  weight_51g_to_100g: number;
  weight_101g_to_250g: number;
  weight_251g_to_500g: number;
  weight_501g_to_1000g: number;
  weight_1001g_to_1500g: number;
  weight_1501g_to_2000g: number;
};

export type PackageRatesUSD = {
  first_3kg: number;
  per_kg_after: number;
};

export type Rate = {
  country: string;     // "Lebanon"
  code: string;        // "LB"
  postal_rates: {
    letters: LettersRates;
  };
  postcard: number;            // IDR
  mbag_per_kg_to_30kg: number; // IDR
  package_rates_usd?: PackageRatesUSD;
};