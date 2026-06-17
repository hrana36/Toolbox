module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Rana/src/locales/i18n.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Rana/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const I18nProvider = ({ children })=>{
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en');
    const [translations, setTranslations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Load language from localStorage on client side
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Load translations when language changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadTranslation = async ()=>{
            try {
                const module = await __turbopack_context__.f({
                    "./bn.json": {
                        id: ()=>"[project]/Rana/src/locales/bn.json.[json].cjs [app-ssr] (ecmascript, async loader)",
                        module: ()=>__turbopack_context__.A("[project]/Rana/src/locales/bn.json.[json].cjs [app-ssr] (ecmascript, async loader)")
                    },
                    "./en.json": {
                        id: ()=>"[project]/Rana/src/locales/en.json.[json].cjs [app-ssr] (ecmascript, async loader)",
                        module: ()=>__turbopack_context__.A("[project]/Rana/src/locales/en.json.[json].cjs [app-ssr] (ecmascript, async loader)")
                    }
                }).import(`./${lang}.json`);
                setTranslations(module.default);
            } catch (error) {
                console.error(`Failed to load translation for language: ${lang}`, error);
                // Fallback to English if Bengali fails and vice versa
                if (lang === 'bn') {
                    __turbopack_context__.A("[project]/Rana/src/locales/en.json.[json].cjs [app-ssr] (ecmascript, async loader)").then((module)=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
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
const useTranslation = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Rana$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fl5o_z._.js.map