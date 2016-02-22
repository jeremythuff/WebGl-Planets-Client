import { Scene } from "./Scene.js";
import { Controls } from "./../io/Controls.js";

export class State {
	constructor(name) {

		this.game;

		this.setName(name);
		
		this.initCbs = new Set();
		this.loadCbs = new Set();
		this.updateCbs = new Set();
		this.renderCbs = new Set();
		this.closeCbs = new Set();
		this.destroyCbs = new Set();

		this.loaded = false;
		this.initialized = false;

		this.scene = new Scene();
		this.controls = new Controls();

	}

	start() {
		let state = this;

		state.controls.init();

		state.runLoad().then(function() {
			state.runInit();
		});

	}

	stop() {
		let state = this;

		state.controls.destroy();

		state.runClose().then(function() {
			state.runDestroy();
		});
	}

	init(cb) {
		this.initCbs.add(_promiseify(cb));
	}

	runInit() {
		
		let state = this;
		let initPromise = _runCbs(this.initCbs);
		
		initPromise.then(function() {
			state.initialized = true;
		});
		
		return initPromise;

	}

	load(cb) {
		this.loadCbs.add(_promiseify(cb));
	}

	runLoad() {

		let state = this;
		let loadPromise = _runCbs(this.loadCbs);

		loadPromise.then(function() {
			state.loaded = true;
		});

		return loadPromise;
	}

	update(cb) {
		this.updateCbs.add(cb);
	}

	render(cb) {
		this.renderCbs.add(cb);
	}

	close(cb) {
		this.closeCbs.add(_promiseify(cb));
	}

	runClose() {
        return _runCbs(this.closeCbs);
	}

	destroy(cb) {
		this.destroyCbs.add(_promiseify(cb));
	}

	runDestroy() {
        return _runCbs(this.destroyCbs);
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

}

let _runCbs = function(cbSet) {
	let promises = new Set();

	for(let cb of cbSet) {
        promises.add(new Promise(function(resolve){
          cb(resolve);
        }));
    }

    return Promise.all(promises);
}

let _promiseify = function(cb) {
	var orCb = cb;
	cb = function(done) {
		orCb();
		if(done) done();
	}

	return cb;
}