import Fuse from "fuse.js";
  import postal_rates from "$lib/postal_rates.json";

export const get_posts = async () => {
	  let query = "";
  	let results = postal_rates;

	const fuse = new Fuse(postal_rates, {
		keys: ["country", "code"],
		includeScore: true,
		threshold: 0.3,
	});
	// Reactive search
};