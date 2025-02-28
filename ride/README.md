# User Routes Documentation

## Endpoints

### Register User

**URL:** `/register`

**Method:** `POST`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string (min: 3 characters)",
    "lastname": "string (optional, min: 3 characters)"
  },
  "email": "string (valid email)",
  "password": "string (min: 6 characters)"
}
```

**Responses:**

- `201 Created`: User successfully registered.
  ```json
  {
    "token": "string",
    "user": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```
- `400 Bad Request`: Validation error or user already exists.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```

### Login User

**URL:** `/login`

**Method:** `POST`

**Description:** Logs in an existing user.

**Request Body:**
```json
{
  "email": "string (valid email)",
  "password": "string (min: 6 characters)"
}
```

**Responses:**

- `200 OK`: User successfully logged in.
  ```json
  {
    "token": "string",
    "user": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `401 Unauthorized`: Invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Get User Profile

**URL:** `/profile`

**Method:** `GET`

**Description:** Retrieves the profile of the authenticated user.

**Headers:**
- `Authorization`: `Bearer <token>`

**Responses:**

- `200 OK`: User profile retrieved successfully.
  ```json
  {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
  ```
- `401 Unauthorized`: User not authenticated.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Logout User

**URL:** `/logout`

**Method:** `GET`

**Description:** Logs out the authenticated user.

**Headers:**
- `Authorization`: `Bearer <token>`

**Responses:**

- `200 OK`: User successfully logged out.
  ```json
  {
    "message": "Logged out"
  }
  ```
- `401 Unauthorized`: User not authenticated.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

# Captain Routes Documentation

## Endpoints

### Register Captain

**URL:** `/register`

**Method:** `POST`

**Description:** Registers a new captain.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string (min: 3 characters)",
    "lastname": "string (optional, min: 3 characters)"
  },
  "email": "string (valid email)",
  "password": "string (min: 6 characters)",
  "vehicle": {
    "color": "string (min: 3 characters)",
    "plate": "string (min: 3 characters)",
    "capacity": "number (min: 1)",
    "vehicleType": "string (car, motorcycle, auto)"
  }
}
```

**Responses:**

- `201 Created`: Captain successfully registered.
  ```json
  {
    "token": "string",
    "captain": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      }
    }
  }
  ```
- `400 Bad Request`: Validation error or captain already exists.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```

### Login Captain

**URL:** `/login`

**Method:** `POST`

**Description:** Logs in an existing captain.

**Request Body:**
```json
{
  "email": "string (valid email)",
  "password": "string (min: 6 characters)"
}
```

**Responses:**

- `200 OK`: Captain successfully logged in.
  ```json
  {
    "token": "string",
    "captain": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      }
    }
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `401 Unauthorized`: Invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Get Captain Profile

**URL:** `/profile`

**Method:** `GET`

**Description:** Retrieves the profile of the authenticated captain.

**Headers:**
- `Authorization`: `Bearer <token>`

**Responses:**

- `200 OK`: Captain profile retrieved successfully.
  ```json
  {
    "captain": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      }
    }
  }
  ```
- `401 Unauthorized`: Captain not authenticated.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Logout Captain

**URL:** `/logout`

**Method:** `GET`

**Description:** Logs out the authenticated captain.

**Headers:**
- `Authorization`: `Bearer <token>`

**Responses:**

- `200 OK`: Captain successfully logged out.
  ```json
  {
    "message": "Logged out"
  }
  ```
- `401 Unauthorized`: Captain not authenticated.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

# Map Routes Documentation

## Endpoints

### Get Coordinates

**URL:** `/get-coordinates`

**Method:** `GET`

**Description:** Retrieves the coordinates for a given address.

**Query Parameters:**
- `address`: `string (min: 3 characters)`

**Responses:**

- `200 OK`: Coordinates retrieved successfully.
  ```json
  {
    "ltd": "number",
    "lng": "number"
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `404 Not Found`: Coordinates not found.
  ```json
  {
    "message": "Coordinates not found"
  }
  ```

### Get Distance and Time

**URL:** `/get-distance-time`

**Method:** `GET`

**Description:** Retrieves the distance and time between origin and destination.

**Query Parameters:**
- `origin`: `string (min: 3 characters)`
- `destination`: `string (min: 3 characters)`

**Responses:**

- `200 OK`: Distance and time retrieved successfully.
  ```json
  {
    "distance": {
      "text": "string",
      "value": "number"
    },
    "duration": {
      "text": "string",
      "value": "number"
    }
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Get AutoComplete Suggestions

**URL:** `/get-suggestions`

**Method:** `GET`

**Description:** Retrieves autocomplete suggestions for a given input.

**Query Parameters:**
- `input`: `string (min: 3 characters)`

**Responses:**

- `200 OK`: Suggestions retrieved successfully.
  ```json
  {
    "suggestions": [
      "string"
    ]
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

# Ride Routes Documentation

## Endpoints

### Create Ride

**URL:** `/create`

**Method:** `POST`

**Description:** Creates a new ride.

**Request Body:**
```json
{
  "pickup": "string (min: 3 characters)",
  "destination": "string (min: 3 characters)",
  "vehicleType": "string (auto, car, moto)"
}
```

**Responses:**

- `201 Created`: Ride successfully created.
  ```json
  {
    "_id": "string",
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "otp": "string"
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Get Fare

**URL:** `/get-fare`

**Method:** `GET`

**Description:** Retrieves the fare for a ride.

**Query Parameters:**
- `pickup`: `string (min: 3 characters)`
- `destination`: `string (min: 3 characters)`

**Responses:**

- `200 OK`: Fare retrieved successfully.
  ```json
  {
    "auto": "number",
    "car": "number",
    "moto": "number"
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Confirm Ride

**URL:** `/confirm`

**Method:** `POST`

**Description:** Confirms a ride.

**Request Body:**
```json
{
  "rideId": "string (valid MongoDB ObjectId)"
}
```

**Responses:**

- `200 OK`: Ride successfully confirmed.
  ```json
  {
    "_id": "string",
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "otp": "string"
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Start Ride

**URL:** `/start-ride`

**Method:** `GET`

**Description:** Starts a ride.

**Query Parameters:**
- `rideId`: `string (valid MongoDB ObjectId)`
- `otp`: `string (6 characters)`

**Responses:**

- `200 OK`: Ride successfully started.
  ```json
  {
    "_id": "string",
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "otp": "string"
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

### End Ride

**URL:** `/end-ride`

**Method:** `POST`

**Description:** Ends a ride.

**Request Body:**
```json
{
  "rideId": "string (valid MongoDB ObjectId)"
}
```

**Responses:**

- `200 OK`: Ride successfully ended.
  ```json
  {
    "_id": "string",
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "otp": "string"
  }
  ```
- `400 Bad Request`: Validation error.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
- `500 Internal Server Error`: Internal server error.
  ```json
  {
    "message": "Internal server error"
  }
  ```
