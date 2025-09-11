<script lang="ts">
    import Fuse from 'fuse.js';
    import postal_rates from '$lib/postal_rates.json';

    let query = '';
    let results = postal_rates;
    let selectedCountry : any = null;

    const fuse = new Fuse(postal_rates, {
        keys: ['country', 'code'],
        includeScore: true,
        threshold: 0.3
    });

    // Reactive search
    $: {
        const trimmed = query.trim();
        if (trimmed !== '') {
            results = fuse.search(trimmed).slice(0, 5).map(result => result.item);
            selectedCountry = null; // 🔁 Clear selection if user starts typing again
        } else {
            results = [];
        }
    }

    function showDetails(search :any) {
        selectedCountry = search;
    }

    let IDRupiah = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR',
    });
</script>



<div class="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style='font-family: "Public Sans", "Noto Sans", sans-serif;'>
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-4 text-[#0d141c]">
              <h2 class="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">Postage Rates</h2>
            </div>
          </div>
          <div class="flex flex-1 justify-end gap-8">
           
          </div>
    </header>
    <div class="flex flex-col items-center justify-center p-4">
        <h1 class="text-2xl font-bold mb-4">Search Postage Rates</h1>
        <input
    type="text"
    bind:value={query}
    placeholder="Search countries..."
        class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] focus:border-none h-full placeholder:text-[#49739c] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
    />

    {#if  !selectedCountry}
        <ul>
            {#if results.length === 0 && query.trim() !== ''}
                <li class="text-red-500">No results found for "{query}"</li>
            {:else if results.length === 0}
                <li class="text-gray-500">Start typing to search...</li>
            {:else}
                {#each results as book}
                    <li class="mb-2">
                        <button class="text-blue-600 underline" on:click={() => showDetails(book)}>
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
              <div class="flex overflow-hidden rounded-lg border border-[#cedbe8] bg-slate-50">
                <table class="flex-1">
                  <thead>
                    <tr class="bg-slate-50">
                      <th class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal">Service</th>
                      <th class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal">
                        Weight/Size
                      </th>
                      <th class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal">
                        Rate (IDR)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal">Letters</td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        Up to 20 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_up_to_20g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        21 g to 50 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_21g_to_50g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        51 g to 100 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_51g_to_100g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        101 g to 250 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_101g_to_250g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        251 g to 500 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_251g_to_500g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        501 g to 1000 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_501g_to_1000g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        1001 g to 1500 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_1001g_to_1500g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal"></td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        1501 g to 2000 g
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postal_rates.letters.weight_1501g_to_2000g)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal">Postcard</td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        Postcard
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.postcard)}</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal">Sekogram</td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        Up to 7 kg
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">Free</td>
                    </tr>
                    <tr class="border-t border-t-[#cedbe8]">
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal">M-Bag</td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-240 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                        Up to 30 kg
                      </td>
                      <td class="table-533cf927-a0ff-4ce8-b84d-b8ef05c89aa4-column-360 h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">{IDRupiah.format(selectedCountry.mbag_per_kg_to_30kg)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
            
              </style>
            </div>
    {/if}
</div>