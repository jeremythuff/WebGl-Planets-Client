
import { State } from "./../../engine/model/State.js";

let Intro = new State("Intro");

Intro.init(function() {
	console.log("Intro init");
});

Intro.load(function() {
	console.log("Intro load");
});

Intro.update(function(delta) {});

Intro.render(function(delta) {});

Intro.close(function() {
	console.log("Intro close");
});

Intro.destroy(function() {
	console.log("Intro destroy");
});

export {Intro};