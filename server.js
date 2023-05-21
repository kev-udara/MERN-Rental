const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const port = process.env.PORT || 4000
const dbConnection = require('./db')

app.use(fileUpload());
app.use(express.json({ limit: '10mb' }))

app.use('/api/cars/', require('./routes/carsRoute'))
app.use('/api/users/', require('./routes/usersRoute'))
app.use('/api/bookings/', require('./routes/bookingsRoute'))
app.use('/api/accessories/', require('./routes/accessoriesRoute'))
app.use('/api/admin/', require('./routes/adminRoute'))
app.use('/api/reports/', require('./routes/reportsRoute'))
app.use('/api/requests/', require('./routes/requestsRoute'))

const path = require('path')
if(process.env.NODE_ENV == 'production')
{
    app.use('/', express.static('client/build'))

    app.get('*' , (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    })
}

app.get('/',(req,res)=> res.send('Hello World!'))
app.listen(port,()=> console.log(`Node JS Server Started in Port ${port}`))
