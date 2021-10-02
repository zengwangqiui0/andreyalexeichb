module.exports = function() {
    $.gulp.task("svg", function() {
        return $.gulp.src("./src/img/icons/svg/*.svg")
            .pipe($.gp.cheerio({
                run: function($) {
                    $("[fill]").removeAttr("fill");
                    $("[stroke]").removeAttr("stroke");
                    $("[style]").removeAttr("style");
                },
                parserOptions: {xmlMode: true}
            }))
            .pipe($.gp.replace("&gt;", ">"))
            .pipe($.svgSprite({
                shape: {
		            dimension: {
    			        maxWidth: 32,
    			        maxHeight: 32
		            }
	            },   
                mode: {
    				css: {
    					dest: "./",
    					layout: "horizontal",
    					sprite: "sprite.svg",
    					bust: false,
    					render: {
    						css: { }
    					}
    				}
    			}
            }))
            .pipe($.gulp.dest("./dest/img/sprites/"))
            .pipe($.debug({"title": "sprites"}));
    });
};