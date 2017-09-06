import * as Module from './clips';

export type mallocF = (length: number) => number;
export type EnvEvalF = (clipsenv: number, clips: string, buffer: number) => number;
export type EnvClearF = (clipsenv: number) => number;
export type GetDataTypeF = (clipsenv: number) => string;
export type SetEvaluationErrorF = (clipsenv: number, error:number) => number;
export type SetHaltExecutionF = (clipsenv: number, error:number) => number;
export type CreateEnvironmentF = () => number;

export class CLIPSF {
    CreateEnvironment: CreateEnvironmentF = Module.cwrap('CreateEnvironment', 'number', []);
    malloc: mallocF = Module.cwrap('malloc', 'number', ['number']);
    EnvEval: EnvEvalF = Module.cwrap('EnvEval', 'number', ['number', 'string', 'number']);
    EnvClear: EnvClearF = Module.cwrap('EnvClear', 'number', ['number']);
    GetDataType: GetDataTypeF = Module.cwrap('GetDataType', 'string', ['number']);
    SetEvaluationError: SetEvaluationErrorF = Module.cwrap('SetEvaluationError', 'number', ['number','number']);
    SetHaltExecution: SetHaltExecutionF = Module.cwrap('SetHaltExecution', 'number', ['number','number']);
}

export class CLIPS {

    static BUFF = 1024;
    static F = new CLIPSF();

    env: number;
    ds: number;
    buffer:string[];

    constructor(){
        this.env = CLIPS.F.CreateEnvironment();
        this.ds = CLIPS.F.malloc(CLIPS.BUFF);
        this.buffer = [];
    }

    recover(){
        CLIPS.F.SetEvaluationError(this.env,0);
        CLIPS.F.SetHaltExecution(this.env,0);
    }

    clear(){
        CLIPS.F.EnvClear(this.env);
    }

    eval( clips: string ){
        this.buffer = [];
        let res = CLIPS.F.EnvEval(this.env,clips,this.ds);
        return this.buffer;
    }
}