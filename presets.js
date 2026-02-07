const presets = {
  shop: {
    10: "itemadder:diamond_sword",
    11: "itemadder:gold_ingot"
  },
  menu: {
    13: "itemadder:menu_icon"
  }
};

function loadPreset(name) {
  if (!presets[name]) return;

  slots = Array(54).fill(null);
  document.querySelectorAll(".slot").forEach(s => s.classList.remove("active"));

  Object.entries(presets[name]).forEach(([slot, item]) => {
    slots[slot] = item;
    gui.children[slot].classList.add("active");
  });
}
