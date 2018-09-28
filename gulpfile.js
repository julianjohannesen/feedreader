const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task("default", function() {
	// place code for your default task here
	browserSync.init({
		server: "./"
	});
});
