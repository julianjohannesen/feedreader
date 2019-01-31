$(function() {

	/* Test suite about the RSS feeds definitions, & allFeeds variable.*/
	describe("RSS Feeds", function() {
		/* Test to ensure the allFeeds variable has been defined and that it is not empty. */
		it("are defined", function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Loop through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */
		it("and each feed's url is defined and not empty", function() {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});

		/* Loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */
		it("and each feed's name is defined and not empty", function() {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		});
	});


	/* Test suite named "The menu" */
	describe("The menu", function() {

		/* Ensures the menu element is hidden by default. */
		it("is hidden by default", function(){
			// The menu is hidden when the menu-hidden class appears on the body element
			expect($("body").hasClass("menu-hidden")).toBe(true);
		});

		/* Ensure the menu changes visibility when the menu icon is clicked. 
		*  This test has two expectations: does the menu display when clicked
        *  and does it hide when clicked again.
        */
		it("shows when clicked and hides when clicked again", function(){            
			// spy on the menu icon and click event
			const spy = spyOnEvent(".header a i", "click");
			// now trigger the click event
			$(".header a i").click();
			// Was the click triggered on the menu icon?
			expect("click").toHaveBeenTriggeredOn(".header a i");
			// Was the spy event triggered?
			expect(spy).toHaveBeenTriggered();
			// Expect the body NOT to have the menu-hidden class
			expect($("body")).not.toHaveClass("menu-hidden");

			// Reset the spy and now check that clicking a second time closes the menu
			spy.reset();
            
			// Trigger event
			$(".header a i").click();
			// Was the click triggered on the menu icon?
			expect("click").toHaveBeenTriggeredOn(".header a i");
			// Was the spy event triggered?
			expect(spy).toHaveBeenTriggered();
			// Expect the body to have the menu-hidden class
			expect($("body")).toHaveClass("menu-hidden");
		});

	});

	/* Test suite named "Initial Entries" */
	describe("Initial Entries", function(){
		/* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		beforeEach(function(done){
			// Thanks to Matt Cranford for pointing out that loadFeed takes
			// a  second argument for a callback
			// https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
			loadFeed(0, done);
		});
		it("has at least one entry", function(){
			// See if there are any entries and if "entries" will be true
			const entries = document.querySelectorAll(".feed .entry").length > 0;
			expect(entries).toBe(true);
		});
	});

	/* Test suite named "New Feed Selection" */
	describe("New Feed Selection", function(){
		/* Ensures when a new feed is loaded by the loadFeed function that
		 * the content actually changes. loadFeed() is asynchronous.
         */
		let oldFeed, newFeed;
		beforeEach((done) => {
			// Thanks to Matt Cranford for pointing out that loadFeed takes
			// a  second argument for a callback
			// https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
			
			// Load the first feed
			loadFeed(0, () => {
				// Store the first feed's content
				oldFeed = $(".feed").html();
				// Load the second feed and then call "done" 
				console.log(oldFeed)
				loadFeed(1, () => {
					// Store the second feed's content
					newFeed = $(".feed").html();
					console.log(newFeed)
					// Call done and begin testing
					done();
				});
			});
		});

		it("loads new content when loadFeed is called", function(){
			// compare oldFeed and newFeed
			expect(oldFeed === newFeed).toBe(false);
		});
	});
}());
