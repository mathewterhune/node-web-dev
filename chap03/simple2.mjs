// This is a ES6 module and uses the .mjs extension

let count = 0; // Private variable that isnt exported
export function next() { return ++ count; } // exported function that increments the count
function squared() { return Math.pow(count,2); } 
export function hello() { return "Hello, world"; }
export default function () { return count; }
export const meaning = 42;
export let nocount = -1;
export { squared };


// export keyword can be put in front of any top level declaration, such as variablem function, or class declarations.