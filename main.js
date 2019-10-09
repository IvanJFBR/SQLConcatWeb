let globalParamQuery = {};
let globalParamsPassed = {};

document.getElementById("queryBox").addEventListener("keyup", function(){
    let queryParams = splitParams("queryBox");

    globalParamQuery = {};

    queryParams.forEach(function(param){
        key = param.split(' ')[0].split(')')[0].split(',')[0];
        globalParamQuery[key] = "";
    });

    mergeQueryParams();
});

document.getElementById("paramsBox").addEventListener("keyup", function(){
    let paramsPassed = splitParams("paramsBox");

    globalParamsPassed = {};

    paramsPassed.forEach(function(param){
        keyMap = param.split(' ')[0].split('(')[0].split(')')[0].split(',')[0];
        valueMap = param.substring(param.lastIndexOf("<") + 1, param.lastIndexOf(">")) || param.match(/'([^']+)'/)[1];

        globalParamsPassed[keyMap] = valueMap;
    });

    mergeQueryParams();
});

function splitParams(boxName) {
    let query = document.getElementById(boxName).value;
    let params = query.split(':');
    params.shift();

    return params;
}

function mergeQueryParams() {
    document.getElementById("queryFormated").value = "";
    queryFinal = document.getElementById("queryBox").value;

    keysQuery = Object.keys(globalParamQuery);
    keysParams = Object.keys(globalParamsPassed);

    if (isValidObject(keysQuery) && isValidObject(keysParams)) {

        let sortedKeys = keysQuery.sort(function(key, value){
            // ASC  -> key.length - value.length
            // DESC -> value.length - key.length
            return key.length - value.length;
        });

        sortedKeys.forEach(paramKey => {
            paramsValue = globalParamsPassed[paramKey];

            if (isNotNullParam(paramsValue)) {
                paramsValue = `'${paramsValue}'`;
            }

            queryFinal = queryFinal.split(`:${paramKey}`).join(paramsValue);
        });
    }
    
    document.getElementById("queryFormated").value = queryFinal;
}

function isValidObject(objectKeys) {
    return objectKeys.length != 0;
}

function isNotNullParam(param) {
    return param && paramsValue.toUpperCase() != 'NULL';
}