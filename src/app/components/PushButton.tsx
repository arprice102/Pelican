interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

export default function PushButton({
    text,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false,
}: ButtonProps) {

    // Base styles
    const baseClass = 'pushbutton';

    // Conditional styles for variants and sizes
    const variantStyles = {
        primary: 'primary',
        secondary: 'secondary'
    };

    const sizeStyles = {
        small: 'text-s',
        medium: 'text-base',
        large: 'text-l'
    };

    // BEM variant modifier classes
    const variantClass = `${baseClass}--${variant}`;

    // BEM size modifier classes
    const sizeClass = `${baseClass}--${size}`;

    // Disabled class based on BEM modifier syntax
    const disabledClass = disabled ? `${baseClass}--disabled` : '';

    // Combine class names based on props
    const className = `${baseClass} ${variantClass} ${sizeClass} ${disabledClass}`;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}>
            {text}
        </button>
    );
}