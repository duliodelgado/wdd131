const character = {
    name: "Swamp Beast Diplomat",
    class: "Diplomat",
    level: 1,
    health: 100,
    image: "images/swamp-beast.jpg",

    attacked() {

        if (this.health === 0) {
            alert(`${this.name} is already dead.`);
            return;
        }

        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;

            alert(`${this.name} has died.`);
        }
    },

    levelUp() {
        this.level++;
    }
};

function renderCharacter() {

    document.querySelector("#characterName").textContent =
        character.name;

    document.querySelector("#characterClass").textContent =
        character.class;

    document.querySelector("#characterLevel").textContent =
        character.level;

    document.querySelector("#characterHealth").textContent =
        character.health;

    document.querySelector("#characterImage").setAttribute(
        "src",
        character.image
    );

    document.querySelector("#characterImage").setAttribute(
        "alt",
        character.name
    );
}

renderCharacter();

document.querySelector("#attackBtn")
    .addEventListener("click", function () {

        character.attacked();

        renderCharacter();
    });

document.querySelector("#levelBtn")
    .addEventListener("click", function () {

        character.levelUp();

        renderCharacter();
    });