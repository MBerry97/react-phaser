import React, { Component } from 'react';
import Phaser from 'phaser'
import tileSet from './assets/tuxmon-sample.png'
import tileJson from './assets/testmaprealnum2.json'

class Game extends Component {
componentDidMount() {
  this.game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 950,
    height: 600,
    parent: 'game-container',
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  })
  this.controls = null;
}

  render() {
    return (
      <div className='game-container'>
        <h1>hi</h1>
      </div>
    );
  }

preload () {
this.load.image('tiles', tileSet);
this.load.tilemapTiledJSON('map', tileJson);
}

create () {
const map = this.make.tilemap({
    key: 'map',
  });

  const tileset = map.addTilesetImage('test', 'tiles');
  const tileLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
 
}

update () {

}

}

export default Game;