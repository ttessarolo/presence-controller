# Presence Controller

The `presence-controller` library provides two functions to interact with devices connected to a WiFi router (Vodafone Station 6). These functions can be used in home automation to automate routines based on the actual presence of one or more individuals connected with their mobile phones to the home WiFi network.

## Functions

### `getMACs`

The `getMACs` function retrieves all MAC addresses of devices connected to the WiFi router.

### `getPresences`

The `getPresences` function checks for the presence of specified MAC addresses among the devices connected to the WiFi router.

## Usage

### Environment Variables

The following environment variables need to be set:

- `ROUTER_ADDRESS`: The address of the router.
- `OVERVIEW_PAGE`: The overview page of the router (default: `/overview.html`).
- `LOGIN_USERNAME`: The username for logging into the router.
- `LOGIN_PASSWORD`: The password for logging into the router.
- `PRESENCE_MAC_ADDRESSES`: A comma-separated list of MAC addresses to check for presence [OPTIONAL].

### Function Parameters

Alternatively, you can pass the configuration as an object to the functions:

- `ROUTER_ADDRESS`: The address of the router.
- `OVERVIEW_PAGE`: The overview page of the router (default: `/overview.html`).
- `LOGIN_USERNAME`: The username for logging into the router.
- `LOGIN_PASSWORD`: The password for logging into the router.
- `PRESENCE_MAC_ADDRESSES`: A comma-separated list of MAC addresses to check for presence [OPTIONAL].

## Examples

### `getMACs`

```javascript
import { getMACs } from "presence-controller";

const config = {
  ROUTER_ADDRESS: "192.168.1.1",
  OVERVIEW_PAGE: "/overview.html",
  LOGIN_USERNAME: "admin",
  LOGIN_PASSWORD: "password"
};

getMACs(config)
  .then((macs) => {
    console.log(`Connected MAC addresses: ${Array.from(macs).join(", ")}`);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
```

### `getPresences`

```javascript
import { getPresences } from "presence-controller";

const config = {
  ROUTER_ADDRESS: "192.168.1.1",
  OVERVIEW_PAGE: "/overview.html",
  LOGIN_USERNAME: "admin",
  LOGIN_PASSWORD: "password",
  PRESENCE_MAC_ADDRESSES: "00:11:22:33:44:55,66:77:88:99:AA:BB"
};

getPresences(config)
  .then((presence) => {
    console.log(`Presence detected: ${presence}`);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
```

## Result

### `getMACs`

The function returns a promise that resolves to a set containing all the MAC addresses found among the connected devices.

### `getPresences`

The function returns a promise that resolves to a boolean value indicating whether all specified MAC addresses are present among the connected devices.

## Applications

These functions can be used in home automation to automate routines based on the actual presence of one or more individuals connected with their mobile phones to the home WiFi network. For example, you can use them to:

- Turn on lights when someone arrives home.
- Adjust the thermostat based on who is present.
- Enable or disable security systems.
- Start automatic cleaning robots when no one is home.
- Send notifications when specific individuals arrive or leave.
