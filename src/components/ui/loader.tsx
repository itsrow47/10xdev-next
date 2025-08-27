export default function Loader({ isLight }: { isLight?: boolean }) {
    return (
        <div className="flex items-center justify-center animate-spin z-50">
            <div className={`animate-spin rounded-full h-4 w-4 border  border-t-2 ${!isLight ? 'border-secondary/30 border-t-white' : ' border-black/30 border-t-2 border-t-black'}`}></div>
        </div>
    );
}