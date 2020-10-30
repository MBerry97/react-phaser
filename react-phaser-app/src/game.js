import React, { Component } from 'react';
import Phaser from 'phaser'
import tileSet from './assets/tuxmon-sample.png'
import tileJson from './assets/testmaprealnum2.json'
import dude from './assets/dude.png'

class Game extends Component {
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
  this.player = ''

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
 
  
  this.player = this.physics.add.sprite(50, 225, 'dude');

  this.cursors = this.input.keyboard.createCursorKeys();
}

update (time, delta) {

}

}

export default Game;