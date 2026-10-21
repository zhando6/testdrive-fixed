# Mercedes-Benz Test Drive — Fixed Prototype

A corrected implementation of the broken [testdrive.andersenlab.com](https://testdrive.andersenlab.com/) registration wizard.

## 🔗 Live Demo

**https://zhando6.github.io/testdrive-fixed/**

## 🐛 Bugs Fixed

| ID | Issue | Severity |
|----|-------|----------|
| R001 | Empty form shows raw `{lastName}` JS tokens | Critical |
| R002 | `OutOfMemoryError` in Engine dropdown | Major |
| R003 | Corrupted `{transmission} engine ,` string on Step 4 | Major |
| R004 | Porsche Cayenne 400 in Mercedes-Benz slider | Major |
| R005 | Step counter shows 4 instead of 3 | Medium |
| R006 | No Back button — user trapped in wizard | Medium |
| R007 | Age accepts negatives, text, underage values | Medium |
| R008 | Empty `<title>`, no `lang`, no `alt` — Lighthouse 59/100 | Major |
| R009 | Logo 200px overflows 80px container | Minor |
| R010 | Step 5 dead-end with no restart button | Minor |

## 📋 Audit Report

See `Official_QATestLab_Bug_Report.pdf` in the main project directory.

**Prepared:** 22.10.2026, 01:52 (GMT +5)  
**QA Standard:** ISO/IEC/IEEE 29119 · QATestLab Template  
**Scope:** Desktop Google Chrome ONLY
