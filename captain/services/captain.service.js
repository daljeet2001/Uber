const captainModel = require('../../captain/models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}

module.exports.getCaptainsInTheRadius = async ({
    ltd, lng, radius   
}) => {
    // const { ltd, lng, radius } = req.query;

    if (!ltd || !lng || !radius) {
        return res.status(400).send('Latitude, longitude, and radius are required');
    }
    // console.log('ltd', ltd, 'lng', lng, 'radius', radius);
    //        res.status(200).send('ok');

    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371]
                }
            }
        });
       return captains;
    } catch (error) {
        console.error(error);
     
    }
};
