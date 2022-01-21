// Import stylesheets
import './style.css';
import { FCT_TRIANGLE, TriangleType } from './triangles';
import './utils';
import { Assertion, LogTests } from './utils';

/***********************************************************************************************************************
 * A FAIRE : Complétez avec votre mail UGA
 */
const mailIdentification = 'tom.frances@etu.univ-grenoble-alpes.fr';

/***********************************************************************************************************************
 * A FAIRE : Fonction qui renvoie le type d'un triangle
 * "INVALIDE" | "SCALÈNE" | "ISOCÈLE" | "ÉQUILATÉRAL"
 */
function f(a: number, b: number, c: number): TriangleType {
  if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
    return 'INVALIDE';
  } else if (a === b && a === c) {
    return 'ÉQUILATÉRAL';
  } else if (a === b || a === c || b === c) {
    return 'ISOCÈLE';
  } else {
    return 'SCALÈNE';
  }
}

/***********************************************************************************************************************
 * A FAIRE : Liste de tests à effectuer
 * Chaque test est exprimé par un objet contenant 3 attributs
 *   - args : le tableau des arguments à passer à la fonction f
 *   - expectedResult : le résultat attendu
 *   - comment : un commentaire sous forme de chaine de caractère
 */
const tests: Assertion<Parameters<FCT_TRIANGLE>, ReturnType<FCT_TRIANGLE>>[] = [
  {
    args: [1, 1, 1],
    expectedResult: 'ÉQUILATÉRAL',
    comment:
      'Un triangle dont les côtés sont de longueur 1 devrait être classé comme équilatéral',
  },
  {
    args: [3, 4, 4],
    expectedResult: 'ISOCÈLE',
    comment:
      'Un triangle dont 2 côtés sont de même longeur devrait être classé comme isocèle',
  },
  {
    args: [3, 3, 4],
    expectedResult: 'ISOCÈLE',
    comment:
      'Un triangle dont 2 côtés sont de même longeur devrait être classé comme isocèle',
  },
  {
    args: [6, 10, 6],
    expectedResult: 'ISOCÈLE',
    comment:
      'Un triangle dont 2 côtés sont de même longeur devrait être classé comme isocèle',
  },
  {
    args: [3, 4, 5],
    expectedResult: 'SCALÈNE',
    comment:
      'Un triangle dont les côtés sont de tous de longueur différente devrait être classé comme scalène',
  },
  {
    args: [0, 1, 5],
    expectedResult: 'INVALIDE',
    comment: 'Un triangle ayant un de ses cotés de longueur 0 est invalide',
  },
  {
    args: [-5, 3, 3],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle ayant un de ses cotés de longueur négative est invalide',
  },
  {
    args: [2, 0, 5],
    expectedResult: 'INVALIDE',
    comment: 'Un triangle ayant un de ses cotés de longueur 0 est invalide',
  },
  {
    args: [3, -2, 8],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle ayant un de ses cotés de longueur négative est invalide',
  },
  {
    args: [8, 2, 0],
    expectedResult: 'INVALIDE',
    comment: 'Un triangle ayant un de ses cotés de longueur 0 est invalide',
  },
  {
    args: [5, 3, -6],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle ayant un de ses cotés de longueur négative est invalide',
  },
  {
    args: [0, 0, 0],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont des côtés sont de longueur 0 devrait être classé comme invalide',
  },
  {
    args: [0, 7, 0],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont des côtés sont de longueur 0 devrait être classé comme invalide',
  },
  {
    args: [1, 7, 3],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont la somme des 2 plus petits côtés est inférieure à la longueur du troisième devrait être classé comme invalide',
  },
  {
    args: [1, 4, 3],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont la somme des 2 plus petits côtés est égale à la longueur du troisième devrait être classé comme invalide',
  },
  {
    args: [1, 2, 3],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont la somme des 2 plus petits côtés est égale à la longueur du troisième devrait être classé comme invalide',
  },
  {
    args: [1, 2, 4],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont la somme des 2 plus petits côtés est inférieure à la longueur du troisième devrait être classé comme invalide',
  },
  {
    args: [14, 7, 5],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont la somme des 2 plus petits côtés est inférieure à la longueur du troisième devrait être classé comme invalide',
  },
  {
    args: [14, 8, 6],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont la somme des 2 plus petits côtés est égale à la longueur du troisième devrait être classé comme invalide',
  },
];

/***********************************************************************************************************************
 * NE PAS TOUCHER
 */
LogTests<FCT_TRIANGLE>(
  "Fonction qui renvoie le type d'un triangle",
  f,
  'f',
  tests,
  document.querySelector('#local')
);

const url =
  'https://script.google.com/macros/s/AKfycbxzfVpq-9XKqdDwfSScgyYV6y90x0hmSji5N7KpqCZCsbjQu2ixbcGQq5rCOdFkR33E/exec';

const bt = document.querySelector('button');
const section = document.querySelector('#results');

bt.onclick = async () => {
  bt.disabled = true;
  const fstr = f.toString();
  const bodyStr = fstr.slice(fstr.indexOf('{') + 1, fstr.lastIndexOf('}'));

  const form = new FormData();
  form.append('id', mailIdentification);
  form.append('f', bodyStr);
  form.append('tests', JSON.stringify(tests));

  const R = await fetch(url, {
    method: 'POST',
    body: form,
  });
  const res = await R.json();
  let t = 0;
  if (res.error) {
    section.innerHTML = `<pre>${res.error}</pre>`;
    const [, strT] = /([0-9]*) secondes$/.exec(res.error);
    t = +strT;
    console.log(strT, t);
    const inter = setInterval(() => {
      t--;
      if (t <= 0) {
        bt.disabled = false;
        section.textContent = '';
        clearInterval(inter);
      } else {
        section.innerHTML = `<pre>Vous ne pouvez pas resoumettre avant ${t} secondes
  </pre>`;
      }
    }, 1000);
  } else {
    section.innerHTML = `
      Tests de contrôle passés par votre code (vert = le test passe):<br/>
      <table class="result"><tbody><tr>
      ${res.testPassed
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
      <br/><br/>
      Mutants éliminés par votre code (vert = le mutant est éliminé) :<br/>
      <table class="result"><tbody><tr>
      ${res.discardedMutants
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
    `;
  }
};
