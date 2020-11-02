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
    width: 950,
    height: 600,
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
}

// componentDidUpdate(prevProps, prevState) {
//   if(prevState.user !== this.state.user) {
//     this.setState({user: this.props.name})
//   }
// }

userDisplay = () => {
  console.log('bruv')
  
  return `${this.state.name}`
}

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
const map = this.make.tilemap({
    key: 'map',
  });
  const tileset = map.addTilesetImage('test', 'tiles');
  const tileLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
  // this.add.text(50, 225, `${this.props.name}`)
  
  // this.add.image(50, 225, 'dude');

  

  this.player = this.physics.add.sprite(50, 225, 'dude');
  this.anims.create({
    key: 'left',
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
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

 this.cursors = this.input.keyboard.createCursorKeys();
}

update (time, delta) {
 if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
  }
  else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
  }
  else {
    this.player.setVelocityX(0);

    this.player.anims.play('turn');
  }
}



}



export default Game;