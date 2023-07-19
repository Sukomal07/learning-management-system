const createError = (statusCode, message) =>{
    const err = new Error()
    this.statusCode = statusCode
    this.message = message
    return err
}
export default createError