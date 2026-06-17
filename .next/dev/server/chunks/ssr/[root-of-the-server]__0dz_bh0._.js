module.exports = [
"[next]/internal/font/google/inter_5972bc34.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_5972bc34-module__OU16Qa__className",
});
}),
"[next]/internal/font/google/inter_5972bc34.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/Rana/src/locales/i18n.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const I18nProvider = ({ children })=>{
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(()=>{
        // Try to get from localStorage, default to 'en'
        const saved = localStorage.getItem('i18n_lang');
        if (saved === 'en' || saved === 'bn') {
            return saved;
        }
        return 'en';
    });
    const [translations, setTranslations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])({});
    // Load translations when language changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadTranslation = async ()=>{
            try {
                const module = await __turbopack_context__.f({
                    "./bn.json": {
                        id: ()=>"[project]/Rana/src/locales/bn.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                        module: ()=>__turbopack_context__.A("[project]/Rana/src/locales/bn.json.[json].cjs [app-rsc] (ecmascript, async loader)")
                    },
                    "./en.json": {
                        id: ()=>"[project]/Rana/src/locales/en.json.[json].cjs [app-rsc] (ecmascript, async loader)",
                        module: ()=>__turbopack_context__.A("[project]/Rana/src/locales/en.json.[json].cjs [app-rsc] (ecmascript, async loader)")
                    }
                }).import(`./${lang}.json`);
                setTranslations(module.default);
            } catch (error) {
                console.error(`Failed to load translation for language: ${lang}`, error);
                // Fallback to English if Bengali fails and vice versa
                if (lang === 'bn') {
                    __turbopack_context__.A("[project]/Rana/src/locales/en.json.[json].cjs [app-rsc] (ecmascript, async loader)").then((module)=>{
                        setTranslations(module.default);
                        setLang('en');
                    });
                }
            }
        };
        loadTranslation();
    }, [
        lang
    ]);
    // Save language to localStorage when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('i18n_lang', lang);
    }, [
        lang
    ]);
    // Translation function
    const t = (key)=>{
        const keys = key.split('.');
        let result = translations;
        for (const k of keys){
            if (result && typeof result === 'object' && k in result) {
                // @ts-ignore
                result = result[k];
            } else {
                // If key not found, return the key itself as fallback
                return key;
            }
        }
        return typeof result === 'string' ? result : key;
    };
    const toggleLang = ()=>{
        setLang((prevLang)=>prevLang === 'en' ? 'bn' : 'en');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            lang,
            t,
            toggleLang
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Rana/src/locales/i18n.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useTranslation = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
}),
"[project]/Rana/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$src$2f$locales$2f$i18n$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/src/locales/i18n.tsx [app-rsc] (ecmascript)");
;
;
;
;
const metadata = {
    title: 'BD Toolbox - Multi-tool Utility for Bangladeshi Users',
    description: 'A bilingual (English/Bengali) multi-tool utility platform with 20+ client-side tools for document processing, image manipulation, calculators, and more.'
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$src$2f$locales$2f$i18n$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["I18nProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
            lang: "en",
            className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: children
            }, void 0, false, {
                fileName: "[project]/Rana/src/app/layout.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Rana/src/app/layout.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Rana/src/app/layout.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/Rana/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Rana/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Rana/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Rana/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0dz_bh0._.js.map