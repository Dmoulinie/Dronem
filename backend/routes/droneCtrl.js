// Routes

const db_path = '../dronem.database.db'

module.exports = {
    getDrones : function(req,res){
        return res.status(200).json({'test' : 'SIUU'})
    }
}