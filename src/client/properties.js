const properties = {
    
    isIntegrated: false
    };
    
    export const setProperties = config => {
    if ( config ) {
    for ( const key in config ) {
    properties[key] = config[key];
    }
    }
    }
    
    export default properties;