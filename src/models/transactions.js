const conn = require('../configs/connect')

module.exports = {
    getTransactions: (limit, offset, condition) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) as data from transactions ${condition}`, (err, rows)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    let dataTotal = rows[0].data
                    conn.query(`SELECT * FROM transactions ${condition} limit ${offset}, ${limit}`, (err, data)=>{
                        if(err){
                            reject(new Error(err))
                        }else{
                            let result = {dataTotal, data}
                            resolve(result)
                        }
                    })
                } 
            })
        })
    },
    addTransaction: (data) => {
        return new Promise((resolve, reject) =>{
            conn.query('INSERT INTO transactions SET ?', data, (err, result) =>{
                if(!err){
                    let message = 'Data Added Successfully'
                    resolve(message)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteTransactions: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM transactions where id = ?', id, (err) => {
                if(!err){
                    let message = 'Data Deleted Successfully'
                    resolve(message)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}