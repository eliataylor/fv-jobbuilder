import * as React from "react";

interface ManagedInputProps extends React.ComponentProps<"input"> {
  value: string;
  onChange: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, ManagedInputProps>(
  ({ type = "text", value, onChange, ...props }, ref) => {
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

export { Input };
