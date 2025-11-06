<script lang="ts">
  import Fuse from "fuse.js";
  import postal_rates from "$lib/postal_rates.json";

  let query = "";
  let results = postal_rates;
  let selectedCountry: any = null;

  const fuse = new Fuse(postal_rates, {
    keys: ["country", "code"],
    includeScore: true,
    threshold: 0.3,
  });

  // Reactive search
  $: {
    const trimmed = query.trim();
    if (trimmed !== "") {
      results = fuse
        .search(trimmed)
        .slice(0, 5)
        .map((result) => result.item);
      selectedCountry = null; // 🔁 Clear selection if user starts typing again
    } else {
      results = [];
    }
  }
  let countriesPromise: Promise<any[]>;
  function showDetails(search: any) {
    selectedCountry = search;
    countriesPromise = getPlanet(selectedCountry.code);
    console.log(countriesPromise, "sadas");
  }

  async function getPlanet(code: string) {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${code}`,
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  let IDRupiah = new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  });

  import { Input } from "$lib/components/ui/input/index.js";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table/index.js";
</script>

<div
  class="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
>
  <header
    class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3"
  >
    <div class="flex items-center gap-8">
      <div class="flex items-center gap-4 text-[#0d141c]">
        <h2
          class="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]"
        >
          Postage Rates
        </h2>
      </div>
    </div>
    <div class="flex flex-1 justify-end gap-8"></div>
  </header>
  <div class="flex flex-col items-center justify-center p-4">
    <h1 class="text-2xl font-bold mb-4">Search Postage Rates</h1>

    <Input type="text" bind:value={query} placeholder="Search countries..." />

    {#if !selectedCountry}
      <ul>
        {#if results.length === 0 && query.trim() !== ""}
          <li class="text-red-500">No results found for "{query}"</li>
        {:else if results.length === 0}
          <li class="text-gray-500">Start typing to search...</li>
        {:else}
          {#each results as book}
            <li class="mb-2">
              <button
                class="text-blue-600 underline"
                on:click={() => showDetails(book)}
              >
                {book.country} ({book.code})
              </button>
            </li>
          {/each}
        {/if}
      </ul>
    {/if}
  </div>
  {#if selectedCountry}
    <!-- <div class="p-4 border rounded my-4">
            <h2 class="text-xl font-bold mb-2">{selectedCountry.country} ({selectedCountry.code})</h2>
            <p class="font-semibold mt-2">Postcard: </p> Rp. {selectedCountry.postcard}
            <p class="font-semibold mt-2">Sekogram: </p> Gratis Sampai 7 KG

            <h3 class="font-semibold mt-2">Surat:</h3>
            <ul class="list-disc ml-4">
                <li>&lt;20 Gram: Rp. {selectedCountry.postal_rates.letters.weight_up_to_20g}</li>
                <li>21–50 Gram: Rp. {selectedCountry.postal_rates.letters.weight_21g_to_50g}</li>
                <li>51–100 Gram: Rp. {selectedCountry.postal_rates.letters.weight_51g_to_100g}</li>
            </ul>
        </div> -->
    <div class="px-4 py-3 @container">
      <div
        class="flex overflow-hidden rounded-lg border border-[#cedbe8] bg-slate-50"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Weight/Size</TableHead>
              <TableHead>Rate (IDR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Letters</TableCell>
              <TableCell>Up to 20 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_up_to_20g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>21 g to 50 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_21g_to_50g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>51 g to 100 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_51g_to_100g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>101 g to 250 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_101g_to_250g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>251 g to 500 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_251g_to_500g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>501 g to 1000 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_501g_to_1000g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>1001 g to 1500 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_1001g_to_1500g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>1501 g to 2000 g</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.postal_rates.letters.weight_1501g_to_2000g,
                )}</TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell>Postcard</TableCell>
              <TableCell>Postcard</TableCell>
              <TableCell>{IDRupiah.format(selectedCountry.postcard)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sekogram</TableCell>
              <TableCell>Up to 7 kg</TableCell>
              <TableCell>Free</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>M-Bag</TableCell>
              <TableCell>Up to 30 kg</TableCell>
              <TableCell
                >{IDRupiah.format(
                  selectedCountry.mbag_per_kg_to_30kg,
                )}</TableCell
              >
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    {#if countriesPromise}
      {#await countriesPromise}
        <p>Loading countries...</p>
      {:then countries}
        <div class="flex flex-col items-center justify-center p-4">
          {#each countries as country}
            <div >
            <h1 class="text-2xl font-bold mb-4">
              Tentang {country.name.common}
              {country.flag}
            </h1>
          </div>
          <div>
            <img src={country.flags.svg} alt={country.flags.alt} class="h-auto max-w-xs">
          </div>
          <div class="pt-5">
            <Table class="items-center justify-center content-center">
              <TableBody>
                <TableRow>
                  <TableCell class="text-bold">Nama Resmi</TableCell>
                  <TableCell>  {country.name.official} </TableCell>
                  
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/each}
        </div>
      {:catch error}
        <p>Error: {error.message}</p>
      {/await}
    {/if}
  {/if}
</div>
