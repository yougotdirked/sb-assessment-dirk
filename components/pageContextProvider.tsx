"use client";

import { IPageContext } from "@/app/page";
import { Context, useState } from "react";

export interface IPageWrapperProps {
    children: React.ReactNode;
    context: Context<IPageContext>;
}

export function PageContextProvider({ children, context }: IPageWrapperProps) {
    const [formData, setFormData] = useState<any>(null);

    return <context.Provider value={context}>{children}</context.Provider>;
}
