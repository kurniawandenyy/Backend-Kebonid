const model = require('../models/transactions')
const uuidv4 = require('uuid/v4')

module.exports = {
    getTransactions:(req, res) => {
        const cust_id = parseInt(req.params.id) || 1
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page-1)*limit
        const sort = req.query.sort || 'product_name'
        const order = req.query.order || 'asc'
        let condition = 'where customer_id='+cust_id+' order by '+sort+' '+order
        let url = req.originalUrl

        let nextPage = process.env.BASE_URL+url.replace(`page=${page}`, 'page='+parseInt(page+1))
        let prevPage = process.env.BASE_URL+url.replace(`page=${page}`, 'page='+parseInt(page-1))

        model.getTransactions(limit, offset, condition, cust_id)
        .then(result=>{
            let pageTotal = result.dataTotal%limit===0?result.dataTotal/limit:Math.floor((result.dataTotal/limit)+1)
            if(page>pageTotal || page===0){
                return res.status(200).json({
                    data: {
                        error: true,
                        message: '404 Page Not Found!',
                        page,
                        limit,
                        totalData: result.dataTotal,
                        totalPage: pageTotal,
                        Total: result.grandtotal,
                        result: result.data
                    }
                })
            }else if(page===1&&pageTotal!==1){
                return res.status(200).json({
                    data: {
                        error: false,
                        page,
                        nextPage,
                        limit,
                        totalData: result.dataTotal,
                        totalPage: pageTotal,
                        Total: result.grandtotal,
                        result: result.data
                    }
                })
            }else if(page===pageTotal&&pageTotal!==1){
                return res.status(200).json({
                    data: {
                        error: false,
                        page,
                        prevPage,
                        limit,
                        totalData: result.dataTotal,
                        totalPage: pageTotal,
                        Total: result.grandtotal,
                        result: result.data
                    }
                })
            }else if(pageTotal===1){
                return res.status(200).json({
                    data: {
                        error: false,
                        page,
                        limit,
                        totalData: result.dataTotal,
                        totalPage: pageTotal,
                        Total: result.grandtotal,
                        result: result.data
                    }
                })
            }else{
                // return miscHelper.response(res, 200, false, 'Success', result)
                return res.status(200).json({
                    data: {
                        error: false,
                        page,
                        nextPage,
                        prevPage,
                        limit,
                        totalData: result.dataTotal,
                        totalPage: pageTotal,
                        Total: result.grandtotal,
                        result: result.data
                    }
                })
            }
        })
    },
    addTransaction: (req, res) => {
        const id = uuidv4()
        const {customer_id, product_id, product_name, amount, price, status} = req.body
        const transaction_date = new Date()
        const data = {id, customer_id, product_id, product_name, amount, price, status, transaction_date}

        model.addTransaction(data)
        .then(result => {
            res.status(200).json({
                data: {
                    error: false,
                    result
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                data: {
                    error: true,
                    err
                }
            })
        })
    },
    deleteTransaction: (req, res) => {
        const id = req.params.id

        model.deleteTransactions(id)
        .then(result => {
            res.status(200).json({
                data:{
                    error: false,
                    message: result
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                data:{
                    error: true,
                    message: err
                }
            })
        })
    }

}