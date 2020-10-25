const isEmpty = (value)=>  value === undefined || value === null || (value === 'object' && Object.keys(value).length === 0)
                            || (value === 'string' && value.trim().length === 0);
                        
export default isEmpty;