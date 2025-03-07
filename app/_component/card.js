const CardComponents = ({title, children}) => {
    return (
        <div className="relative">
            <h3 className="text-2xl text-black font-bold py-4">{title}</h3>
            <div>
                {children}
            </div>
        </div>
    );
}
 
export default CardComponents;