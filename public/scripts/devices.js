class Simple_Switch {

    constructor(device) {
        this.device = device
        this.id = "#" + device.id
        this.html = `
        <div id=${device.id} class=simple-switch>
            <p>${device.name}</p>
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>
      `
      this.switch = null
    }

    init(parent) {
        $(parent).append(this.html)
        this.switch = $(this.id).find('input')
        this.switch.click(() => {
            this.toggle()
        })
    }

    set_state(state) {
        this.switch.prop("checked", state)
    }

    toggle() {
        this.device.toggle(this.switch.prop('checked'))
    }

}

class Sonoff_Basic{

    constructor(data) {
        console.log("Loading Sonoff")
        this.data = data
        this.id = data._id
        this.name = data.name
        this.topic = data.topic

        this.display = null
        this.switch = null

    }

    render(parent) {
        this.dom_selector = this.name.split(" ").join("-").toLowerCase()
        this.display = new Simple_Switch(this)
        this.display.init(parent)
        this.display.set_state(this.data.state)
    }

    handle_update(data) {
        this.display.set_state(data.state)
    }

    toggle(state) {
        this.data.state = state
        $.post(`http://localhost:3001/devices/sonoff?id=${this.id}`, this.data)
    }
}

class Yeelight {

    constructor(data) {
        console.log("Loading Yeelight")
        this.data = data
        this.id = data._id
        this.name = data.name
        this.ip = data.addr
    }

    render(parent) {
        this.dom_selector = this.name.split(" ").join("-").toLowerCase()
        this.display = new Simple_Switch(this)
        this.display.init(parent)
        this.display.set_state(this.data.state.power)
    }

    handle_update(data) {
        console.log(data.state)
        this.display.set_state(data.state.power)
    }

    toggle(state) {
        this.data.state.power = state
        let msg = {
            "cmnd": "set_power",
            "data": this.data
        }
        $.post(`http://localhost:3001/devices/yeelight?id=${this.id}`, msg)
    }

}

class DHT_11 {

    constructor(name) {
        this.name = name
        this.dom_selector = "#" + name
    }

    update(data) {
        let elm = $(this.dom_selector)
        let temp = elm.find(".temperature")
        let humid = elm.find(".humidity")
        temp.html(data.temp)
        humid.html(data.humid)
    }

}

let DeviceLookup = {
    "Sonoff Basic": Sonoff_Basic,
    "Yeelight": Yeelight
}


