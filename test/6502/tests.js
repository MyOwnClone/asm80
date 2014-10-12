module("Syntax and coding standards");

jsHintTest( "JSHint", "../../lib/c6502.js");

module("Basic tests");

test( "Namespace", function() {
	notEqual( C6502, null, "C6502 is defined" );
    equal( typeof(C6502), "object", "C6502 is an object" );
	equal( typeof(C6502.parseOpcode), "function", "C6502.parseOpcode defined" );
});


module("Simple OP tests");
var vars = {"LOOP":0x1234,"SHORT":0x21,"_PC":0x0100};
var s = [], p;

test( "NOP test", function() {
	s = {"opcode":"NOP","addr":0x100,"lens":[],"bytes":0};
	p = C6502.parseOpcode(s);
	equal(p.lens[0],0xea,"Opcode OK");
	equal(p.bytes,1,"Length OK");
});

test( "LDA zp", function() {
	s = {"opcode":"LDA","params":["$23"],addr:"0x100",lens:[],"bytes":0};
	p = C6502.parseOpcode(s);
	equal(p.lens[0],0xa5,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});
test( "LDA zp2", function() {
	s = {"opcode":"LDA","params":["short"],addr:"0x100",lens:[],"bytes":0};
	p = C6502.parseOpcode(s,vars);
	equal(p.lens[0],0xa5,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});
test( "LDA imm", function() {
	s = {"opcode":"LDA","params":["#$23"],addr:"0x100",lens:[],"bytes":0};
	p = C6502.parseOpcode(s);
	equal(p.lens[0],0xa9,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});

test( "JMP", function() {
	s = {"opcode":"JMP","params":["$1234"],addr:"0x100",lens:[],"bytes":0};
	p = C6502.parseOpcode(s);
	equal(p.lens[0],0x4c,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,3,"Length");
});

test( "JMP bad mode", function() {
	s = {"opcode":"JMP","params":["#$1234"],addr:"0x100",lens:[],"bytes":0,"numline":23};
	try {
		p = C6502.parseOpcode(s);
	} catch (e) {
		p = e;
	}
	equal(p,"Bad addressing mode at line 23","Bad mode detected");
});
