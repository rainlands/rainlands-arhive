import { observable } from 'mobx';

module.exports = window.constants = observable({
  GAME_ROOT: document.querySelector('#root'),
  USER_SPEED: 0.15,
  CHUNK_SIZE: 16,
  RENDER_DISTANCE: 9,
  UNRENDER_DISTANCE: 11,
  RENDER_TIMEOUT: 100,
  UNRENDER_TIMEOUT: 200,
})
