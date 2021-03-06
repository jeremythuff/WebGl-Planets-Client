
import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";
import { StorageService } from "engine/services/StorageService";
import { ApiService } from "engine/services/ApiService"

import { Credentials } from "engine/model/Credentials"

let MainMenu = new State("Main Menu");

MainMenu.init(function() {

	console.log("MainMenu init");

	MainMenu.controls.keyboard.when([Keyboard.ESC], function() {
		let lastStateName = MainMenu.game.getLastState().name;
		MainMenu.game.setCurrentState(lastStateName);
	});

});

MainMenu.load(function() {
	if(MainMenu.loaded) return;
	
	ApiService.fetch(Credentials, "/user/credentials").then(function(credentials) {
		MainMenu.gui.updateContext("credentials", credentials);
	});

	MainMenu.context.menu = {
		createGame: {
			gloss: "Create Game",
			action: function() {
				MainMenu.game.setCurrentState("Create Game");
			}
		},
		currentGames: {
			gloss: "Current Games",
			action: function() {
				MainMenu.game.setCurrentState("Current Games");
			}
		},
		editProfile: {
			gloss: "Edit Profile",
			action: function() {
				MainMenu.game.setCurrentState("Edit Profile");
			}
		},
		options: {
			gloss: "Options",
			action: function() {
				MainMenu.game.setCurrentState("Options");
			}
		},
		mapMode: {
			gloss: "Jump to Map",
			action: function() {
				MainMenu.renderer.clear();
				MainMenu.game.setCurrentState("Map Mode");
			}
		},
		planetMode: {
			gloss: "Jump to Planets",
			action: function() {
				MainMenu.game.setCurrentState("Planet Mode");
			}
		},
		shipMode: {
			gloss: "Jump to Ships",
			action: function() {
				MainMenu.game.setCurrentState("Ship Mode");
			}
		},
		devMode: {
			gloss: "Development Mode",
			action: function() {
				MainMenu.game.setCurrentState("Development Mode");
			}
		},
		logout: {
			gloss: "Logout",
			action: function() {
				StorageService.removeValue("JWT");
				MainMenu.game.setCurrentState("Login");
			}
		},
		exit: {
			gloss: "Exit",
			action: function() {
				MainMenu.game.stop();
			}
		}
	};
	
	MainMenu.gui.addView("Title", "src/game/states/MainMenu/gui/templates/title.hbs");
	MainMenu.gui.addView("Menu", "src/game/states/MainMenu/gui/templates/menu.hbs");
	MainMenu.gui.addView("LoginInfo", "src/game/states/MainMenu/gui/templates/loginInfo.hbs");

	console.log(MainMenu);
	console.log("MainMenu loaded");

});

MainMenu.update(function() {}); // Will take pass delta as arg if needed

MainMenu.render(function() {}); // Will take pass delta as arg if needed

MainMenu.close(function() {
	MainMenu.gui.close();
	console.log("MainMenu close");
});

MainMenu.destroy(function() {
	console.log("MainMenu destroy");
});

export {MainMenu};