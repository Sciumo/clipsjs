export import EMCModule = require("./clips");
export declare type mallocF = (length: number) => number;
export declare type freeF = (ptr: number) => void;
export declare type EnvEvalF = (clipsenv: number, clips: string, buffer: number) => number;
export declare type EnvGetFactListF = (clipsenv: number, ret: number, module: number) => void;
export declare type EnvClearF = (clipsenv: number) => number;
export declare type GetDataTypeF = (dataptr: number) => number;
export declare type GetDataStringF = (dataptr: number) => string;
export declare type GetDataNumberF = (dataptr: number) => number;
export declare type SetEvaluationErrorF = (clipsenv: number, error: number) => number;
export declare type SetHaltExecutionF = (clipsenv: number, error: number) => number;
export declare type CreateEnvironmentF = () => number;
export declare class CLIPSIF {
    CreateEnvironment: CreateEnvironmentF;
    malloc: mallocF;
    free: freeF;
    EnvEval: EnvEvalF;
    EnvClear: EnvClearF;
    EnvGetFactList: EnvGetFactListF;
    GetDataType: GetDataTypeF;
    GetDataString: GetDataStringF;
    GetDataNumber: GetDataNumberF;
    SetEvaluationError: SetEvaluationErrorF;
    SetHaltExecution: SetHaltExecutionF;
    static buffer: string[];
    static print(msg: string): void;
    static clearBuffer(): void;
    constructor();
}
export declare let CLIPS: CLIPSIF;
export declare enum DataTypes {
    FLOAT = 0,
    INTEGER = 1,
    SYMBOL = 2,
    STRING = 3,
    MULTIFIELD = 4,
    EXTERNAL_ADDRESS = 5,
    FACT_ADDRESS = 6,
    INSTANCE_ADDRESS = 7,
    INSTANCE_NAME = 8,
    UNK = 9,
}
export declare class DataObject {
    buffer_size: number;
    static readonly DEFAULT_BUFFER_SIZE: number;
    ds: number;
    constructor(buffer_size?: number);
    free(): void;
    type(): number;
    dataType(): DataTypes;
    toNumber(): number;
    toString(): string;
}
export declare class CLIPSEnv {
    env: number;
    data: DataObject;
    constructor();
    recover(): void;
    clear(): void;
    eval(clips: string): DataObject;
    fact_list(): DataObject;
}
