const gui = document.getElementById("gui");
let selectedSlot = 0;
let slots = Array(54).fill(null);

// Slots erstellen
for (let i = 0; i < 54; i++) {
  const div = document.createElement("div");
  div.className = "slot";
  div.onclick = () => selectedSlot = i;
  gui.appendChild(div);
}

// Item setzen
function setItem() {
  const item = document.getElementById("itemId").value;
  slots[selectedSlot] = item;
  gui.children[selectedSlot].classList.add("active");
}

// YAML export
function exportYAML() {
  let yaml = "items:\n";
  slots.forEach((item, i) => {
    if (item) {
      yaml += `  slot_${i}:\n`;
      yaml += `    item: ${item}\n`;
    }
  });
  document.getElementById("output").value = yaml;
}
