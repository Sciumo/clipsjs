import 'mocha';
import * as assert from 'assert';

import * as Module from '../dist/clips';
import { CLIPSF, CLIPS } from '../dist';

describe('CLIPS', function() {
    describe('CLIPS EMC Module', function() {
        it('create CLIPS Env', function() {
            let env = Module.ccall('CreateEnvironment', 'number', [],[]);
            assert.ok( env > 0, "CLIPS Environment not allocated");
        });
        it('create malloc buffer', function() {
            let ds = Module.ccall('malloc','number', ['number'],[512]);
            assert.ok( ds > 0, "CLIPS buffer not allocated");           
        });
    });
    describe('CLIPS Library', function() {
        it('create CLIPSF', function() {        
            let f = new CLIPSF();
            assert.ok( f.CreateEnvironment, "CLIPSF CreateEnvironment");
            let env = f.CreateEnvironment();
            assert.ok( env > 0 );
        });
        it('create CLIPS', function() {        
            let c = new CLIPS();
            assert.ok( c.env, "CLIPS environment");
        });
        it('reset', function() {        
            let c = new CLIPS();
            let r = c.eval("(reset)");
            assert.ok(r);
        });
        it('get-fact-list', function() {        
            let c = new CLIPS();
            var r = c.eval("(assert (duck))");
            assert.ok(r);
            r = c.eval("(get-fact-list)");
            assert.ok(r);
        });

    });
});