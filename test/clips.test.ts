import 'mocha';
import * as assert from 'assert';

import * as Module from '../dist/clips';
import { CLIPS, CLIPSEnv } from '../dist';

describe('CLIPS', function() {
    describe('CLIPS EMC Module', function() {
        it('create CLIPS Env', function() {
            console.log("CreateEnvironment");
            let env = Module.ccall('CreateEnvironment', 'number', [],[]);
            assert.ok( env > 0, "CLIPS Environment not allocated");
            console.log("float_multiply");
            let f = Module.ccall('float_multiply', 'number', ['number','number'], [2.5,10.0] );
            console.log("f:", f );
        });
        it('create malloc buffer', function() {
            let ds = Module.ccall('malloc','number', ['number'],[512]);
            assert.ok( ds > 0, "CLIPS buffer not allocated");           
        });
    });
    describe('CLIPS Library', function() {
        it('create CLIPSF', function() {        
            let f = CLIPS;
            assert.ok( f.CreateEnvironment, "CLIPSF CreateEnvironment");
            let env = f.CreateEnvironment();
            assert.ok( env > 0 );
        });
        it('create CLIPS', function() {        
            let c = new CLIPSEnv();
            assert.ok( c.env, "CLIPS environment");
        });
        it('reset', function() {        
            let c = new CLIPSEnv();
            let r = c.eval("(reset)");
            assert.ok(r);
        });
        it('data object', function() {  
            let c = new CLIPSEnv();
            let ri = c.eval("(+ 1 0)");            
            assert.equal( ri.toNumber(), 1 );
            let rf = c.eval("(+ 2.5 1.5)");            
            assert.equal( rf.toNumber(), 3.75 );
        });
        it('get-fact-list', function() {        
            let c = new CLIPSEnv();
            var r = c.eval("(assert (duck))");
            assert.ok(r);
            var f = c.fact_list();
            assert.ok(f);
        });

    });
});