// alert("Hello World!");

// console.log("Hello World!");
// console.dir("Hello Dir");
// console.warn("I am a warn");
// console.error("I am an error");
var n = 3;
var s = "Stoyan";
var b = false;
var undef = undefined;
var nu = null;

console.log(n);
console.log(s);
console.log(b);
console.log(undef);
console.log(nu);

console.log(typeof n);
console.log(typeof s);
console.log(typeof b);
console.log(typeof undef);
console.log(typeof nu);

console.log(typeof n);
console.log(typeof s);
console.log(typeof b);
console.log(typeof undef);
console.log(typeof nu);

var N = new Number(3);
var S = new String("Stoyan");
var B = new Boolean(false);
var Un = new Object(undef);

console.log(typeof N); // Object
console.log(typeof S);
console.log(typeof B);
console.log(typeof Un);


console.log(typeof String(n));
console.log(typeof Number(s));
console.log(typeof Boolean(s));


console.log(typeof (n + ""));
console.log(typeof +s);
console.log(typeof !!s);

console.warn("Warning!!");
console.log(typeof N.toString());
console.log(typeof S.valueOf()); // N.valueOf()
console.log(typeof !!S);

console.log((n == N));
console.log((n === N));

var o = {};

if (o) {
	console.log("I am true");
}

// undefined, null, 0, -0, ""

var o1 = {a: 1, b: 2};

var temp = o || o1;

// 1) Literal
console.log(temp);

var person1 = {};
person1.name = "Stoyan";
person1.age = 50;

var person2 = {name: "Ivan", age: 20};

var person3 = {};
person3["name"] = "Petko";
person3['age'] = 15;

// 2) with new
var personWithNew = new Object();
personWithNew.name = "Stoyan created with new";
personWithNew.age = 50;


// 3) ES5 with a special method (static)
var stoyan = Object.create({name: "Nikola", age: 45});

stoyan.name = "Stoyan";

delete stoyan.name;
delete stoyan.name;

console.warn("Nikola Stoyan");
console.log(stoyan.name);

var o3 = {};
// var o4 = {};

var o4 = o3;

console.log(o3 == o4);

var noprotot = Object.create(null);

var standardProto = Object.create({}); // Object.prototype

console.log(Object.prototype.isPrototypeOf(standardProto));

standardProto["name"] = "Pesho";

console.dir(standardProto);

Object.prototype = 0;


var o5 = {x : 1, y : 2};

console.log("x" in o5);
console.log(o5.x !== undefined);
console.log(o5.hasOwnProperty("x"));
console.log(o5.propertyIsEnumerable("x"));

for (var i in o5) {
	console.log(o5[i]);
}

var o6 = {
	get name() {return "Stoyan";},
	set name(value) {var name = value;}
};

console.log(o6.name);
console.log(o6.propertyIsEnumerable("name"));

o6.z = 56;

Object.defineProperty(o6, "z", {
	value: 56,
	writable: true,
	enumerable: true,
	configurable: true
});

delete o6.z;

console.log(o6);
console.log(Object.getOwnPropertyDescriptor(o6, "z"));

console.log(Object.getOwnPropertyDescriptor({a:1}, "a"));

var o7 = {};

Object.defineProperty(o7, "z", {
	get: function() {return "Stoyan"; },
	// set: function(value) {var name = value; },
	enumerable: false,
	configurable: true
});

console.log(o7);

console.log(Object.getPrototypeOf(o7) === Object.prototype);

Object.preventExtensions(o7);

o7.a = 1;
console.log(o7);

console.log(Object.isExtensible(o7));

console.log("a" in o7);

console.log(o7.constructor);
console.log(o7.toString());
console.log(o7.toLocaleString());
console.log(o7.valueOf());
console.log(o7.hasOwnProperty("z"));
console.log(o7.propertyIsEnumerable("z"));
console.log(Object.prototype.isPrototypeOf(o7));

// 1) literal
var myArray = [];

var myArray2 = new Array();


myArray[1] = 45;
myArray[2] = "second";
myArray[3] = 3;

myArray.length = 2;

for (var i = 0; i < myArray.length; i++ ) {
	console.log(myArray[i]);
}

var arrayLike = {};

arrayLike[1] = 1;
arrayLike[2] = 1;
arrayLike[3] = 1;


