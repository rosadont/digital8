window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // load sprites and backgrounds
        game.load.image('sky', 'assets/sky.bmp');
        game.load.spritesheet('player', 'assets/ninja.png', 489, 489);
        game.load.image('potion', 'assets/potion.png');
        game.load.image('menu', 'assets/menu.png');
        game.load.image('back', 'assets/background.png');
        game.load.image('spike', 'assets/car.png');
        game.load.image('ball', 'assets/ball.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('coin', 'assets/coin.png');
		game.load.spritesheet('enemy', 'assets/enemy.png');

        // music files
        game.load.audio('titleMusic', 'assets/titleMusic.mp3');
        game.load.audio('bgMusic', 'assets/bgMusic.mp3');
        game.load.audio('runSFX', 'assets/runSFX.mp3');
        game.load.audio('slideSFX', 'assets/slideSFX.mp3');
        game.load.audio('jumpSFX', 'assets/jumpSFX.mp3');
        game.load.audio('dieSFX', 'assets/dieSFX.mp3');
        game.load.audio('winSFX', 'assets/winSFX.mp3');
    }
    // create variables
    var bg;
    var player;
    var keys;
	var enemy;
	var enemy2;
    var jump;
    var jumpTimer = 0;
    var facingLeft = false;
    var potion;
    var menu;
    var back;
    var platforms;
    var plat;
    var spikes;
    var car;
    var balls;
    var ball;
	var coins;
	var coin;
    var collidePlat;
    var collideBall = false;
    var collideSpike;
    var dead = false;
    var text;
	var score = 0;
	var scoreText;
    var style;
    var style2;
    var i = 2000;
    var win;
    var titleMusic;
    var bgMusic;
    var runSFX;
    var slideSFX;
    var jumpSFX;
    var dieSFX;
    var winSFX;
    var gameStart = true;
    var hitbox;
    var killCount;
    var counter;
    var playerHeight;
	var enemy;
	var enemy2;
	var enemies;
	var enemies2;
    
    function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
    		// in the beginning to display controls
        jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        jump.onDown.add(exitMenu, this);
    		// add sounds and music
    		titleMusic = game.add.audio('titleMusic', 0.15, true);
    		bgMusic = game.add.audio('bgMusic', 0.15, true);
    		runSFX = game.add.audio('runSFX', 0.3);
    		slideSFX = game.add.audio('slideSFX', 0.03);
    		jumpSFX = game.add.audio('jumpSFX', 0.5);
    		dieSFX = game.add.audio('dieSFX');
    		winSFX = game.add.audio('winSFX');
    		slideSFX.allowMultiple = true;
        titleMusic.play();
        // add sprites and turn on the arcade physics engine for this sprite.
        bg = game.add.tileSprite(0, 0, 30000, 1600, 'sky');
        back = game.add.tileSprite(0, 0, 30000, 1600, 'back');
        player = game.add.sprite(15, 1000, 'player');
        player.scale.setTo(0.2, 0.2);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(player);
        hitbox = player.body.width * 0.1;
        playerHeight = player.body.height * 0.95;
        game.world.sendToBack(bg);
        potion = game.add.sprite(29800, 1330, 'potion');
        potion.scale.setTo(0.4, 0.4);
        game.physics.arcade.enable(potion);
        
        // add platforms and obstacles
        platforms = game.add.group();
        cars = game.add.group();
        balls = game.add.group();
		coins = game.add.group();
		enemies = game.add.group();
		enemies2 = game.add.group();
        platforms.enableBody = true;
        cars.enableBody = true;
        balls.enableBody = true;
        coins.enableBody = true;
        enemies.enableBody = true;
        enemies2.enableBody = true;
        // potion's platform
        plat = platforms.create(29700, 1370, 'platform');
        plat.scale.setTo(2, 1);
        plat.body.immovable = true;
        
        // base platforms, balls, cars
        var j = 300;
        var k = 800;
        var n, m;
        // platform set 2
        		plat = platforms.create(i, 1200, 'platform');
        		plat.scale.setTo(10, .5);
        		plat.body.immovable = true;
        		ball = balls.create(i + j, 1050, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		ball = balls.create(i + k, 1070, 'ball');
        		ball.scale.setTo(.5, .5);
        		ball.body.immovable = true;
/*         		ball = balls.create(i + k + 50, 1070, 'ball');
        		ball.scale.setTo(.5, .5);
        		ball.body.immovable = true;   */      		
				ball = balls.create(i + k + 100, 1070, 'ball');
        		ball.scale.setTo(.5, .5);
        		ball.body.immovable = true;
				coin = coins.create(i + j + 300, 1150, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;	
				coin = coins.create(i + k + 300, 1150, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + k + 450, 1150, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + k + 600, 1150, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
        i = 0, j = 600, k = 1200;
        while (i < 30000) { // platform set 1
        		plat = platforms.create(i, 1400, 'platform');
        		plat.scale.setTo(16, .5);
        		plat.body.immovable = true;
        		car = cars.create(i + k, 1350, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		car = cars.create(i + j + 80, 1350, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
				coin = coins.create(i + j - 50, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;					
				coin = coins.create(i + j - 200, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;					
				coin = coins.create(i + j - 350, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;	
				coin = coins.create(i + j + 300, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + k + 300, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + j + 450, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + k + 450, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + k + 600, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + k + 750, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
				coin = coins.create(i + k + 900, 1336, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
        		n = j;
        		j = k;
        		k = n;
        		i += 4500;
        } i = 3900, j = 600, k = 1100;
        while (i < 27600) { // platform set 3
        		plat = platforms.create(i, 1000, 'platform');
        		plat.scale.setTo(16.5, .5);
        		plat.body.immovable = true;
        		i += 3100;
        } i = 3900, j = 600, k = 1170, m = 1670;
        while (i < 27600) { // platform set 3 rotation 1 (2 balls, 1 car)
        		ball = balls.create(i + j, 850, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		ball = balls.create(i + j + 10, 800, 'ball');
        		ball.scale.setTo(.5, .5);
        		ball.body.immovable = true;        		
				coin = coins.create(i + j + 200, 950, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;				
				coin = coins.create(i + j + 350, 950, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
        		ball = balls.create(i + j + 10, 750, 'ball');
        		ball.scale.setTo(.5, .5);
        		ball.body.immovable = true;
        		car = cars.create(i + k, 950, 'car');
        		car.scale.setTo(.5, .5);
         		car.body.immovable = true;
				coin = coins.create(i + k + 350, 950, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true
        		ball = balls.create(i + m + 100, 870, 'ball');
        		ball.scale.setTo(.5, .5);
        		ball.body.immovable = true;
				coin = coins.create(i + j + 250, 870, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
				coin = coins.create(i + j + 500, 870, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
				coin = coins.create(i + j + 750, 870, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
				coin = coins.create(i + m + 250, 950, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
				coin = coins.create(i + m + 500, 870, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
				coin = coins.create(i + m + 750, 950, 'coin');
        		coin.scale.setTo(.5, .5);
        		coin.body.immovable = true;
        		n = j;
        		j = k;
        		k = m;
        		m = n;
        		i += 6200;
        } i = 7000, j = 600, k = 1150, m = 1650;
        while (i < 27600) { // platform set 3 rotation 2 (1 ball, 2 cars)
        		ball = balls.create(i + j, 850, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		car = cars.create(i + k, 936, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		car = cars.create(i + k + 40, 936, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		n = m;
        		m = k;
        		k = j;
        		j = n;
        		i += 6200;
        } i = 3250;
        // staircase up
        j = 0;
        while (i > 0) {
        		plat = platforms.create(i, 800 - j, 'platform');
        		plat.scale.setTo(2, .7);
        		plat.body.immovable = true;
        		i -= 650;
        		j += 50;
        } // extra plat
        plat = platforms.create(20, 400, 'platform');
        plat.scale.setTo(2, .7);
        plat.body.immovable = true;
        i = 700, j = 0, k = 0;
        // large plats, balls, and cars
        while (i < 28950) {
        		plat = platforms.create(i, 350, 'platform');
        		plat.scale.setTo(32.5, .5);
        		plat.body.immovable = true;
        		i += 5650
        } // top platform rotation 1 (mirrors plat 3 rotation 2)
        i = 700, j = 1200, k = 2200, m = 3200;
        while (i < 28950) {
        		ball = balls.create(i + j, 200, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		ball = balls.create(i + j+70, 200, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		car = cars.create(i + k, 286, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		car = cars.create(i + k + 40, 286, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		car = cars.create(i + m+80, 286, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		n = m;
        		m = k;
        		k = j;
        		j = n;
        		i += 11300;
        } // top platform rotation 2 (2 balls, 1 car)
        i = 6800, j = 1200, k = 2200, m = 3200;
        while (i < 28950) {
        		ball = balls.create(i + j, 200, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		ball = balls.create(i + j, 136, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		car = cars.create(i + k, 286, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		car = cars.create(i + k + 40, 286, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		car = cars.create(i + k + 120, 286, 'car');
        		car.scale.setTo(.5, .5);
        		car.body.immovable = true;
        		ball = balls.create(i + m, 200, 'ball');
        		ball.scale.setTo(.7, .7);
        		ball.body.immovable = true;
        		n = k;
        		k = m;
        		m = j;
        		j = n;
        		i += 11300;
        }
        // add animations
        j = 10;
        var arrayJump = [], arrayRun = [], arraySlide = [], arrayIdle = [], arrayDie = [];
        while(j < 40) {
        		if(j < 20)
        				arrayDie.push(j);
        		else if(j < 30)
        				arrayIdle.push(j);
        		else
        				arrayJump.push(j);
        		j++;
        }
        j = 60;
        while(j < 80) {
        		if(j < 70)
        				arrayRun.push(j);
        		else
        				arraySlide.push(j);
        		j++;
        }  
        player.animations.add('idle', arrayIdle, 20, true);
        player.animations.add('jump', arrayJump, 15, true);
        player.animations.add('run', arrayRun, 20, true);
        player.animations.add('slide', arraySlide, 20, true);
        player.animations.add('die', arrayDie);
        player.anchor.setTo(.5, .5);
        // set world bounds
        game.world.setBounds(0, 0, 30000, 1600);
        player.body.collideWorldBounds = true;
        // death state text
    		style = { font: "25px Verdana", fill: "#ff0000", align: "center" };
    		style2 = { font: "25px Verdana", fill: "#ffff00", align: "center" };
    		var style3 = {font: "25px Verdana", fill: "#ffffff", align: "top" };
    		text = game.add.text(200, 200, "", style);
    		text.fixedToCamera = true;
    		killCount = game.add.text(game.camera.x + 20, game.camera.y + 20, "Retries: 0 ", style3);
    		counter = 0;
    		killCount.fixedToCamera = true;
        menu = game.add.sprite(0, 0, 'menu');
    		
        i = 0;
		
	enemy = game.add.sprite(0, 0, 'enemy');
	enemy.scale.setTo(0.2, 0.2);
	enemy2 = game.add.sprite(200, 200, 'enemy');
	enemy2.scale.setTo(0.2, 0.2);
	game.physics.arcade.enable(enemy);
	game.physics.arcade.enable(enemy2);
	enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;
	enemy2.body.bounce.y = 0.2;
    enemy2.body.gravity.y = 300;
    enemy2.body.collideWorldBounds = true;
}
	
	
	function exitMenu() {
				if(gameStart) {
						player.body.gravity.y = 3200;
						keys = game.input.keyboard.createCursorKeys();
						menu.destroy();
						titleMusic.stop();
						bgMusic.play();
						game.camera.follow(player);
						gameStart = false;
				}
	}
    
	function update() {
				// hitbox correction
				player.body.width = hitbox;
				player.body.height = playerHeight;
		// collision
				collidePlat = game.physics.arcade.collide(player, platforms);
				collideSpike = game.physics.arcade.overlap(player, cars);
				var collideCoin = game.physics.arcade.overlap(player, coins, collect);
				win = game.physics.arcade.overlap(player, potion);
				if(collidePlat && keys.down.isDown && !(keys.left.isDown || keys.right.isDown) && player.body.velocity.x != 0)
						collideBall = false;
				else
						collideBall = game.physics.arcade.overlap(player, balls);
		// win
		if(win){
				text.setStyle(style2);
				text.setText("YOU WIN\nYou've caught Memory.");
				bgMusic.stop();
				winSFX.play('', 0, 0.2, false, false);
		}
		// death state
		if(player.body.onFloor() || collideSpike || collideBall || dead) {
				if(!dead)
						dieSFX.play('', 0, 0.2, false, false);
				dead = true;
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			back.stopScroll();
			bg.stopScroll();
			text.setText("YOU DIED\nPress the up arrow key to restart.");
				player.animations.play('die', 20, false, true);
		}
		// controls
		else if (!player.body.onFloor() && !collidePlat) { // if the player is not on the ground
				player.animations.play('jump');
		}
		else if (keys.left.isDown)
		{
				if(!facingLeft) { // if the player is not facing left 
						player.scale.x *= -1; // flip the sprite
						facingLeft = true;
				}
				if (player.body.velocity.x > -700)
						player.body.velocity.x += -50;
			player.animations.play('run');
				runSFX.play('', 0, 0.15, false, false);
			back.autoScroll(5, 0);
			bg.autoScroll(150, 0);
		}
		else if (keys.right.isDown)
		{
				if(facingLeft) {
						player.scale.x *= -1;
						facingLeft = false;
				}
				if (player.body.velocity.x < 700)
						player.body.velocity.x += 50;
			player.animations.play('run');
				runSFX.play('', 0, 0.15, false, false);
			back.autoScroll(-5, 0); 
			bg.autoScroll(-150, 0);
		}
		else if (keys.down.isDown && player.body.velocity.x != 0) { // sliding physics
				if(player.body.velocity.x > 0)
						player.body.velocity.x -= 10;
				else
						player.body.velocity.x += 10
				player.animations.play('slide');
				slideSFX.play('', 0.5, 0.04, false, false);
		}
		else
		{
			player.body.velocity.x = 0;
			back.stopScroll();
			bg.stopScroll();
			player.animations.play('idle');
		}
		// jumping
		if (jump.isDown && collidePlat && !dead && game.time.now > jumpTimer)
		{
				titleMusic.stop();
				jumpSFX.play();
			player.body.velocity.y = -1250;
			jumpTimer = game.time.now + 500;
		} 
		// reset
		if(!player.alive && keys.up.isDown) {
				dead = false;
				player.reset(15, 1000);
				text.setText("");
				counter++;
				killCount.setText("Retries: " + counter);
		}
	}
	
	function collect(player, coin) {
		coin.destroy();	
		scoreText = game.add.text(16, 16, "Score: " + score, {fontSize: '32px', fill: '#000' });
		score += 1;
	}
};
