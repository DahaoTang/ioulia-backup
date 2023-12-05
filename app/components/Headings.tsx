type HeadingProps = {
	children: string;
	className?: string;
};


const Heading1: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<div className={`text-5xl font-bold  ${className || ""}`}>{children}</div>
	);
};

const Heading2: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<div className={`text-4xl font-bold  ${className || ""}`}>{children}</div>
	);
};

const Heading3: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<div className={`text-3xl font-bold  ${className || ""}`}>{children}</div>
	);
};

const Heading4: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<div className={`text-2xl font-bold  ${className || ""}`}>{children}</div>
	);
};

const Heading5: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<div className={`text-xl font-bold  ${className || ""}`}>{children}</div>
	);
};

const Heading6: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<div className={`text-l font-bold  ${className || ""}`}>{children}</div>
	);
};

export { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 };
