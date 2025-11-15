type ArrowDownProps = {
  className?: string;
};

export default function ArrowDown({ className = "" }: ArrowDownProps) {
  return (
    <svg className="w-6 h-6 text-red-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg> 
  );
}