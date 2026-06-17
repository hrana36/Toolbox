(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Rana/src/locales/i18n.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const I18nProvider = ({ children })=>{
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [translations, setTranslations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Load language from localStorage on client side
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem('i18n_lang');
                if (saved === 'en' || saved === 'bn') {
                    setLang(saved);
                }
            }
        }
    }["I18nProvider.useEffect"], []);
    // Load translations when language changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            const loadTranslation = {
                "I18nProvider.useEffect.loadTranslation": async ()=>{
                    try {
                        const module = await __turbopack_context__.f({
                            "./bn.json": {
                                id: ()=>"[project]/Rana/src/locales/bn.json.[json].cjs [app-client] (ecmascript, async loader)",
                                module: ()=>__turbopack_context__.A("[project]/Rana/src/locales/bn.json.[json].cjs [app-client] (ecmascript, async loader)")
                            },
                            "./en.json": {
                                id: ()=>"[project]/Rana/src/locales/en.json.[json].cjs [app-client] (ecmascript, async loader)",
                                module: ()=>__turbopack_context__.A("[project]/Rana/src/locales/en.json.[json].cjs [app-client] (ecmascript, async loader)")
                            }
                        }).import(`./${lang}.json`);
                        setTranslations(module.default);
                    } catch (error) {
                        console.error(`Failed to load translation for language: ${lang}`, error);
                        // Fallback to English if Bengali fails and vice versa
                        if (lang === 'bn') {
                            __turbopack_context__.A("[project]/Rana/src/locales/en.json.[json].cjs [app-client] (ecmascript, async loader)").then({
                                "I18nProvider.useEffect.loadTranslation": (module)=>{
                                    setTranslations(module.default);
                                    setLang('en');
                                }
                            }["I18nProvider.useEffect.loadTranslation"]);
                        }
                    }
                }
            }["I18nProvider.useEffect.loadTranslation"];
            loadTranslation();
        }
    }["I18nProvider.useEffect"], [
        lang
    ]);
    // Save language to localStorage when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('i18n_lang', lang);
            }
        }
    }["I18nProvider.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            lang,
            t,
            toggleLang
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Rana/src/locales/i18n.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(I18nProvider, "kCuZ8XwvxZIOICUvzBzFuSfHJkI=");
_c = I18nProvider;
const useTranslation = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
_s1(useTranslation, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Rana_src_locales_i18n_tsx_1059yca._.js.map