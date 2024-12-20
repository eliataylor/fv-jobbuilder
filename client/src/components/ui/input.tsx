import * as React from "react";
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
    value: string;
    onChange: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({type = "text", className, value, onChange, ...props}, ref) => {
        // Local state to manage the input value internally
        const [localValue, setLocalValue] = React.useState(value);

        // Sync external value with internal state when it changes
        React.useEffect(() => {
            setLocalValue(value);
        }, [value]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setLocalValue(newValue); // Update the internal state
            onChange(newValue); // Notify the parent component
        };

        return (
            <input
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                type={type}
                value={localValue}
                ref={ref}
                onChange={handleInputChange}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export {Input};
