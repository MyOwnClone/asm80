var ta=document.getElementById("ta");
var tasm = ta.innerHTML;

Parser.evaluate('"ENTRY"');

/*
var V = ASM.parse(tasm,I8080);

var vx = ASM.pass1(V);
var vx = ASM.pass2(vx);
*/
var vx = ASM.compile(tasm, I8080);
var V = vx[0];

module("Syntax and coding standards");

jsHintTest( "JSHint", "../lib/asm.js");

module("Basic tests");

test( "Namespace", function() {
	notEqual( ASM, null, "ASM is defined" );
    equal( typeof(ASM), "object", "ASM is an object" );
});
