/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

	/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	describe("RSS Feeds", function() {
		/* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
		it("are defined", function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it("and each feed's url is defined and not empty", function() {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});

		/* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it("and each feed's name is defined and not empty", function() {
			for(let i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		});
	});


	/* TODO: Write a new test suite named "The menu" */
	describe("The menu", function() {

		/* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		it("is hidden by default", function(){
			// The menu is hidden when the men-hidden class appears on the body element
			const hiderClass = document.body.classList.contains("menu-hidden");
			expect(hiderClass).toBe(true);
			// The menu is hidden by default by translating it 192 pixels to the left, off-screen
			let howHidden = window.getComputedStyle(document.querySelector(".slide-menu")).transform;
			expect(howHidden).toContain("matrix(1, 0, 0, 1, -192, 0)");

		});

		/* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
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
			// Expect that value of howShowing to contain a matrix that positions the slide menu on the page
			let howShowing;
			// To prevent getting the computed style on load we can set a delay
			setTimeout(function(){
				howShowing = window.getComputedStyle(document.querySelector(".slide-menu")).transform;
				expect(howShowing).toContain("matrix(1, 0, 0, 1, 0, 0)");
			}, 2500) ;

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
			// Expect that value of howHidden to contain a matrix that positions the slide menu off the page
			// To prevent getting the computed style to soon we can add a delay
			setTimeout(function(){
				howHidden = window.getComputedStyle(document.querySelector(".slide-menu")).transform;
				expect(howHidden).toContain("matrix(1, 0, 0, 1, -191.191, 0)");
			}, 5000) ;

		});

	});

	/* TODO: Write a new test suite named "Initial Entries" */
	describe("Initial Entries", function(){
		/* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
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
			const entries = document.querySelectorAll(".entry").length > 0;
			expect(entries).toBe(true);
		});
	});

	/* TODO: Write a new test suite named "New Feed Selection" */
	describe("New Feed Selection", function(){
		/* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		const feed = document.querySelector(".feed");
		let feed1 = [];
		beforeEach(function(done){
			// Thanks to Matt Cranford for pointing out that loadFeed takes
			// a  second argument for a callback
			// https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/

			// Load the first feed
			loadFeed(0);
			// Save the first feed's text content into our feed1 array
			Array.from(feed.children).forEach(child => feed1.push(child.innerText));
			// Load the second feed and then call "done" 
			// "done" can only be called once and must called here
			loadFeed(1, done);
		});

		it("loads new content when loadFeed is called", function(){
			Array.from(feed.children).forEach((child, index) => { 
				// for each child element in the new feed, compare it
				// to the corresponding element in the old feed. 
				// We expect that comparison to be false.
				expect(child.innerText === feed1[index]).toBe(false)})
		});
	});
}());
