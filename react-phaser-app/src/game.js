import React, { Component } from 'react';
import Phaser from 'phaser'
import tileSet from './assets/tuxmon-sample.png'
import tileJson from './assets/testmaprealnum2.json'
import dude from './assets/dude.png'
import logToConsole from './testFunctions'

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

}

// componentDidUpdate(prevProps, prevState) {
//   if (prevProps.name !== this.props.user) {
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
const map = this.make.tilemap({
    key: 'map',
  });
  const tileset = map.addTilesetImage('test', 'tiles');
  const tileLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
  // this.add.text(50, 225, `${this.props.name}`)
  
  this.add.image(50, 225, 'dude');

  this.add.text(50,225, logToConsole())
}

update (time, delta) {

}

}

export default Game;