/* 
Old way using closures and an immediately invoked function expression 
that returns an object that exposes two functions without granting 
direct access to data.

Flaws: Overly verbose, Lacks immutability, since code executed later 
could modify one of the exposed functions, or redefine the variable 
that holds the object.

Source: www.sitepoint.com/javascript-design-patterns-singleton
Date: 2020-04-21
*/
var singleOne = (function() {
    var _data = [];

    function add(item) {
        _data.push(item);
    }

    function get(id) {
	return _data.find((item) => {
	    return item.id === id;
	});
    }

    return {
	add: add,
	get: get
    };
}());


/*
Using ES6 object literals, modules, and const, without using class.
This is more readable, the identifier can't be redefined or
reassigned thanks to const, and methods can't be changed thanks 
to freeze.

Flaws: Good and readable for simple objects, but you might need to
use classes for larger objects so inheritance etc can be used. Also,
an object literal can be copied efen if it itself is const by using
Object.assign.

Source: www.sitepoint.com/javascript-design-patterns-singleton
Date: 2020-04-21
*/
const _data = [];

const singleTwo  = {
    add: item => _data.push(item),
    get: id => _data.find(d => d.id === id)
};

Object.freeze(singleTwo);
module.exports = {singleTwo};  // CommonJS (node) syntax
// export default singleTwo    // EM6 syntax


/*
Using ES6 classes.

Flaws: The constructor of any instance is available and can be invoked
to create new instances.

Source: www.sitepoint.com/javascript-design-patterns-singleton
Date: 2020-04-21
*/
class SingleThree {
    constructor() {
	this._data = [];
    }

    add(item) {
	this._data.push(item);
    }

    get(id) {
	return this._data.find(d => d.id === id);
    }
}

const singleThree = new SingleThree();
Object.freeze(singleThree);

module.exports = {singleThree};  // CommonJS (node) syntax
// export default singleThree    // EM6 syntax


/*
By holding a reference to the instance, we can check whether or not
we've already instantiated a SingleFour, and if we have, we won't 
create a new one.

Source: www.sitepoint.com/javascript-design-patterns-singleton
Date: 2020-04-21
 */
class SingleFour {
    constructor() {
	if (!SingleFour.instance) {
	    this._data = [];
	    SingleFour.instance = this;
	}

	return SingleFour.instance;
    }
    
    add(item) {
	this._data.push(item);
    }

    get(id) {
	return this._data.find(d => d.id === id);
    }

}

const singleFour = new SingleFour();
Object.freeze(singleFour);

module.exports = {singleFour};  // CommonJS (node) syntax
// export default singleFour;   // EM6 syntax
