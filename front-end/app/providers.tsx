"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
    children,
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider attribute="data-theme" defaultTheme="system" enableSystem>
            {children}
        </NextThemesProvider>
    );
}
