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

// $.get("http://localhost:3001/devices/supported", (data, status) => {
//     data.forEach((device_type) => {
//         $("#device-types").append(`<li>${device_type.device_type} (${device_type.protocol})</li>`)
//     })
//     console.log(status)
// })

$.get("http://localhost:3001/devices", (data, status) => {
    data.forEach((device) => {
        let dev = new Sonoff_Basic(device)
        // let dht = new DHT_11(dht_11.name)
        devices.push(dev)
        dev.render("#device-panel")
    })
})

// $.get("http://localhost:3001/devices?type=Sonoff%20Basic", (data, status) => {
//     data.forEach((device) => {
//         console.log(device)
//         // let dht = new DHT_11(dht_11.name)
//         // devices.push(dht)
//         $("#sonoff-devs").append(`<li id=${device.name}>${device.name} - Type: <span class="type">${device.type}</span></li>`)
//     })
// })
