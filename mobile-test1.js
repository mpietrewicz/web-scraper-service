var page = require("webpage").create();

page.open("http://suchen.mobile.de/fahrzeuge/search.html?damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&makeModelVariant1.makeId=3500&makeModelVariant1.modelId=15&maxFirstRegistrationDate=2011-12-31&maxPowerAsArray=KW&maxPrice=15000&minFirstRegistrationDate=2010-01-01&minPowerAsArray=KW&minPrice=14000&scopeId=C", function(status) {
	console.log("Status: " + status);

	if(status === "success") {
		page.render("mobile-page.png");
		console.log(page.plainText);
	}
	phantom.exit();
});
