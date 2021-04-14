const socket = io("ws://localhost:3001")

devices = []

socket.on('message', (msg) => {
    console.log(msg)
})

socket.on('update', (data) => {
    devices.forEach((device) => {
        if (device.id == data._id) {
            device.handle_update(data)
        }
    })
})

$.get("http://localhost:3001/devices", (data, status) => {
    data.forEach((device) => {
        console.log(device)
        let type = DeviceLookup[device.type]
        let dev = new type(device)
        devices.push(dev)
        dev.render("#device-panel")
    })
})

