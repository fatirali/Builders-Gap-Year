import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { applicationDocument } from './flow-page.mjs';

let fragment = await readFile(new URL('../designs/builders-club-directions.html', import.meta.url), 'utf8');
// Preserve the original concept exploration while publishing only Builders Studio.
fragment = fragment.replace(/^.*if\(globalThis\.Tweak\).*\n/gm, '');
fragment = fragment.replace('aria-label="Builders Club design directions"', 'aria-label="Builders Club"');
fragment = fragment.replace('root.dataset.direction=state.direction;root.lang=state.language;', 'root.dataset.direction=state.direction;root.lang=state.language;document.documentElement.lang=state.language;');
fragment = fragment.replace("language:'en'", "language:window.buildersLanguage.get()");
fragment = fragment.replace("function render(){", "function render(){window.buildersLanguage.set(state.language);");
fragment = fragment.replaceAll('class="bc-primary" href="#bc-program"', 'class="bc-primary" href="/apply/"');
const deadline = '<p class="bc-deadline" data-en="Apply by November 30, 2026" data-es="Fecha límite para postularte: 30 de noviembre de 2026">Apply by November 30, 2026</p>';
fragment = fragment.replace('</div>\n    </div>\n    <div class="bc-art"', `</div>${deadline}\n    </div>\n    <div class="bc-art"`);
fragment = fragment.replace(/(<a class="bc-primary" href="\/apply\/">.*?<\/a>)<\/section>/, `<div>$1${deadline}</div></section>`);

const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A gap year in LATAM for ages 17–19. Work on your own projects and explore what you’d like to study.">
  <meta name="theme-color" content="#233a2a">
  <title>Builders Club · A year before university</title>
  <script src="/language.js"></script>
  <style>
    html,body{margin:0;padding:0}html{scroll-behavior:smooth}body{background:#f6f3ea}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
    #builders-concepts .bc-deadline{font-size:12px;margin-top:12px;color:var(--bc-ink)}
    a:focus-visible,button:focus-visible{outline:3px solid #56762d;outline-offset:5px}
  </style>
</head>
<body>
  <main>${fragment}</main>
</body>
</html>`;

await mkdir(new URL('../public/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/index.html', import.meta.url), document);
for (const route of ['apply', 'checkout']) {
  await mkdir(new URL(`../public/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../public/${route}/index.html`, import.meta.url), applicationDocument(route));
}
for (const asset of ['language.js', 'flow.js', 'flow.css', 'program.js', 'program.css']) {
  await copyFile(new URL(`../designs/${asset}`, import.meta.url), new URL(`../public/${asset}`, import.meta.url));
}
console.log('Built landing, application, and checkout preview with EN/ES switching.');
