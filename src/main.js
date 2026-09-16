// Change these three values when you add your song as song.mp3 in the repo root.
const song = {
  title: "Do you wanna guess what this song is?",
  artist: "The Smiths",
  file: "song.mp3"
};

const letter = [
  "hi hrishit,",
  "It’s kind of crazy that we started dating one whole year ago. it seems like its been 15 at least. but sometimes it feels more like we started dating yesterday. I’ve been trying to write this letter for so long i sometmes have to read the entire thing again to see what ive missed but there are so many things i want to tell you and so little words to express them to you it becomes hard. and i want to tell you all things ek saath and i never know how to start its as if we could talk forever and still never run out of things to talk about.",
  "I still remember when you first started wiggling discreetly towards me like a worm and me telling you beech beech mein that you would get glitter all over you to which you just smirked that incredibly rage baity smirk of yours (if i was ragebaited back then think of how much you rage me now 😏). we’ve come so far. we have built up so much lore we’ve combined our lives so much and the mere idea that you’re going to be leaving very soon kills me every time you bring it up. ek toh i dont understand why you have to bring it up so much i cherish the time we have so much and i know i kick start fights like a mad woman and get pissed at everything but i hope you know that all of that is after i hold off like 70% of the gut reaction to say something. you have chosen a monster always remember. but hrishit, at the end of the day— i love you. i love you so so much. i love you like the mornings love the sun the way rain loves grass i love you beyond comprehension and i never thought i could ever love anyone this much. i love the way you smile i love the way you laugh i even love the way you wink at me i love the way you look at me in the mornings when you’re still half asleep i love the way you do a puppy dog face whenever you want to look cute and then you do actually start looking cute i love the way you handle me when im mad or upset and cant talk i love the way you make me talk i love the way your hair tangles itself with my fingers i love the way your eyes close everytime i let my fingers drift to your face i love the way you manically kiss me (even when im already overstimulated) i love how you watch the most inane youtube videos and i love the way you order food as soon as you realise im hungry i love how caring you are hrishit and i love how calm you make me. i love how you make me feel so much. i love you for all that you are and i will always love you hrishit. you are my heart you are my soul. always rememebr that the key my heart is with you. to many more years to come hrishit. i love you",
  "yours,\n\ndishi"
];

const text = document.querySelector("#letter-text");
const skip = document.querySelector("#skip");
const replay = document.querySelector("#replay");
const caret = document.querySelector("#caret");
const playerHint = document.querySelector("#player-hint");
const play = document.querySelector("#play");
const audio = document.querySelector("#audio");
let timer;

document.querySelector("#song-title").textContent = song.title;
document.querySelector("#song-artist").textContent = song.artist;
audio.src = song.file;

function renderComplete() {
  clearTimeout(timer);
  text.replaceChildren(...letter.map((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    return p;
  }));
  caret.classList.add("is-hidden");
  skip.classList.add("is-hidden");
  replay.classList.remove("is-hidden");
}

function typeLetter() {
  clearTimeout(timer);
  text.innerHTML = "";
  caret.classList.remove("is-hidden");
  skip.classList.remove("is-hidden");
  replay.classList.add("is-hidden");
  const content = letter.join("\n\n");
  let position = 0;
  const p = document.createElement("p");
  text.append(p);
  function typeNext() {
    const character = content[position++];
    if (character === "\n") {
      if (content[position] === "\n") { position++; text.append(document.createElement("p")); }
      else p.append(document.createElement("br"));
    } else {
      const current = text.lastElementChild;
      current.append(character);
    }
    if (position < content.length) timer = setTimeout(typeNext, 11);
    else renderComplete();
  }
  typeNext();
}

skip.addEventListener("click", renderComplete);
replay.addEventListener("click", typeLetter);

play.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      play.classList.add("is-playing");
      playerHint.textContent = "now playing";
    } catch {
      playerHint.textContent = "add public/song.mp3 first";
    }
  } else {
    audio.pause();
  }
});
audio.addEventListener("pause", () => play.classList.remove("is-playing"));
audio.addEventListener("ended", () => { play.classList.remove("is-playing"); playerHint.textContent = "press play to begin"; });

typeLetter();
