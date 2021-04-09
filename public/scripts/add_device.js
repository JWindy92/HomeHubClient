
$("#sonoff-form").hide()
$("#yeelight-form").hide()
$("#submit-btn").hide()

$.get("http://localhost:3001/devices/supported", (data, status) => {
    data.forEach((device_type) => {
        $("#device-list").append(`<option>${device_type.device_type}</option>`)
    })
    console.log(status)
})

// TODO: Will need to make this more maintainable for future expansion
$("#device-list").change(() => {
    let val = $("#device-list").val()
    if (val == 'Select Device') {
        $("#none-selected").show()
        $("#sonoff-form").hide()
        $("#submit-btn").hide()
    } else if (val == 'Sonoff Basic') {
        $("#none-selected").hide()
        $("#yeelight-form").hide()
        $("#sonoff-form").show()
        $("#submit-btn").show()
    } else if (val == 'Yeelight') {
        $("#none-selected").hide()
        $("#sonoff-form").hide()
        $("#yeelight-form").show()
        $("#submit-btn").show()
    } 
    else {
        console.log('Device not yet supported')
    }
})

// TODO: Will need to make this more maintainable for future expansion
$("#submit-btn").click(() => {
    let data = {}
    let type = $("#device-list").val()
    if (type == "Sonoff Basic") {
        data = {
            "type": $("#device-list").val(),
            "name": $("#sonoff-form .device-name").val(),
            "topic": $("#sonoff-form .mqtt-topic").val(),
            "state": false,
            "protocol": "mqtt"
        }
    } else if (type == "Yeelight") {
        data = {
            "type": $("#device-list").val(),
            "name": $("#yeelight-form .device-name").val(),
            "addr": $("#yeelight-form .addr").val(),
            "state": {
                "power": false
            },
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