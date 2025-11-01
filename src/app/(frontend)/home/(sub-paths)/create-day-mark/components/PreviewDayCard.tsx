export default function PreviewDayCard({
    bgColor,
    fontColor,
    title,
}: {
    bgColor: string;
    fontColor: string;
    title: string;
}) {
    return (
        <div
            tab-index="0"
            className={`      
                group    
                aspect-square
                transition-all duration-100 ease-in-out
                rounded-[1px]
                hover:filter-[brightness(130%)]
                
                focus:ring-2 focus:ring-blue-200
                hover:ring-1 hover:ring-blue-200
                active:shadow-[inset_0_0_5px_black]
                
                cursor-pointer      
                
                min-[750px]:w-[110px]
                min-[640px]:w-[95px] max-[750px]:w-[95px]
                min-[500px]:w-[70px] max-[640px]:w-[70px]
                min-[400px]:w-[62px] max-[500px]:w-[62px]
                max-[330px]:w-[50px]
                relative 
               
                grid justify-center items-center text-center
                text-xs sm:text-sm md:text-base lg:text-lg font-semibold`}
            style={{
                backgroundColor: bgColor,
                color: fontColor,
            }}
        >
            <div className="grid grid-cols-3 justify-start">
                <span className="col-start-2">1</span>
            </div>
            <div
                className="
            min-[500px]:text-[12px] max-[640px]:text-[12px]
            min-[400px]:text-[10px] max-[500px]:text-[10px]
            max-[330px]:text-[8.5px] 
            sm:text-sm 
            md:text-base 
            lg:text-lg
            "
            >
                {title.length === 0 ? "title" : title}
            </div>
        </div>
    );
}
