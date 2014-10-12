/*
The MIT License (MIT)

Copyright (c) 2014 Martin Maly, maly@maly.cz

6800 part - with a help of Jiri Sutera, jiri.sutera@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



 */

var M6800 = {
	"set": {
		//          0        1     2      3      4      5       6  
		//         INH    DIR    ACC   EXT     IDX    IMM     REL
		"ABA":  [  0x1B,    -1,    -1,    -1,    -1,    -1,    -1], // Sice je to správně ACC, ale nemá to operandy, takže INH
		"ADC":  [    -1,  0x99,    -1,  0xB9,  0xA9,  0x89,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"ADD":  [    -1,  0x9B,    -1,  0xBB,  0xAB,  0x8B,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"AND":  [    -1,  0x94,    -1,  0xB4,  0xA4,  0x84,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"ASL":  [    -1,    -1,  0x48,  0x78,  0x68,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"ASR":  [    -1,    -1,  0x47,  0x77,  0x67,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"BCC":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x24],
		"BCS":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x25],
		"BEQ":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x27],
		"BGE":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x2C],
		"BGT":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x2E],
		"BHI":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x22],
		"BIT":  [    -1,  0x95,    -1,  0xB5,  0xA5,  0x85,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"BLE":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x2F],
		"BLS":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x23],
		"BLT":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x2D],
		"BMI":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x2B],
		"BNE":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x26],
		"BPL":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x2A],
		"BRA":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x20],
		"BSR":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x8D],
		"BVC":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x28],
		"BVS":  [    -1,    -1,    -1,    -1,    -1,    -1,  0x29],
		"CBA":  [  0x11,    -1,    -1,    -1,    -1,    -1,    -1],
		"CLC":  [  0x0C,    -1,    -1,    -1,    -1,    -1,    -1],
		"CLI":  [  0x0E,    -1,    -1,    -1,    -1,    -1,    -1],
		"CLR":  [    -1,    -1,  0x4F,  0x7F,  0x6F,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"CLV":  [  0x0A,    -1,    -1,    -1,    -1,    -1,    -1],
		"CMP":  [    -1,  0x91,    -1,  0xB1,  0xA1,  0x81,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"COM":  [    -1,    -1,  0x43,  0x73,  0x63,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"CPX":  [    -1,  0x9C,    -1,  0xBC,  0xAC,  0x8C,    -1],
		"DAA":  [  0x19,    -1,    -1,    -1,    -1,    -1,    -1],
		"DEC":  [    -1,    -1,  0x4A,  0x7A,  0x6A,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"DES":  [  0x34,    -1,    -1,    -1,    -1,    -1,    -1],
		"DEX":  [  0x09,    -1,    -1,    -1,    -1,    -1,    -1],
		"EOR":  [    -1,  0x98,    -1,  0xB8,  0xA8,  0x88,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"INC":  [    -1,    -1,  0x4C,  0x7C,  0x6C,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"INS":  [  0x31,    -1,    -1,    -1,    -1,    -1,    -1],
		"INX":  [  0x08,    -1,    -1,    -1,    -1,    -1,    -1],
		"JMP":  [    -1,    -1,    -1,  0x7E,  0x6E,    -1,    -1],
		"JSR":  [    -1,    -1,    -1,  0xBD,  0xAD,    -1,    -1],
		"LDA":  [    -1,  0x96,    -1,  0xB6,  0xA6,  0x86,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"LDS":  [    -1,  0x9E,    -1,  0xBE,  0xAE,  0x8E,    -1],
		"LDX":  [    -1,  0xDE,    -1,  0xFE,  0xEE,  0xCE,    -1],
		"LSR":  [    -1,    -1,  0x44,  0x74,  0x64,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"NEG":  [    -1,    -1,  0x40,  0x70,  0x60,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"NOP":  [  0x01,    -1,    -1,    -1,    -1,    -1,    -1],
		"ORA":  [    -1,  0x9A,    -1,  0xBA,  0xAA,  0x8A,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"PSH":  [    -1,    -1,  0x36,    -1,    -1,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x01 !
		"PUL":  [    -1,    -1,  0x32,    -1,    -1,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x01 !
		"ROL":  [    -1,    -1,  0x49,  0x79,  0x69,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"ROR":  [    -1,    -1,  0x46,  0x76,  0x66,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"RTI":  [  0x3B,    -1,    -1,    -1,    -1,    -1,    -1],
		"RTS":  [  0x39,    -1,    -1,    -1,    -1,    -1,    -1],
		"SBA":  [  0x10,    -1,    -1,    -1,    -1,    -1,    -1],
		"SBC":  [    -1,  0x92,    -1,  0xB2,  0xA2,  0x82,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"SEC":  [  0x0D,    -1,    -1,    -1,    -1,    -1,    -1],
		"SEI":  [  0x0F,    -1,    -1,    -1,    -1,    -1,    -1],
		"SEV":  [  0x0B,    -1,    -1,    -1,    -1,    -1,    -1],
		"STA":  [    -1,  0x97,    -1,  0xB7,  0xA7,    -1,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"STS":  [    -1,  0x9F,    -1,  0xBF,  0xAF,    -1,    -1],
		"STX":  [    -1,  0xDF,    -1,  0xFF,  0xEF,    -1,    -1],
		"SUB":  [    -1,  0x90,    -1,  0xB0,  0xA0,  0x80,    -1], //nutno osetrit dle registru A/B - pokud B, tak pricist 0x40
		"SWI":  [  0x3F,    -1,    -1,    -1,    -1,    -1,    -1],
		"TAB":  [  0x16,    -1,    -1,    -1,    -1,    -1,    -1],
		"TAP":  [  0x06,    -1,    -1,    -1,    -1,    -1,    -1],
		"TBA":  [  0x17,    -1,    -1,    -1,    -1,    -1,    -1],
		"TPA":  [  0x07,    -1,    -1,    -1,    -1,    -1,    -1],
		"TST":  [    -1,    -1,  0x4D,  0x7D,  0x6D,    -1,    -1], //nutno osetrit ACC dle registru A/B - pokud B, tak pricist 0x10
		"TSX":  [  0x30,    -1,    -1,    -1,    -1,    -1,    -1],
		"TXS":  [  0x35,    -1,    -1,    -1,    -1,    -1,    -1],
		"WAI":  [  0x3E,    -1,    -1,    -1,    -1,    -1,    -1]
	},

	"parseOpcode": function(s,vars) {

		var ax = M6800.set[s.opcode];
		s.lens=[];

		if (ax) {
			if (ax[0]>=0) { //0 params.
				if (ax[0]>0xff) {
					s.lens = [ax[0]>>8,ax[0]&0xff];
					s.bytes = 2;
					return s;
				}
				s.lens = [ax[0]];
				s.bytes = 1;
				return s;
			}
			// vice parametru...

			return s;
		}
		// not found
		return null;
	},
	"endian":true
};