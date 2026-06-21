# Scientific Calculator Design Spec

**Goal:** Integrate a fully interactive client-side Scientific Calculator tool under the "Math Solver" tab in the Cyber Deck Toolbox.

## User Interface & Design
- **Location**: Add a new sub-tab named **SCIENTIFIC CALCULATOR** (`sci_calc`) alongside `gpa`, `emi`, `pct`, and `land` under the "Math Solver" category.
- **Visuals**:
  - A screen-like display showing the formula and the calculated output.
  - Interactive grid of math key buttons styled with dark neon border effects.
- **Button Mapping**:
  - Numbers: `0-9`, `.`
  - Core operators: `+`, `-`, `*`, `/`
  - Grouping: `(`, `)`
  - Science functions: `sin`, `cos`, `tan`, `log`, `ln`, `sqrt`, `^` (exponent), `π`, `e`
  - Action keys: `C` (clear), `Back` (backspace), `=` (equals)

## Technical Evaluation
- Keep an expression state string (e.g. `sin(π/2)`).
- On keypress: Append the corresponding character/function to the input string.
- On `=` or evaluation:
  - Sanitize the input to verify it contains only valid math symbols/numbers.
  - Translate functions and constants to JS standard Math equivalents:
    - `π` ➔ `Math.PI`
    - `e` ➔ `Math.E`
    - `sin` ➔ `Math.sin`
    - `cos` ➔ `Math.cos`
    - `tan` ➔ `Math.tan`
    - `sqrt` ➔ `Math.sqrt`
    - `log` ➔ `Math.log10`
    - `ln` ➔ `Math.log`
    - `^` ➔ `**`
  - Evaluate using a safe evaluator function.
