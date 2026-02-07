const gui = document.getElementById("gui");
let slots = Array(54).fill(null);
let selectedSlot = 0;
let uploadedTexture = null;

// GUI Slots erstellen
for (let i = 0; i < 54; i++) {
  const div = document.createElement("div");
  div.className = "slot";
  div.onclick = () => selectedSlot = i;
  gui.appendChild(div);
}

// Textur Upload
document.getElementById("textureUpload").addEventListener("change", function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    uploadedTexture = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

// Slot setzen
function setSlot() {
  const itemId = document.getElementById("itemId").value;
  const slotDiv = gui.children[selectedSlot];
  slots[selectedSlot] = { item: itemId, texture: uploadedTexture || null };

  slotDiv.innerHTML = '';
  if (uploadedTexture) {
    const img = document.createElement("img");
    img.src = uploadedTexture;
    slotDiv.appendChild(img);
  } else {
    slotDiv.textContent = itemId || '';
  }
}

// Presets laden
function loadPreset(name) {
  if (!presets[name]) return;
  slots = Array(54).fill(null);
  document.querySelectorAll(".slot").forEach(s => s.innerHTML = '');
  Object.entries(presets[name]).forEach(([i, data]) => {
    slots[i] = data;
    const div = gui.children[i];
    if (data.texture) {
      const img = document.createElement("img");
      img.src = data.texture;
      div.appendChild(img);
    } else {
      div.textContent = data.item;
    }
  });
}

// YAML export
function exportYAML() {
  let yaml = 'items:\n';
  slots.forEach((slot, i) => {
    if (slot) {
      yaml += `  slot_${i}:\n    item: ${slot.item}\n`;
      if (slot.texture) yaml += `    texture: ${slot.texture}\n`;
    }
  });
  document.getElementById("output").value = yaml;
}
