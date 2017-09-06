export declare type mallocF = (length: number) => number;
export declare type EnvEvalF = (clipsenv: number, clips: string, buffer: number) => number;
export declare type EnvClearF = (clipsenv: number) => number;
export declare type GetDataTypeF = (clipsenv: number) => string;
export declare type SetEvaluationErrorF = (clipsenv: number, error: number) => number;
export declare type SetHaltExecutionF = (clipsenv: number, error: number) => number;
export declare type CreateEnvironmentF = () => number;
export declare class CLIPSF {
    CreateEnvironment: CreateEnvironmentF;
    malloc: mallocF;
    EnvEval: EnvEvalF;
    EnvClear: EnvClearF;
    GetDataType: GetDataTypeF;
    SetEvaluationError: SetEvaluationErrorF;
    SetHaltExecution: SetHaltExecutionF;
}
export declare class CLIPS {
    static BUFF: number;
    static F: CLIPSF;
    env: number;
    ds: number;
    buffer: string[];
    constructor();
    recover(): void;
    clear(): void;
    eval(clips: string): string[];
}
