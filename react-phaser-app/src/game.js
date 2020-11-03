import React, { Component } from 'react';
import Phaser from 'phaser'
import tileSet from './assets/tuxmon-sample.png'
import tileJson from './assets/testmaprealnum2.json'
import dude from './assets/dude.png'
import logToConsole from './testFunctions'


class Game extends Component {
  state = {
    user : ''
  }

  
  
componentDidMount() {
  this.game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 300,
    height: 400,
    physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    },
  },
    parent: 'game-container',
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  })
  this.player = null;
  this.cursors = null;
  this.camera = null;
  this.controls = null;
}

// componentDidUpdate(prevProps, prevState) {
//   if(prevState.user !== this.state.user) {
//     this.setState({user: this.props.name})
//   }
// }


  render() {
    return (
      <div className='game-container'>
        <h1>hi</h1>
        <h2>{this.props.name}</h2>
      </div>
    );
  }

preload () {
  
this.load.image('tiles', tileSet);
this.load.tilemapTiledJSON('map', tileJson);
this.load.spritesheet('dude', 'https://i.imgur.com/L1cGcT6.png', { frameWidth: 32, frameHeight: 48 })
// this.load.text('user', this.props.name)
//  this.load.image('dude',
//     dude,
//     { frameWidth: 32, frameHeight: 48 }
//   );
}

create () {

  //set up the map
const map = this.make.tilemap({
    key: 'map', tileWidth: 16, tileHeight: 16
  });
  const tileset = map.addTilesetImage('test', 'tiles');
  const tileLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
  tileLayer.setCollisionByProperty({ collides: true });
  // this.add.text(50, 225, `${this.props.name}`)
  
  // this.add.image(50, 225, 'dude');


  //set spawn point for the sprite
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point")
  this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'dude');

  //add collision
  this.physics.add.collider(this.player, tileLayer)


  //animations for the sprite
  this.anims.create({
    key: 'a',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'd',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'w',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
this.anims.create({
    key: 's',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

 this.cursors = this.input.keyboard.createCursorKeys();

 this.cursors = this.input.keyboard.addKeys(
{up:Phaser.Input.Keyboard.KeyCodes.W,
down:Phaser.Input.Keyboard.KeyCodes.S,
left:Phaser.Input.Keyboard.KeyCodes.A,
right:Phaser.Input.Keyboard.KeyCodes.D});


//cmaera follows sprite
 const camera = this.cameras.main;
 camera.startFollow(this.player)

 
  


}

update (time, delta) {
 if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);
    this.player.anims.play('a', true);
  }
  else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);

    this.player.anims.play('d', true);
  } 
  else if(this.cursors.up.isDown) {
    this.player.setVelocityY(-160)
    this.player.anims.play('w', true);

  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(160)
    this.player.anims.play('s', true);
    
  }
  else {
    this.player.setVelocityX(0);
     this.player.setVelocityY(0);
    this.player.anims.play('turn');
  }

  this.player.body.velocity.normalize().scale(90);
  
}



}



export default Game;