import { globalError } from "../middleware/globalError.js"
import addressRouter from "./adress/adress.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"

export const bootstrap = (app)=>{
    app.get("/", (req, res)=>{
        res.json("welcome back backend dev :)")
    })
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subcategories',subCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/reviews',reviewRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/address',addressRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',cartRouter)
    app.use('/api/v1/order',orderRouter)
    app.use(globalError)
}