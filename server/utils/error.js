const createError = (statusCode, message) =>{
    const err = new Error()
    err.statusCode = statusCode
    err.message = message
    return err
}
export default createError