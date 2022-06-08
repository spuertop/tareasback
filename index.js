const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

//Conexion a DB

//Middlewares
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Routes
app.use('/api/users', require('./routes/users.router'));
app.use('/api/login', require('./routes/login.router'));
app.use('/api/records', require('./routes/records.router'));
app.use('/api/workplaces', require('./routes/workplaces.router'));
app.use('/api/customers', require('./routes/custormers.router'));
app.use('/test', require('./routes/test.routes'))

//Midds para Vue-history
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//Server ON
app.set('port', process.env.PORT || port);
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'))
})