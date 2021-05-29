setTimeout(() => {
	console.log('time-01');
	new Promise((resolve, reject) => {
  		console.log('Promise');
  		resolve();
	}).then(() => {
		console.log('Promise-then');
	})
}) 

setTimeout(() => {
	console.log('time-02');
	new Promise((resolve, reject) => {
  		console.log('Promise2');
  		resolve();
	}).then(() => {
		console.log('Promise-then2');
	})
}) 