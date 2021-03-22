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