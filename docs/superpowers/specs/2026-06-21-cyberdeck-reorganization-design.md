# Cyber Deck Console Reorganization Design Spec

**Goal:** Reorganize the categories and tools in the Cyber Deck console to group features logically, rename the calculators tab to "All in 1 Calculator", and remove the "BD Essentials" tab by moving its tools to other tabs.

## Reorganized Tab Structure

1. **PDF Tools** (`pdf` - Default active tab)
   - Merge PDFs, Split PDF, Image to PDF, Organize Pages, Word to PDF.
2. **Media & Productivity** (`helpers`)
   - YouTube Thumbnail Downloader, Video Downloader, **BD Job Photo/Signature Resizer** (moved here), Word/Char Counter, Case Converter.
3. **Dev & Design** (`dev_tools`)
   - QR Generator, JSON Formatter, Color Picker, Diff Checker, Lorem Ipsum, Base64, **Unicode ↔ Bijoy Converter** (moved here, placed last).
4. **Network & Security** (`security`)
   - IP Lookup, DNS Diagnostics, Password Generator, Hash Generator, ROT13 & Caesar Cipher.
5. **All in 1 Calculator** (`math` - Renamed from "Math Solver")
   - **Age Calculator** (moved here), GPA/CGPA Calculator, EMI/Loan Calculator, Percentage & Margin, Unit & Land Converter, Scientific Calculator.

## Key Changes
- Update the default category tab select array and remove `bd`.
- Rename `"Math Solver"` (`math` key) to `"All in 1 Calculator"` in localization settings.
- Move sub-tabs and update their state types:
  - `resize` state handles move to `helpers` and `helperSubTab`.
  - `unicode` state handles move to `dev_tools` and `devSubTab`.
  - `age` state handles move to `math` and `mathSubTab`.
