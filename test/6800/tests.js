module("Syntax and coding standards");

jsHintTest( "JSHint", "../../lib/m6800.js");

module("Basic tests");

test( "Namespace", function() {
	notEqual( M6800, null, "M6800 is defined" );
    equal( typeof(M6800), "object", "M6800 is an object" );
	equal( typeof(M6800.parseOpcode), "function", "M6800.parseOpcode defined" );
});


module("Simple OP tests");
var vars = {"LOOP":0x1234,"SHORT":0x21,"_PC":0x0100};
var s = [], p;

test( "NOP test", function() {
	s = {"opcode":"NOP","addr":0x100,"lens":[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x01,"Opcode OK");
	equal(p.bytes,1,"Length OK");
});


//// Dal jsou uz 6809, nutno zmenit, upravit...
test( "NEG zp", function() {
	s = {"opcode":"NEG","params":["$23"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x00,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});

test( "NEG ext", function() {
	s = {"opcode":"NEG","params":["$1234"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x70,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.lens[2],null,"Opcode");
	equal(p.bytes,3,"Length");
});
test( "NEG forced zp", function() {
	s = {"opcode":"NEG","params":["<$1234"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x00,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});

test( "NEG forced ext", function() {
	s = {"opcode":"NEG","params":[">$12"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x70,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.lens[2],null,"Opcode");
	equal(p.bytes,3,"Length");
});


test( "ORCC imm", function() {
	s = {"opcode":"ORCC","params":["#$22"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s,vars);
	equal(p.lens[0],0x1A,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});
test( "SUBA imm", function() {
	s = {"opcode":"SUBA","params":["#$23"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x80,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.bytes,2,"Length");
});
test( "SUBD imm", function() {
	s = {"opcode":"SUBD","params":["#$23"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x83,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.lens[2],null,"Opcode");
	equal(p.bytes,3,"Length");
});

test( "JMP", function() {
	s = {"opcode":"JMP","params":["$1234"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x7e,"Opcode");
	equal(typeof(p.lens[1]),"function","Opcode");
	equal(p.lens[2],null,"Opcode");
	equal(p.bytes,3,"Length");
});

test( "CMPU imm", function() {
	s = {"opcode":"CMPU","params":["#$1234"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x11,"Opcode");
	equal(p.lens[1],0x83,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.lens[3],null,"Opcode");
	equal(p.bytes,4,"Length");
});
test( "CMPU direct", function() {
	s = {"opcode":"CMPU","params":["$12"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x11,"Opcode");
	equal(p.lens[1],0x93,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.bytes,3,"Length");
});
test( "CMPU extended", function() {
	s = {"opcode":"CMPU","params":["$1234"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x11,"Opcode");
	equal(p.lens[1],0xB3,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.lens[3],null,"Opcode");
	equal(p.bytes,4,"Length");
});

module("Indexed mode");

test( "LEAX ,X", function() {
	s = {"opcode":"LEAX","params":["","X"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0x84,"Opcode");
	equal(p.bytes,2,"Length");
});

test( "LDA ,X+", function() {
	s = {"opcode":"LDA","params":["","X+"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0xa6,"Opcode");
	equal(p.lens[1],0x80,"Opcode");
	equal(p.bytes,2,"Length");
});


test( "CMPD ,X", function() {
	s = {"opcode":"CMPD","params":["","X"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x10,"Opcode");
	equal(p.lens[1],0xA3,"Opcode");
	equal(p.lens[2],0x84,"Opcode");
	equal(p.bytes,3,"Length");
});


test( "LEAX [,Y]", function() {
	s = {"opcode":"LEAX","params":["[","Y]"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0xB4,"Opcode");
	equal(p.bytes,2,"Length");
});

test( "LEAX 5,X", function() {
	s = {"opcode":"LEAX","params":["5","X"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0x05,"Opcode");
	equal(p.bytes,2,"Length");
});
test( "LEAX -1,X", function() {
	s = {"opcode":"LEAX","params":["-1","X"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0x1f,"Opcode");
	equal(p.bytes,2,"Length");
});

test( "LEAX 35,X", function() {
	s = {"opcode":"LEAX","params":["35","X"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0x88,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.bytes,3,"Length");
});
/*
test( "LEAX [35,PC]", function() {
	s = {"opcode":"LEAX","params":["[35","PC]"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0x9c,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.bytes,3,"Length");
});
*/
test( "LEAX [nn,PC]", function() {
	s = {"opcode":"LEAX","params":["[nn","PC]"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x30,"Opcode");
	equal(p.lens[1],0x9d,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.lens[3],null,"Opcode");
	equal(p.bytes,4,"Length");
});

test( "LDA [$1234,x]", function() {
	s = {"opcode":"LDA","params":["[$1234","x]"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0xa6,"Opcode");
	equal(p.lens[1],0x99,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.lens[3],null,"Opcode");
	equal(p.bytes,4,"Length");
});

test( "LDA [$1234]", function() {
	s = {"opcode":"LDA","params":["[$1234]"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0xa6,"Opcode");
	equal(p.lens[1],0x9F,"Opcode");
	equal(typeof(p.lens[2]),"function","Opcode");
	equal(p.lens[3],null,"Opcode");
	equal(p.bytes,4,"Length");
});

module("Special params");

test( "EXG A,B", function() {
	s = {"opcode":"EXG","params":["A","B"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x1E,"Opcode");
	equal(p.lens[1],0x89,"Opcode");
	equal(p.bytes,2,"Length");
});
test( "TFR X,S", function() {
	s = {"opcode":"TFR","params":["X","S"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x1F,"Opcode");
	equal(p.lens[1],0x14,"Opcode");
	equal(p.bytes,2,"Length");
});

test( "PSHS X,B,A", function() {
	s = {"opcode":"PSHS","params":["X","B","A"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x34,"Opcode");
	equal(p.lens[1],0x16,"Opcode");
	equal(p.bytes,2,"Length");
});
test( "PSHU D", function() {
	s = {"opcode":"PSHU","params":["D"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x36,"Opcode");
	equal(p.lens[1],0x06,"Opcode");
	equal(p.bytes,2,"Length");
});
test( "PULU S,X,Y,A,B", function() {
	s = {"opcode":"PULU","params":["S","X","Y","B","A"],addr:"0x100",lens:[],"bytes":0};
	p = M6800.parseOpcode(s);
	equal(p.lens[0],0x37,"Opcode");
	equal(p.lens[1],0x76,"Opcode");
	equal(p.bytes,2,"Length");
});


module("Bad tests");

test( "JMP bad mode", function() {
	s = {"opcode":"JMP","params":["#$1234"],addr:"0x100",lens:[],"bytes":0,"numline":23};
	try {
		p = M6800.parseOpcode(s);
	} catch (e) {
		p = e;
	}
	equal(p,"Bad addressing mode at line 23","Bad mode detected");
});
test( "EXG A", function() {
		throws(function(){
		s = {"opcode":"EXG","params":["A"],addr:"0x100",lens:[],"bytes":0};
		p = M6800.parseOpcode(s);
	});
});
test( "EXG A,B,C", function() {
		throws(function(){
		s = {"opcode":"EXG","params":["A","B","C"],addr:"0x100",lens:[],"bytes":0};
		p = M6800.parseOpcode(s);
	});
});
test( "EXG A,C", function() {
		throws(function(){
		s = {"opcode":"EXG","params":["A","C"],addr:"0x100",lens:[],"bytes":0};
		p = M6800.parseOpcode(s);
	});
});
