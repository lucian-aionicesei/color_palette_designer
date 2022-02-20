"use strict";

window.addEventListener("DOMContentLoaded", init);

let allColors = [{
        hex: "#c0ffee",
        rgb: "rgb0",
        hsl: {
            h: "",
            s: "",
            l: ""
        }
    },
    {
        hex: "#bada55",
        rgb: "rgb1",
        hsl: {
            h: "",
            s: "",
            l: ""
        }
    },
    {
        hex: "#00ff00",
        rgb: "rgb2",
        hsl: {
            h: "",
            s: "",
            l: ""
        }
    },
    {
        hex: "#ff0000",
        rgb: "rgb3",
        hsl: {
            h: "",
            s: "",
            l: ""
        }
    },
    {
        hex: "hex4",
        rgb: "rgb4",
        hsl: {
            h: "",
            s: "",
            l: ""
        }
    }
];

const Color = {
    hex: "",
    rgb: {r: "", g: "", b: ""},
    hsl: {h: "", s: "", l: ""}
}

function init() {
    console.log("Ready");
    showColor();
    document.querySelector("#color_selector").addEventListener('input', showColor);
}

function getColor() {
    let colorInput = document.querySelector("#color_selector");
    // console.log("Get color works");
    return colorInput.value;
}

function getHarmony() {
    let harmony = document.querySelector("#harmonies");
    // console.log("Get harmony works");
    return harmony.value;
}

function showColor() {

    // getHarmony();
    // document.querySelector("#harmonies").addEventListener('input', getHarmony)
    // let hexString = getColor();
    // let rgbValue = hexToRGB(hexString);
    // let hexValue = rgbToHEX(rgbValue);
    // let hslValue = rgbToHSL(rgbValue);
    // displayColor(hexValue);
    // showHexColor(hexValue);
    // showRBGColor(rgbValue);
    // showHSLColor(hslValue);

    // Get harmony
    let harmonyValue = getHarmony();
    // console.log(harmonyValue);

    // Get the color input
    let hexString = getColor();
    let rgbValue = hexToRGB(hexString);
    let hslValue = rgbToHSL(rgbValue);
    // console.log(hslValue);

    // Alter values of the array based on harmony
    paletteGenerator(harmonyValue, hslValue);

    // console.log(allColors);

    let allColorTiles = document.querySelectorAll(".color-tile");
    allColorTiles.forEach((element, index) => {
        testShowFunction(element, index);
    });
}

function testShowFunction(htmlElem, index) {
    // console.log(htmlElem);
    // console.log(index);
    let colorDisplay = htmlElem.querySelector(".color-display");
    // console.log(colorDisplay);
    colorDisplay.style.backgroundColor = allColors[index].hex;
    let colorCodesElem = htmlElem.querySelector(".color-codes");
    // console.log(colorCodesElem);
    colorCodesElem.querySelector('.hex_code').innerHTML = allColors[index].hex;
    colorCodesElem.querySelector('.rgb_code').innerHTML = showRBGColor(allColors[index].rgb);
    let hslTextElem = colorCodesElem.querySelector('.hsl_code');
    showHSLColor(hslTextElem, index);
}

function displayColor(hexValue) {
    document.querySelector("#color2 .color-display").style.backgroundColor = hexValue;
}

function showHexColor(hexValue) {
    document.querySelector("#color2 .hex_code").innerHTML = hexValue;
}

function showRBGColor(rgbObject) {
    return `${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}`;
}

function showHSLColor(textElem, index) {

    // console.log(textElem);

    let h = (allColors[index].hsl.h.toFixed()).toString();
    let s = (allColors[index].hsl.s.toFixed()).toString();
    let l = (allColors[index].hsl.l.toFixed()).toString();

    textElem.innerHTML = `${h}. ${s}%, ${l}%`;
}

function hexToRGB(hexString) {
    hexString.replaceAll(" ", "");

    // console.log(hexString);
    let r = parseInt(hexString.substring(1, 3), 16);
    let g = parseInt(hexString.substring(3, 5), 16);
    let b = parseInt(hexString.substring(5), 16);

    return {
        r,
        g,
        b
    };
}

function rgbToCssColor(rgbObject) {
    let r = rgbObject.r;
    let g = rgbObject.g;
    let b = rgbObject.b;

    return `rgb(${r}, ${g}, ${b})`
}

function rgbToHEX(rgbObject) {

    let redHexValue = rgbObject.r.toString(16);

    if (redHexValue.length == 1) {
        redHexValue = "0" + redHexValue;
    }

    let greenHexValue = rgbObject.g.toString(16);
    if (greenHexValue.length == 1) {
        greenHexValue = "0" + greenHexValue;
    }

    let blueHexValue = rgbObject.b.toString(16);
    if (blueHexValue.length == 1) {
        blueHexValue = "0" + blueHexValue;
    }

    let hexString = '#' + redHexValue + greenHexValue + blueHexValue;

    return hexString;

}

function rgbToHSL(rgbValue) {

    let r = rgbValue.r;
    let g = rgbValue.g;
    let b = rgbValue.b;

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return {
        h,
        s,
        l
    }
}

function hslToRGB(hslObject) {
    let h = hslObject.h;
    let s = hslObject.s / 100;
    let l = hslObject.l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // console.log("hslToRGB works");
    return {r, g, b};
}

function paletteGenerator(harmony, hslValue) {
    // console.log(allColors);

    if (harmony == "analogous") {
        generateAnalogous(hslValue);
    }

    // console.log(hslToRGB(allColors[0].hsl));
    for (let i = 0; i < 5; i++) {
        let rgbObject = hslToRGB(allColors[i].hsl);
        allColors[i].rgb = rgbObject;
        allColors[i].hex = rgbToHEX(rgbObject);
    }

}

function generateAnalogous(hslValue) {
    // console.log(hslValue);
    // console.log(allColors);
    allColors[0].hsl.h = hslValue.h + 10;
    allColors[0].hsl.s = hslValue.s;
    allColors[0].hsl.l = hslValue.l;

    allColors[1].hsl.h = hslValue.h - 10;
    allColors[1].hsl.s = hslValue.s;
    allColors[1].hsl.l = hslValue.l;

    allColors[2].hsl.h = hslValue.h;
    allColors[2].hsl.s = hslValue.s;
    allColors[2].hsl.l = hslValue.l;

    allColors[3].hsl.h = hslValue.h + 20;
    allColors[3].hsl.s = hslValue.s;
    allColors[3].hsl.l = hslValue.l;

    allColors[4].hsl.h = hslValue.h - 20;
    allColors[4].hsl.s = hslValue.s;
    allColors[4].hsl.l = hslValue.l;
}