import { observable } from 'mobx';

module.exports = window.constants = observable({
  GAME_ROOT: document.querySelector('#root'),
  USER_SPEED: 0.15,
  CHUNK_SIZE: 2,
  RENDER_DISTANCE: 4,
  UNRENDER_OFFSET: 2,
  RENDER_TIMEOUT: 100,
  UNRENDER_TIMEOUT: 14,
})
