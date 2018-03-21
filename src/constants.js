import { observable } from 'mobx';

module.exports = window.constants = observable({
  GAME_ROOT: document.querySelector('#root'),
  USER_SPEED: 0.10,
  CHUNK_SIZE: 16,
  RENDER_DISTANCE: 6,
  UNRENDER_OFFSET: 2,
  RENDER_TIMEOUT: 500,
  UNRENDER_TIMEOUT: 5,
});
