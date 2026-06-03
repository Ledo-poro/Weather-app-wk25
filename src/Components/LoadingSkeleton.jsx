function LoadingSkeleton() {
    return (
        <div>
            <div className="animate-pulse space-y-4 mb-8">
                <div className="h-8 bg-gray-700 rounded-lg w-3/4 mx-auto"></div> {/* Location */}
                <div className="h-6 bg-gray-600 rounded-lg w-1/2 mx-auto"></div> {/* Icon */}
                <div className="h-4 bg-gray-600 rounded-lg w-2/3 mx-auto"></div> {/* Temp */}
                <div className="h-4 bg-gray-600 rounded-lg w-1/2 mx-auto"></div> {/* Humi */}
                <div className="h-4 bg-gray-600 rounded-lg w-1/3 mx-auto"></div> {/* Wind */}
            </div>
            {/* Forecast */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{[1 , 2 , 3].map((day) => (
                <div key={day} className="animate-pulse bg-gray-700 rounded-lg p-4 space-y-2"></div>
            ))}</div>

        </div>
    )
}

export default LoadingSkeleton;