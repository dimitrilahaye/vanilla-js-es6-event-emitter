Vanilla-JS ES6 Event Emitter
=====
A Vanilla-JS ES6 event emitter that triggers standard events, but also unique events, events that trigger when we decide it or the number of times we want it !

## Initialize the Event Emitter
```HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	
</head>
<body>

<script type="text/javascript" src="../lib/EventEmitter.js"></script>
<script type="text/javascript" src="../lib/EventEmitter_singleton.js"></script>

<script type="text/javascript">
	// You can access to the unique instance of the EventEmitter with const {Bus}
	Bus.on('on_event', this, () => {
		console.log('emitting on_event');
	});
	Bus.emit('on_event');
</script>
```

## Standard event
Will be launched each time it is emitted
```js
	// register the on_event
	Bus.on('on_event', this, () => {
		console.log('emitting on_event');
	});

	// call the on_event many times
	Bus.emit('on_event');

	/*
		>> will log:
		'emitting on_event'
	*/
```

## Unique event
Will be launched just the first time it is emitted, not after 
```js
	// register the once_event
	Bus.once('once_event', this, () => {
		console.log('emitting once_event');
	});

	// call the once_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		Bus.emit('once_event');	
	}

	/*
		>> will log:
		'0'
		'emitting once_event'
		'1'
		'2'
		'3'
		'4'
		'5'
		'6'
		'7'
		'8'
		'9'
	*/
```

## event loop
Will be launched the number of time it is asked, whatever the number of emits
```js
	// register the to_event
	Bus.to('to_event', this, () => {
		console.log('emitting to_event');
	}, 5);

	// call the to_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		Bus.emit('to_event');	
	}

	/*
		>> will log: 
		'0'
		'emitting to_event'
		'1'
		'emitting to_event'
		'2'
		'emitting to_event'
		'3'
		'emitting to_event'
		'4'
		'emitting to_event'
		'5'
		'6'
		'7'
		'8'
		'9'
	*/
```

## localized event
Will be launched after n emits, n being the given number
```js
	// register the at_event
	Bus.at('at_event', this, () => {
		console.log('emitting at_event');
	}, 5);

	// call the at_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		Bus.emit('at_event');	
	}

	/*
		>> will log: 
		'0'
		'1'
		'2'
		'3'
		'4'
		'emitting at_event'
		'5'
		'emitting at_event'
		'6'
		'emitting at_event'
		'7'
		'emitting at_event'
		'8'
		'emitting at_event'
		'9'
		'emitting at_event'
	*/
```

## unique localized event
Will be launched only once after n emits, n being the given number
```js
	// register the there_event
	Bus.there('there_event', this, () => {
		console.log('emitting there_event');
	}, 5);

	// call the there_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		Bus.emit('there_event');	
	}

	/*
		>> will log:
		'0'
		'1'
		'2'
		'3'
		'4'
		'emitting there_event'
		'5'
		'6'
		'7'
		'8'
		'9'
	*/
```

## Unregister an event
```js
	// register the on_event
	Bus.on('on_event', this, () => {
		console.log('emitting on_event');
	});

	// call the on_event many times
	Bus.emit('on_event');
	console.log('............');
	Bus.emit('on_event');
	Bus.off('on_event', this);
	Bus.emit('on_event');

	/*
		>> will log:
		'emitting on_event'
		'............'
		'emitting on_event'
		>> third one has not been emitted because it has been desactivated with off method
	*/
```
