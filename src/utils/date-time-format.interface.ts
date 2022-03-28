export interface DateTimeFormat {
    hour: "numeric" | "2-digit";
    minute: "numeric" | "2-digit";
    second: "numeric" | "2-digit";
    hour12: boolean;
    timeZone?: string;
}