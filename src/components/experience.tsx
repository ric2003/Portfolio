"use client";

import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Experience() {
    const { t } = useTranslation();

    const experienceItems = t("experience.items", {
        returnObjects: true,
    }) as Array<{
        role: string;
        company: string;
        period: string;
        description: string;
        logo?: string;
    }>;

    return (
        <section id="experience" className="mb-16">
            <h2 className="text-xl font-bold mb-8">{t("experience.title")}</h2>
            <div className="flex flex-col gap-8">
                {experienceItems.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start group">
                        <Avatar className="h-12 w-12 border border-border bg-muted">
                            <AvatarImage src="/ctwLogo.webp" alt={item.company} className="object-cover" />
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                {item.company.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h3 className="font-semibold text-foreground">
                                    {item.company}
                                </h3>
                                <span className="text-xs text-muted-foreground font-mono">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.role}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
