const input = document.querySelector<HTMLInputElement>(".input");
input?.addEventListener("keyup", handleInput);
const para: HTMLParagraphElement | null = document.querySelector(".p");
const container: HTMLDivElement | null =
  document.querySelector(".meaning-container");
const title: HTMLParagraphElement | null = document.querySelector(".title");
const meaning: HTMLSpanElement | null = document.querySelector(".meaning");
const audio: HTMLAudioElement | null = document.querySelector("#audio");

function handleInput(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  if (target) {
    if (target.value && event.key === "Enter") {
      fetchAPI(target.value);
    }
  }
}

async function fetchAPI(word: string) {
  if (para) {
    para.innerText = `Searching the meaning of ${word}...`;
  }
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const data = await response.json();
    if (para && container && title && meaning && audio) {
      para.style.display = "none";
      container.style.display = "block";
      title.innerText = data[0].word;
      meaning.innerText = data[0].meanings[0].definitions[0].definition;
      audio.src = data[0].phonetics[0].audio;
    }
  } catch (err) {
    console.log("error");
  }
}
