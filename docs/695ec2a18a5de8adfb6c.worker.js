!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=11)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=(t.MAX_RADIUS=50,t.MAX_PARTICLES=1e3);t.MAX_NEIGHBORS=i*i},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=i(r),u=n(3),a=i(u),s=n(6),c=function(e,t){return e+t},l=function(e,t){return e-t},f=function(e,t){return e*t},d=function(e,t){return e/t},p=function(e,t){return function(n){for(var i="number"==typeof n,r=0,o=e.dimensions;r<o;r++){var u=e.getValue(r),a=i?n:n.getValue(r);e.setValue(r,t(u,a))}return e}},v=function(){function e(t){(0,o.default)(this,e),this.add=p(this,c),this.subtract=p(this,l),this.multiply=p(this,f),this.divide=p(this,d),this.values=new Float32Array(t),this.dimensions=this.values.length}return(0,a.default)(e,[{key:"clone",value:function(){var t=new e(this.values);return t.magnitude=this.magnitude,t.magnitudeSq=this.magnitudeSq,t}},{key:"toArray",value:function(){return new Float32Array(this.values)}},{key:"getValue",value:function(e){return this.values[e]}},{key:"setValue",value:function(e,t){return this.values[e]=t,this.unsetCache(),this}},{key:"mutate",value:function(e){for(var t=0,n=this.dimensions;t<n;t++)this.values[t]=e(this.values[t],t);return this.unsetCache(),this}},{key:"randomize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this.mutate(function(){return(0,s.random)(e)})}},{key:"radialRandomize",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=e*e,n=0,i=this.dimensions;n<i;n++){var r=Math.random()*Math.sqrt(t);t-=r*r,this.values[n]=(0,s.coinFlip)()?r:-r}return(0,s.shuffle)(this.values),this}},{key:"getMagnitude",value:function(){return void 0===this.magnitude&&(this.magnitude=Math.sqrt(this.getMagnitudeSq())),this.magnitude}},{key:"getMagnitudeSq",value:function(){if(void 0===this.magnitudeSq){for(var e=0,t=0,n=this.dimensions;t<n;t++)e+=this.values[t]*this.values[t];this.magnitudeSq=e}return this.magnitudeSq}},{key:"setMagnitude",value:function(e){var t=this.getMagnitude();return 0===t?this.add(Math.sqrt(e/this.dimensions)):this.multiply(e/t),this.cacheMagnitude(e),this}},{key:"limitMagnitude",value:function(e){var t=e*e,n=this.getMagnitudeSq();return n>t&&(this.multiply(t/n),this.cacheMagnitude(e)),this}},{key:"cacheMagnitude",value:function(e){this.magnitudeSq=e*e,this.magnitude=e}},{key:"unsetCache",value:function(){this.magnitudeSq=void 0,this.magnitude=void 0}}],[{key:"getAverage",value:function(t){if(0===t.length)throw new Error("Cannot average zero vectors");for(var n=t.length,i=t[0].dimensions,r=new e(i),o=0;o<n;o++)for(var u=0;u<i;u++){var a=r.values[u],s=t[o].values[o];r.values[u]=a+s/n}return r}}]),e}();t.default=v},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";t.__esModule=!0;var i=n(15),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,r.default)(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()},function(e,t,n){e.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.RecentQueue=t.shuffle=t.clamp=t.random=t.coinFlip=void 0;var r=n(2),o=i(r),u=n(3),a=i(u),s=t.coinFlip=function(){return Math.random()<.5};t.random=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=Math.random()*e;return s()?t:-t},t.clamp=function(e,t,n){return Math.max(t,Math.min(n,e))},t.shuffle=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}},t.RecentQueue=function(){function e(t){(0,o.default)(this,e),this.queue=[],this.limit=t}return(0,a.default)(e,[{key:"add",value:function(e){this.queue.unshift(e),this.queue.length>this.limit&&this.queue.pop()}},{key:"values",value:function(){return this.queue}}]),e}()},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n=e.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(e,t,n){var i=n(22),r=n(23),o=n(25),u=Object.defineProperty;t.f=n(4)?Object.defineProperty:function(e,t,n){if(i(e),t=o(t,!0),i(n),r)try{return u(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(0),o=n(12),u=n(31),a=n(38),s=i(a),c=n(39),l=i(c),f=self,d={options:void 0,system:new l.default,prev:{orbits:!1,dimensions:void 0}};f.addEventListener("message",function(e){var t=JSON.parse(e.data);if(t&&t.type)switch(t.type){case"update":d.options=t.options,d.system.setPopulation(d.options.particles,d.options.dimensions),v();break;case"update.tick":v();break;case"destroy":f.close()}});var p=function(){d.options&&f.postMessage({type:"update",response:{dimensions:d.options.dimensions,particles:d.system.particles.map(function(e){return new s.default(e)}),neighborhood:d.system.getNeighborhoodMsg(d.options.neighborhood)}})},v=function(){if(d.options){d.system.particles.forEach(function(e){return e.acceleration.multiply(0)});var e="orbits"===d.options.behavior.name,t=d.options.dimensions,n=d.options.max.speed;e&&(d.prev.orbits||d.system.particles.forEach(function(e){return e.velocity.randomize(n)}),void 0!==d.prev.dimensions&&d.prev.dimensions<t&&d.system.particles.forEach(function(e){h(t,e.position,r.MAX_RADIUS),h(t,e.velocity,n)})),d.prev.orbits=e,d.prev.dimensions=t;var i=d.options.behavior;(0,o.behaviors[i.name])(d.system,i.config),d.system.particles.forEach(function(e){d.options&&(e.velocity.add(e.acceleration),e.velocity.limitMagnitude(d.options.max.speed),e.position.add(e.velocity))});(0,u.boundings[d.options.bounding])(d.system),d.system.recalculate(),p()}},h=function(e,t,n){var i=t.clone();t.radialRandomize(n),t.mutate(function(t,n){return n+1<e?i.getValue(n):t})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.behaviors=void 0;var i=n(13),r=n(14),o=n(27),u=n(28),a=n(29),s=n(30);t.behaviors={wandering:s.wandering,diffusion:i.diffusion,flocking:r.flocking,gravity:o.gravity,orbits:a.orbits,none:u.none}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.diffusion=function(e,t){if(!(e.particles.length<2)){var n=e.particles.length,i=n*n,r=t.charge*t.charge;e.particles.forEach(function(e){var t=e.neighbors[0],n=t.delta,o=t.distance,u=n.clone(),a=o?o*o:1;u.setMagnitude(r/a/i),e.acceleration.add(u)})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.flocking=void 0;var i=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.flocking=function(e,t){e.particles.length<2||e.particles.forEach(function(n){var i=new r.default(n.dimensions),o=!1;if(n.neighbors.forEach(function(n){var u=n.delta,a=n.distance,s=n.index;if(!(a>t.awareness)){var c=e.particles[s],l=u.clone();l.setMagnitude(l.getMagnitude()*t.separation),i.add(l);var f=c.velocity.clone();f.setMagnitude(f.getMagnitude()*t.alignment),i.add(l),o=o?r.default.getAverage([o,c.position]):c.position}}),o){var u=n.position.clone().subtract(o);u.setMagnitude(u.getMagnitude()*t.cohesion),i.add(u)}n.acceleration.add(i)})}},function(e,t,n){e.exports={default:n(16),__esModule:!0}},function(e,t,n){n(17);var i=n(8).Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},function(e,t,n){var i=n(18);i(i.S+i.F*!n(4),"Object",{defineProperty:n(9).f})},function(e,t,n){var i=n(7),r=n(8),o=n(19),u=n(21),a=function(e,t,n){var s,c,l,f=e&a.F,d=e&a.G,p=e&a.S,v=e&a.P,h=e&a.B,g=e&a.W,m=d?r:r[t]||(r[t]={}),y=m.prototype,M=d?i:p?i[t]:(i[t]||{}).prototype;d&&(n=t);for(s in n)(c=!f&&M&&void 0!==M[s])&&s in m||(l=c?M[s]:n[s],m[s]=d&&"function"!=typeof M[s]?n[s]:h&&c?o(l,i):g&&M[s]==l?function(e){var t=function(t,n,i){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,i)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(l):v&&"function"==typeof l?o(Function.call,l):l,v&&((m.virtual||(m.virtual={}))[s]=l,e&a.R&&y&&!y[s]&&u(y,s,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,e.exports=a},function(e,t,n){var i=n(20);e.exports=function(e,t,n){if(i(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,i){return e.call(t,n,i)};case 3:return function(n,i,r){return e.call(t,n,i,r)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var i=n(9),r=n(26);e.exports=n(4)?function(e,t,n){return i.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var i=n(5);e.exports=function(e){if(!i(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){e.exports=!n(4)&&!n(10)(function(){return 7!=Object.defineProperty(n(24)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var i=n(5),r=n(7).document,o=i(r)&&i(r.createElement);e.exports=function(e){return o?r.createElement(e):{}}},function(e,t,n){var i=n(5);e.exports=function(e,t){if(!i(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!i(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.gravity=void 0;var i=n(6);t.gravity=function(e,t){if(!(e.particles.length<2)){var n=e.particles.length,r=n*n,o=t.mass*t.mass;e.particles.forEach(function(e){var n=e.neighbors[0],u=n.delta,a=n.distance,s=u.clone(),c=(0,i.clamp)(a,10,100),l=c*c;s.setMagnitude(t.charge*o/l/r),e.acceleration.add(s)})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.none=function(e,t){e.particles.forEach(function(e){return e.velocity.multiply(0)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.orbits=void 0;var i=n(6);t.orbits=function(e,t){var n=t.distance.min*t.distance.min,r=t.distance.max*t.distance.max,o=t.mass;e.particles.forEach(function(e){var u=e.position.clone().multiply(-1),a=(0,i.clamp)(u.getMagnitudeSq(),n,r),s=o.g*o.attractor*o.orbiter/a;u.setMagnitude(s),u.divide(t.mass.orbiter),e.acceleration.add(u)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.wandering=void 0;var i=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.wandering=function(e,t){e.particles.forEach(function(e){var n=new r.default(e.dimensions);n.randomize(t.jitter),e.acceleration.add(n)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.boundings=void 0;var i=n(32),r=n(33),o=n(34),u=n(35),a=n(36),s=n(37);t.boundings={centering:r.centering,scaling:a.scaling,centerScaling:o.centerScaling,binding:i.binding,wrapping:s.wrapping,none:u.none}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.binding=void 0;var i=n(0);t.binding=function(e){e.particles.forEach(function(e){return e.position.setMagnitude(i.MAX_RADIUS)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.centering=void 0;var i=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.centering=function(e){if(!(e.particles.length<1)){var t=e.particles.map(function(e){return e.position}),n=r.default.getAverage(t);e.particles.forEach(function(e){return e.position.subtract(n)})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.centerScaling=void 0;var i=n(0),r=i.MAX_RADIUS*i.MAX_RADIUS;t.centerScaling=function(e){if(!(e.particles.length<1)){var t=e.particles.reduce(function(e,t){return Math.max(e,t.position.getMagnitudeSq())},-1);if(!(t<=r)){var n=r/t;e.particles.forEach(function(e){return e.position.multiply(n)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.none=function(){}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scaling=void 0;var i=n(0),r=n(1),o=function(e){return e&&e.__esModule?e:{default:e}}(r),u=i.MAX_RADIUS*i.MAX_RADIUS;t.scaling=function(e){if(!(e.particles.length<2)){var t=e.particles.map(function(e){return e.position}),n=o.default.getAverage(t),i=t.reduce(function(e,t){var i=t.clone().subtract(n),r=i.getMagnitudeSq();return Math.max(e,r)},-1);if(!(i<=u)){var r=u/i;e.particles.forEach(function(e){return e.position.multiply(r)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.wrapping=void 0;var i=n(0),r=function(e){return e<-i.MAX_RADIUS?i.MAX_RADIUS:e>i.MAX_RADIUS?-i.MAX_RADIUS:e};t.wrapping=function(e){e.particles.forEach(function(e){return e.position.mutate(r)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),r=function(e){return e&&e.__esModule?e:{default:e}}(i),o=function e(t){var n=t.dimensions,i=t.position,o=t.velocity,u=t.acceleration;(0,r.default)(this,e),this.dimensions=n,this.position=i.toArray(),this.velocity=o.toArray(),this.acceleration=u.toArray()};t.default=o},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=i(r),u=n(3),a=i(u),s=n(0),c=n(40),l=i(c),f=function(){function e(){(0,o.default)(this,e),this.particles=[]}return(0,a.default)(e,[{key:"setPopulation",value:function(e,t){var n=this.particles,i=new Array(e).fill(void 0).map(function(e,i){var r=new l.default(t);return n[i]?r.fill(n[i]):r.randomize(s.MAX_RADIUS),r});this.particles=i,this.recalculate()}},{key:"recalculate",value:function(){var e=this;this.particles.forEach(function(t){t.neighbors=[],e.particles.forEach(function(e,n){if(t!==e){var i=t.position.clone().subtract(e.position),r=i.getMagnitude();t.neighbors.push({index:n,delta:i,distance:r})}}),t.neighbors.sort(function(e,t){return e.distance-t.distance})})}},{key:"getNeighborhoodMsg",value:function(e){switch(e.name){case"all":return this.particles.map(function(e){return e.neighbors.map(function(e){return d(e)})});case"locals":return this.particles.map(function(e){return e.neighbors.slice(0,e.dimensions).map(function(e){return d(e)})});case"nearest":return this.particles.map(function(e){return e.neighbors.slice(0,1).map(function(e){return d(e)})});case"proximity":throw new Error("TODO: proximity neighborhood")}}}]),e}();t.default=f;var d=function(e){return{index:e.index,delta:e.delta.toArray(),distance:e.distance}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=i(r),u=n(3),a=i(u),s=n(1),c=i(s),l=function(){function e(t){(0,o.default)(this,e),this.dimensions=t,this.position=new c.default(t),this.velocity=new c.default(t),this.acceleration=new c.default(t),this.neighbors=[]}return(0,a.default)(e,[{key:"randomize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this.position.radialRandomize(e),this.velocity.radialRandomize(e),this.acceleration.radialRandomize(e),this}},{key:"fill",value:function(e){return this.position.mutate(function(t,n){return e.position.getValue(n)||t}),this.velocity.mutate(function(t,n){return e.velocity.getValue(n)||t}),this.acceleration.mutate(function(t,n){return e.acceleration.getValue(n)||t}),this}}]),e}();t.default=l}]);
//# sourceMappingURL=695ec2a18a5de8adfb6c.worker.js.map