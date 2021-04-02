// $("#none-selected").hide()
// $("#device-fields").hide()
$("#sonoff-form").hide()
$("#submit-btn").hide()

$.get("http://localhost:3001/devices/supported", (data, status) => {
    data.forEach((device_type) => {
        $("#device-list").append(`<option>${device_type.device_type}</option>`)
    })
    console.log(status)
})

$("#device-list").change(() => {
    let val = $("#device-list").val()
    if (val == 'Select Device') {
        $("#none-selected").show()
        $("#sonoff-form").hide()
        // $("#device-fields").hide()
        $("#submit-btn").hide()
    } else if (val == 'Sonoff Basic') {
        $("#none-selected").hide()
        $("#sonoff-form").show()
        // $("#device-fields").show()
        $("#submit-btn").show()
    } else {
        console.log('Device not yet supported')
    }
})

// TODO: this currently is hardcoded for Sonoff Basic devices, should be dynamic
$("#submit-btn").click(() => {
    let data = {}
    let type = $("#device-list").val()
    if (type == "Sonoff Basic") {
        data = {
            "type": $("#device-list").val(),
            "name": $("#device-name").val(),
            "topic": $("#mqtt-topic").val(),
            "state": false,
            "protocol": "mqtt"
        }
    } else {
        console.log("Device not yet supported, will not save")
    }
    
    $.post("http://localhost:3001/add_device", data, (res) => {
        if (res.status == 200) {
            window.location.replace('/')
        }
    }).fail((err) => {
        console.log(err)
    })
})