"use strict";

function DatePicker(id, dateSelection) {
    this.id = id;
    this.dateSelection = dateSelection;
    this.date;
}

DatePicker.prototype.render = function (date) {
    this.date = date;
    function doRend(_this) {
        // getMonth 0-11
        // getDate 1-31
        // getDay 0-6
        let datepicker = document.getElementById(_this.id);
        let child = datepicker.lastChild;
        while (child) {
            datepicker.removeChild(child);
            child = datepicker.lastChild;
        }

        let currentYear = _this.date.getFullYear();
        let currentMonth = _this.date.getMonth();
        let currentFirstDay = new Date(currentYear, currentMonth, 1).getDay(); // day of a week
        let currentFirstDate = 1;
        let currentLastDay = new Date(currentYear, currentMonth + 1, 0).getDay(); // day of a week
        let currentLastDate = new Date(currentYear, currentMonth + 1, 0).getDate(); // day of a month
        let currentNumFullWeek = (currentLastDate - (7 - currentFirstDay) - (currentLastDay + 1)) / 7;

        let pre = false;
        let preLastDate;
        let preNumDay;
        if (currentFirstDay !== 0) {
            pre = true;
            preLastDate = new Date(currentYear, currentMonth, 0).getDate(); // day of a month
            preNumDay = currentFirstDay;
        }
        let next = false;
        let nextFirstDate;
        let nextNumDay;
        if (currentLastDay !== 6) {
            next = true;
            nextFirstDate = 1;
            nextNumDay = 6 - currentLastDay;
        }


        // create and set element
        function csElement(parent, tagName, name, value, text = "") {
            let tmpElement = document.createElement(tagName);
            tmpElement.setAttribute(name, value);
            if (text !== "") {
                let tmpText = document.createTextNode(text);
                tmpElement.appendChild(tmpText);
            }
            parent.appendChild(tmpElement);
        }

        csElement(datepicker, "div", "class", "title-row");
        csElement(datepicker.lastElementChild, "div", "class", _this.id + "-title-row-button-backward", "<");
        let stringDate = _this.date.toDateString().split(" ");
        csElement(datepicker.lastElementChild, "div", "class", "title-row-title", stringDate[1] + " " + stringDate[3]);
        csElement(datepicker.lastElementChild, "div", "class", _this.id + "-title-row-button-forward", ">");

        csElement(datepicker, "div", "class", "week-row");
        let week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (let i = 0; i < 7; i++) {
            csElement(datepicker.lastElementChild, "div", "class", "week-row-name", week[i])
        }

        if (pre) {
            let tmpElementWeek = document.createElement("div");
            tmpElementWeek.setAttribute("class", "week");
            for (let i = 0; i < preNumDay; i++) {
                csElement(tmpElementWeek, "div", "class", "week-day-none", parseInt(preLastDate - (preNumDay - i) + 1));
            }
            for (let i = currentFirstDay; i < 7; i++) {
                csElement(tmpElementWeek, "div", "class", _this.id + "-week-day", parseInt(currentFirstDate++));
            }
            datepicker.appendChild(tmpElementWeek);
        }
        for (let j = 0; j < currentNumFullWeek; j++) {
            let tmpElementWeek = document.createElement("div");
            tmpElementWeek.setAttribute("class", "week");
            for (let i = 0; i < 7; i++) {
                csElement(tmpElementWeek, "div", "class", _this.id + "-week-day", parseInt(currentFirstDate++));
            }
            datepicker.appendChild(tmpElementWeek);
        }
        if (next) {
            let tmpElementWeek = document.createElement("div");
            tmpElementWeek.setAttribute("class", "week");
            for (let i = 0; i < 7 - nextNumDay; i++) {
                csElement(tmpElementWeek, "div", "class", _this.id +"-week-day", parseInt(currentFirstDate++));
            }
            for (let i = 7 - nextNumDay; i < 7; i++) {
                csElement(tmpElementWeek, "div", "class", "week-day-none", parseInt(nextFirstDate++));
            }
            datepicker.appendChild(tmpElementWeek);
        }

    }
    function addButtonEventListener(_this) {
        let button;
        button = document.getElementsByClassName(_this.id + "-title-row-button-backward");
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", function () {
                _this.render(new Date(_this.date.getFullYear(), _this.date.getMonth() - 1, 1));
            });
        }
        button = document.getElementsByClassName(_this.id + "-title-row-button-forward");
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", function () {
                _this.render(new Date(_this.date.getFullYear(), _this.date.getMonth() + 1, 1));
            });
        }
    }
    function addDayEventListener(_this) {
        let day = document.getElementsByClassName(_this.id + "-week-day");
        for (let i = 0; i < day.length; i++) {
            let stringDate = _this.date.toDateString().split(" ");
            day[i].addEventListener("click", function () {
                _this.dateSelection(_this.id, { "year": stringDate[3], "month": stringDate[1], "day": stringDate[2] });
            });

        }
    }

    doRend(this);
    addButtonEventListener(this);
    addDayEventListener(this);
};
