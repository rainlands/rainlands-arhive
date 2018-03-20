import { observable } from 'mobx';

module.exports = window.constants = observable({
  GAME_ROOT: document.querySelector('#root'),
  USER_SPEED: 0.3,
  CHUNK_SIZE: 16,
  RENDER_DISTANCE: 2,
  UNRENDER_OFFSET: 1,
  RENDER_TIMEOUT: 0,
  UNRENDER_TIMEOUT: 0,
});
