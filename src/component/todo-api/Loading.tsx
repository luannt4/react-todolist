const Loading: React.FC = () => {
    return ( 
        <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow flex justify-center items-center min-h-[400px] ">
            Loading <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
     );
}
export default Loading;

