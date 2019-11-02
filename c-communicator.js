class Communicator
{
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Setup

  constructor(server_url, server_port)
  {
    // Connection
    this.connection_open_     = false;
    this.websocket_           = new WebSocket('ws://' + server_url + ':' + server_port);

    // Connection events
    let event_target = this;
    this.websocket_.onopen    = function(e){event_target.onOpen.call(event_target, e);};
    this.websocket_.onmessage = function(e){event_target.onMessage.call(event_target, e);};
    this.websocket_.onclose   = function(e){event_target.onClose.call(event_target, e);};
    this.websocket_.onerror   = function(e){event_target.onError.call(event_target, e);};

    // Message register
    this.register_ = {};
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Handle events

  onOpen(event)
  {
    console.log('DEBUG: WebSocket open');
    console.log(this)
    this.connection_open_ = true;
  }

  onMessage(event)
  {
    console.log('DEBUG: WebSocket message receive');

    // Unpack message
    let message = JSON.parse(event.data);
    let m_type = message.type;

    console.log(message);


    // Create player array if never created before
    if(this.register_[m_type] == undefined)
    {
      this.register_[m_type] = new Set();
    }

    // Give message to registered players
    let event_target = this;
    this.register_[m_type].forEach(
      function(message_target)
      {
        message_target.handleMessage(message);
      }
    );
  }

  onClose(event)
  {
    console.log('DEBUG: WebSocket close');
    // TODO
  }

  onError(event)
  {
    console.log('DEBUG: WebSocket error');
    // TODO
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Methods for receiving

  registerToMessageType(type, message_target)
  {
    // Create player array if never created before
    if(this.register_[type] == undefined)
    {
      this.register_[type] = new Set();
    }

    this.register_[type].add(message_target);
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Methods for sending

  sendMessage(type, destination, content)
  {
    console.log('DEBUG: WebSocket message send');

    let message =
    {
      type: type,
      destination: destination,
      content: content,
      time: Date.now()
    };

    this.websocket_.send(JSON.stringify(message));
  }
}
