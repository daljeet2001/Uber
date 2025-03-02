const axios = require('axios');
const rideModel = require('../../ride/models/ride.model');
const mapService = require('../../maps/services/maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // console.log(distanceTime);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;


}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

async function getUserDetails(userId) {
    const response = await axios.get(`${process.env.BASE_URL}/user/${userId}`);
    return response.data;
}

async function getCaptainDetails(captainId) {
    const response = await axios.get(`${process.env.BASE_URL}/captain/${captainId}`);
    return response.data;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    // console.log(captain.captain._id);
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain.captain._id
    });

    const ride = await rideModel.findOne({
        _id: rideId
    }).select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    // console.log(ride);


    // ride.user = await getUserDetails(ride.user);
    // ride.captain = await getCaptainDetails(ride.captain);

    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    });

    // ride.user = await getUserDetails(ride.user);
    // ride.captain = await getCaptainDetails(ride.captain);

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    // console.log(captain)
    // console.log(rideId)
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain.captain._id
    }).select('+otp');
    console.log(ride);

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    });

    // ride.user = await getUserDetails(ride.user);
    // ride.captain = await getCaptainDetails(ride.captain);

    return ride;
}
