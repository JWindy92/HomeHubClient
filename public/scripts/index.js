const socket = io("ws://localhost:3001")
devices = []
socket.on('message', (msg) => {
    $("#sock-msg").html(msg)
})

socket.on('update', (data) => {
    devices.forEach((device) => {
        if (device.name == data.name) {
            device.update(data)
        }
    })
})

let test_btn = $("#test-btn")

test_btn.click(() => {
    $.post("http://localhost:3001/test/update")
})

$.get("http://localhost:3001/devices/supported", (data, status) => {
    data.forEach((device_type) => {
        $("#device-types").append(`<li>${device_type.device_type} (${device_type.protocol})</li>`)
    })
    console.log(status)
})

$.get("http://localhost:3001/devices", (data, status) => {
    data.forEach((device) => {
        console.log(device)
        // let dht = new DHT_11(dht_11.name)
        // devices.push(dht)
        $("#devices").append(`<li id=${device.name}>${device.name} - Type: <span class="type">${device.type}</span></li>`)
    })
})

$.get("http://localhost:3001/devices?type=Sonoff%20Basic", (data, status) => {
    data.forEach((device) => {
        console.log(device)
        // let dht = new DHT_11(dht_11.name)
        // devices.push(dht)
        $("#sonoff-devs").append(`<li id=${device.name}>${device.name} - Type: <span class="type">${device.type}</span></li>`)
    })
})
