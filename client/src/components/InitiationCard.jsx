import React from 'react';

function InitiationCard({ imageUrl, name, theme, date, volunteersRequired }) {
    return (
        <div className='p-5'>
        <div className="flex-auto w-[300px] rounded-md border-solid border-2 border-gray-400">
            <img
                src={imageUrl}
                alt={name}
                className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
                <h1 className="text-lg font-semibold">{name}</h1>
                <p className="mt-1 text-sm text-gray-600">{theme}</p>
                <p className="mt-1 text-sm text-gray-600">{date}</p>
                <p className="mt-1 text-sm text-gray-600">Volunteers Required: {volunteersRequired}</p>
                <button
                    type="button"
                    className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[20px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Volunteer
                </button>
            </div>
        </div>
        </div>
    );
}

export default InitiationCard;
