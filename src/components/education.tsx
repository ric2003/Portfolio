"use client";

import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap } from "lucide-react";

export function Education() {
    const { t } = useTranslation();

    const educationItems = t("education.items", {
        returnObjects: true,
    }) as Array<{
        degree: string;
        institution: string;
        period: string;
    }>;

    return (
        <section id="education" className="mb-16">
            <h2 className="text-xl font-bold mb-8">{t("education.title")}</h2>
            <div className="flex flex-col gap-8">
                {educationItems.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start group">
                        <Avatar className="h-12 w-12 border border-border bg-muted">
                            <AvatarImage src="/uni.webp" alt={item.institution} className="object-cover" />
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                <GraduationCap className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h3 className="font-semibold text-foreground">
                                    {item.institution}
                                </h3>
                                <span className="text-xs text-muted-foreground font-mono">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.degree}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
