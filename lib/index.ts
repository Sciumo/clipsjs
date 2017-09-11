export import EMCModule = require("./clips")

export type mallocF = (length: number) => number;
export type freeF = (ptr: number) => void;
export type EnvEvalF = (clipsenv: number, clips: string, buffer: number) => number;
export type EnvGetFactListF = (clipsenv: number, ret: number, module: number) => void;
export type EnvClearF = (clipsenv: number) => number;
export type GetDataTypeF = (dataptr: number) => number;
export type GetDataStringF = (dataptr: number) => string;
export type GetDataNumberF = (dataptr: number) => number;
export type SetEvaluationErrorF = (clipsenv: number, error: number) => number;
export type SetHaltExecutionF = (clipsenv: number, error: number) => number;
export type CreateEnvironmentF = () => number;

export class CLIPSIF {    
    CreateEnvironment: CreateEnvironmentF = EMCModule.cwrap('CreateEnvironment', 'number', []);
    malloc: mallocF = EMCModule.cwrap('malloc', 'number', ['number']);
    free: freeF = EMCModule.cwrap('free', 'void', ['number']);
    EnvEval: EnvEvalF = EMCModule.cwrap('EnvEval', 'number', ['number', 'string', 'number']);
    EnvClear: EnvClearF = EMCModule.cwrap('EnvClear', 'number', ['number']);
    EnvGetFactList: EnvGetFactListF = EMCModule.cwrap('EnvGetFactList', 'void', ['number', 'number', 'number']);
    GetDataType: GetDataTypeF = EMCModule.cwrap('GetDataType', 'number', ['number']);
    GetDataString: GetDataStringF = EMCModule.cwrap('GetDataString', 'string', ['number']);
    GetDataNumber: GetDataNumberF = EMCModule.cwrap('GetDataString', 'number', ['number']);
    SetEvaluationError: SetEvaluationErrorF = EMCModule.cwrap('SetEvaluationError', 'number', ['number', 'number']);
    SetHaltExecution: SetHaltExecutionF = EMCModule.cwrap('SetHaltExecution', 'number', ['number', 'number']);
    static buffer: string[] = [];
    static print(msg: string): void {
        console.log("print", msg );
        CLIPSIF.buffer.push(msg);
    }
    static clearBuffer() {
        CLIPSIF.buffer = [];
    }
    constructor() {
        console.log("assign print");
        EMCModule.print = CLIPSIF.print;
    }
}

export let CLIPS = new CLIPSIF();

EMCModule.print("module print");

export enum DataTypes {
    FLOAT = 0,
    INTEGER,
    SYMBOL,
    STRING,
    MULTIFIELD,
    EXTERNAL_ADDRESS,
    FACT_ADDRESS,
    INSTANCE_ADDRESS,
    INSTANCE_NAME,
    UNK
}

export class DataObject {
    static readonly DEFAULT_BUFFER_SIZE = 1024;
    
    ds: number;

    constructor(public buffer_size: number = DataObject.DEFAULT_BUFFER_SIZE) {
        this.ds = CLIPS.malloc(this.buffer_size);
    }

    free(){
        CLIPS.free( this.ds );
    }

    type() : number {
        return CLIPS.GetDataType(this.ds);
    }

    dataType(): DataTypes {
        let dt = this.type();
        if( dt > DataTypes.INSTANCE_NAME ){
            return DataTypes.UNK;
        }
        return dt as DataTypes;
    }

    toNumber() : number {
        return CLIPS.GetDataNumber(this.ds);
    }

    toString() : string {
        return CLIPS.GetDataString(this.ds);
    }

}

export class CLIPSEnv {

    env: number;
    data: DataObject;

    constructor() {
        this.env = CLIPS.CreateEnvironment();
        this.data = new DataObject();
    }

    recover() {
        CLIPS.SetEvaluationError(this.env, 0);
        CLIPS.SetHaltExecution(this.env, 0);
    }

    clear() {
        CLIPS.EnvClear(this.env);
    }

    eval(clips: string) {
        let res = CLIPS.EnvEval(this.env, clips, this.data.ds);
        console.log("buffer:",CLIPSIF.buffer);
        console.log("res:", res, clips, " ds:", this.data.ds, " ds type:", this.data.type(), DataTypes[this.data.dataType()]);
        if( this.data.dataType() == DataTypes.INTEGER || this.data.dataType() == DataTypes.FLOAT ){
            console.log("number:", CLIPS.GetDataNumber(this.data.ds) );
        }
        return this.data;
    }

    fact_list(): DataObject {
        CLIPS.EnvGetFactList(this.env, this.data.ds, 0);
        return this.data;
    }
}