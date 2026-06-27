const hikes = [
  {
    name: "Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
  },
  {
    name: "Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
  },
  {
    name: "Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
  },
  {
    name: "Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
  },
  {
    name: "Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world.",
  }
];

// select elements
let hikeContainer = document.querySelector("#hike-container");
let button = document.querySelector("button");

// search event
button.addEventListener("click", search);

// search function
function search() {
  let hikeQuery = document.querySelector("#search").value;

  let filteredHikes = hikes.filter(function(hike) {
    return (
      hike.name.toLowerCase().includes(hikeQuery.toLowerCase()) ||
      hike.description.toLowerCase().includes(hikeQuery.toLowerCase()) ||
      hike.tags.find(tag =>
        tag.toLowerCase().includes(hikeQuery.toLowerCase())
      )
    );
  });

  // sort by distance
  let sortedHikes = filteredHikes.sort(compareHikes);

  function compareHikes(a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
  }

  // clear previous results
  hikeContainer.innerHTML = "";

  // render results
  sortedHikes.forEach(function(hike) {
    renderHike(hike);
  });
}

// create tags html
function tagTemplate(tags) {
  return tags.map(tag => `<button>${tag}</button>`).join(" ");
}

// create difficulty display
function difficultyTemplate(rating) {
  let html = "Difficulty: ";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += "🥾";
    } else {
      html += "▫️";
    }
  }

  return html;
}

// create hike card
function hikesTemplate(hike) {
  return `
    <div class="hike-card">
      <h2>${hike.name}</h2>
      <div>${tagTemplate(hike.tags)}</div>
      <p>${hike.description}</p>
      <p>${difficultyTemplate(hike.difficulty)}</p>
    </div>
  `;
}

// render one hike
function renderHike(hike) {
  hikeContainer.innerHTML += hikesTemplate(hike);
}

// show random hike on load
function init() {
  let randomNum = Math.floor(Math.random() * hikes.length);
  renderHike(hikes[randomNum]);
}

init();