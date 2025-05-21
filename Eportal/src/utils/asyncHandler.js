const asyncHandler = (reqeustHandler) => {
    (req,res,next) => {
        Promise.resolve(reqeustHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

//         try {
//             await fn(req,res,next)

//         } catch (error) {
//             res.status(err.code || 500 ).json({
//                 success:false,
//                 message: err.message
//             })
//         }

// }