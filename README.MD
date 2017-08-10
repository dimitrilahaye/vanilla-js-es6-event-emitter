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
	// get the EventEmitter single instance
	const b = Bus.getInstance();

	// work with your event emitter
	// ...
</script>
```

## Standard event
Will be launched each time it is emitted
```java-script
	// register the on_event
	b.on('on_event', this, () => {
		console.log('emitting on_event');
	});

	// call the on_event many times
	b.emit(['on_event']);

	/*
		>> will log:
		'emitting on_event'
	*/
```

## Unique event
Will be launched just the first time it is emitted, not after 
```java-script
	// register the once_event
	b.once('once_event', this, () => {
		console.log('emitting once_event');
	});

	// call the once_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		b.emit(['once_event']);	
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
```java-script
	// register the to_event
	b.to('to_event', this, () => {
		console.log('emitting to_event');
	}, 5);

	// call the to_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		b.emit(['to_event']);	
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
```java-script
	// register the at_event
	b.at('at_event', this, () => {
		console.log('emitting at_event');
	}, 5);

	// call the at_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		b.emit(['at_event']);	
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
```java-script
	// register the there_event
	b.there('there_event', this, () => {
		console.log('emitting there_event');
	}, 5);

	// call the there_event
	for(var i = 0; i < 10; i++){
		console.log(i);
		b.emit(['there_event']);	
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
```java-script
	// register the on_event
	b.on('on_event', this, () => {
		console.log('emitting on_event');
	});

	// call the on_event many times
	b.emit(['on_event']);
	console.log('............');
	b.emit(['on_event']);
	b.off(['on_event'], this);
	b.emit(['on_event']);

	/*
		>> will log:
		'emitting on_event'
		'............'
		'emitting on_event'
		>> third one has not been emitted because it has been desactivated with off method
	*/
```