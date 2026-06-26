# Paquete SDD v2 · Landing_Page_PJ

Este paquete contiene las especificaciones y materiales de ejecución para evolucionar la landing page de la **Pastoral Juvenil San Martín de Porres** mediante Spec Driven Development, conservando HTML5, CSS3 y JavaScript nativo.

## Objetivo

Aplicar las cinco fases acordadas:

1. Contenido, datos oficiales e inconsistencias.
2. Base técnica y accesibilidad.
3. Rediseño visual fiel a la identidad actual.
4. Funcionalidades dinámicas.
5. Refactorización final y auditoría.

## Cómo incorporarlo

1. Extrae este ZIP en la raíz de `Landing_Page_PJ`.
2. Reemplaza la carpeta actual `specs/pastoral-juvenil-landing/` por la incluida.
3. Conserva `prompts/` y `docs/` en la raíz del repositorio.
4. Ejecuta las fases en orden.
5. Antes de implementar cada fase:
   - lee todas las specs;
   - realiza el diagnóstico solicitado;
   - presenta el alcance;
   - espera confirmación;
   - modifica únicamente lo autorizado.

## Estructura

```text
Landing_Page_PJ_SDD_v2/
├── specs/pastoral-juvenil-landing/
│   ├── requirements.md
│   ├── design.md
│   ├── tasks.md
│   ├── acceptance-checklist.md
│   ├── content-source-of-truth.md
│   ├── implementation-guardrails.md
│   ├── assets-plan.md
│   └── baseline.md
├── prompts/
│   ├── 00-auditoria-inicial.md
│   ├── 01-fase-contenido.md
│   ├── 02-fase-base-accesibilidad.md
│   ├── 03-fase-visual.md
│   ├── 04-fase-funcionalidades.md
│   └── 05-fase-refactor-auditoria.md
└── docs/
    ├── defense-guide.md
    └── phase-summary.md
```

## Reglas esenciales

- No usar frameworks, librerías externas, backend, base de datos, build tools ni `package.json`.
- Mantener un único `css/styles.css` y un único `js/main.js`.
- No modificar código fuera de la fase activa.
- Diagnosticar antes de corregir.
- No empezar una fase sin confirmación.
- Preservar el comportamiento existente antes de ampliarlo.
- Priorizar claridad y facilidad de defensa oral sobre la reducción extrema de líneas.
- Git será el historial de las specs anteriores; no se conserva una carpeta v1 duplicada.

## Publicación

El sitio deberá funcionar:

- abriendo directamente `index.html`;
- en GitHub Pages;
- en Vercel u otro hosting estático.

Por ello, las rutas internas deben ser relativas y no depender de la raíz del dominio.
