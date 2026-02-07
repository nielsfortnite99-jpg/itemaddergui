const guiContainer = document.getElementById("gui-container");
let slots = [];
let rows = 6;

let brushType = document.getElementById("brushType");
let colorPicker = document.getElementById("colorPicker");
let itemInput = document.getElementById("itemInput");
let textureUpload = document.getElementById("textureUpload");
let currentTexture = null;

// Texture Upload
textureUpload.addEventListener("change", function(e){
  const reader = new FileReader();
  reader.onload = function(event){
    currentTexture = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

// Build GUI
function buildGUI(){
  rows = parseInt(document.getElementById("rowsSelect").value);
  slots.forEach(s=>s.element.remove());
  slots = [];

  const slotSize = 50;
  const gap = 2;
  for(let r=0;r<rows;r++){
    for(let c=0;c<9;c++){
      const div = document.createElement('div');
      div.className = 'slot';
      div.style.left = (c*(slotSize+gap))+'px';
      div.style.top = (r*(slotSize+gap))+'px';
      div.dataset.index = r*9+c;
      div.addEventListener('mousedown', paintSlot);
      div.addEventListener('mouseover', paintSlotDrag);
      guiContainer.appendChild(div);
      slots.push({item:null, color:null, texture:null, element:div});
    }
  }
}

// Paint functions
let mouseDown = false;
document.body.onmousedown = ()=>mouseDown=true;
document.body.onmouseup = ()=>mouseDown=false;

function paintSlot(e){
  applyBrush(e.target);
}

function paintSlotDrag(e){
  if(mouseDown) applyBrush(e.target);
}

function applyBrush(slotDiv){
  const idx = slotDiv.dataset.index;
  let slot = slots[idx];

  switch(brushType.value){
    case 'color':
      slot.color = colorPicker.value;
      slot.item = null;
      slot.texture = null;
      slotDiv.style.background = colorPicker.value;
      slotDiv.innerHTML = '';
      break;
    case 'item':
      slot.item = itemInput.value;
      slot.color = null;
      slot.texture = null;
      slotDiv.style.background = 'rgba(136,136,136,0.8)';
      slotDiv.innerHTML = slot.item ? slot.item : '';
      break;
    case 'texture':
      if(!currentTexture) return;
      slot.texture = currentTexture;
      slot.color = null;
      slot.item = null;
      slotDiv.style.background = 'rgba(136,136,136,0.8)';
      slotDiv.innerHTML = '';
      const img = document.createElement('img');
      img.src = currentTexture;
      slotDiv.appendChild(img);
      break;
  }
}

// Clear GUI
function clearGUI(){
  slots.forEach(s=>{
    s.color = null;
    s.item = null;
    s.texture = null;
    s.element.style.background = 'rgba(136,136,136,0.8)';
    s.element.innerHTML = '';
  });
}

// Presets
function loadPreset(name){
  if(!presets[name]) return;
  clearGUI();
  Object.entries(presets[name]).forEach(([i,data])=>{
    const slot = slots[i];
    slot.item = data.item || null;
    slot.color = data.color || null;
    slot.texture = data.texture || null;
    const el = slot.element;
    el.innerHTML = '';
    if(slot.texture){
      const img = document.createElement('img');
      img.src = slot.texture;
      el.appendChild(img);
    } else if(slot.item){
      el.innerHTML = slot.item;
    } else if(slot.color){
      el.style.background = slot.color;
    }
  });
}

// Export YAML
function exportYAML(){
  let yaml = 'items:\n';
  slots.forEach((slot,i)=>{
    if(slot.item || slot.texture){
      yaml += `  slot_${i}:\n`;
      if(slot.item) yaml += `    item: ${slot.item}\n`;
      if(slot.texture) yaml += `    texture: ${slot.texture}\n`;
    }
  });
  document.getElementById('output').value = yaml;
}

buildGUI();
