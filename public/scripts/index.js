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
        $("#device-types").append(`<li>${device_type.type} (${device_type.protocol})</li>`)
    })
    console.log(status)
})

$.get("http://localhost:3001/devices?type=DHT_11", (data, status) => {
    data.forEach((dht_11) => {
        console.log(dht_11)
        let dht = new DHT_11(dht_11.name)
        devices.push(dht)
        $("#dht_11s").append(`<li id=${dht_11.name}>${dht_11.name} - Temp: <span class="temperature">${dht_11.temp}</span>, Humidity: <span class="humidity">${dht_11.humidity}</span></li>`)
    })
})
