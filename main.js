document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav a");

  const setView = (html) => {
    content.innerHTML = html;
  };

  
  const views = {
    start: () =>
      setView(`
      <h2>Välkommen</h2>
      <p>Välj en övning i menyn. Resultat skrivs även till <strong>console.log()</strong>.</p>
    `),

    string: () =>
      setView(`
      <h2>Strängmanipulation</h2>
      <p>Mata in förnamn och efternamn. Ditt förnamn och efternamn kommer att skrivas ut baklänges </p>
      <form class="form" id="form-string">
        <div class="input-row">
          <label for="firstName">Förnamn</label>
          <input id="firstName" type="text" required />
        </div>
        <div class="input-row">
          <label for="lastName">Efternamn</label>
          <input id="lastName" type="text" required />
        </div>
        <button type="submit">Kör</button>
        <div class="output" id="out-string" aria-live="polite"></div>
      </form>
    `),

    aritmetik: () =>
      setView(`
      <h2>Aritmetik</h2>
      <p>Mata in två tal. Summa, differens, produkt och kvot kommer att skrivas ut</p>
      <form class="form" id="form-arit">
        <div class="input-row">
          <label for="a">Tal A</label>
          <input id="a" type="number" step="any" required />
        </div>
        <div class="input-row">
          <label for="b">Tal B</label>
          <input id="b" type="number" step="any" required />
        </div>
        <button type="submit">Beräkna</button>
        <div class="output" id="out-arit" aria-live="polite"></div>
      </form>
    `),

    if: () =>
      setView(`
      <h2>If-sats</h2>
      <p>Mata in din ålder. Olika meddelanden kommer att skrivas ut beroende på om du är över eller under 18 år</p>
      <form class="form" id="form-if">
        <div class="input-row">
          <label for="age">Ålder</label>
          <input id="age" type="number" min="0" required />
        </div>
        <button type="submit">Kolla</button>
        <div class="output" id="out-if" aria-live="polite"></div>
      </form>
    `),

    for: () =>
      setView(`
      <h2>For-loop</h2>
      <p>Mata in ett tal N. Alla tal från 1 till N kommer att skrivas ut</p>
      <form class="form" id="form-for">
        <div class="input-row">
          <label for="n">N</label>
          <input id="n" type="number" min="1" required />
        </div>
        <button type="submit">Skriv ut</button>
        <div class="output" id="out-for" aria-live="polite"></div>
      </form>
    `),

    array: () =>
      setView(`
      <h2>Array-övning</h2>
      <p>Vi börjar med tre favoritämnen. Lägg till och ta bort element och skriv ut arrayen.</p>
      <form class="form" id="form-array">
        <div class="input-row">
          <label for="addItem">Lägg till ämne</label>
          <input id="addItem" type="text" placeholder="t.ex. Programmering" />
        </div>
        <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
          <button type="button" id="btn-add">Lägg till</button>
          <button type="button" id="btn-pop">Ta bort sista</button>
          <button type="button" id="btn-shift">Ta bort första</button>
          <button type="button" id="btn-reset">Återställ</button>
        </div>
        <div class="output" id="out-array" aria-live="polite"></div>
      </form>
    `),
  };

  
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const key = link.dataset.exercise;
      render(key);
    });
  });

 
  const render = (key = "start") => {
    (views[key] || views.start)();

   
    if (key === "string") {
      const form = document.getElementById("form-string");
      const out = document.getElementById("out-string");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const first = document.getElementById("firstName").value.trim();
        const last = document.getElementById("lastName").value.trim();

        
        const rev = (s) => s.split("").reverse().join("");
        const result = `${rev(last)}/${rev(first)}`;

        console.log("Strängmanipulation:", result);
        out.textContent = result;
      });
    }

    if (key === "aritmetik") {
      const form = document.getElementById("form-arit");
      const out = document.getElementById("out-arit");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const a = Number(document.getElementById("a").value);
        const b = Number(document.getElementById("b").value);

        const sum = a + b;
        const diff = a - b;
        const prod = a * b;
        const quot = b === 0 ? "∞ (division med 0 ej definierad)" : a / b;

        const text = `Summa: ${sum}
Differens: ${diff}
Produkt: ${prod}
Kvot: ${quot}`;

        console.log("Aritmetik:", { sum, diff, prod, quot });
        out.textContent = text;
      });
    }

    if (key === "if") {
      const form = document.getElementById("form-if");
      const out = document.getElementById("out-if");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const age = Number(document.getElementById("age").value);
        const msg = age >= 18 ? "Du är myndig." : "Du är under 18.";
        console.log("If-sats:", msg);
        out.textContent = msg;
      });
    }

    if (key === "for") {
      const form = document.getElementById("form-for");
      const out = document.getElementById("out-for");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const n = Number(document.getElementById("n").value);
        const values = [];
        for (let i = 1; i <= n; i++) values.push(i);
        console.log("For-loop:", values);
        out.textContent = values.join(", ");
      });
    }

    if (key === "array") {
      const out = document.getElementById("out-array");
      let items = ["Matematik", "Programmering", "Historia"];

      const renderArray = () => {
        const text = `Array: [${items.join(", ")}]
Längd: ${items.length}`;
        console.log("Array-övning:", items);
        out.textContent = text;
      };

      renderArray();

      document.getElementById("btn-add").addEventListener("click", () => {
        const val = document.getElementById("addItem").value.trim();
        if (val) items.push(val);
        document.getElementById("addItem").value = "";
        renderArray();
      });

      document.getElementById("btn-pop").addEventListener("click", () => {
        items.pop();
        renderArray();
      });

      document.getElementById("btn-shift").addEventListener("click", () => {
        items.shift();
        renderArray();
      });

      document.getElementById("btn-reset").addEventListener("click", () => {
        items = ["Matematik", "Programmering", "Historia"];
        renderArray();
      });
    }
  };

  
  render("start");
});
