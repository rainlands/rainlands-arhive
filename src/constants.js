import { observable } from 'mobx';

module.exports = window.constants = observable({
  GAME_ROOT: document.querySelector('#root'),
  USER_SPEED: 1,
  CHUNK_SIZE: 16,
  RENDER_DISTANCE: 10,
  UNRENDER_OFFSET: 2,
  RENDER_TIMEOUT: 1,
  UNRENDER_TIMEOUT: 0,
});
