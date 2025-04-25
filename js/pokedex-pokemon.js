let tmOrder = [
  "Work Up",
  "Parting Shot",
  "Endure",
  "Protect",
  "Rain Dance",
  "Sunny Day",
  "Sandstorm",
  "Hail",
  "Grassy Terrain",
  "Electric Terrain",
  "Brick Break",
  "Grass Knot",
  "Bulldoze",
  "Rock Tomb",
  "Ominous Wind",
  "Water Pledge",
  "Grass Pledge",
  "Fire Pledge",
  "Shock Wave",
  "Draco Jet",
  "Snore",
  "Bug Biting",
  "Bounce",
  "Bind",
  "Synthesis",
  "Pain Split",
  "Tailwind",
  "Laser Focus",
  "Gravity",
  "Recycle",
  "Skill Swap",
  "Trick",
  "Magnet Rise",
  "Stealth Rock",
  "Low Kick",
  "Liquidation",
  "Stomping Tantrum",
  "Iron Head",
  "Seed Bomb",
  "Fire Punch",
  "Ice Punch",
  "Thunder Punch",
  "Drain Punch",
  "Knock Off",
  "Covet",
  "Signal Beam",
  "Giga Drain",
  "Water Pulse",
  "Icy Wind",
  "Electroweb",
  "Psychic Fangs",
  "Ice Fang",
  "Fire Fang",
  "Poison Fang",
  "Thunder Fang",
  "Roost",
  "Rest",
  "Sleep Talk",
  "Hidden Power",
  "Taunt",
  "Volt Switch",
  "U-Turn",
  "Poison Jab",
  "Shadow Punch",
  "Reflect",
  "Light Screen",
  "Mystical Fire",
  "Toxic Spikes",
  "Dazzling Gleam",
  "Aurora Veil",
  "Weather Ball",
  "Belch",
  "Rage",
  "Power-Up Punch",
  "Charge Beam",
  "Hex",
  "Venoshock",
  "Hone Claws",
  "Smart Strike",
  "Substitute",
  "Agility",
  "Scorching Sands",
  "Burning Malice",
  "Synchronoise",
  "Dark Pulse",
  "Steel Wing",
  "Nature Power",
  "Seismic Fist",
  "Sucker Punch",
  "Shadow Ball",
  "Psychic",
  "Aura Sphere",
  "Will-O-Wisp",
  "Rock Slide",
  "Retaliate",
  "Thunderbolt",
  "Ice Beam",
  "Flamethrower",
  "Energy Ball",
  "Sludge Bomb",
  "Natural Gift",
  "Surf",
  "Rock Polish",
  "Blaze Kick",
  "Acrobatics",
  "First Impression",
  "Lunge",
  "Flash Cannon",
  "Dragon Dance",
  "Solar Beam",
  "Solar Blade",
  "Spiteful Spell",
  "Acid Reflux",
  "Focus Punch",
  "Sky Attack",
  "Heat Wave",
  "Earth Power",
  "Hyper Voice",
  "Dragon Pulse",
  "Drill Run",
  "Zen Headbutt",
  "Aqua Tail",
  "Hell Thrust",
  "Iron Tail",
  "Gunk Shot",
  "Foul Play",
  "Endeavor",
  "Iron Defense",
  "Nasty Plot",
  "Swords Dance",
  "Calm Mind",
  "Bulk Up",
  "Play Rough",
  "Wild Charge",
  "Rock Climb",
  "Take Down",
  "Sludge Wave",
  "Earthquake",
  "Draco Meteor",
  "Hyper Beam",
  "Giga Impact",
  "Thunder",
  "Blizzard",
  "Hurricane",
  "Fire Blast",
  "Close Combat",
  "Focus Blast",
  "Stone Edge",
  "Strength",
  "Hydro Pump",
  "Power Whip",
  "Megahorn",
  "Megaton Kick",
  "Superpower",
  "Uproar",
  "Outrage",
  "Last Resort",
  "Time Out",
  "Super Fang",
  "Helping Hand",
  "Defog",
  "Snatch",
  "Telekinesis",
  "Magic Coat",
  "Magic Room",
  "Wonder Room",
  "Role Play",
  "Worry Seed",
  "Block",
	"After You",
  "Ally Switch",
].map(toID);

window.PokedexPokemonPanel = PokedexResultPanel.extend({
	initialize: function(id) {
		id = toID(id);
		var pokemon = BattlePokedex[id]
		this.id = id;
		this.shortTitle = pokemon.baseSpecies;

		var buf = '<div class="pfx-body dexentry">';

		buf += `<a href="${Config.baseurl}" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>`;
		buf += '<h1>';
		if (pokemon.forme) {
			buf += `<a href="${Config.baseurl}pokemon/${id}" data-target="push" class="subtle">${pokemon.baseSpecies}<small>-${pokemon.forme}</small></a>`;
		} else {
			buf += `<a href="${Config.baseurl}pokemon/${id}" data-target="push" class="subtle">${pokemon.name}</a>`;
		}
		if (pokemon.num > 0) buf += ` <code>#${pokemon.num}</code>`;
		buf += '</h1>';

		if (pokemon.unusable) {
			buf += '<div class="warning"><strong>Note:</strong> This Pok&eacute;mon not available.</div>';
		}

		let imageName = id;
		if (pokemon.forme) {
			imageName = toID(pokemon.baseSpecies) +'-' + toID(pokemon.forme)
		}
		buf += `<img src="${ResourcePrefix}sprites/gen5/${imageName}.png" alt="" width="96" height="96" class="sprite" />`

		buf += '<dl class="typeentry">';
		buf += '<dt>Types:</dt> <dd>';
		for (var i=0; i<pokemon.types.length; i++) {
			buf += `<a class="type ${toID(pokemon.types[i])}" href="${Config.baseurl}types/${toID(pokemon.types[i])}" data-target="push">${pokemon.types[i]}</a> `;
		}
		buf += '</dd>';
		buf += '</dl>';

		buf += '<dl class="sizeentry">';
		buf += '<dt>Size:</dt> <dd>';
		var gkPower = (function(weightkg) {
			if (weightkg >= 200) return 120;
			if (weightkg >= 100) return 100;
			if (weightkg >= 50) return 80;
			if (weightkg >= 25) return 60;
			if (weightkg >= 10) return 40;
			return 20;
		})(pokemon.weightkg);
		buf += `${pokemon.weightkg} kg<br /><small><a class="subtle" href="${Config.baseurl}moves/grassknot" data-target="push">Grass Knot</a>: ${gkPower}</small>`;
		buf += '</dd>';
		buf += '</dl>';

		buf += '<dl class="abilityentry">';
		buf += '<dt>Abilities:</dt> <dd class="imgentry">';
		for (var i in pokemon.abilities) {
			var ability = pokemon.abilities[i];
			if (!ability) continue;

			if (i !== '0') buf += ' | ';
			if (i === 'H') ability = `<em>${pokemon.abilities[i]}</em>`;
			buf += `<a href="${Config.baseurl}abilities/${toID(pokemon.abilities[i])}" data-target="push">${ability}</a>`;
			if (i === 'H') buf += '<small> (H)</small>';
			if (i === 'S') buf += '<small> (special)</small>';
		}
		buf += '</dd>';
		buf += '</dl>';

		buf += '<dl>';
		buf += '<dt style="clear:left">Base stats:</dt><dd><table class="stats">';

		var StatTitles = {
			hp: "HP",
			atk: "Attack",
			def: "Defense",
			spa: "Sp. Atk",
			spd: "Sp. Def",
			spe: "Speed"
		};
		buf += '<tr><td></td><td></td><td style="width:200px"></td><th class="ministat"><abbr title="0 IVs, 0 EVs, negative nature">min&minus;</a></th><th class="ministat"><abbr title="31 IVs, 0 EVs, neutral nature">min</abbr></th><th class="ministat"><abbr title="31 IVs, 252 EVs, neutral nature">max</abbr></th><th class="ministat"><abbr title="31 IVs, 252 EVs, positive nature">max+</abbr></th>';
		var bst = 0;
		for (var stat in BattleStatNames) {
			var baseStat = pokemon.baseStats[stat];
			bst += baseStat;
			var width = Math.floor(baseStat*200/200);
			if (width > 200) width = 200;
			var color = Math.floor(baseStat*180/255);
			if (color > 360) color = 360;
			buf += `<tr><th>${StatTitles[stat]}:</th><td class="stat">${baseStat}</td>`;
			buf += `<td class="statbar"><span style="width:${Math.floor(width)}px;background:hsl(${color},85%,45%);border-color:hsl(${color},75%,35%)"></span></td>`;
			buf += '<td class="ministat"><small>'+(stat==='hp'?'':this.getStat(baseStat, false, 100, 0, 0, 0.9))+'</small></td><td class="ministat"><small>'+this.getStat(baseStat, stat==='hp', 100, 31, 0, 1.0)+'</small></td>';
			buf += '<td class="ministat"><small>'+this.getStat(baseStat, stat==='hp', 100, 31, 255, 1.0)+'</small></td><td class="ministat"><small>'+(stat==='hp'?'':this.getStat(baseStat, false, 100, 31, 255, 1.1))+'</small></td></tr>';
		}
		buf += `<tr><th class="bst">Total:</th><td class="bst">${bst}</td><td></td><td class="ministat" colspan="4">at level <input type="text" class="textbox" name="level" placeholder="100" size="5" /></td>`;

		buf += '</table></dd>';

		{
			buf += '<dt>Evolution:</dt> <dd>';
			var template = pokemon;
			while (template.prevo) template = getID(BattlePokedex, template.prevo);
			if (template.evos) {
				buf += '<table class="evos"><tr><td>';
				var evos = [template];
				let evoCount = 0;
				while (evos.length > 0) {
					var nextEvos = [];
					for (var i=0; i<evos.length; i++) {
						template = evos[i];
						var name = (template.forme ? template.baseSpecies+`<small>-${template.forme}</small>` : template.name);
						name = `<span class="picon" style="${getPokemonIcon(template)}"></span>`+name;
						if (template === pokemon) {
							buf += `<div><strong>${name}</strong></div>`;
						} else {
							buf += `<div><a href="${Config.baseurl}pokemon/${template.id}" data-target="replace">${name}</a></div>`;
						}
						nextEvos = nextEvos.concat(template.evos ?? [])
					}
					evos = nextEvos.map((id) => getID(BattlePokedex, id));
					if (evoCount++ > 100) break;
					if (evos.length > 0)
						buf += '</td><td class="arrow"><span>&rarr;</span></td><td>';
				}
				buf += '</td></tr></table>';
				if (pokemon.prevo) {
					buf += `<div><small>Evolves from ${  getID(BattlePokedex, pokemon.prevo).name  } (${  this.getEvoMethod(pokemon)  })</small></div>`;
				}
			} else {
				buf += '<em>Does not evolve</em>';
			}
		}

		if (pokemon.formes) {
			buf += '</dd><dt>Formes:</dt> <dd>';
			var otherFormes = pokemon.formes;
			for (var i = 0; i < otherFormes.length; i++) {
				template = getID(BattlePokedex, otherFormes[i]);
				if (!template) continue;
				var name = template.forme || 'Base';
				name = `<span class="picon" style="${getPokemonIcon(template)}"></span>` + name;
				if (i > 0) buf += ', '
				if (template === pokemon) {
					buf += `<strong>${name}</strong>`;
				} else {
					buf += `<a href="${Config.baseurl}pokemon/${template.id}" data-target="replace">${name}</a>`;
				}
			}
			if (pokemon.requiredItems && pokemon.requiredItems.length > 0) {
				buf += `<div><small>Must hold one of</small></div>`
				for (let item of pokemon.requiredItems) {
					 buf += `<div><small><a href="${Config.baseurl}items/${toID(item)}" data-target="push">${item}</a></small></div>`;
				}
			}
		}
		if (pokemon.cosmeticFormes) {
			buf += '</dd><dt>Cosmetic formes:</dt> <dd>';
			name = `<span class="picon" style="${getPokemonIcon(pokemon)}"></span>` + pokemon.name;
			buf += ''+name;

			for (var i = 0; i < pokemon.cosmeticFormes.length; i++) {
				name = `<span class="picon" style="${getPokemonIcon(pokemon.name + '-' + pokemon.cosmeticFormes[i])}"></span>` + pokemon.cosmeticFormes[i];
				buf += "," + name ;
			}
		}
		buf += '</dd></dl>';

		if (pokemon.eggGroups) {
			buf += '<dl class="colentry"><dt>Egg groups:</dt><dd><span class="picon" style="margin-top:-12px;'+getPokemonIcon('egg')+`"></span><a href="${Config.baseurl}egggroups/`+pokemon.eggGroups.map(toID).join('+')+'" data-target="push">'+pokemon.eggGroups.join(', ')+'</a></dd></dl>';
			buf += '<dl class="colentry"><dt>Gender ratio:</dt><dd>';
			if (pokemon.gender) switch (pokemon.gender) {
			case 'M':
				buf += '100% male';
				break;
			case 'F':
				buf += '100% female';
				break;
			case 'N':
				buf += '100% genderless';
				break;
			} else if (pokemon.genderRatio) {
				buf += `${(pokemon.genderRatio.M*100)}% male, ${(pokemon.genderRatio.F*100)}% female`;
			} else {
				buf += '50% male, 50% female';
			}
			buf += '</dd></dl>';
			buf += '<div style="clear:left"></div>';
		}

		// learnset
		buf += '<ul class="utilichart nokbd">';
		buf += '<li class="resultheader"><h3>Level-up</h3></li>';
		buf += '</ul>';
		buf += '</div>';

		this.html(buf);
		setTimeout(this.renderFullLearnset.bind(this));
	},
	events: {
		'click .tabbar button': 'selectTab',
		'input input[name=level]': 'updateLevel',
		'keyup input[name=level]': 'updateLevel',
		'change input[name=level]': 'updateLevel',
	},
	updateLevel: function(e) {
		var val = this.$('input[name=level]').val();
		var level = val === '' ? 100 : parseInt(val, 10);
		var lowIV = 31, highIV = 31;
		var lowEV = 0, highEV = 255;
		if (val.slice(-1) === ':') {
			lowIV = 0;
			highEV = 0;
		}
		var i = 0;
		var $entries = this.$('table.stats td.ministat small');
		var pokemon = getID(BattlePokedex, this.id);
		for (var stat in BattleStatNames) {
			var baseStat = pokemon.baseStats[stat];

			$entries.eq(4 * i + 0).text(stat==='hp'?'':this.getStat(baseStat, false, level, 0, 0, 0.9));
			$entries.eq(4 * i + 1).text(this.getStat(baseStat, stat==='hp', level, lowIV, lowEV, 1.0));
			$entries.eq(4 * i + 2).text(this.getStat(baseStat, stat==='hp', level, highIV, highEV, 1.0));
			$entries.eq(4 * i + 3).text(stat==='hp'?'':this.getStat(baseStat, false, level, highIV, highEV, 1.1));
			i++;
		}
	},
	getEvoMethod: function(evo) {
    let condition = evo.evoCondition ? ` ${evo.evoCondition}` : ``;
    let evoType = "";
    switch (evo.evoType) {
      case "levelExtra":
        evoType = "level-up" + condition;
        break;
      case "levelFriendship":
        evoType = "level-up with high Friendship" + condition;
        break;
      case "levelHold":
        evoType = "level-up holding " + evo.evoItem + condition;
        break;
      case "useItem":
        evoType = "use " + evo.evoItem + condition;
        break;
      case "levelMove":
        evoType = "level-up with " + evo.evoMove + condition;
        break;
      case "trade":
        evoType = "trade";
        break;
      case "other":
        evoType = evo.evoCondition;
        break;
    }
    if (evo.evoLevel) {
			if (evoType != "") evoType += ' at '
      evoType += "level " + evo.evoLevel;
    }
    return evoType;
  },
	selectTab: function(e) {
		this.$('.tabbar button').removeClass('cur');
		$(e.currentTarget).addClass('cur');
		switch (e.currentTarget.value) {
		case 'move':
			this.renderFullLearnset();
			break;
		case 'details':
			//this.renderDetails();
			break;
		case 'events':
			//this.renderEvents();
			break;
		}
	},
	renderFullLearnset: function() {
		var pokemon = getID(BattlePokedex, this.id);
		var learnset = getLearnset(this.id);
		var last;
		var buf = "", desc = "";
		learnset.sort((a, b) => {
			if( (a.how == "tutor" || a.how == "tm") && (b.how == "tutor" || b.how == "tm")) {
				return tmOrder.indexOf(a.move) - tmOrder.indexOf(b.move)
			}
			return 0;
		})
		for (let learn of learnset) {
			let move = BattleMovedex[learn.move]
			if (!move) {
				buf += `<li><pre>error: "${learn.move}"</pre></li>`;
				continue;
			} 
			var newCategory = last == undefined || last.how != learn.how;
			switch(learn.how) {
				case 'lvl': // level-up move
					if (newCategory) buf += '<li class="resultheader"><h3>Level-up</h3></li>';
					let level = learn.level
					desc = level <= 1  ? '&ndash;' : '<small>L</small>'+level;
					break;
				case 'prevo': // prevo
					if (newCategory) buf += '<li class="resultheader"><h3>From preevo</h3></li>';
					desc = ""
					break;
				case 'tm': // tm/hm
					if (newCategory && last.how != "tutor") buf += '<li class="resultheader"><h3>TM/Tutors (Chronological Order)</h3></li>';
					desc = `<span class="itemicon" style="margin-top:-3px;${getItemIcon(721)}"></span>`;
					break;
				case 'tutor': // tutor
					if (newCategory && last.how != "tm") buf += '<li class="resultheader"><h3>TM/Tutors (Chronological Order)</h3></li>';
					desc = `<img src="${ResourcePrefix}sprites/tutor.png" style="margin-top:-4px;opacity:.7" width="27" height="26" alt="T" />`;
					break;
				case 'egg': // egg move
					if (newCategory) buf += '<li class="resultheader"><h3>Egg</h3></li>';
					desc = '<span class="picon" style="margin-top:-12px;'+getPokemonIcon('egg')+'"></span>';
					break;
			}
			last = learn;
			buf += BattleSearch.renderTaggedMoveRow(move, desc);
		}
		this.$('.utilichart').html(buf);
	},
	getStat: function(baseStat, isHP, level, iv, ev, natureMult) {
		if (isHP) {
			if (baseStat === 1) return 1;
			return Math.floor(Math.floor(2*baseStat+(iv||0)+Math.floor((ev||0)/4)+100)*level / 100 + 10);
		}
		var val = Math.floor(Math.floor(2*baseStat+(iv||0)+Math.floor((ev||0)/4))*level / 100 + 5);
		if (natureMult && !isHP) val *= natureMult;
		return Math.floor(val);
	}
});
