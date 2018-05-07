// TODO
// 合成成功后再检测下一级，再检测下一级，再检测下一级，最后再合成。

cc.Class({
	extends: cc.Component,

	properties: {
		town_prefab: {
			default: [],
			type: cc.Prefab,
		},
	},

	init: function () {
		// 初始化
		this.clearList = [];

		// 触摸 tile
		this.node.on(cc.Node.EventType.TOUCH_START, function(){
			// 判断是空地
			if(!this.node.placed){
				// 随机放置种类
				// randomKind
				// randomLevel
				let randomLevel = 1;
				// 添加 tile 属性
				this.town = cc.instantiate(this.town_prefab[randomLevel-1]);
				this.node.level = randomLevel;
				this.cur_level = this.node.level;
				this.cur_row = parseInt(this.node.name.split('-')[0]);
				this.cur_col = parseInt(this.node.name.split('-')[1]);
				// 检测周围 tile
				this.testTile(this.cur_row, this.cur_col);
				// 检测合成数量 if >= 2 合成成功
				if(this.clearList.length>=2){
					// 重置 tile 状态
					let levelUp = 1;
					for(i in this.clearList){
						this.clearList[i].children[0].destroy();
						this.clearList[i].placed = false;
						this.clearList[i].level = undefined;
					}
					// 进行合成
					this.nextLevel = this.cur_level + levelUp;
					this.node.addChild(cc.instantiate(this.town_prefab[this.nextLevel-1]));
					this.node.level = this.nextLevel;
				}
				// 检测合成数量 else 合成失败
				else{
					this.node.addChild(this.town);
				}
				// 放置结束
				this.node.placed = true;
				this.clearList = [];
				// console.log(this.node);
			}else{
				// console.log(this.node);
			}
		}.bind(this));
	},

	testTile: function (target_row, target_col, test1Dir, testLevel) {
		let up = target_row - 1;
		if(up>=1 && test1Dir!='down'){
			// 获取点击上边节点↑↑↑
			this.upNode = this.node.parent.getChildByName(up+'-'+target_col);
			testLevel = this.upNode.level;
			// 确认town等级
			if(this.cur_level == this.upNode.level){
				this.clearList.push(this.upNode);
				this.testTile(up, target_col, 'up', testLevel);
			}
		}
		let right = target_col + 1;
		if(right<=6 &&  test1Dir!='left'){
			// 获取点击右边节点→→→
			this.rightNode = this.node.parent.getChildByName(target_row+'-'+right);
			testLevel = this.rightNode.level;
			if(this.cur_level == this.rightNode.level){
				this.clearList.push(this.rightNode);
				this.testTile(target_row, right, 'right', testLevel);
			}
		}
		let down = target_row + 1;
		if(down<=6 &&  test1Dir!='up'){
			// 获取点击下边节点↓↓↓
			this.downNode = this.node.parent.getChildByName(down+'-'+target_col);
			testLevel = this.downNode.level;
			if(this.cur_level == this.downNode.level){
				this.clearList.push(this.downNode);
				this.testTile(down, target_col, 'down', testLevel);
			}
		}
		let left = target_col - 1;
		if(left>=1 &&  test1Dir!='right'){
			// 获取点击左边节点←←←
			this.leftNode = this.node.parent.getChildByName(target_row+'-'+left);
			testLevel = this.leftNode.level;
			if(this.cur_level == this.leftNode.level){
				this.clearList.push(this.leftNode);
				this.testTile(target_row, left, 'left', testLevel);
			}
		}
	},
});
