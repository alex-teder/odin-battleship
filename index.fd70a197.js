let e,t,s;function i(e,t,s,i){Object.defineProperty(e,t,{get:s,set:i,enumerable:!0,configurable:!0})}var l={};i(l,"Player",()=>d),i(l,"AI",()=>u);class o{constructor(e,t){this.size=e,this.cells=Array.from({length:this.size*this.size},()=>new t)}at(e){if(e.x<1||e.x>this.size||e.y<1||e.y>this.size)return;let t=this.size*(e.y-1)+e.x-1;return this.cells[t]}atIndex(e){return this.cells[e]}}function r(e){return{x:e%10+1,y:Math.floor(e/10)+1}}function n(){return Math.random()>.5?"up":"right"}class h{constructor(e){this.size=e,this.health=e,this.isAlive=!0,this.bodyCoords=[]}getHit(){!(this.health<=0)&&this.isAlive&&(this.health-=1,this.health<=0&&(this.isAlive=!1))}}class a{constructor(){this.isHit=!1,this.ship=null,this.isOccupied=!1}}class c{constructor(e){this.grid=new o(e,a),this.boardSize=e,this.shipsOnGameboard=[],this.shotsCounter=0,this.shotsOnTargetCounter=0}calculateBodyCoords(e,t,s){let i=[];if("up"===s)for(let s=0;s<e;s++)i.push({x:t.x,y:t.y+s});else if("right"===s)for(let s=0;s<e;s++)i.push({x:t.x-s,y:t.y});return i}blockAdjacentCoords(e){for(let t of[[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]]){let s={x:e.x+t[0],y:e.y+t[1]};s.x<1||s.x>this.boardSize||s.y<1||s.y>this.boardSize||this.grid.at(s).isOccupied||(this.grid.at(s).isOccupied=!0)}}checkPositionLegal(e,t,s){let i=this.calculateBodyCoords(e,t,s);for(let e of i)if(e.x<1||e.x>this.boardSize||e.y<1||e.y>this.boardSize||this.grid.at(e).isOccupied)return!1;return!0}placeShip(e,t,s){if(this.shipsOnGameboard.includes(e)||!this.checkPositionLegal(e.size,t,s))return;let i=this.calculateBodyCoords(e.size,t,s);for(let t of i)this.grid.at(t).ship=e,this.grid.at(t).isOccupied=!0,this.blockAdjacentCoords(t);e.bodyCoords.push(...i),this.shipsOnGameboard.push(e)}receiveShot(e){let t=this.grid.at(e);!t.isHit&&(t.isHit=!0,this.shotsCounter++,t.ship&&(t.ship.getHit(),this.shotsOnTargetCounter++))}}class d{constructor(){this.gameboard=new c(10),this.ships=[...this.initShips()]}initShips(){let e=[new h(5)];return e.push(new h(4),new h(4)),e.push(new h(3),new h(3)),e.push(new h(2),new h(2),new h(2)),e}placeShipSuccessfully(e,t,s){let i=this.gameboard.shipsOnGameboard.length;return this.gameboard.placeShip(e,t,s),this.gameboard.shipsOnGameboard.length===i+1}shoot(e,t){let s=e.gameboard.shotsCounter,i=e.gameboard.shotsOnTargetCounter;return(e.gameboard.receiveShot(t),e.gameboard.shotsCounter===s)?null:e.gameboard.shotsOnTargetCounter>i?"hit":"miss"}countShipsAlive(){return this.ships.filter(e=>{if(!0===e.isAlive)return e}).length}}class u extends d{constructor(){super(),this.clue=null,this.clueDeltas=[[0,1],[1,0],[0,-1],[-1,0]],this.impossibleCoords=new Set}shoot(e,t){if(console.log(this.impossibleCoords),t){let s=e.countShipsAlive(),i=d.prototype.shoot(e,t);if("hit"===i){this.clue&&(this.clue.x===t.x+1||this.clue.x===t.x-1?this.clueDeltas=[[1,0],[-1,0]]:this.clueDeltas=[[0,1],[0,-1]]),this.clue=t;let i=e.countShipsAlive();if(s===i+1){this.clue=null,this.clueDeltas=[[0,1],[1,0],[0,-1],[-1,0]];let s=e.gameboard.grid.at(t).ship;for(let e of s.bodyCoords)this.pushImpossibleCoords(e)}}return i}return null===this.clue?this.shootRandomly(e):this.shootWithClue(e)}shootRandomly(e){let t=e.countShipsAlive(),s=this.getRandomPosition(),i=0;for(;[...this.impossibleCoords].includes(`${s.x}-${s.y}`);)if(s=this.getRandomPosition(),++i>1499)throw Error("Something went wrong");i=0;let l=d.prototype.shoot(e,s);for(;null===l&&[...this.impossibleCoords].includes(`${s.x}-${s.y}`);)if(s=this.getRandomPosition(),l=d.prototype.shoot(e,s),++i>1499)throw Error("Something went wrong");if("hit"===l){this.clue=s;let i=e.countShipsAlive();if(t===i+1){this.clue=null;let t=e.gameboard.grid.at(s).ship;for(let e of t.bodyCoords)this.pushImpossibleCoords(e)}}return l}shootWithClue(e){let t=this.clueDeltas,{x:s,y:i}=this.clue,l=t[Math.floor(Math.random()*t.length)],o={x:s+l[0],y:i+l[1]},r=0;for(;([...this.impossibleCoords].includes(`${o.x}-${o.y}`)||o.x<1||o.x>10||o.y<1||o.y>10||!0===e.gameboard.grid.at(o).isHit)&&(o={x:s+(l=t[Math.floor(Math.random()*t.length)])[0],y:i+l[1]},!(++r>10)););return r>10?(this.clue=null,null):this.shoot(e,o)}getRandomPosition(){return{x:Math.ceil(10*Math.random()),y:Math.ceil(10*Math.random())}}pushImpossibleCoords(e){for(let t of[[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]]){let s={x:e.x+t[0],y:e.y+t[1]};s.x<1||s.x>10||s.y<1||s.y>10||[...this.impossibleCoords].includes(`${s.x}-${s.y}`)||this.impossibleCoords.add(`${s.x}-${s.y}`)}}}l={Ship:h,Gameboard:c,Player:d,AI:u};const p=document.querySelector("#section1"),f=document.querySelector("#section2");let y=p.querySelector(".player-board"),m=f.querySelector(".player-board");const g=document.querySelector(".text-field > p"),b=["Place your ships. Press <b>right mouse button</b> to rotate the ship...","Make your move!","Waiting for opponent to shoot...","Hit! Make your next move...","Ship destroyed! Make your next move...","YOU WON! Reload the page to play again.","YOU LOST! Reload the page to play again."];function x(e){g.innerHTML=b[e]}function S(){y=p.querySelector(".player-board"),m=f.querySelector(".player-board")}function v(){y.style.gridTemplateRows="repeat(10, 1fr)",y.style.gridTemplateColumns="repeat(10, 1fr)",m.style.gridTemplateRows="repeat(10, 1fr)",m.style.gridTemplateColumns="repeat(10, 1fr)";for(let e=0;e<10;e++)for(let e=0;e<10;e++){let e=document.createElement("div");e.classList.add("cell"),y.appendChild(e)}for(let e=0;e<10;e++)for(let e=0;e<10;e++){let e=document.createElement("div");e.classList.add("cell","cell--hidden"),m.appendChild(e)}}function C(e){let t=e.gameboard.grid,s=y.querySelectorAll(".cell");for(let e of t.cells)e.isHit&&null!==e.ship?s[t.cells.indexOf(e)].classList.add("cell--hit-ship"):e.isHit?s[t.cells.indexOf(e)].classList.add("cell--hit"):null!==e.ship&&s[t.cells.indexOf(e)].classList.add("cell--ship-part");p.querySelector(".player-ships").innerHTML="";let i=L(e);for(let e of i)p.querySelector(".player-ships").append(e)}function O(e){let t=e.gameboard.grid,s=m.querySelectorAll(".cell");for(let e of t.cells)e.isHit&&null!==e.ship?(s[t.cells.indexOf(e)].classList.remove("cell--hidden"),s[t.cells.indexOf(e)].classList.add("cell--hit-ship")):e.isHit&&(s[t.cells.indexOf(e)].classList.remove("cell--hidden"),s[t.cells.indexOf(e)].classList.add("cell--hit"));f.querySelector(".player-ships").innerHTML="";let i=L(e);for(let e of i)f.querySelector(".player-ships").append(e)}function L(e){let t=[];for(let s of e.ships){let e=document.createElement("div");e.classList.add("small-ship");for(let t=0;t<s.size;t++){let t=document.createElement("div");t.classList.add("small-cell"),s.isAlive||t.classList.add("small-cell--dead"),e.append(t)}t.push(e)}return t}const A=document.querySelector("#section1 .player-board"),w=document.querySelector("#section2 .player-board"),q=A.cloneNode(!0),E=w.cloneNode(!0);let z="up",H=1;function M(){return 1===H?(w.classList.remove("turn"),A.classList.add("turn"),2):(A.classList.remove("turn"),w.classList.add("turn"),1)}function T(e){let t=A.querySelectorAll(".cell"),i=r([...t].indexOf(e)),l=[];if("up"===z)for(let e=0;e<s.size;e++)l.push({x:i.x,y:i.y+e});else if("right"===z)for(let e=0;e<s.size;e++)l.push({x:i.x-e,y:i.y});let o=l.map(e=>e.x<1||e.y>10?-1:10*(e.y-1)+e.x-1);for(let e of o)-1!==e&&t[e].classList.add("cell--hover")}function P(){let e=t.ships.filter(e=>{if(e.isAlive)return e});return e.length}function R(){alert("THE END!"),w.parentNode.replaceChild(E,w),S(),v(),C(e),O(t),w.style.cursor="unset"}v();const I=new l.Player,$=new l.AI;e=I,t=$,C(I),O($),s=I.ships[0],function(){A.style.cursor="pointer";let i=A.querySelectorAll(".cell");i.forEach(l=>{l.addEventListener("mouseover",()=>{T(l)}),l.addEventListener("mouseout",()=>{i.forEach(e=>{e.classList.remove("cell--hover")})}),l.addEventListener("click",()=>{let i=e.gameboard.shipsOnGameboard.length,o=function(t){let i=A.querySelectorAll(".cell"),l=r([...i].indexOf(t));return e.placeShipSuccessfully(s,l,z)}(l);C(e),i===e.ships.length-1&&o&&(A.parentNode.replaceChild(q,A),S(),v(),C(e),function(){for(let e of $.ships){let t=$.placeShipSuccessfully(e,$.getRandomPosition(),n());for(;!t;)t=$.placeShipSuccessfully(e,$.getRandomPosition(),n())}}(),function(){w.style.cursor="pointer",w.classList.add("turn");let s=w.querySelectorAll(".cell");s.forEach(i=>{i.addEventListener("click",()=>{if(2===H)return;let l=[...s].indexOf(i);(function(s){if(t.gameboard.grid.atIndex(s).isHit)return;let i=P(),l=e.shoot(t,r(s));for(;null===l;)l=e.shoot(t,r(s));O(t),"miss"===l?(H=M(),setTimeout(function s(){x(2),setTimeout(()=>{let i=t.shoot(e);for(;null===i;)i=t.shoot(e);C(e),"hit"===i?"AI WON"===function(){let t=e.ships.filter(e=>{if(e.isAlive)return e});if(0===t.length)return"AI WON"}()?(x(6),R()):s():(x(1),H=M())},1e3)},500)):"hit"===l&&(0===P()?(x(5),R()):P()===i-1?x(4):x(3))})(l),O(t)})})}(),x(1)),i+1===e.gameboard.shipsOnGameboard.length&&(s=e.ships[e.ships.indexOf(s)+1])})})}(),function(){let e=A.querySelectorAll(".cell");e.forEach(t=>{t.addEventListener("contextmenu",s=>{s.preventDefault(),z="up"===z?"right":"up",e.forEach(e=>{e.classList.remove("cell--hover")}),T(t)})})}(),x(0);
//# sourceMappingURL=index.fd70a197.js.map
