"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector(".input");
input === null || input === void 0 ? void 0 : input.addEventListener("keyup", handleInput);
const para = document.querySelector(".p");
const container = document.querySelector(".meaning-container");
const title = document.querySelector(".title");
const meaning = document.querySelector(".meaning");
const audio = document.querySelector("#audio");
function handleInput(event) {
    const target = event.target;
    if (target) {
        if (target.value && event.key === "Enter") {
            fetchAPI(target.value);
        }
    }
}
function fetchAPI(word) {
    return __awaiter(this, void 0, void 0, function* () {
        if (para) {
            para.innerText = `Searching the meaning of ${word}...`;
        }
        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            const response = yield fetch(url);
            const data = yield response.json();
            if (para && container && title && meaning && audio) {
                para.style.display = "none";
                container.style.display = "block";
                title.innerText = data[0].word;
                meaning.innerText = data[0].meanings[0].definitions[0].definition;
                audio.src = data[0].phonetics[0].audio;
            }
        }
        catch (err) {
            console.log("error");
        }
    });
}
