cc.Class({
	extends: cc.Component,

	properties: {
		tile_prefab: {
			default: [],
			type: cc.Prefab,
		},
	},

	onLoad () {
		for(i = 0;i<36;i++){
			this.creatTile(i);
		}
	},

	creatTile: function (col) {
		let tile = cc.instantiate(this.tile_prefab[0]);
		if(col<6){ var row = '1'; }
		else if(col>=6 && col<12){ row = '2'; }
		else if(col>=12 && col<18){ row = '3'; }
		else if(col>=18 && col<24){ row = '4'; }
		else if(col>=24 && col<30){ row = '5'; }
		else{ row = '6'; }
		tile.name = row+'-'+(col%6+1);
		this.node.addChild(tile, -1);
		tile.getComponent("tile").init(this);
	},

});
