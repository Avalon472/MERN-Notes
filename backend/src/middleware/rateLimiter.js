import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        //Limit param is typically user ID, though since user
        //auth isn't in this app a dummy string is passed
        const {success} = await ratelimit.limit("my-limit")

        if(!success) {
            return res.status(429).json({message:"Too many requests have been entered, please try again later"})
        }

        next()
        
    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    }
}

export default rateLimiter