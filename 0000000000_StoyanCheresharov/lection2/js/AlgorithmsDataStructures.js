// "use strict";

var number = 5;
var string = "Stoyan";
var strint5 = new String("Stoyan");
var bool = true;
var stoyan = { name: "Stoyan", age: 50};
var primes = [2, 3, 5, 7];
function MyFunction(){};
string  = {};
var myObject2 = {a: 4, b: 5};
var hex = 0xA;
var oct = 010;
var t = 1.4E+10;
// - + * / %
var then = new Date(2014, 11, 1); 
var string2 = "dsda \
sdfsdf \
sdsadas";

var string3 = "dsadas\tdasda";
var string4 = "Stoyan " + "Cheresharov";

var text = "testing: 1, 2, 3"; // Sample text
var pattern = /\d+/g // Matches all instances of one or more digits

var a = 4;

var global = this;

var myName = '';

string4.charAt = function(){};

console.log(typeof number);
console.log(typeof string);
console.log(typeof bool);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof stoyan);
console.log(stoyan.name);
console.log(stoyan["name"]);
console.log(typeof primes);
console.log(primes.length);
console.log(typeof MyFunction);
console.log(hex);
console.log(oct);
console.log(t);
console.log(hex/oct);
console.log(Math.random());
console.log(12/0 === Infinity);
console.log(then);
console.log(string2);
console.log(string3);
console.log(string4.length);
console.log(string4.charAt(0));
console.log(string4[0]);
console.log(text.match(pattern));
console.log( a == 4 );
console.log(global);
console.log("" === 0);
console.log(0 == false);
console.log(Number(string4)); // +number

console.log(typeof String(number));
console.log(Boolean(string4));
console.log(Boolean(''));
console.log( string4 + number);
console.log(typeof myObject2.valueOf());

var scope = "global scope"; // A global variable
function checkscope() {
	 // A local variable
	var scope = "local scope";
	
	console.log(scope);	
}
console.log(checkscope()); // => "nested scope"

3;
scope;

var myObject10 = {a: 2, b: 3};
var myArray10 = ["first", "second", "tird"];
var square = function(x) { return x * x; };
square(2);
delete myObject10.a;

console.log('a' in myObject10);

delete myArray10[1];

console.log(myArray10[1]);

console.log(myArray10.length);
console.log(1 + "Stoyan");

var forShift  = -120;
console.log(forShift >> 2);
console.log(forShift >>> 2); 
console.log(forShift << 2);

console.log({} instanceof Object);

console.log(0 === Number("0"));

var test = {a:1} && 0;

console.log(!!({a:1} && 0));

console.log(test);

var test1 = null;
var test2 = undefined;

// var result;
var result = test1 || test2;
// if (test1) result = test1;
// if (test2) result = test2;

console.log(result);
// !(p && q) === !p || !q
// !(p || q) === !p && !q

// eval("alert('Hello World')");
{
x = Math.PI;
cx = Math.cos(x);
console.log("cos(?) = " + cx);
}

var n = 1;

if (n == 1) {
// Execute code block #1
}
else if (n == 2) {
// Execute code block #2
}
else if (n == 3) {
// Execute code block #3
}
else {
// If all else fails, execute block #4
}

switch(n) {
case 1: // Start here if n == 1
// Execute code block #1.
break;
// Stop here
case 2: // Start here if n == 2
// Execute code block #2.
break; // Stop here
case 3: // Start here if n == 3
// Execute code block #3.
break; // Stop here
default: // If all else fails...
// Execute code block #4.
break; // stop here
}

var count = 0;
var limit = 10;
while ( count < limit ) {
	console.log(count);
	count++;
}

count = 10;

do {
	console.log("do while", count);
	count++;
} while (count < limit);


for(var count = 0; count < 10; count++) {
	console.log(count);
}

var o = {x:1, y:2, z:3};
var a = [], i = 0;
for(a[i++] in o) /* empty */;

console.log(a[0]);
