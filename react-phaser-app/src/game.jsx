import React, { Component } from 'react';
import Phaser from 'phaser'
import tileSet from './assets/tuxmon-sample.png'
import tileJson from './assets/testmaprealnum2.json'
import dude from './assets/dude.png'
import logToConsole from './testFunctions'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';


class Game extends Component {
    state = {
        user: '',
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
                    debug: true
                },
            },
            parent: 'game-container',
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            },
            plugins: {
                scene: [{
                    key: 'rexUI',
                    plugin: UIPlugin,
                    mapping: 'rexUI'
                }]
            }
        })
        this.player = null;
        this.cursors = null;
    }
    
    userDisplay = () => {
        console.log('bruv')

        return `${this.state.name}`
    }

    render() {
        return ( 
        <div className='game-container'>
            <h1> hi </h1> 
            <h2> { this.props.name } </h2> 
        </div>
        );
    }

    preload() {
        this.load.image('tiles', tileSet);
        this.load.tilemapTiledJSON('map', tileJson);
        this.load.spritesheet('dude', 'https://i.imgur.com/L1cGcT6.png', { frameWidth: 32, frameHeight: 48 })
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }

    create() {
        const map = this.make.tilemap({
            key: 'map',
        });
        const tileset = map.addTilesetImage('test', 'tiles');
        const tileLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        let overlapping = false;
        let dialog = undefined;

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

        this.createDialog = (scene, x, y, onClick) => {
            let dialog = scene.rexUI.add.dialog({
                x: x,
                y: y,
                background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xf57f17),
                title: scene.rexUI.add.label({
                    background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xbc5100),
                    text: scene.add.text(0, 0, 'Can you help me?', { fontSize: '20px' })
                }),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                },
                actions: [
                    scene.rexUI.add.label({
                        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
                        text: scene.add.text(0, 0, 'OK', {
                            fontSize: '18px'
                        }),
                    }),
                    
                    scene.rexUI.add.label({
                    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
                    text: scene.add.text(0, 0, 'NOT OK', {
                        fontSize: '18px'
                    }),
                })
            ],
            actionsAlign: 'left',
            space: {
                title: 20,
                action: 10,

                left: 15,
                right: 15,
                top: 10,
                bottom: 10,
            }
        })
        .layout().pushIntoBounds().popUp(500)
        return dialog;
    }
    
        this.zone = this.add.zone(200, 200).setSize(100, 100)
        this.physics.world.enable(this.zone)

        this.player.on('overlapstart', function() {
            this.body.debugBodyColor = 0XFF3300
            overlapping = true;
            console.log('overlap start')
            console.time('overlap')
        })

        this.player.on('overlapend', function() {
            this.body.debugBodyColor = 0X00FF33
            overlapping = false;
            console.log('overlap end')
            console.timeEnd('overlap')
        })

        this.physics.add.overlap(this.player, this.zone)

        this.interact = (space) => {
            if (overlapping && dialog === undefined) {
                dialog = this.createDialog(this, 200, 200)
                console.log("popup")
            } else if (dialog !== undefined) {
                dialog.scaleDownDestroy(100);
                dialog = undefined;
                console.log("popdown")
            }
        }

        this.input.on('pointerdown', function (pointer) {
            if (dialog.isInTouching(pointer)) {
                dialog.scaleDownDestroy(100);
                dialog = undefined;
            }
        });
    }

    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (this.cursors.space.isDown) {
            this.interact();
        }
        if (this.player.body.embedded) {
            this.player.body.touching.none = false
        }
        let touching = !this.player.body.touching.none
        let wasTouching = !this.player.body.wasTouching.none

        if (touching && !wasTouching) {
            this.player.emit('overlapstart')
        } else if (!touching && wasTouching) {
            this.player.emit('overlapend')
        }
    }
}

export default Game;