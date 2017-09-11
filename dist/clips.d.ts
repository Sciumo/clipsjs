

declare namespace CLIPSNamespace {
    function ccall( function_name:string, function_result:string, function_argtypes:any[], function_args:any[] ) : any;
    function cwrap( function_name:string, function_result:string, function_argtypes:any[] ) : any;
    let print: (msg:string) => void;
}


export = CLIPSNamespace;