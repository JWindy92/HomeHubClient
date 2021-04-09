class Simple_Switch {

    constructor(id, label) {
        this.id = "#" + id
        this.html = `
        <div id=${id} class=simple-switch>
            <p>${label}</p>
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
    }

    set_state(state) {
        this.switch.prop("checked", state)
    }

    toggle() {
        if (this.switch.prop('checked')) {
            this.set_state(false)
        } else {
            this.set_state(true)
        }
    }

}

class Sonoff_Basic{

    constructor(data) {
        this.data = data
        this.id = data._id
        this.name = data.name
        this.topic = data.topic

        this.display = null
        this.switch = null

    }

    render(parent) {
        this.dom_selector = this.name.split(" ").join("-").toLowerCase()
        this.display = new Simple_Switch(this.dom_selector, this.name)
        this.display.init(parent)
        this.switch = this.display.switch
        this.switch.change(() => {
            this.update_state(
                this.switch.prop("checked"))
        })
    }

    handle_update(data) {
        this.display.set_state(data.state)
    }

    update_state(state) {
        this.data.state = state
        $.post(`http://localhost:3001/devices/sonoff?id=${this.id}`, this.data)
    }

}

class Yeelight {

    constructor(data) {
        this.data = data
        this.id = data._id
        this.name = data.name
        this.ip = data.ip
    }

    render(parent) {
        this.dom_selector = this.name.split(" ").join("-").toLowerCase()
        this.display = new Simple_Switch(this.dom_selector, this.name)
        this.display.init(parent)
        this.switch = this.display.switch
        this.switch.change(() => {
            this.data.state.power = this.switch.prop("checked")
            let msg = {
                "cmnd": "set_power",
                "data": this.data
            }
            this.update_state(msg)
        })
    }

    handle_update(data) {
        console.log(data.state)
        this.display.set_state(data.state.power)
    }

    update_state(data) {
        $.post(`http://localhost:3001/devices/yeelight?id=${this.id}`, data)
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


