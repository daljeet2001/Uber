const jwt = require('jsonwebtoken');
const axios = require('axios');



module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const response1 = await axios.post(`${process.env.BASE_URL}/user/check-token`, {
            
                token: token
            
        });
        if(response1.status === 400) {
            return res.status(401).json({ message: 'Unauthorized' });
        }



        const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;

        next();

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const response = await axios.get(`${process.env.BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const captain = response.data;

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;

        next();

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}