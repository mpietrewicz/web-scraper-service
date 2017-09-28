var page = require("webpage").create();

page.open("https://allegro.pl/kategoria/samochody-osobowe-4029?string=e90%20330i&order=m&bmatch=base-relevance-floki-5-nga-hc-aut-1-2-0901", function(status) {
	console.log("Status: " + status);

	if(status === "success") {
		console.log(page.plainText);
	}
	phantom.exit();
});
