class InputHandler
{
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Setup

  constructor(game, left_key = 'ArrowLeft', right_key = 'ArrowRight', start_key = 'Space')
  {
    // Members
    this.left_key_      = left_key;
    this.right_key_     = right_key;
    this.start_key_     = start_key;
    this.left_active_   = false;
    this.right_active_  = false;
    this.game_          = game;
    this.start_pressed_ = false;

    // Event listeners
    let event_target = this;
    document.addEventListener('keydown', function(e){event_target.keyDownHandler.call(event_target, e);});
    document.addEventListener('keyup', function(e){event_target.keyUpHandler.call(event_target, e);});
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Methods for handling keypresses

  keyDownHandler(e)
  {
    if(e.code == this.left_key_)
      this.left_active_ = true;

    else if(e.code == this.right_key_)
      this.right_active_ = true;

    else if(e.code == this.start_key_ && this.start_pressed_ == false)
    {
      this.start_pressed_ = true;
      game.startGame();
    }
  }

  keyUpHandler(e)
  {
    if(e.code == this.left_key_)
      this.left_active_ = false;

    if(e.code == this.right_key_)
      this.right_active_ = false;
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Methods for exporting state of keypresses

  getDirection()
  {
    if(this.left_active_ == true && this.right_active_ == false)
      return 'left';

    if(this.right_active_ == true && this.left_active_ == false)
      return 'right';

    return 'straight';
  }
}
