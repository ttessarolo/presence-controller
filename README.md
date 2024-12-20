# Presence Controller

The `presence-controller` function checks for the presence of specified MAC addresses among the devices connected to a WiFi router (Vodafone Station 6). This can be used in home automation to automate routines based on the actual presence of one or more individuals connected with their mobile phones to the home WiFi network.

## Usage

### Environment Variables

The following environment variables need to be set:

- `ROUTER_ADDRESS`: The address of the router.
- `OVERVIEW_PAGE`: The overview page of the router (default: `/overview.html`).
- `LOGIN_USERNAME`: The username for logging into the router.
- `LOGIN_PASSWORD`: The password for logging into the router.
- `PRESENCE_MAC_ADDRESSES`: A comma-separated list of MAC addresses to check for presence.

### Function Parameters

Alternatively, you can pass the configuration as an object to the `getPresences` function:

- `ROUTER_ADDRESS`: The address of the router.
- `OVERVIEW_PAGE`: The overview page of the router (default: `/overview.html`).
- `LOGIN_USERNAME`: The username for logging into the router.
- `LOGIN_PASSWORD`: The password for logging into the router.
- `PRESENCE_MAC_ADDRESSES`: A comma-separated list of MAC addresses to check for presence.

### Example

```javascript
import getPresences from "presence-controller";

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

The function returns a promise that resolves to a boolean value indicating whether all specified MAC addresses are present among the connected devices.

## Applications

This function can be used in home automation to automate routines based on the actual presence of one or more individuals connected with their mobile phones to the home WiFi network. For example, you can use it to:

- Turn on lights when someone arrives home.
- Adjust the thermostat based on who is present.
- Enable or disable security systems.
- Start automatic cleaning robots when no one is home.
- Send notifications when specific individuals arrive or leave.
