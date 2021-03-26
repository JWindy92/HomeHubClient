// $("#none-selected").hide()
$("#device-fields").hide()
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
        $("#device-fields").hide()
        $("#submit-btn").hide()
    } else if (val == 'Sonoff Basic') {
        $("#none-selected").hide()
        $("#device-fields").show()
        $("#submit-btn").show()
    } else {
        console.log('Device not yet supported')
    }
})

$("#submit-btn").click(() => {
    let data = {
        "type": $("#device-list").val(),
        "name": $("#device-name").val(),
        "topic": $("#mqtt-topic").val()
    }
    $.post("http://localhost:3001/add_device", data, (res) => {
        if (res.status == 200) {
            window.location.replace('/')
        }
    }).fail((err) => {
        console.log(err)
    })
})