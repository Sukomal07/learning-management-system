const errorMiddleware = (err, req, res, next) =>{
    const status = err.status || 500
    const message = err.message || "Something went wrong , Please check again"
    return res.status(status).json({
        success:false,
        status,
        message
    })
}

export default errorMiddleware