/**
 * Created by linten01 on 2016/5/10 0010.
 */

module.exports = {
    entry:{
        index:"./index.es6",
        clock:"./clock.es6"
    },
    output:{
        path:"./static/js/",
        filename:"[name].js"
    },
    devServer:{
        inline:true,
        hot:true
    },
    module:{
        loaders:[{
                text:/\.js|\.es6$/,
                exclude:"/node_modules/",
                loaders:['babel']
            },
            {
                test:/\.(css)$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader:"url-loader?limit=8192"
            }
        ]
    }
}