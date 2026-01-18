const formulasContainer = document.getElementById("formulas");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");
const template = document.getElementById("formula-template");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

let formulas = [];
let categories = new Set();

// Fetch formulas
fetch("formulas.json")
.then(res=>res.json())
.then(data=>{
  formulas = data;
  formulas.forEach(f=>categories.add(f.category));
  populateCategoryFilter();
  renderFormulas(formulas);
  MathJax.typesetPromise();
});

// Populate category dropdown
function populateCategoryFilter(){
  categories.forEach(c=>{
    const opt = document.createElement("option");
    opt.value=c; opt.textContent=c;
    categoryFilter.appendChild(opt);
  });
}

// Render formulas
function renderFormulas(list){
  formulasContainer.innerHTML="";
  list.forEach(f=>{
    const clone = template.content.cloneNode(true);
    clone.querySelector(".formula-name").textContent = f.name;
    clone.querySelector(".formula-text").textContent = f.formula;
    clone.querySelector(".formula-desc").textContent = f.description;

    // Calculator
    const calcDiv = clone.querySelector(".calculator");
    f.inputs.forEach(input=>{
      const inp = document.createElement("input");
      inp.className="calc-input";
      inp.placeholder=input;
      calcDiv.appendChild(inp);
    });
    const btn = document.createElement("button");
    btn.textContent="Calculate";
    btn.onclick=()=>{
      const vals = {};
      f.inputs.forEach((v,i)=>{
        vals[v]=parseFloat(calcDiv.querySelectorAll(".calc-input")[i].value);
      });
      try{
        let expr=f.calc;
        Object.keys(vals).forEach(k=>{expr=expr.replaceAll(k,vals[k])});
        modalText.textContent="Result = "+eval(expr);
        modal.style.display="block";
      }catch{
        modalText.textContent="Enter valid numbers";
        modal.style.display="block";
      }
    };
    calcDiv.appendChild(btn);

    // Copy formula
    clone.querySelector(".copy-btn").onclick=()=>{
      navigator.clipboard.writeText(f.formula);
      alert("Formula copied!");
    };

    formulasContainer.appendChild(clone);
  });
  MathJax.typesetPromise();
}

// Search & filter
searchInput.addEventListener("input", filterFormulas);
categoryFilter.addEventListener("change", filterFormulas);

function filterFormulas(){
  const term=searchInput.value.toLowerCase();
  const cat=categoryFilter.value;
  const filtered=formulas.filter(f=>{
    return (f.name.toLowerCase().includes(term) || f.category.toLowerCase().includes(term))
      && (cat? f.category===cat : true);
  });
  renderFormulas(filtered);
}

// Modal close
modalClose.onclick = ()=>modal.style.display="none";
window.onclick = e=>{if(e.target==modal) modal.style.display="none";}

// Theme toggle
themeToggle.onclick = ()=>{
  document.body.classList.toggle("light-theme");
  if(document.body.classList.contains("light-theme")) themeToggle.textContent="🌙";
  else themeToggle.textContent="☀️";
}

