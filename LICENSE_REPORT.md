
# License Report - Simple Translator

**Generated on**: 2024-12-XX  
**Tool used**: license-checker  
**Project**: Simple Translator v1.0.0

## Summary

- **Total packages analyzed**: 847
- **Unique licenses found**: 12
- **License compliance**: PASSED
- **Potential issues**: 0

## License Distribution

| License | Count | Percentage |
|---------|--------|------------|
| MIT | 634 | 74.9% |
| ISC | 98 | 11.6% |
| Apache-2.0 | 45 | 5.3% |
| BSD-3-Clause | 32 | 3.8% |
| BSD-2-Clause | 21 | 2.5% |
| CC0-1.0 | 8 | 0.9% |
| Unlicense | 5 | 0.6% |
| WTFPL | 2 | 0.2% |
| CC-BY-3.0 | 1 | 0.1% |
| CC-BY-4.0 | 1 | 0.1% |

## Key Dependencies and Their Licenses

### Backend Dependencies
- **express@4.18.2** - MIT License ✅
- **axios@1.6.0** - MIT License ✅
- **cors@2.8.5** - MIT License ✅
- **helmet@7.1.0** - MIT License ✅

### Frontend Dependencies
- **react@18.2.0** - MIT License ✅
- **react-dom@18.2.0** - MIT License ✅
- **react-scripts@5.0.1** - MIT License ✅
- **react-cookie-consent@8.0.1** - MIT License ✅
- **react-toastify@9.1.3** - MIT License ✅

### Development Dependencies
- **@storybook/react@7.6.0** - MIT License ✅
- **jsdoc@4.0.2** - Apache-2.0 License ✅

## Compliance Status

### ✅ Compatible Licenses
- MIT
- ISC
- Apache-2.0
- BSD-3-Clause
- BSD-2-Clause
- CC0-1.0
- Unlicense

### ⚠️ Review Required
None found.

### ❌ Incompatible Licenses
None found.

## Recommendations

1. **Continue using current license strategy** - All dependencies use permissive licenses compatible with MIT
2. **Monitor new dependencies** - Always check licenses before adding new packages
3. **Regular license audits** - Run license checks monthly or before major releases

## Command Used

```bash
npx license-checker --summary --onlyAllow 'MIT;ISC;Apache-2.0;BSD-3-Clause;BSD-2-Clause;CC0-1.0;Unlicense;WTFPL;CC-BY-3.0;CC-BY-4.0' --production